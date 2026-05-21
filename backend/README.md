# RedUse Backend (Django API)

This folder contains the main backend service for RedUse. It is a Django
project that exposes REST API endpoints for recipes, food disposal guidance,
textile data views, and the Product Journey feature.

## Project layout

- `core/` - Django project configuration:
  - settings, URLs, WSGI/ASGI entry points.
- `data_app/` - Main Django app:
  - models for `Recipe` and `FoodDisposalGuidance`,
  - serializers,
  - API views and URL routes.
- `data/` - Supporting datasets used by the API:
  - CSV and Excel files for textile waste summaries and material breakdowns.
- `manage.py` - Django management script.
- `requirements.txt` - Python dependencies.
- `db.sqlite3` - Local SQLite database for development/testing only.
- `.env` - Environment variables such as `GEMINI_API_KEY` (not committed).

## Setup (local development)

1. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Apply migrations:

   ```bash
   python manage.py migrate
   ```

4. Run the development server:

   ```bash
   python manage.py runserver
   ```

The API will be available at `https://reduse-api-ddfkdgengccka5fz.australiaeast-01.azurewebsites.net` by default.

## Key API areas

- **Recipes** - search and detail endpoints for Kitchen-Raid recipes.
- **Food disposal guidance** - per-category advice on how to dispose of food.
- **Textile data** - summary and detail views based on Victorian textile waste datasets.
- **Product Journey** - AI-assisted "journey" for household objects with caching.

Refer to the project documentation for full endpoint details and example
requests.