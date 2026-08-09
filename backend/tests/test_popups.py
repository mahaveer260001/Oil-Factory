import pytest
from flask_jwt_extended import create_access_token
from app.models import db, Admin, PopupAnnouncement

@pytest.fixture
def auth_headers(app):
    with app.app_context():
        admin = Admin(
            username="testadmin",
            email="testadmin@example.com",
            password_hash="hashedpass",
            role="admin"
        )
        db.session.add(admin)
        db.session.commit()
        token = create_access_token(identity=str(admin.id))
        return {"Authorization": f"Bearer {token}"}

def test_get_active_popup_empty(client):
    res = client.get("/api/popups/active")
    assert res.status_code == 200
    json_data = res.get_json()
    assert json_data["success"] is True
    assert json_data.get("data") is None

def test_create_and_get_active_popup(client, auth_headers):
    # Create popup
    payload = {
        "title": "Summer Special Offer",
        "description": "Get 20% off on all edible oil products!",
        "image_url": "https://example.com/banner.jpg",
        "button_text": "Claim Offer",
        "button_link": "/r/SUMMER2026",
        "is_active": True,
        "display_delay": 2,
        "show_once_per_session": True
    }
    create_res = client.post("/api/admin/popups", json=payload, headers=auth_headers)
    assert create_res.status_code == 201
    created_data = create_res.get_json()["data"]
    assert created_data["title"] == "Summer Special Offer"
    assert created_data["is_active"] is True

    # Get active popup
    active_res = client.get("/api/popups/active")
    assert active_res.status_code == 200
    active_data = active_res.get_json().get("data")
    assert active_data is not None
    assert active_data["title"] == "Summer Special Offer"

def test_update_and_delete_popup(client, auth_headers):
    # Create
    create_res = client.post(
        "/api/admin/popups",
        json={"title": "Temp Popup", "description": "Short desc", "is_active": True},
        headers=auth_headers
    )
    popup_id = create_res.get_json()["data"]["id"]

    # Update (deactivate)
    update_res = client.put(
        f"/api/admin/popups/{popup_id}",
        json={"is_active": False, "title": "Updated Temp Popup"},
        headers=auth_headers
    )
    assert update_res.status_code == 200
    assert update_res.get_json()["data"]["is_active"] is False

    # Check active popup returns None
    active_res = client.get("/api/popups/active")
    assert active_res.get_json().get("data") is None

    # Delete
    del_res = client.delete(f"/api/admin/popups/{popup_id}", headers=auth_headers)
    assert del_res.status_code == 200

    # Get all popups
    get_all_res = client.get("/api/admin/popups", headers=auth_headers)
    assert get_all_res.status_code == 200
    assert len(get_all_res.get_json()["data"]) == 0

