<div align="center">

# ☸️ De Cero a Capitán en Kubernetes
### Workshop Práctico de 6 Semanas — Cloud Native Medellín 🏔️☕

[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/es/)
[![Cloud Native Medellín](https://img.shields.io/badge/Comunidad-Cloud_Native_Medellín-00C7B7?style=for-the-badge)](https://github.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-¡Bienvenidos!-brightgreen.svg?style=for-the-badge)](./CONTRIBUTING.md)
[![Nivel](https://img.shields.io/badge/Nivel-Principiante_a_Intermedio-orange?style=for-the-badge)]()
[![Licencia: MIT](https://img.shields.io/badge/Licencia-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<p align="center">
  <b>Un repositorio vivo construido por y para la comunidad.</b><br>
  Aprende haciendo, rompe cosas sin miedo en tu entorno local y haz tu primer aporte al Open Source.
</p>

[🎮 Simulador Interactivo K8s](https://htmlpreview.github.io/?https://github.com/edwinbermudez91/Fundamentos-Kubernetes/blob/main/recursos/simulador-interactivo-kubernetes.html) •
[📊 Diapositivas (PDF)](./recursos/diapositivas/README.md) •
[☕ Analogía KubeCafé](./recursos/de-un-tinto-a-kubernetes.md) •
[⚓ Guía de Harbor](./recursos/guia-harbor-registry.md) •
[🛡️ Guía de Trivy](./recursos/guia-trivy-seguridad.md) •
[🤖 Guía de Ollama](./recursos/guia-ollama-ia-local.md) •
[🚀 Empezar Ahora](#paso-0-prepara-tu-laboratorio) •
[🗺️ Mapa de Ruta](#️-mapa-de-ruta) •
[🏆 Rangos y Premios](#-rangos-de-navegación-y-puntaje-gamificación) •
[🎁 Patrocinadores](#-patrocinadores-y-premios) •
[🤝 Cómo Contribuir](#-cómo-contribuir-al-repositorio)

</div>

---

> [!TIP]
> **¿Es tu primera vez usando GitHub o Kubernetes?** ¡Estás en el lugar correcto! Tu primera misión toma solo 30 segundos: regístrate en el [**Muro de Asistentes (`ASISTENTES.md`)**](./ASISTENTES.md) usando nuestro [**⛵ Formulario Visual de Registro**](https://github.com/edwinbermudez91/Fundamentos-Kubernetes/issues/new?template=registro-asistente.yml).

> [!NOTE]
> ☕ **Hilo Conductor del Workshop — KubeCafé (La Analogía del Café):**  
> Todo lo que aprenderás desde la **Semana 00** hasta la **Semana 06** está conectado mediante la operación de una cafetería de especialidad de alta escala (**KubeCafé**).  
> * 🎮 **Simulador Interactivo paso a paso:** [**Abrir Simulador en el Navegador**](https://htmlpreview.github.io/?https://github.com/edwinbermudez91/Fundamentos-Kubernetes/blob/main/recursos/simulador-interactivo-kubernetes.html) *(o descarga [`recursos/simulador-interactivo-kubernetes.html`](./recursos/simulador-interactivo-kubernetes.html))*  
> * 📖 Guía interactiva con diagramas y retos: [**☕ Kubernetes explicado con la Analogía del Café (`de-un-tinto-a-kubernetes.md`)**](./recursos/de-un-tinto-a-kubernetes.md)  
> * 📊 Presentaciones en PDF: [**🐳 Semana 00 — Fundamentos de Docker**](./recursos/diapositivas/0.Fundamentos-Docker.pdf) | [**☕ Semana 01 — KubeCafé: De Docker a Kubernetes**](./recursos/diapositivas/1.KubeCafe-De-Docker-a-Kubernetes.pdf)

> [!IMPORTANT]
> 📢 **¿Hiciste Fork de este repositorio antes?**  
> El repositorio ha sido actualizado recientemente con los nuevos contenidos de Docker y mejoras en las plantillas. **Por favor sincroniza tu copia** entrando a tu repositorio en GitHub y haciendo clic en el botón **"Sync fork" ➔ "Update branch"** (o en tu terminal con `git pull origin main`).

---

## 🗺️ Mapa de Ruta (Conectado con ☕ KubeCafé)

Así evolucionaremos paso a paso desde el grano de café empaquetado con Docker hasta inaugurar una franquicia completa en Kubernetes:

```mermaid
flowchart LR
    S0["🐳 Semana 0\nFundamentos de Docker\n(🌱 Grano → 📦 Bolsa → ☕ Taza)"] --> S1["🌱 Semana 1\nArquitectura y Pods\n(🍽️ Bandeja, 🪵 Mesas y 🏢 Gerencia)"]
    S1 --> S2["🔄 Semana 2\nDeployments y Réplicas\n(🧐 Supervisor y Auto-Curación)"]
    S2 --> S3["🌐 Semana 3\nServices e Ingress\n(🤵 Mesero y 🚪 Anfitriona)"]
    S3 --> S4["💾 Semana 4\nConfigMaps, Secrets y PV\n(🧂 Especias, 🔐 Caja Fuerte y 🏬 Bodega)"]
    S4 --> S5["🛡️ Semana 5\nProbes, Recursos y RBAC\n(🌡️ Termómetro, ⚖️ Agua y 🪪 Carnets)"]
    S5 --> S6["🚀 Semana 6\nHelm y Proyecto Final\n(🍱 Kit de Franquicia)"]

    style S0 fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#000
    style S1 fill:#e1f5fe,stroke:#0288d1,stroke-width:2px,color:#000
    style S2 fill:#e1f5fe,stroke:#0288d1,stroke-width:2px,color:#000
    style S3 fill:#e8f5e9,stroke:#388e3c,stroke-width:2px,color:#000
    style S4 fill:#e8f5e9,stroke:#388e3c,stroke-width:2px,color:#000
    style S5 fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#000
    style S6 fill:#fce4ec,stroke:#c2185b,stroke-width:2px,color:#000
```

| Semana | Módulo | Equivalente en ☕ KubeCafé | Lo que vas a dominar | Estado |
| :---: | :--- | :--- | :--- | :---: |
| **00** | [**De Código a Contenedor con Docker**](./semana-00-fundamentos-docker) | 🌱 Grano → 📜 Receta → 📦 Bolsa sellada → ☕ Taza servida | `Dockerfile`, imágenes OCI, ciclo de vida de contenedores y puente a Kind/K8s. | 🟢 Disponible |
| **01** | [**El motor por dentro y tu primer Pod**](./semana-01-arquitectura) | 🍽️ Bandeja (`Pod`), 🪵 Mesas (`Nodes`), 👨‍🍳 Barista (`kubelet`) y 🏢 Gerencia | Control Plane vs. Nodos, `kubectl` (imperativo/declarativo) y Pods en YAML. | 🟢 Disponible |
| **02** | [**Despliegues sin caídas y autorreparación**](./semana-02-deployments) | 🧐 Supervisor (`Controller Manager`) y 📝 Orden de Producción | ReplicaSets, Deployments, *Self-healing*, *Rolling Updates* y *Rollbacks*. | 🟢 Disponible |
| **03** | [**Conectando todo: Redes en K8s**](./semana-03-redes) | 🤵 Mesero de barra fija (`Service`) y 🚪 Anfitriona (`Ingress`) | Comunicación interna y externa: `ClusterIP`, `NodePort` e `Ingress`. | 🔜 Próximamente |
| **04** | [**Configuración y Datos Persistentes**](./semana-04-almacenamiento) | 🧂 Especias (`ConfigMap`), 🔐 Caja fuerte (`Secret`) y 🏬 Bodega (`PV`) | Desacoplar configuración con `ConfigMaps`, `Secrets` y volúmenes (`PVC`). | 🔜 Próximamente |
| **05** | [**Salud, Límites y Seguridad Básica**](./semana-05-operacion-seguridad) | 🌡️ Termómetro (`Probes`), ⚖️ Dosificador (`Limits`) y 🪪 Carnets (`RBAC`) | `Liveness/Readiness Probes`, límites de CPU/RAM y permisos con `RBAC`. | 🔜 Próximamente |
| **06** | [**Empaquetado con Helm y Proyecto Final**](./semana-06-proyecto-final) | 🍱 Kit de Franquicia (`Helm Chart`) para abrir sucursales | Creación de Charts básicos y despliegue de una app completa de 3 capas. | 🔜 Próximamente |

<details>
<summary><b>☕ Desplegar Vista Rápida de KubeCafé (Tabla de Correspondencia y Glosario Cafetero)</b></summary>
<br>

> 💡 **Glosario rápido de términos cafeteros usados en la analogía:**
> * **👨‍🍳 Barista:** La persona experta que prepara el café detrás de la barra y opera la cafetera (representa al **`kubelet`**).
> * **🪵 Barismo / Mesa de barismo:** El *barismo* es el oficio de preparar café de calidad; la *mesa de barismo* es el mesón o estación de trabajo con agua (**RAM**) y molinos (**CPU**) donde trabaja el barista (representa un **`Worker Node`**).
> * **📜 Tostador:** Quien cocina con calor (*tuesta*) y tritura (*muele*) el grano crudo para que quede listo para preparar (el proceso de **`docker build`** con tu **`Dockerfile`**).
> * **🧾 Comanda:** El papelito u orden escrita donde se anota qué pidió el cliente en un restaurante (representa tu archivo **`.yaml`**).
> * **📦 Inmutable:** Sellado de fábrica; no se puede abrir para modificar su contenido, sino que se fabrica un paquete nuevo con otra etiqueta (`v2`).

| Concepto Técnico | Analogía del Café | ¿Cuál es su función? |
| :--- | :--- | :--- |
| **Código Fuente** | 🌱 Grano verde / crudo | Tu receta original y lógica de negocio. |
| **Dockerfile** | 📜 Receta del tostador | Pasos exactos para tostar, moler y empacar. |
| **Imagen Docker** | 📦 Bolsa de café sellada | Paquete inmutable, listo para distribuir en cualquier sucursal. |
| **Contenedor** | ☕ Taza de café servida | La bebida lista y ejecutándose en memoria/CPU. |
| **Pod** | 🍽️ Bandeja de servicio | Unidad mínima: taza de café principal + vaso de agua (*Sidecar*). |
| **Worker Node** | 🪵 Mesa de barismo | Estación de trabajo con agua (RAM) y molinos (CPU). |
| **Kubelet** | 👨‍🍳 Barista de la mesa | Recibe órdenes de gerencia y cuida que las tazas no se enfríen. |
| **Control Plane** | 🏢 Oficina de Gerencia | Coordina toda la cafetería sin servir café directamente. |
| **kube-apiserver** | 🛎️ Caja / Mostrador | Ventanilla única: todos los pedidos y comandos entran aquí. |
| **etcd** | 📖 Libro contable | Registro absoluto e inmutable de comandas, recetas y mesas. |
| **kube-scheduler** | 📋 Despachador de mesas | Mira qué mesa tiene molino y agua libre para poner la taza. |
| **Controller Manager** | 🧐 Supervisor de salón | Si una taza se derrama, ordena preparar otra inmediatamente. |
| **Service** | 🤵 Mesero de barra fija | Atiende a los clientes con un menú fijo sin importar la taza concreta. |
| **Ingress** | 🚪 Puerta y Anfitriona | Recibe gente de la calle y los encamina según lo que piden (`/frio`, `/postres`). |
| **ConfigMap** | 🧂 Azúcar y especias | Ajusta el sabor sin cambiar la receta sellada de la bolsa. |
| **Secret** | 🔐 Caja fuerte con llaves | Recetas secretas y contraseñas de la caja guardadas bajo llave. |
| **Persistent Volume** | 🏬 Bodega externa | Sacos de café permanentes que no se pierden si se cae una taza. |

👉 [**Abrir la Guía Completa e Interactiva de KubeCafé con Diagramas y Trivia (`recursos/de-un-tinto-a-kubernetes.md`)**](./recursos/de-un-tinto-a-kubernetes.md)
</details>

---

<a id="paso-0-prepara-tu-laboratorio"></a>

## 🛠️ Paso 0: Prepara tu Laboratorio

No necesitas tarjeta de crédito ni cuentas en la nube; todo corre en tu computador. Haz clic abajo según lo que quieras revisar:

<details>
<summary><b>💻 Ver herramientas necesarias (Checklist antes de la Clase 1)</b></summary>
<br>

1. **Contenedores:** [Docker Desktop](https://www.docker.com/products/docker-desktop/) o Docker Engine corriendo.
2. **Clúster Local:** [Kind](https://kind.sigs.k8s.io/) (recomendado por ligero) o [Minikube](https://minikube.sigs.k8s.io/).
3. **Cliente CLI:** [kubectl](https://kubernetes.io/es/docs/tasks/tools/) instalado.
4. **Editor:** [VS Code](https://code.visualstudio.com/) con la extensión oficial de **YAML** y **Kubernetes**.
5. **Gestor de Paquetes:** [Helm](https://helm.sh/) (para desplegar complementos y la consola visual [Headlamp](https://headlamp.dev/)).

👉 *¿Tienes problemas instalando alguno? Entra a [`0.prepara-tu-laboratorio`](./semana-01-arquitectura/0.prepara-tu-laboratorio) para ver guías paso a paso y plantillas de Kind.*
</details>

<details>
<summary><b>⚡ Prueba rápida: ¿Cómo sé si mi computador ya está listo?</b></summary>
<br>

Abre tu terminal y ejecuta estos comandos. Si te responden una versión sin errores, ¡estás listo para despegar!

```bash
docker --version
kind --version   # o minikube version
kubectl version --client
helm version
```
</details>

<details>
<summary><b>🌐 ¿Tu computador tiene pocos recursos? (Laboratorios interactivos en el navegador)</b></summary>
<br>

Si no puedes instalar Docker Desktop o tu máquina no tiene suficiente memoria RAM para levantar clústeres locales, puedes realizar ejercicios interactivos gratuitos directamente desde el navegador en **KodeKloud Studio**:

* 🐳 **Ejercicios de Docker:** [KodeKloud Studio — Docker Labs](https://kodekloud.com/studio/labs/docker)
* ☸️ **Ejercicios de Kubernetes:** [KodeKloud Studio — Kubernetes Labs](https://kodekloud.com/studio/labs/kubernetes)

*(No requieren tarjeta de crédito ni instalación local; incluyen terminal lista en la nube).*
</details>

---

<!-- INICIO_MOSAICO_TRIPULACION -->
## 👥 Tripulación a Bordo y Ranking (48 Tripulantes)

<div align="center">

[![Tripulantes a Bordo](https://img.shields.io/badge/⛵_Tripulantes_a_Bordo-48-00C7B7?style=for-the-badge)](./ASISTENTES.md)
[![Registrarme en 30 seg](https://img.shields.io/badge/➕_¡Regístrate_Aquí!_(Formulario_Visual)-2ea44f?style=for-the-badge&logo=github)](https://github.com/edwinbermudez91/Fundamentos-Kubernetes/issues/new?template=registro-asistente.yml)
[![Actualizar mis Datos](https://img.shields.io/badge/✏️_Actualizar_mis_Datos_o_Redes-f57c00?style=for-the-badge&logo=github)](https://github.com/edwinbermudez91/Fundamentos-Kubernetes/issues/new?template=registro-asistente.yml)
[![Ver Ranking Completo](https://img.shields.io/badge/🏆_Ver_Tabla_de_Puntajes_y_Redes-326CE5?style=for-the-badge)](./ASISTENTES.md)

### 👨‍🏫 Capitán y Colaboradores de la Nave

<table>
  <tr>
    <td align="center" width="150">
      <a href="https://www.linkedin.com/in/edwin-bermudez-cuervo" title="Edwin Bermúdez (@edwinbermudez91)">
        <img src="https://github.com/edwinbermudez91.png?size=100" width="68" height="68" style="border-radius: 50%;" alt="edwinbermudez91"/><br/>
        <sub><b>Edwin Bermúdez</b></sub>
      </a><br/>
      <sub>⚓ Capitán • Instructor</sub>
    </td>
    <td align="center" width="150">
      <a href="https://www.linkedin.com/in/santiago-bedoya-diaz/" title="Santiago Bedoya Díaz (@Santiago1023)">
        <img src="https://github.com/Santiago1023.png?size=100" width="68" height="68" style="border-radius: 50%;" alt="Santiago1023"/><br/>
        <sub><b>Santiago Bedoya</b></sub>
      </a><br/>
      <sub>🤝 Colaborador</sub>
    </td>
    <td align="center" width="150">
      <a href="https://www.linkedin.com/in/valentina-p-86b3b913a/" title="Valentina Pinzón Montoya (@vdevalen)">
        <img src="https://github.com/vdevalen.png?size=100" width="68" height="68" style="border-radius: 50%;" alt="vdevalen"/><br/>
        <sub><b>Valentina Pinzón</b></sub>
      </a><br/>
      <sub>🤝 Colaboradora</sub>
    </td>
    <td align="center" width="150">
      <a href="https://www.linkedin.com/in/andresqb198/" title="Andrés Quintero Bedoya (@andresqb198)">
        <img src="https://github.com/andresqb198.png?size=100" width="68" height="68" style="border-radius: 50%;" alt="andresqb198"/><br/>
        <sub><b>Andrés Quintero</b></sub>
      </a><br/>
      <sub>🤝 Colaborador</sub>
    </td>
    <td align="center" width="150">
      <a href="https://www.linkedin.com/in/karengonzalezanalista/" title="Karen González (@Ka1999)">
        <img src="https://github.com/Ka1999.png?size=100" width="68" height="68" style="border-radius: 50%;" alt="Ka1999"/><br/>
        <sub><b>Karen González</b></sub>
      </a><br/>
      <sub>🤝 Colaboradora</sub>
    </td>
  </tr>
</table>

### 🏆 Ranking de la Tripulación (48 Tripulantes)

<table>
  <tr>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/juandavidcorrales/" title="David Corrales (@devdavco) — 60 XP">
        <img src="https://github.com/devdavco.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="devdavco"/><br/>
        <sub><b>🥇 David Corrales</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>60 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/carlos-andres-montoya-alzate-044ba433" title="Carlos Andres Montoya Alzate (@calichem26) — 60 XP">
        <img src="https://github.com/calichem26.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="calichem26"/><br/>
        <sub><b>🥈 Carlos Andres</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>60 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://github.com/karolrojas68" title="Karol Rojas (@karolrojas68) — 60 XP">
        <img src="https://github.com/karolrojas68.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="karolrojas68"/><br/>
        <sub><b>🥉 Karol Rojas</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>60 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/juan-jose-jaramillo-a8966123a/" title="Juan Jose Jaramillo (@jujo23z) — 60 XP">
        <img src="https://github.com/jujo23z.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="jujo23z"/><br/>
        <sub><b>Juan Jose</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>60 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/stiven-munera-quintero-80151721a/" title="Stiven Munera (@StivenMunera) — 60 XP">
        <img src="https://github.com/StivenMunera.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="StivenMunera"/><br/>
        <sub><b>Stiven Munera</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>60 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/johan-andres-lopez-zuluaga" title="Johan Andrés López Zuluaga (@parte193) — 60 XP">
        <img src="https://github.com/parte193.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="parte193"/><br/>
        <sub><b>Johan Andrés</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>60 XP</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/juan-josé-gonzález-rosales-40a4a8203?utm_source=share_via&utm_content=profile&utm_medium=member_android" title="Juan José González Rosales (@juanjosegonzalezrosales) — 60 XP">
        <img src="https://github.com/juanjosegonzalezrosales.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="juanjosegonzalezrosales"/><br/>
        <sub><b>Juan José</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>60 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/raymundo-avila-r-04775932" title="Fernando Avila (@RAVILA28) — 60 XP">
        <img src="https://github.com/RAVILA28.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="RAVILA28"/><br/>
        <sub><b>Fernando Avila</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>60 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://linkedin.com/in/maria-nathali-anzola" title="Nathali Anzola (@marnathali) — 60 XP">
        <img src="https://github.com/marnathali.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="marnathali"/><br/>
        <sub><b>Nathali Anzola</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>60 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/glgaviria" title="Gloria Gaviria (@glgaviria64) — 30 XP">
        <img src="https://github.com/glgaviria64.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="glgaviria64"/><br/>
        <sub><b>Gloria Gaviria</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>30 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/didierendon" title="Didier Alexander Rendón Chaverra (@DrSiker) — 20 XP">
        <img src="https://github.com/DrSiker.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="DrSiker"/><br/>
        <sub><b>Didier Alexander</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>20 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/cristian-camilo-sanchez-bermudez" title="Cristian Sanchez (@ccsanchezb04) — 10 XP">
        <img src="https://github.com/ccsanchezb04.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="ccsanchezb04"/><br/>
        <sub><b>Cristian Sanchez</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/luis-tapasco/" title="Luis Tapasco (@Luistapasco) — 10 XP">
        <img src="https://github.com/Luistapasco.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="Luistapasco"/><br/>
        <sub><b>Luis Tapasco</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/dlapaz" title="Eduardo D. La paz (@VivaGarp) — 10 XP">
        <img src="https://github.com/VivaGarp.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="VivaGarp"/><br/>
        <sub><b>Eduardo D.</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/pvargasrodriguez/" title="Paola Vargas (@ypaolavar) — 10 XP">
        <img src="https://github.com/ypaolavar.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="ypaolavar"/><br/>
        <sub><b>Paola Vargas</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/jeraldin-caliz/" title="Jeraldin Caliz (@Jera26) — 10 XP">
        <img src="https://github.com/Jera26.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="Jera26"/><br/>
        <sub><b>Jeraldin Caliz</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://linkedin.com/in/kevindazar" title="Kevin Daza (@kevindazardev) — 10 XP">
        <img src="https://github.com/kevindazardev.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="kevindazardev"/><br/>
        <sub><b>Kevin Daza</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/jcrvillamizar" title="Juan Carlos Rodriguez Villamizar (@jcrvillamizar) — 10 XP">
        <img src="https://github.com/jcrvillamizar.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="jcrvillamizar"/><br/>
        <sub><b>Juan Carlos</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/airy-nc/" title="Airy Nieves (@aiops88) — 10 XP">
        <img src="https://github.com/aiops88.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="aiops88"/><br/>
        <sub><b>Airy Nieves</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://linkedin.com/in/dupegui" title="David Upegui (@DavidUpegui) — 10 XP">
        <img src="https://github.com/DavidUpegui.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="DavidUpegui"/><br/>
        <sub><b>David Upegui</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/ymqc01" title="Yeison Mateo Quintero Carmona (@mateoqc123) — 10 XP">
        <img src="https://github.com/mateoqc123.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="mateoqc123"/><br/>
        <sub><b>Yeison Mateo</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/diego-mona/" title="Diego Moná (@Hedache77) — 10 XP">
        <img src="https://github.com/Hedache77.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="Hedache77"/><br/>
        <sub><b>Diego Moná</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/JhonnyPong/" title="Jhonnatan Gil (@jthan24) — 10 XP">
        <img src="https://github.com/jthan24.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="jthan24"/><br/>
        <sub><b>Jhonnatan Gil</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://linkedin.com/in/danielestebanosoriodavid/" title="Daniel Esteban (@da237) — 10 XP">
        <img src="https://github.com/da237.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="da237"/><br/>
        <sub><b>Daniel Esteban</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/yorman-agudelo/" title="Yorman Agudelo (@Cuburi) — 10 XP">
        <img src="https://github.com/Cuburi.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="Cuburi"/><br/>
        <sub><b>Yorman Agudelo</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/giovanigonzalogarzonsegura-cloudarchitect" title="Gonzalo Garzon (@ggarzons) — 10 XP">
        <img src="https://github.com/ggarzons.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="ggarzons"/><br/>
        <sub><b>Gonzalo Garzon</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://linkedin.com/in/maria-camila-zapata-arrubla-a594041b1/" title="Maria Camila Zapata Arrubla (@Camilaux) — 10 XP">
        <img src="https://github.com/Camilaux.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="Camilaux"/><br/>
        <sub><b>Maria Camila</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://linkedin.com/in/cristian-gonzalez-9b646a265/" title="Cristian Gonzalez (@CristianCGonzalezO) — 10 XP">
        <img src="https://github.com/CristianCGonzalezO.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="CristianCGonzalezO"/><br/>
        <sub><b>Cristian Gonzalez</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://linkedin.com/in/santiagoasz/" title="Santiago Sanchez (@santiagoalex) — 10 XP">
        <img src="https://github.com/santiagoalex.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="santiagoalex"/><br/>
        <sub><b>Santiago Sanchez</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://github.com/sanjavier88" title="Jorge Alberto Monsalve Ruiz (@sanjavier88) — 10 XP">
        <img src="https://github.com/sanjavier88.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="sanjavier88"/><br/>
        <sub><b>Jorge Alberto</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/mao-correa/" title="Hector Mauricio Forero Correa (@maocorrea1015) — 10 XP">
        <img src="https://github.com/maocorrea1015.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="maocorrea1015"/><br/>
        <sub><b>Hector Mauricio</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/wilfredo-gonzalez-ortiz-5718a2161/" title="Wilfredo Gonzalez (@wilfredogonzalez05) — 10 XP">
        <img src="https://github.com/wilfredogonzalez05.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="wilfredogonzalez05"/><br/>
        <sub><b>Wilfredo Gonzalez</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://github.com/Danielgiraldo2010" title="Daniel Giraldo (@Danielgiraldo2010) — 10 XP">
        <img src="https://github.com/Danielgiraldo2010.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="Danielgiraldo2010"/><br/>
        <sub><b>Daniel Giraldo</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://linkedin.com/in/emmanuel-uribe-89890525a" title="Emmanuel Uribe (@emmanuel-uribe) — 10 XP">
        <img src="https://github.com/emmanuel-uribe.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="emmanuel-uribe"/><br/>
        <sub><b>Emmanuel Uribe</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/david-garcia-51597469/" title="David García (@manuonda) — 10 XP">
        <img src="https://github.com/manuonda.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="manuonda"/><br/>
        <sub><b>David García</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/jcgiraldogo/" title="Camilo Giraldo (@Camilogigom) — 10 XP">
        <img src="https://github.com/Camilogigom.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="Camilogigom"/><br/>
        <sub><b>Camilo Giraldo</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/mateo-orozco-cano-21bb90437/" title="Mateo Orozco Cano (@MateoOrozcoCano) — 10 XP">
        <img src="https://github.com/MateoOrozcoCano.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="MateoOrozcoCano"/><br/>
        <sub><b>Mateo Orozco</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://github.com/SirJulianM3003" title="Julián Esteban Madrid (@SirJulianM3003) — 10 XP">
        <img src="https://github.com/SirJulianM3003.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="SirJulianM3003"/><br/>
        <sub><b>Julián Esteban</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/edwinalexanderrg" title="Edwin Restrepo (@edwin8855) — 10 XP">
        <img src="https://github.com/edwin8855.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="edwin8855"/><br/>
        <sub><b>Edwin Restrepo</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://github.com/MiguelCeballos944" title="Miguel ceballos (@MiguelCeballos944) — 10 XP">
        <img src="https://github.com/MiguelCeballos944.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="MiguelCeballos944"/><br/>
        <sub><b>Miguel ceballos</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/manuela-orozco-jimenez/" title="Manuela Orozco Jimenez (@ManuelaOJ) — 10 XP">
        <img src="https://github.com/ManuelaOJ.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="ManuelaOJ"/><br/>
        <sub><b>Manuela Orozco</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/camilo-rendon-3671a0208/" title="Camilo Rendon (@camilorendon08) — 10 XP">
        <img src="https://github.com/camilorendon08.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="camilorendon08"/><br/>
        <sub><b>Camilo Rendon</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/sergio-andres-garcia-jaramillo" title="Sergio Andres Garcia Jaramillo (@sergiogarciaj01) — 10 XP">
        <img src="https://github.com/sergiogarciaj01.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="sergiogarciaj01"/><br/>
        <sub><b>Sergio Andres</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/yepesd/" title="Juan D Yepes (@yepesd86) — 10 XP">
        <img src="https://github.com/yepesd86.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="yepesd86"/><br/>
        <sub><b>Juan D</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/josedavid9316/" title="Jose David Moncada Arango (@josedavid9316) — 10 XP">
        <img src="https://github.com/josedavid9316.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="josedavid9316"/><br/>
        <sub><b>Jose David</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/juan-diego-alvarado-gantiva-7801a816a/" title="Juan Diego Alvarado (@juand-alvarado) — 10 XP">
        <img src="https://github.com/juand-alvarado.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="juand-alvarado"/><br/>
        <sub><b>Juan Diego</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://github.com/YimmyZuluaga" title="Yimmy Zuluaga (@YimmyZuluaga) — 10 XP">
        <img src="https://github.com/YimmyZuluaga.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="YimmyZuluaga"/><br/>
        <sub><b>Yimmy Zuluaga</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
    <td align="center" width="140">
      <a href="https://www.linkedin.com/in/eandreaja/" title="Andrea Jaramillo (@eandreaja) — 10 XP">
        <img src="https://github.com/eandreaja.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="eandreaja"/><br/>
        <sub><b>Andrea Jaramillo</b></sub>
      </a><br/>
      <sub>⛵ Marinero • <b>10 XP</b></sub>
    </td>
  </tr>
</table>

<sub>💡 <b>¿Aún no apareces aquí o quieres actualizar tu LinkedIn/Redes?</b> Haz clic en <a href="https://github.com/edwinbermudez91/Fundamentos-Kubernetes/issues/new?template=registro-asistente.yml"><b>➕ Registrarme / ✏️ Actualizar mis Datos</b></a> y nuestro bot actualizará tu tarjeta automáticamente en 15 segundos.</sub>

</div>
<!-- FIN_MOSAICO_TRIPULACION -->

---

## 🏆 Rangos de Navegación y Puntaje (Gamificación)

En cada carpeta semanal encontrarás una subcarpeta llamada **`2.reto-roto/`**. Son manifiestos y escenarios con errores de la vida real puestos a propósito. 

A medida que envíes tus Pull Requests (PRs) resolviendo los retos rotos de cada semana, nuestro bot validará que cada archivo corresponda al ejercicio real y sumará **+10 XP por cada reto roto solucionado** en la tabla de posiciones de [`ASISTENTES.md`](./ASISTENTES.md):

* ⛵ **Marinero (10 XP base):** Te registraste en el Muro de la Tripulación en `ASISTENTES.md` (+10 XP adicionales por cada reto roto validado).
* 🧭 **Timonel (2+ Semanas Completadas al 100%):** Resolviste y validaste **todos** los ejercicios de los *Retos Rotos* de al menos 2 semanas (`5/5` en Semana 00, `4/4` en Semana 01, etc.).
* ⚓ **Capitán K8s (6 Semanas Completadas al 100%):** Dominas la navegación del clúster, completaste todos los retos de las 6 semanas y el proyecto final.

---

## 🎁 Patrocinadores y Premios

Gracias al apoyo de nuestros aliados y patrocinadores, los tripulantes más destacados en la **Tabla de Posiciones (XP)** que completen los retos semanales participarán por premios e incentivos especiales para impulsar su carrera profesional y técnica:

<div align="center">

| 🏛️ Fundación Antivirus para la Deserción | 🧪 iximiuz Labs |
| :---: | :---: |
| [![Fundación Antivirus para la Deserción](https://img.shields.io/badge/Fundación_Antivirus_para_la_Deserción-Impulso_Educativo_y_Talento-0A66C2?style=for-the-badge)](https://www.fundacionantivirusparaladesercion.org/es) | [![iximiuz Labs](https://img.shields.io/badge/iximiuz_Labs-Laboratorios_Cloud_Native_Interactivos-2ea44f?style=for-the-badge)](https://labs.iximiuz.com/) |
| Acompañamiento, mentoría y oportunidades para potenciar la permanencia estudiantil y el crecimiento profesional.<br>👉 **[fundacionantivirusparaladesercion.org/es](https://www.fundacionantivirusparaladesercion.org/es)** | Plataforma interactiva de laboratorios prácticos en contenedores, Linux, Kubernetes y DevOps.<br>👉 **[labs.iximiuz.com](https://labs.iximiuz.com/)** |

</div>

---

## 🤝 ¿Cómo contribuir al repositorio?

Hay muchas formas de sumar a la comunidad (¡no todo es código!):

- 🐛 **Caza errores en los Retos Rotos:** Sube tu solución en [`aportes-comunidad/soluciones-retos/`](./aportes-comunidad/soluciones-retos).
- 📝 **Mejora las explicaciones:** ¿Encontraste una analogía genial en clase? Agrégala al `README.md` de esa semana.
- 🧰 **Alimenta los Cheatsheets:** Comparte tus alias, trucos o comandos favoritos en [`aportes-comunidad/cheatsheets/`](./aportes-comunidad/cheatsheets).
- 🙋 **Toma un Issue:** Revisa la pestaña de [**Issues**](https://github.com/edwinbermudez91/Fundamentos-Kubernetes/issues) con la etiqueta `good first issue`.

📖 **Lee aquí el paso a paso ilustrado: [`CONTRIBUTING.md`](./CONTRIBUTING.md)**

---

<div align="center">
  Hecho con ❤️ y mucho ☕ por la comunidad de <b>Cloud Native Medellín</b>
</div>