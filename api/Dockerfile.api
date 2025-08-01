FROM python:3.9-slim-bullseye

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY . /code/api

CMD ["uvicorn", "api.main:api", "--host", "0.0.0.0", "--port", "8000"]
