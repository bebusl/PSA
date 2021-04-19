FROM python:3.9.4

WORKDIR /server

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip
COPY ./flask-server/requirements.txt /server/requirements.txt
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

CMD [ "gunicorn", "api:app", "-w", "2", "--threads", "2", "-b", ":5000" ]