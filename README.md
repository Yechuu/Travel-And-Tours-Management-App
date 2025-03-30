# Travel And Tours Management App

---

### Setup (Python3.9)

- Create a python environment
  ```
  python -m venv penv
  ```
- Install the dependencies
  ```bash
  pip install -r requirements_win.txt
  ```
- Make a copy of `.env.example` and rename the new copy to `.env` and update the mysql database credentials
  Example:
  ```bash
  DB_ENGINE=django.db.backends.mysql # Django provided Mysql engine
  DB_NAME=example_db
  DB_USER=example_user
  DB_PASSWORD=example_password
  DB_HOST=127.0.0.1 # localhost
  DB_PORT=3306 # Django Mysql port
  ```
- Create the database migrations
  ```bash
  python manage.py makemigrations
  ```
- Migrate the database changes
  ```bash
  python manage.py migrate
  ```
- Run the django project
  ```bash
  python manage.py runserver
  ```
