# AGENTS.md

## Objective
This repository is a Django boilerplate with Vite, Alpine.js, Tailwind CSS, Docker, and a modular settings layout.

When working here:
- Prefer pragmatic changes over large refactors.
- Preserve the existing project structure unless the task clearly requires restructuring.
- Avoid changing public defaults in the boilerplate unless the user explicitly wants that.

## Project Layout
- `conf/settings/`: split Django settings.
- `conf/settings/initializers/`: isolated settings concerns like database, storage, logging, Vite, TinyMCE, etc.
- `apps/`: Django apps. Main apps currently include `core`, `account`, `web`, and `content`.
- `_front/`: frontend source files used by Vite.
- `templates/`: Django templates.
- `Dockerfile` / `Dockerfile.dev`: production and development container flows.

## Working Rules
- Read the relevant settings files before changing behavior. Configuration is spread across `base.py`, environment-specific settings, `project.py`, and the initializer modules.
- Be careful with dependency changes because this repo currently has more than one dependency source:
  - `pyproject.toml` + `uv.lock`
  - `requirements.txt` + `requirements-dev.txt`
- If dependencies are changed, check whether both flows need to be updated and call that out clearly.
- Do not silently remove placeholder or template content such as "Awesome Project" strings unless the user asks for boilerplate cleanup.
- Treat Docker changes as user-facing behavior changes. Explain impact on local development and production separately.

## Preferred Validation
Use the smallest relevant validation for the change:
- Django config/app changes: `DJANGO_SETTINGS_MODULE=conf.settings.development SECRET_KEY=FAKE DATABASE_URL=sqlite:///app.db .venv/bin/python manage.py check`
- Targeted tests: `.venv/bin/python manage.py test <app_or_test_path>`
- Frontend asset changes: `npm run build`

If a command cannot be run, say so explicitly in the final response.

## Review Priorities
When asked for a review, prioritize:
1. Production safety and deploy behavior
2. Settings correctness
3. Docker/dev workflow consistency
4. Dependency drift between `uv` and `requirements`
5. Missing tests for changed behavior

## Known Repository Context
- The custom user model is `dj_account.User`.
- Storage behavior is configured in `conf/settings/initializers/storage.py`; check it before touching media/static delivery.
- The project uses WhiteNoise for local static serving.
- There is a `.venv` in the repo root and it should be preferred for local Django commands when available.

## Editing Style
- Keep edits narrow and intentional.
- Do not add broad architectural cleanup unless requested.
- Prefer fixing root causes over adding workaround comments.
- Update documentation when a behavior or workflow materially changes.
