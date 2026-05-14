"""
Migration: Add scheme_id to qr_batches table
Run with:  cd backend && python migrate.py
"""
import os
from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

from app import create_app
from app.models import db

app = create_app()

with app.app_context():
    conn = db.engine.raw_connection()
    cur  = conn.cursor()
    try:
        # Add scheme_id column if it doesn't already exist
        cur.execute("""
            ALTER TABLE qr_batches
            ADD COLUMN IF NOT EXISTS scheme_id INTEGER
            REFERENCES schemes(id) ON DELETE SET NULL;
        """)
        # Add index on scheme_id
        cur.execute("""
            CREATE INDEX IF NOT EXISTS idx_qr_batches_scheme_id
            ON qr_batches(scheme_id);
        """)
        conn.commit()
        print("\n[OK] Migration complete: scheme_id column added to qr_batches.\n")
    except Exception as e:
        conn.rollback()
        print(f"\n[ERROR] Migration failed: {e}\n")
    finally:
        cur.close()
        conn.close()
