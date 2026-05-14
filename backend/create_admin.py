"""
Create Super Admin — run once to seed admin credentials into Supabase.
Usage:
    cd backend
    python create_admin.py
"""

import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

from app import create_app
from app.models import db, Admin
from app.utils import PasswordManager

# ── Admin credentials (change if you want) ──────────────────────
USERNAME = "admin"
EMAIL    = "admin@fmcgrewards.in"
PASSWORD = "Admin@1234"       # meets: 8+ chars, upper, lower, digit
ROLE     = "super_admin"
# ────────────────────────────────────────────────────────────────

app = create_app()

with app.app_context():
    existing = Admin.query.filter_by(username=USERNAME).first()
    if existing:
        print(f"\n[INFO] Admin '{USERNAME}' already exists (id={existing.id}).")
        print("       No changes made.\n")
    else:
        password_hash = PasswordManager.hash_password(PASSWORD)
        admin = Admin(
            username=USERNAME,
            email=EMAIL,
            password_hash=password_hash,
            role=ROLE,
            is_active=True
        )
        db.session.add(admin)
        db.session.commit()
        print("\n" + "="*45)
        print("  Super Admin created successfully!")
        print("="*45)
        print(f"  Username : {USERNAME}")
        print(f"  Password : {PASSWORD}")
        print(f"  Email    : {EMAIL}")
        print(f"  Role     : {ROLE}")
        print(f"  DB ID    : {admin.id}")
        print("="*45)
        print("  Use these to log in at: http://localhost:8080")
        print("="*45 + "\n")
