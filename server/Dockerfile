FROM python:3.12-slim

WORKDIR /server

COPY requirements.txt requirements-dev.txt

RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt
RUN pip3 install -r requirements-dev.txt

COPY src .