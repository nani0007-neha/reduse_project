# RedUse
RedUse is a prototype digital platform that helps people make more sustainable
everyday decisions across food, clothing, and household items. It combines
practical guidance (Food guidance, Clothing guidance and Household guidance) with
simple tools that make sustainable behaviour easier in day-to-day life.

## Repository structure

- `.github/workflows/` - CI configuration for the project (e.g. backend checks).
- `frontend/` - Source code for the web frontend.
- `backend/` - Django + REST API service that powers the RedUse features.
- `db.sqlite3` - Local development database (not used in production).
- `requirements.txt` - Python package dependencies for the backend.
- `.env` - Local environment variables (not committed).
- `.gitignore` - Files and folders excluded from version control.

Each part of the system has its own README with setup and run instructions.
Start with the **backend/README.md** for the API, and the **frontend**
documentation for the UI.