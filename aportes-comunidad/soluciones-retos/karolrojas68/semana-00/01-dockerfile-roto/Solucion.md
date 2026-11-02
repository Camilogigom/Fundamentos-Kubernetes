El contenedor se apagaba solo porque la aplicación corría "en segundo plano". Al no tener nada visible ejecutándose de frente, Docker pensaba que ya había terminado su trabajo y lo cerraba inmediatamente. 
Entonces al listar los contenedores, no aparecia nada.

Cuál fue la solución?
Se modificó el Dockerfile agregando el parámetro daemon off; a la instrucción CMD para obligar a Nginx a mantenerse corriendo en primer plano.

Solución: 

CMD ["nginx", "-g", "daemon off;"]