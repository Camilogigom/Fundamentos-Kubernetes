# El contenedor original terminaba con código 1 porque app.py exige APP_SECRET_TOKEN.
# docker ps -a muestra el estado Exited (1) y docker logs <contenedor> revela la variable faltante.
# ENV proporciona un valor local de desarrollo; un valor real debe inyectarse con docker run -e.
FROM python:3.12-alpine

WORKDIR /app

RUN addgroup -g 10001 -S appgroup && \
    adduser -u 10001 -S appuser -G appgroup

COPY --chown=appuser:appgroup app.py .

ENV APP_SECRET_TOKEN="token-local-dev-12345"

USER appuser

EXPOSE 8080

CMD ["python", "app.py"]
