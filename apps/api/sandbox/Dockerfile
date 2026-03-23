FROM python:3.11-slim

RUN useradd -m sandboxuser

WORKDIR /sandbox

COPY runner.py /sandbox/runner.py

USER sandboxuser

CMD ["python", "/sandbox/runner.py"]