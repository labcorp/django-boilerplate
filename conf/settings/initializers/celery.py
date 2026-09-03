from conf.settings.base import ENV


CELERY_BROKER_URL = ENV("CELERY_BROKER_URL", default="redis://redis:6379/0")
CELERY_RESULT_BACKEND = ENV("CELERY_RESULT_BACKEND", default="django-db")
CELERY_TASK_ALWAYS_EAGER = ENV.bool("CELERY_TASK_ALWAYS_EAGER", default=False)
