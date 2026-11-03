# 🚨 RETO 3 DOCKER: El contenedor que corre como root (Falla en Kubernetes Seguro) 🚨
#
# Síntoma:
# 1. Al correr 'docker run --rm reto-root whoami', verás que responde 'root' (UID 0).
# 2. Al aplicar este Pod en Kubernetes con políticas de seguridad estrictas (pod-seguro.yaml),
#    el Pod falla con error:
#    'CreateContainerConfigError: container has runAsNonRoot and image will run as root'
#
# Pista:
# Para cumplir con las mejores prácticas de seguridad de contenedores (Least Privilege),
# debes:
# 1. Crear un grupo y un usuario no privilegiado (ej. 'appuser' con UID 10001).
# 2. Asignar los archivos al usuario usando '--chown' en la instrucción COPY.
# 3. Declarar la instrucción 'USER' antes de ejecutar el comando CMD.

FROM python:3.12-alpine

WORKDIR /app

RUN addgroup -g 10001 -S appgroup && \
    adduser -u 10001 -S appuser -G appgroup


# ❌ ERROR: Copia el archivo como root y no define un usuario no privilegiado
COPY --chown=appuser:appgroup app.py .

USER appuser

## Reto 03
## El contenedor se ejecuta por defecto como usuario root (UID 0), debido a que no se definió
## un usuario sin privilegios en el Dockerfile. Esto representa un riesgo de seguridad,
## Para solucionarlo, se crea un usuario y un grupo llamados appuser y appgroup con UID y GID 10001.
## Con la instrucción COPY --chown=appuser:appgroup se asigna la propiedad del archivo al nuevo usuario,
## y con USER appuser se indica que la aplicación debe ejecutarse sin privilegios de superusuario.
## De esta manera, se aplica el principio de menor privilegio, reduciendo los riesgos de seguridad
## y permitiendo que el contenedor funcione sin necesidad de ejecutarse como root.

EXPOSE 8080

CMD ["python", "app.py"]
