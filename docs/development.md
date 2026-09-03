# Development — uso do stack

Guia rápido do fluxo de desenvolvimento: Docker, `uv` (Python), `nvm` (Node), Celery e o front (Vite).

## Stack

- Django 6 + Django REST Framework, PostgreSQL.
- Celery + Redis/Valkey (processamento assíncrono), `django-celery-results`.
- Front: Vite + Alpine.js (+ `@alpinejs/mask`) + Tailwind 4 + DaisyUI + HTMX; ícones via iconify.
- Auth/infra: `django-allauth[mfa]`, `django-solo`, `django-anymail[resend]`, `django-hijack`, `django-auditlog`.
- Dependências Python via `uv`; Node via `nvm`.

## Pré-requisitos

- Docker + Docker Compose (fluxo recomendado).
- `uv` (Python) e `nvm` (Node) para rodar/instalar fora do Docker.

## Docker (recomendado)

```bash
cp .env.example .env            # ajuste as variáveis (no Docker, DATABASE_URL usa o host `db`)
docker compose build
docker compose up -d
docker compose run --rm app python manage.py migrate        # primeira vez
docker compose exec app python manage.py createsuperuser     # opcional
```

Sobe cinco serviços:

| Serviço | Porta | Função |
|---|---|---|
| `front` | 5173 | Vite dev server (HMR) |
| `app` | 8000 (+ 5678 debugpy) | Django (runserver sob debugpy) |
| `celery_worker` | — | worker Celery |
| `redis` | 6379 | broker/result do Celery |
| `db` | 5432 | Postgres |

O `app` roda sob `debugpy` — anexe o VSCode na porta 5678 para depurar (config em `.vscode/`).

Logs: `docker compose logs -f app` (ou `celery_worker`).

## Python — uv

```bash
uv sync                       # cria .venv e instala (deps + grupo dev)
uv run python manage.py <cmd>  # roda comandos no ambiente
uv add <pacote>               # adiciona dep (atualiza pyproject + uv.lock)
uv lock --upgrade             # sobe versões respeitando os pins
```

- Deps de produção em `[project].dependencies`; ferramentas de dev em `[dependency-groups].dev`.
- No Docker o `Dockerfile.dev` roda `uv sync --frozen`; o `.venv` fica em `/app/.venv` (preservado por volume).

## Node — nvm

Use o `nvm`, não o Node do sistema (o Node do sistema roda como root e cria `node_modules/` root-owned).

```bash
export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"
nvm use            # ou `nvm use default`
npm install
npm run dev        # Vite dev server
npm run build      # gera assets em _static/ (manifest.json)
```

Pegadinhas:
- Se `node_modules/` aparecer `root:root` (criado pelo container `front` ao subir), remova com `rm -rf node_modules` e reinstale via `nvm`.
- Ao mudar `package.json`, rebuilde o container do front: `docker compose build front`.

## Celery

```bash
# no Docker já roda no serviço celery_worker; local:
uv run celery -A conf worker -l info
```

- Broker/result vêm de `CELERY_BROKER_URL` / `CELERY_RESULT_BACKEND` (defaults em `conf/settings/initializers/celery.py`). No Docker o compose injeta `redis://redis:6379/0`; local sem Docker use `redis://localhost:6379/0`.
- Result backend padrão é `django-db` → precisa de `migrate` (o `django_celery_results` tem migrations próprias).
- Em testes, `CELERY_TASK_ALWAYS_EAGER=True` executa as tasks de forma síncrona.

## Settings

- Modular em `conf/settings/`: `base.py` → `project.py` (apps, e-mail, celery) → `development.py` / `production.py`; concerns isolados em `initializers/`.
- Config por ambiente via `.env` (lido por `django-environ`). `DEBUG` e `SECRET_KEY` são obrigatórios; no Docker o `DATABASE_URL` aponta para o host `db`.

## Front — tema e ícones

- Tailwind 4 é CSS-first: temas, tokens e plugins ficam em `_front/css/tailwind.css`.
- Temas DaisyUI `light` (default) e `dark` (`prefersdark`); o `_base.html` aplica o tema salvo antes do primeiro paint (sem flash).
- Toggle de tema: um `<input id="theme-toggle">` na página; `_front/js/utils/theme_toggle.js` persiste em `localStorage`.
- Ícones (iconify material-symbols): `<span class="icon-[material-symbols--nome-do-icone]"></span>`.
- `@source "../../templates"` no `tailwind.css` garante que as classes usadas nos templates não sejam purgadas no build front-only.
- Entrypoints Vite: `main` (site) e `admin` (Django admin), definidos em `vite.config.mjs`.

## Verificação

```bash
uv run python manage.py check
uv run python manage.py makemigrations --check
uv run python manage.py test
npm run build
```
