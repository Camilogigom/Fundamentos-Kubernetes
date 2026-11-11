FROM python:3.12-alpine

WORKDIR /app

RUN addgroup -g 10001 -S appgroup && \
    adduser -u 10001 -S appuser -G appgroup

COPY --chown=appuser:appgroup app.py .

USER appuser

EXPOSE 8080

CMD ["python", "app.py"]
