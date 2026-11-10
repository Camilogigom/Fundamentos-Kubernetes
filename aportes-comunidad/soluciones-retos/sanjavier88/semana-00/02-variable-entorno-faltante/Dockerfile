# 🚨 RETO 2 DOCKER SOLUCIONADO - sanjavier88 🚨
# Causa: El contenedor se apagaba porque 'app.py' requería la variable obligatoria 'APP_SECRET_TOKEN'.
# Solución: Definir 'ENV APP_SECRET_TOKEN' y buenas prácticas de usuario no-root.

FROM python:3.12-alpine

WORKDIR /app

RUN addgroup -g 10001 -S appgroup && \
    adduser -u 10001 -S appuser -G appgroup

COPY --chown=appuser:appgroup app.py .

# Variables de entorno requeridas por la aplicación
ENV PORT=8080
ENV MENSAJE="¡Hola desde mi contenedor en Cloud Native Medellín! 🏔️☕"
ENV APP_SECRET_TOKEN="cnm-super-secreto-sanjavier88"

USER appuser

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://localhost:8080/health || exit 1

CMD ["python", "app.py"]
