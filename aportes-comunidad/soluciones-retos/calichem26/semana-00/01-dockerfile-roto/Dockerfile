# 🚨 RETO 1 DOCKER (Nivel Fácil): El contenedor que se apaga solo al instante 🚨
# Síntoma: Haces 'docker build -t reto-docker-01 .' y la imagen compila bien.
#          Sin embargo, al hacer 'docker run -d -p 8080:80 reto-docker-01' y luego 'docker ps',
#          ¡el contenedor NO aparece corriendo!
# Pista: Ejecuta 'docker ps -a' para ver su código de salida.
#        ¿Por qué el proceso de Nginx en CMD se envía a segundo plano y mata al contenedor?
#        Recuerda: en Docker, el proceso principal (PID 1) debe correr en PRIMER PLANO (foreground).

FROM nginx:alpine

COPY index.html /usr/share/nginx/html/index.html

EXPOSE 80

# CMD: Es una instrucción de Docker que define el comando principal que correrá el contenedor al iniciar.
# nginx: Ejecuta el binario del servidor web NGINX.
# -g: Es una opción de NGINX que permite pasar directivas de configuración globales directamente desde la línea de comandos.
# daemon off: Le ordena a NGINX que no se ejecute como un proceso en segundo plano (modo daemon), sino en el primer plano (foreground).
CMD ["nginx", "-g", "daemon off;"]

