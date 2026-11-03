# 🏆 Soluciones de Retos de la Comunidad

¡Bienvenido al espacio donde los asistentes del workshop comparten sus soluciones a los **Retos Rotos** de cada semana y suman experiencia (**+XP**) en [`ASISTENTES.md`](../../ASISTENTES.md)!

👉 **¿Es tu primera vez entregando un reto?** Lee el [**🧭 Manual Paso a Paso para Principiantes (`aportes-comunidad/README.md`)**](../README.md).

---

## 📂 Estructura Oficial de Carpetas

Para que el robot calificador reconozca tus ejercicios automáticamente y te asigne tus puntos (**+10 XP por cada reto resuelto**), organiza tu entrega respetando tu usuario de GitHub y los nombres originales de cada reto:

```text
aportes-comunidad/soluciones-retos/
└── <tu-usuario-github>/
    ├── semana-00/
    │   ├── 01-dockerfile-roto/
    │   │   └── Dockerfile
    │   ├── 02-variable-entorno-faltante/
    │   │   └── Dockerfile
    │   ├── 03-contenedor-como-root/
    │   │   └── Dockerfile
    │   ├── 04-dockerignore-y-archivos-secretos/
    │   │   ├── .dockerignore
    │   │   └── Dockerfile
    │   └── 05-puerto-y-host-desalineado/
    │       ├── Dockerfile
    │       └── app.py
    └── semana-01/
        ├── 01-pod-con-errores.yaml
        ├── 02-pod-crashloop.yaml
        ├── 03-pod-pendiente-infinito.yaml
        └── 04-pod-yaml-molesto.yaml
```

---

## ⚡ Resumen Rápido en 4 Comandos (Para copiar y pegar)

Reemplaza `TU-USUARIO` por tu usuario de GitHub y `semana-01` por la semana que estés trabajando:

```bash
# 1. Crea tu rama de la semana
git checkout -b TU-USUARIO/semana-01

# 2. Crea tu carpeta personal y copia los retos de la semana (sin tocar los originales)
mkdir -p aportes-comunidad/soluciones-retos/TU-USUARIO/semana-01
cp semana-01-arquitectura/2.reto-roto/*.yaml aportes-comunidad/soluciones-retos/TU-USUARIO/semana-01/

# 3. (Después de investigar, corregir y probar tus archivos en tu carpeta) Guarda tus cambios
git add aportes-comunidad/soluciones-retos/TU-USUARIO/
git commit -m "Solución retos semana 01 - TU-USUARIO"

# 4. Sube tu rama a GitHub y abre el Pull Request en el navegador
git push origin TU-USUARIO/semana-01
```

---

## ✅ Checklist Antes de Enviar tu Pull Request

1. [ ] **No modificaste los archivos originales** dentro de `semana-XX-.../2.reto-roto/` (verifícalo con `git status`).
2. [ ] **Probaste tus soluciones** en tu laboratorio local (`docker run` o `kubectl apply -f ...`) y verificaste que pasen a estado saludable (`Up` o `Running`).
3. [ ] **Agregaste comentarios (`#`)** dentro de tus archivos explicando:
   * ¿Cuál era el fallo original?
   * ¿Con qué comando lo descubriste (`kubectl describe`, `kubectl logs`, `docker logs`, etc.)?
   * ¿Qué ajuste aplicaste para solucionarlo?
