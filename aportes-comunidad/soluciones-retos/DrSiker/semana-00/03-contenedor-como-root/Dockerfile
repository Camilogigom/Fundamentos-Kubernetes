FROM python:3.12-alpine

WORKDIR /app

# docker run --rm reto-root whoami mostraba root porque la imagen no definía USER.
RUN addgroup -g 10001 -S appgroup && \
    adduser -u 10001 -G appgroup -S -D appuser

# Copia con permisos para que la aplicación sea legible por el usuario sin privilegios.
COPY --chown=appuser:appgroup app.py .

USER appuser

EXPOSE 8080

CMD ["python", "app.py"]
