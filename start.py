# -*- coding: utf-8 -*-
"""
FMCG Oil Factory - Project Launcher
=====================================
Run with:  python start.py
Starts:
  1. Flask Backend API     -> http://localhost:5000
  2. React Frontend Site   -> http://localhost:5173
  3. Admin Dashboard       -> http://localhost:8080
"""

import subprocess
import sys
import os
import time
import threading
import socket
import http.server
import socketserver
import io

# Fix Windows console encoding
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

# ── Paths ──────────────────────────────────────────────────────────────────
ROOT_DIR  = os.path.dirname(os.path.abspath(__file__))
BACKEND   = os.path.join(ROOT_DIR, "backend")
ADMIN_DIR = os.path.join(ROOT_DIR, "admin-dashboard")

# ── Ports ──────────────────────────────────────────────────────────────────
BACKEND_PORT  = 5000
FRONTEND_PORT = 5173
ADMIN_PORT    = 8080

# ── Colours ────────────────────────────────────────────────────────────────
GREEN  = "\033[92m"
CYAN   = "\033[96m"
YELLOW = "\033[93m"
BOLD   = "\033[1m"
RESET  = "\033[0m"
DIM    = "\033[2m"


def is_port_free(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(("localhost", port)) != 0


def print_banner():
    print(f"\n{BOLD}{CYAN}{'='*55}{RESET}")
    print(f"{BOLD}{CYAN}   FMCG Oil Factory - Starting All Services...{RESET}")
    print(f"{BOLD}{CYAN}{'='*55}{RESET}\n")


def print_urls():
    time.sleep(5)  # wait for all servers to boot
    print(f"\n{BOLD}{GREEN}{'='*55}{RESET}")
    print(f"{BOLD}{GREEN}  ALL SERVICES ARE RUNNING{RESET}")
    print(f"{BOLD}{GREEN}{'='*55}{RESET}")
    print(f"\n  {BOLD}[SITE]   Main Website:{RESET}")
    print(f"          {CYAN}{BOLD}http://localhost:{FRONTEND_PORT}{RESET}")
    print(f"\n  {BOLD}[ADMIN]  Admin Dashboard:{RESET}")
    print(f"          {YELLOW}{BOLD}http://localhost:{ADMIN_PORT}{RESET}")
    print(f"\n  {DIM}[API]    Backend API    -> http://localhost:{BACKEND_PORT}{RESET}")
    print(f"  {DIM}[HEALTH] Health Check   -> http://localhost:{BACKEND_PORT}/health{RESET}")
    print(f"\n{BOLD}{GREEN}{'='*55}{RESET}")
    print(f"  {DIM}Press Ctrl+C to stop all services{RESET}\n")
    sys.stdout.flush()


def serve_admin_dashboard():
    """Serve the static admin-dashboard folder on ADMIN_PORT."""
    os.chdir(ADMIN_DIR)

    class QuietHandler(http.server.SimpleHTTPRequestHandler):
        def log_message(self, format, *args):
            pass  # suppress noisy request logs

    try:
        with socketserver.TCPServer(("", ADMIN_PORT), QuietHandler) as httpd:
            httpd.serve_forever()
    except OSError:
        pass  # port already in use — admin dashboard already running


def run_backend():
    """Start Flask backend."""
    python = sys.executable
    env = os.environ.copy()
    subprocess.run(
        [python, "run.py"],
        cwd=BACKEND,
        env=env,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def run_frontend():
    """Start Vite dev server for React frontend."""
    npm = "npm.cmd" if sys.platform == "win32" else "npm"
    subprocess.run(
        [npm, "run", "dev"],
        cwd=ROOT_DIR,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def main():
    print_banner()

    # Check for port conflicts
    for port, name in [
        (BACKEND_PORT,  "Backend  (Flask)"),
        (FRONTEND_PORT, "Frontend (Vite) "),
        (ADMIN_PORT,    "Admin    (HTTP) "),
    ]:
        status = "FREE" if is_port_free(port) else "IN USE - will reuse"
        print(f"  Port {port}  {name}  [{status}]")

    print()

    # Start all three servers in background threads (only if port is free)
    if is_port_free(BACKEND_PORT):
        print(f"  {DIM}[1/3] Starting Flask backend   (port {BACKEND_PORT})...{RESET}")
        threading.Thread(target=run_backend, daemon=True).start()
    else:
        print(f"  {DIM}[1/3] Flask backend already running on port {BACKEND_PORT} — skipping.{RESET}")

    if is_port_free(FRONTEND_PORT):
        print(f"  {DIM}[2/3] Starting React frontend  (port {FRONTEND_PORT})...{RESET}")
        threading.Thread(target=run_frontend, daemon=True).start()
    else:
        print(f"  {DIM}[2/3] Frontend already running on port {FRONTEND_PORT} — skipping.{RESET}")

    if is_port_free(ADMIN_PORT):
        print(f"  {DIM}[3/3] Starting Admin dashboard (port {ADMIN_PORT})...{RESET}")
        threading.Thread(target=serve_admin_dashboard, daemon=True).start()
    else:
        print(f"  {DIM}[3/3] Admin dashboard already running on port {ADMIN_PORT} — skipping.{RESET}")

    # Print the final URLs after boot
    threading.Thread(target=print_urls, daemon=True).start()

    # Keep alive
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print(f"\n\n{YELLOW}  Shutting down all services...{RESET}\n")
        sys.exit(0)


if __name__ == "__main__":
    main()
