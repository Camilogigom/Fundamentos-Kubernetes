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

CMD ["nginx", "-g", "daemon off;"]

##Reto 01
## Al tener esta instruccion es algo predeterminado CMD ["nginx"], eso lo hace funcionar como un demonio o trabajar en segundo plano
##por lo que el contenedor se apaga al instante de terminar el proceso principal. Con la instrucción CMD ["nginx", "-g", "daemon off;"]
## se le indica a Nginx que no se ejecute como un demonio, sino en primer plano, lo que permite que el contenedor permanezca activo mientras Nginx esté corriendo.
