# 🚨 RETO 1 DOCKER SOLUCIONADO - sanjavier88 🚨
# Causa: El comando original 'CMD ["nginx"]' enviaba el proceso a segundo plano y mataba el contenedor.
# Solución: Ejecutar en primer plano con daemon off y aplicar buenas prácticas de seguridad no-root.

FROM nginx:alpine

RUN apk upgrade --no-cache

COPY index.html /usr/share/nginx/html/index.html

# Cambiar el puerto a 8080 para usuario no-root
RUN sed -i 's/listen\s*80;/listen 8080;/' /etc/nginx/conf.d/default.conf \
    && sed -i 's/listen\s*\[::\]:80;/listen [::]:8080;/' /etc/nginx/conf.d/default.conf \
    && sed -i 's|/var/run/nginx.pid|/tmp/nginx.pid|' /etc/nginx/nginx.conf \
    && chown -R nginx:nginx /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

USER nginx

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:8080/ || exit 1

# Nginx corriendo en primer plano
CMD ["nginx", "-g", "daemon off;"]
