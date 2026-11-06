# El CMD original ejecutaba Nginx como demonio; al terminar el proceso principal Docker cerraba el contenedor.
# docker ps -a y docker logs <contenedor> permiten observar la salida inmediata del contenedor.
# daemon off mantiene Nginx en primer plano como PID 1 para que el contenedor siga activo.
FROM nginx:alpine

COPY index.html /usr/share/nginx/html/index.html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
