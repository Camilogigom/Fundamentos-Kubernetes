Al ejecutar el contenedor, aparecía en estado activo (Up), pero al hacer curl http://localhost:8080 devolvía Conexión rechazada. Esto sucedía por dos problemas de configuración:

IP de enlace: En app.py, el código estaba configurado en 127.0.0.1, escuchando únicamente en la interfaz de bucle local interna del contenedor y rechazando cualquier petición externa.

Puerto de escucha: La aplicación estaba configurada internamente para escuchar en el puerto 5000, mientras que Docker intentaba mapear y exponer el puerto 8080.

Solución:

En app.py, se cambió la IP a 0.0.0.0 (para permitir conexiones a través de todas las interfaces de red del contenedor) y se ajustó el puerto a 8080.

Se confirmó que la instrucción EXPOSE 8080 en el Dockerfile y el comando de ejecución docker run -p 8080:8080 