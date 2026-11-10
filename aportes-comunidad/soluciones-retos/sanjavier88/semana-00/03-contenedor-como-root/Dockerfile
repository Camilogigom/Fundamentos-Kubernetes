# 🚨 RETO 3 DOCKER SOLUCIONADO - sanjavier88 🚨
# Causa: El contenedor corría como 'root' (UID 0), fallando en clústeres seguros.
# Solución: Crear usuario no privilegiado 'appuser' (UID 10001), asignar archivos con --chown y usar USER appuser.

FROM python:3.12-alpine

WORKDIR /app

RUN addgroup -g 10001 -S appgroup && \
    adduser -u 10001 -S appuser -G appgroup

COPY --chown=appuser:appgroup app.py .

ENV PORT=8080

USER appuser

EXPOSE 8080

CMD ["python", "app.py"]
