# 💥 Retos Rotos de la Semana 02: Deployments y Réplicas

¡Bienvenido al laboratorio de investigación de incidentes de la **Semana 02**! Aquí aprenderás a depurar los **4 fallos y trampas más comunes** que ocurren al declarar y actualizar Deployments en Kubernetes.

Cada reto resuelto te otorga **+10 XP** (hasta **+40 XP** en total) para subir de rango en [`ASISTENTES.md`](../../ASISTENTES.md).

---

## 📑 Índice de Retos Rotos de la Semana 02

| # | Archivo del Reto | Nivel | Error / Síntoma Principal | En ☕ KubeCafé |
| :-: | :--- | :---: | :--- | :--- |
| **01** | [`01-deployment-selector-roto.yaml`](./01-deployment-selector-roto.yaml) | 🟢 Principiante | El selector no coincide con las etiquetas del template | El Supervisor busca bandejas de té en vez de las de café. |
| **02** | [`02-deployment-imagen-caida-rollback.yaml`](./02-deployment-imagen-caida-rollback.yaml) | 🟡 Intermedio | Imagen inexistente y despliegue bloqueado (`0/3 READY`) | Se pide un café que no existe y las mesas quedan vacías. |
| **03** | [`03-deployment-estrategia-invalida.yaml`](./03-deployment-estrategia-invalida.yaml) | 🟡 Intermedio | Sintaxis y anidamiento incorrecto en `RollingUpdate` | La comanda tiene mal escritas las reglas de reemplazo. |
| **04** | [`04-deployment-yaml-identacion.yaml`](./04-deployment-yaml-identacion.yaml) | 🔴 Ninja | Indentación rota y `apiVersion` incorrecto | La comanda está mal doblada y la Caja no puede leerla. |

---

## 🎯 Instrucciones para Resolver y Entregar

1. **Investiga el error en tu clúster local:**
   Aplica cada archivo para reproducir el fallo:
   ```bash
   kubectl apply -f semana-02-deployments/2.reto-roto/01-deployment-selector-roto.yaml
   ```
2. **Usa tus herramientas de diagnóstico:**
   - Lee el mensaje de error inmediato que arroja la terminal.
   - `kubectl get deployments,replicasets,pods`
   - `kubectl describe deployment <nombre>`
   - `kubectl rollout status deployment <nombre>`
3. **Copia los 4 archivos a tu carpeta personal:**
   ```bash
   mkdir -p aportes-comunidad/soluciones-retos/<tu-usuario-github>/semana-02
   cp semana-02-deployments/2.reto-roto/*.yaml aportes-comunidad/soluciones-retos/<tu-usuario-github>/semana-02/
   ```
4. **Corrige los archivos dentro de tu carpeta:**
   - Mantén los mismos nombres de archivo (`01-deployment-selector-roto.yaml`, `02-...`, `03-...`, `04-...`).
   - Agrega comentarios `#` explicando cuál era el error y cómo lo solucionaste.
5. **Envía tu Pull Request:**
   Sigue los pasos del [Manual de la Comunidad](../../aportes-comunidad/README.md). ¡El bot evaluará tus archivos y te sumará tus puntos automáticamente!

