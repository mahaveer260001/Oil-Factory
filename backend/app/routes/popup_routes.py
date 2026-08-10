"""
Popup Announcement Routes
Public route for main website to fetch active popup,
and Admin API routes for full CRUD operations and image upload.
"""

import os
import uuid
import logging
from datetime import datetime
from werkzeug.utils import secure_filename
from flask import Blueprint, request, jsonify, current_app
from app.models import db, PopupAnnouncement
from app.utils import AdminAuthDecorator, format_response, log_admin_action

logger = logging.getLogger(__name__)

popup_bp = Blueprint("popups", __name__, url_prefix="/api")

ALLOWED_IMAGE_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "webp", "svg"}

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_IMAGE_EXTENSIONS


# ---------------------------------------------------------------------------
# PUBLIC ENDPOINTS
# ---------------------------------------------------------------------------

@popup_bp.route("/popups/active", methods=["GET"])
def get_active_popup():
    """Get latest active popup announcement for the website"""
    try:
        popup = PopupAnnouncement.query.filter_by(is_active=True).order_by(PopupAnnouncement.id.desc()).first()
        if not popup:
            return format_response(data=None, message="No active popups", status_code=200)
            
        return format_response(
            data=popup.to_dict(),
            status_code=200
        )
    except Exception as e:
        logger.error(f"Error fetching active popup: {str(e)}")
        return format_response(error="Failed to fetch popup", status_code=500)


# ---------------------------------------------------------------------------
# ADMIN ENDPOINTS
# ---------------------------------------------------------------------------

@popup_bp.route("/admin/popups", methods=["GET"])
@AdminAuthDecorator.admin_required
def get_all_popups():
    """Get all popups for admin portal"""
    try:
        popups = PopupAnnouncement.query.order_by(PopupAnnouncement.id.desc()).all()
        return format_response(
            data=[p.to_dict() for p in popups],
            status_code=200
        )
    except Exception as e:
        logger.error(f"Error fetching popups: {str(e)}")
        return format_response(error="Failed to fetch popups", status_code=500)


@popup_bp.route("/admin/popups", methods=["POST"])
@AdminAuthDecorator.admin_required
@log_admin_action("PopupAnnouncement", "create")
def create_popup():
    """Create a new popup announcement"""
    try:
        data = request.get_json() or {}
        title = data.get("title", "").strip()
        description = data.get("description", "").strip()
        image_url = data.get("image_url", "").strip()
        button_text = data.get("button_text", "Learn More").strip()
        button_link = data.get("button_link", "").strip()
        is_active = bool(data.get("is_active", True))
        
        try:
            display_delay = int(data.get("display_delay", 1))
        except (ValueError, TypeError):
            display_delay = 1

        show_once_per_session = bool(data.get("show_once_per_session", True))

        if not title:
            return format_response(error="Title is required", status_code=400)

        # If creating an active popup, optionally deactivate others if desired, or keep multiple
        # Here we allow multiple popups to exist and toggle active state freely
        popup = PopupAnnouncement(
            title=title,
            description=description,
            image_url=image_url,
            button_text=button_text,
            button_link=button_link,
            is_active=is_active,
            display_delay=display_delay,
            show_once_per_session=show_once_per_session
        )

        db.session.add(popup)
        db.session.commit()

        return format_response(
            data=popup.to_dict(),
            message="Popup created successfully",
            status_code=201
        )
    except Exception as e:
        db.session.rollback()
        logger.error(f"Error creating popup: {str(e)}")
        return format_response(error="Failed to create popup", status_code=500)


@popup_bp.route("/admin/popups/<int:popup_id>", methods=["PUT"])
@AdminAuthDecorator.admin_required
@log_admin_action("PopupAnnouncement", "update")
def update_popup(popup_id):
    """Update existing popup announcement"""
    try:
        popup = PopupAnnouncement.query.get(popup_id)
        if not popup:
            return format_response(error="Popup not found", status_code=404)

        data = request.get_json() or {}

        if "title" in data:
            title = data["title"].strip()
            if not title:
                return format_response(error="Title cannot be empty", status_code=400)
            popup.title = title

        if "description" in data:
            popup.description = data["description"].strip()

        if "image_url" in data:
            popup.image_url = data["image_url"].strip()

        if "button_text" in data:
            popup.button_text = data["button_text"].strip()

        if "button_link" in data:
            popup.button_link = data["button_link"].strip()

        if "is_active" in data:
            popup.is_active = bool(data["is_active"])

        if "display_delay" in data:
            try:
                popup.display_delay = int(data["display_delay"])
            except (ValueError, TypeError):
                pass

        if "show_once_per_session" in data:
            popup.show_once_per_session = bool(data["show_once_per_session"])

        popup.updated_at = datetime.utcnow()
        db.session.commit()

        return format_response(
            data=popup.to_dict(),
            message="Popup updated successfully",
            status_code=200
        )
    except Exception as e:
        db.session.rollback()
        logger.error(f"Error updating popup {popup_id}: {str(e)}")
        return format_response(error="Failed to update popup", status_code=500)


@popup_bp.route("/admin/popups/<int:popup_id>", methods=["DELETE"])
@AdminAuthDecorator.admin_required
@log_admin_action("PopupAnnouncement", "delete")
def delete_popup(popup_id):
    """Delete a popup announcement"""
    try:
        popup = PopupAnnouncement.query.get(popup_id)
        if not popup:
            return format_response(error="Popup not found", status_code=404)

        db.session.delete(popup)
        db.session.commit()

        return format_response(
            message="Popup deleted successfully",
            status_code=200
        )
    except Exception as e:
        db.session.rollback()
        logger.error(f"Error deleting popup {popup_id}: {str(e)}")
        return format_response(error="Failed to delete popup", status_code=500)


@popup_bp.route("/admin/popups/upload-image", methods=["POST"])
@AdminAuthDecorator.admin_required
def upload_popup_image():
    """Upload image for popup announcement.
    
    Converts image to a compressed base64 data URL and stores it directly
    in the database — avoids any filesystem / ephemeral storage issues on
    cloud platforms such as Render.
    """
    try:
        if "file" not in request.files:
            return format_response(error="No file provided", status_code=400)

        file = request.files["file"]
        if file.filename == "":
            return format_response(error="No file selected", status_code=400)

        if not allowed_file(file.filename):
            return format_response(
                error="Invalid file type. Allowed: PNG, JPG, GIF, WEBP, SVG",
                status_code=400
            )

        from PIL import Image
        import io
        import base64

        img = Image.open(file.stream)

        # Convert palette / RGBA to RGB for JPEG compatibility
        if img.mode in ("RGBA", "P", "LA"):
            background = Image.new("RGB", img.size, (255, 255, 255))
            if img.mode == "RGBA":
                background.paste(img, mask=img.split()[3])
            else:
                background.paste(img)
            img = background
        elif img.mode != "RGB":
            img = img.convert("RGB")

        # Resize: keep aspect ratio, max 900×500 px
        img.thumbnail((900, 500), Image.LANCZOS)

        # Encode to JPEG at 80 % quality → keeps data URL compact
        buf = io.BytesIO()
        img.save(buf, format="JPEG", quality=80, optimize=True)
        buf.seek(0)

        b64 = base64.b64encode(buf.read()).decode("utf-8")
        image_url = f"data:image/jpeg;base64,{b64}"

        return format_response(
            data={"image_url": image_url},
            message="Image uploaded and encoded successfully",
            status_code=200
        )

    except Exception as e:
        logger.error(f"Error uploading popup image: {str(e)}")
        return format_response(error="Failed to upload image", status_code=500)
