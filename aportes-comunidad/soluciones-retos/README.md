# 🏆 Soluciones de Retos de la Comunidad

¡Bienvenido al espacio donde los asistentes del workshop comparten sus soluciones a los **Retos Rotos** de cada semana y suman experiencia (**+XP**) en [`ASISTENTES.md`](../../ASISTENTES.md)!

👉 **¿Estás dando tus primeros pasos entregando un reto?** Lee el [**🧭 Manual Paso a Paso para la Comunidad (`aportes-comunidad/README.md`)**](../README.md).

---

## 📂 Estructura Oficial de Carpetas

Para que el robot calificador reconozca tus ejercicios automáticamente y te asigne tus puntos (**+10 XP por cada reto resuelto**), organiza tu entrega respetando tu usuario de GitHub y los nombres originales de cada reto:

```text
aportes-comunidad/soluciones-retos/
└── <tu-usuario-github>/
    ├── README.md   <-- 🎓 (Generado automáticamente por el bot: ¡Tu Portafolio Profesional K8s!)
    ├── semana-00/
    │   ├── bitacora.md   <-- 📔 (Tu reflexión de la semana: vía Formulario Visual o plantilla)
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
        ├── bitacora.md
        ├── 01-pod-con-errores.yaml
        ├── 02-pod-crashloop.yaml
        ├── 03-pod-pendiente-infinito.yaml
        └── 04-pod-yaml-molesto.yaml
```

---

## 📔 Registra tu Bitácora Semanal y Obtén tu Portafolio + Insignias

Además de resolver los archivos técnicos, puedes documentar qué aprendiste cada semana de **dos formas súper fáciles**:

1. **🚀 Opción 1 — Formulario Visual en 1 minuto (Recomendado, sin usar Git):**  
   👉 [**Haz clic aquí para abrir el Formulario de Bitácora Semanal**](https://github.com/edwinbermudez91/Fundamentos-Kubernetes/issues/new?template=bitacora-semanal.yml).  
   El bot creará tu archivo `bitacora.md`, actualizará tu **Portafolio Profesional (`README.md`)** y te responderá con botones de 1 clic para compartir tu insignia en LinkedIn, X/Twitter, WhatsApp y Telegram.
2. **🛠️ Opción 2 — Desde tu terminal junto con tu Pull Request:**  
   Copia la [**`PLANTILLA-BITACORA.md`**](./PLANTILLA-BITACORA.md) dentro de tu carpeta semanal como `bitacora.md` y llénala en VS Code.

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

---

## 📚 Enlaces a la Documentación Oficial para Resolver Retos

Apóyate siempre en las fuentes oficiales para investigar las causas de error y validar la sintaxis de tus soluciones:

* 🐳 **Docker:**
  * [Referencia Oficial de Dockerfile](https://docs.docker.com/reference/dockerfile/)
  * [Comandos y Opciones de Docker CLI](https://docs.docker.com/reference/cli/docker/)
  * [Mejores Prácticas de Seguridad y Dockerfile](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
* ☸️ **Kubernetes:**
  * [Cheat Sheet Oficial de kubectl](https://kubernetes.io/es/docs/reference/kubectl/cheatsheet/)
  * [Guía Oficial de Depuración y Diagnóstico de Pods](https://kubernetes.io/es/docs/tasks/debug/debug-application/debug-pods/)
  * [Especificación Oficial de Pods](https://kubernetes.io/es/docs/concepts/workloads/pods/)
  * [Guía Oficial de Deployments, Réplicas y Rollouts](https://kubernetes.io/es/docs/concepts/workloads/controllers/deployment/)
