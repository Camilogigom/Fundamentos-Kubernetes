El contenedor funcionaba pero ea con el usuario "root" (administrador total), lo cual es un riesgo de seguridad altisimo y al correr salia la alerta de que el contenedor estaba corriendo con un superusuario.

Solución: Se modificó el Dockerfile para crear un grupo y un usuario no privilegiado (appuser), transferir la propiedad de los archivos y establecer la instrucción USER:

# Crear grupo y usuario sin privilegios
RUN addgroup -g 10001 -S appgroup && \
    adduser -u 10001 -S appuser -G appgroup

# Copiar archivos asignando permisos al usuario creado
COPY --chown=appuser:appgroup . .

# Cambiar al usuario sin privilegios
USER appuser