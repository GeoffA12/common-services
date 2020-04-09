FROM python:3.6-alpine
LABEL Team 22

ENV PYTHONUNBUFFERED 1

RUN apk update

RUN apk add -U --no-cache gcc build-base linux-headers ca-certificates python3-dev libffi-dev libressl-dev libxslt-dev

COPY ./requirements.txt /requirements.txt
RUN pip install -r requirements.txt

RUN mkdir /app
WORKDIR /app
COPY ./app /app

RUN adduser -D user
USER user

CMD ["python", "team22cswebservice.py"]



