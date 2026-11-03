La aplicación no arrancaba y daba error porque necesitaba una clave de acceso (variable de entorno) para iniciar, pero nadie se la estaba pasando ni en el código ni al encender el contenedor

La terminal devolvía un mensaje de error  indicando que faltaba las credenciales:
KeyError: 'APP_SECRET_TOKEN' o Error: APP_SECRET_TOKEN environment variable is not defined

Se solucionó agregando la definición por defecto de la variable de entorno dentro del Dockerfile mediante la instrucción ENV: 
ENV APP_SECRET_TOKEN="mi_token_secreto_super_seguro" el token se encuentra dentro de las instrucciones del lab.