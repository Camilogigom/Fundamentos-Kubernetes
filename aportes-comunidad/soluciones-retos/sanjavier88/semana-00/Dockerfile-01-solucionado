# 1. Imagen base oficial y ligera basada en Alpine Linux
# FROM nginx:alpine

# RUN apk upgrade --no-cache curl brotli-libs

# 2. Copiamos nuestro archivo index.html dentro de la ruta pública de Nginx
# COPY index.html /usr/share/nginx/html/index.html

# 3. Documentamos que el contenedor escucha peticiones en el puerto 80
# EXPOSE 80

# 4. Comando que se ejecuta al encender el contenedor (en primer plano para que no se apague)
# CMD ["nginx", "-g", "daemon off;"]

FROM nginx:alpine


RUN apk upgrade --no-cache

COPY index.html /usr/share/nginx/html/index.html

# Cambiar el puerto a 8080 porque un usuario no-root no puede usar el 80
RUN sed -i 's/listen\s*80;/listen 8080;/' /etc/nginx/conf.d/default.conf \
    && sed -i 's/listen\s*\[::\]:80;/listen [::]:8080;/' /etc/nginx/conf.d/default.conf \
    && sed -i 's|/var/run/nginx.pid|/tmp/nginx.pid|' /etc/nginx/nginx.conf \
    && chown -R nginx:nginx /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

USER nginx

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:8080/ || exit 1