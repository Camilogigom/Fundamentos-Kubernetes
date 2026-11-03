Se estaban filtrando claves y archivos secretos (como el .env) dentro de la imagen porque no se tenía un archivo .dockerignore que le indicará a Docker qué cosas no debía copiar al empaquetar.

Entonces al ejeuctarlo se podía ver en texto plano las contraseñas, llaves y secretos del archivo, es decir, un hueco de seguridad.

Solución:
Se creó el archivo .dockerignore en la raíz de la carpeta excluyendo archivos sensibles y que no se necesitan:

Dentro del .dockerignore:
.env
*.log
*.tmp
.git/
README.md


En el Dockerfile:
Se ajustó la instrucción en el Dockerfile para copiar solo lo necesario asignando permisos al usuario appuser:

COPY --chown=appuser:appgroup app.py .