# Django VAT (Vite, Alpine.js and Tailwind) Boilerplate
An awesome boilerplate to kickstart your next project with Django, Vite, Alpine.js, and Tailwind CSS. It’s designed for developers who want a fast, modern stack with a powerful backend and a sleek, reactive frontend — perfect for building beautiful, responsive web apps.

![Python](https://img.shields.io/badge/python-3.14-blue)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Disclaimer](https://img.shields.io/badge/use_at_your_own_risk-no_guarantee-red)

> **IMPORTANT:**  
> • Python >= 3.14.* (UV can handle this)  
> • PostgreSQL >= 16 (External DB recommended for production)

### Installed django APPs
 - Django REST Framework [[github]](https://github.com/encode/django-rest-framework)
 - Django Cotton [[github]](https://github.com/wrabit/django-cotton)
 - Django Vite [[github]](https://github.com/MrBin99/django-vite)
 - Django Admin Interface [[github]](https://github.com/fabiocaccamo/django-admin-interface)
 - DjangoQL [[github]](https://github.com/ivelum/djangoql)
 - Django TinyMCE [[github]](https://github.com/jazzband/django-tinymce)
 - Django Filer [[github]](https://github.com/django-cms/django-filer)
 - Celery [[github]](https://github.com/celery/celery)
 - Django HTMX [[github]](https://github.com/adamchainz/django-htmx)
 - Django Allauth [[github]](https://github.com/pennersr/django-allauth)

> See `docs/development.md` for the full dev workflow (Docker, uv, nvm, Celery, front).

## Docker (development)
0. Rename `.env.example` > `.env` and update it
1. Run `docker compose build --no-cache`
2. Run `docker compose up -d`
3. Run first-time migrations with `docker compose run --rm app python manage.py migrate`
4. [optional] Run `docker compose exec app python manage.py createsuperuser` to create admin user
5. Profit...

It will create the containers: front, app, celery_worker, redis and db  
> **Tip**: Search for "awesome" is all files and change it with your new project's name.

## Docker (production)
0. Use template in `.env.example` to create environment variables
1. Build with `docker build --no-cache -f Dockerfile -t IMAGE_NAME .`
2. Deploy



## Debugging Django App in VSCode (.vscode folder included)
Django App can be debugged attaching VSCode to the PTVSD server (launch.json is included in this boilerplate), so:

1. Add your breakpoints (or not)
2. Go to 'Run and Debug' on the left panel
3. Select 'Docker'
4. Start it (F5)  

## Simple usage (legacy, but still works - kindof)

**Front-end**
1. Run `npm install`
2. Run `npm run dev`
3. Profit...

**Back-end**
1. Run `uv sync`
2. Rename `.env.example` > `.env` and update it (point `DATABASE_URL` to a reachable Postgres)
3. Run first-time migrations with `uv run manage.py migrate`
4. [optional] Run `uv run manage.py createsuperuser`
5. Run `uv run manage.py runserver`
6. [optional] Celery worker: `uv run celery -A conf worker -l info`
7. Profit...

---

### Questions?!
