# 🛠️ Prepara tu Laboratorio de Kubernetes — Semana 01

¡Bienvenido a la guía de alistamiento de tu entorno local! Aquí dejarás listas las herramientas esenciales de todo ingeniero Cloud Native: **`kubectl`**, **`kind`**, **`kubectx` / `kubens`**, **`k9s`**, **`stern`** y **`Headlamp`**.

> [!TIP]
> **¿No puedes instalar Docker o Kind en tu computador?**  
> Si tu equipo tiene recursos limitados de RAM/CPU o restricciones en tu sistema operativo, puedes practicar de forma 100% gratuita desde tu navegador con terminales interactivas en la nube:
> * 🧪 **iximiuz Labs (Playgrounds de Linux, Docker y K8s):** [labs.iximiuz.com](https://labs.iximiuz.com/)
> * 🐳 **Laboratorios de Docker:** [KodeKloud Studio — Docker Labs](https://kodekloud.com/studio/labs/docker)
> * ☸️ **Laboratorios de Kubernetes:** [KodeKloud Studio — Kubernetes Labs](https://kodekloud.com/studio/labs/kubernetes)

---

## 📑 Índice Rápido

1. [☸️ Paso 1: Instalar `kubectl` y Documentación Oficial de Kubernetes](#-paso-1-instalar-kubectl-y-documentación-oficial-de-kubernetes)
2. [🐳 Paso 2: ¿Qué es Kind y cómo crear tu Clúster Local?](#-paso-2-qué-es-kind-y-cómo-crear-tu-clúster-local)
3. [🛠️ Paso 3: Personalizando tu Clúster de Kind con YAML (Multi-Nodo, Cilium e Ingress)](#️-paso-3-personalizando-tu-clúster-de-kind-con-yaml)
4. [🧰 Paso 4: Kit de Supervivencia CLI (`kubectx`, `kubens`, `k9s` y `stern`)](#-paso-4-kit-de-supervivencia-cli-kubectx-kubens-k9s-y-stern)
   - [🔀 `kubectx` y `kubens`: Cambia de clúster y namespace en 1 segundo](#-1-kubectx-y-kubens--el-control-remoto-de-clústeres-y-namespaces)
   - [🐶 `k9s`: Panel de control interactivo en tu terminal](#-2-k9s--el-panel-de-control-interactivo-en-tu-terminal)
   - [📢 `stern`: Logs de múltiples Pods en tiempo real y a color](#-3-stern--el-megáfono-de-logs-multi-pod-en-tiempo-real)
5. [🖥️ Paso 5: Consola Visual Open Source — Headlamp](#️-paso-5-consola-visual-open-source--headlamp)

---

## ☸️ Paso 1: Instalar `kubectl` y Documentación Oficial de Kubernetes

**`kubectl`** (*Kube Control*) es la herramienta oficial de línea de comandos de Kubernetes. Es el "control remoto" con el que te comunicas con el **API Server** del clúster para desplegar Pods, inspeccionar logs y diagnosticar problemas.

### 📚 Documentación Oficial de Kubernetes (Guárdala en tus favoritos)
* 🌐 **Documentación Principal de Kubernetes (Español):** [https://kubernetes.io/es/docs/home/](https://kubernetes.io/es/docs/home/)
* 🛠️ **Guía Oficial de Instalación de Herramientas (`kubectl`):** [https://kubernetes.io/es/docs/tasks/tools/](https://kubernetes.io/es/docs/tasks/tools/)
* ⚡ **Cheat Sheet Oficial de `kubectl` (Referencia Rápida):** [https://kubernetes.io/es/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/es/docs/reference/kubectl/cheatsheet/)
* 📖 **Referencia de Comandos `kubectl`:** [https://kubernetes.io/docs/reference/kubectl/](https://kubernetes.io/docs/reference/kubectl/)

---

### 💻 Cómo instalar `kubectl` según tu Sistema Operativo

<details open>
<summary><b>🍏 macOS (Homebrew o Binario Oficial)</b></summary>
<br>

**Opción A — Con Homebrew (Recomendada):**
```bash
brew install kubectl
```

**Opción B — Descarga directa del binario oficial (Apple Silicon M1/M2/M3/M4):**
```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/darwin/arm64/kubectl"
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl
```
</details>

<details>
<summary><b>🐧 Linux (Ubuntu / Debian / Fedora / Binario Oficial)</b></summary>
<br>

**Opción A — Descarga directa del binario oficial (x86_64 / AMD64):**
```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
rm kubectl
```
*(Si usas arquitectura ARM64 en Linux, cambia `linux/amd64` por `linux/arm64`).*

**Opción B — Con paquete `apt` (Ubuntu / Debian):**
```bash
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.32/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.32/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubectl
```
</details>

<details>
<summary><b>🪟 Windows (Winget, Chocolatey o PowerShell)</b></summary>
<br>

Abre **PowerShell como Administrador** y ejecuta una de las siguientes opciones:

```powershell
# Opción A: Con Windows Package Manager (Winget)
winget install -e --id Kubernetes.kubectl

# Opción B: Con Chocolatey
choco install kubernetes-cli
```
*(Nota: Si ya tienes instalado **Docker Desktop** en Windows o macOS, `kubectl` ya viene incluido automáticamente).*
</details>

---

### ✅ Verificar la instalación y activar el alias `k`

1. Comprueba que `kubectl` responda correctamente:
   ```bash
   kubectl version --client
   ```
2. **Truco de velocidad profesional:** Configura el alias `k` para no escribir `kubectl` completo cientos de veces:
   ```bash
   # En Zsh (macOS / Linux):
   echo 'alias k=kubectl' >> ~/.zshrc && source ~/.zshrc

   # En Bash (Linux / Git Bash):
   echo 'alias k=kubectl' >> ~/.bashrc && source ~/.bashrc
   ```
   Ahora puedes escribir simplemente `k get pods` o `k get nodes`.

---

## 🐳 Paso 2: ¿Qué es Kind y cómo crear tu Clúster Local?

**Kind** significa **K**ubernetes **in** **D**ocker ([kind.sigs.k8s.io](https://kind.sigs.k8s.io/)).

Tradicionalmente, para tener un clúster de Kubernetes en tu computador necesitabas crear varias máquinas virtuales pesadas que consumían toda tu memoria RAM. **Kind hace trampa (de la buena):** simula cada servidor de Kubernetes (*Nodo*) usando un simple contenedor de Docker. Es súper rápido, ligero y se borra en segundos sin dejar basura en tu sistema.

### 📦 Cómo instalar Kind rápidamente

* **macOS:** `brew install kind`
* **Windows (PowerShell):** `winget install Kubernetes.kind` o `choco install kind`
* **Linux:**
  ```bash
  [ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.27.0/kind-linux-amd64
  [ $(uname -m) = aarch64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.27.0/kind-linux-arm64
  chmod +x ./kind && sudo mv ./kind /usr/local/bin/kind
  ```

### ⚡ Comandos básicos de Kind que usarás todos los días

```bash
# 1. Crear un clúster sencillo (1 solo nodo) con nombre personalizado
kind create cluster --name cnm-lab

# 2. Ver cuántos clústeres de Kind tienes creados
kind get clusters

# 3. Crear un clúster personalizado usando un archivo YAML (¡Lo haremos abajo!)
kind create cluster --name cnm-pro --config semana-01-arquitectura/0.prepara-tu-laboratorio/kind-multinode.yaml

# 4. Borrar un clúster cuando termines de practicar (libera tu RAM)
kind delete cluster --name cnm-lab
```

---

## 🛠️ Paso 3: Personalizando tu Clúster de Kind con YAML

Por defecto, Kind crea un solo servidor que hace de jefe (*Control Plane*) y obrero (*Worker*) al mismo tiempo. En esta carpeta tienes plantillas YAML para crear clústeres como en el mundo real:

<details>
<summary><b>📄 1. Clúster Multi-Nodo Estándar (1 Cerebro + 2 Obreros) — <code>kind-multinode.yaml</code></b></summary>
<br>

Ideal para ver cómo Kubernetes reparte tus Pods en distintos servidores usando el CNI estándar de Kind (`kindnet`). Funciona directamente de la caja sin pasos adicionales:

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  # El cerebro del clúster (Control Plane)
  - role: control-plane
  # Los servidores obreros donde correrán tus aplicaciones
  - role: worker
  - role: worker
```

**Cómo crearlo:**
```bash
kind create cluster --name cnm-multinodo --config semana-01-arquitectura/0.prepara-tu-laboratorio/kind-multinode.yaml
```
*En unos segundos todos tus nodos estarán automáticamente en estado `Ready`.*
</details>

<details>
<summary><b>🐝 2. Clúster Multi-Nodo con Cilium CNI (1 Cerebro + 2 Obreros) — <code>kind-cilium.yaml</code></b></summary>
<br>

**Cilium** es un plugin de red (CNI) de última generación impulsado por **eBPF** (tecnología que inyecta programas seguros directamente en el kernel de Linux sin tocar el código fuente). Proporciona conectividad de red de altísimo rendimiento, seguridad avanzada y observabilidad profunda para tus Pods.

### Manifiesto de Kind (`kind-cilium.yaml`):

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4

# Deshabilitamos el CNI por defecto (kindnet) para que Cilium tome el control
networking:
  disableDefaultCNI: true
  # Opcional: Reemplazo completo de kube-proxy mediante eBPF
  # kubeProxyMode: "none"

nodes:
  # El cerebro del clúster (Control Plane)
  - role: control-plane
  # Servidores obreros donde correrán los Pods y el agente de Cilium
  - role: worker
  - role: worker
```

### Paso a paso para crearlo e instalar Cilium:

#### 1. Crear el clúster con Kind:
```bash
kind create cluster --name cnm-cilium --config semana-01-arquitectura/0.prepara-tu-laboratorio/kind-cilium.yaml
```

> [!NOTE]
> **¿Por qué los nodos arrancan en estado `NotReady`?**  
> Al desactivar el CNI por defecto (`disableDefaultCNI: true`), los nodos no tienen un proveedor de red asignado aún. Es completamente normal que `kubectl get nodes` muestre `NotReady` hasta que Cilium quede instalado y asigne las redes a cada nodo.

#### 2. Instalar el CLI de Cilium (o usar Helm):

* **En macOS (Homebrew):**
  ```bash
  brew install cilium-cli
  ```
* **En Linux:**
  ```bash
  CILIUM_CLI_VERSION=$(curl -s https://raw.githubusercontent.com/cilium/cilium-cli/main/stable.txt)
  CLI_ARCH=amd64
  if [ "$(uname -m)" = "arm64" ]; then CLI_ARCH=arm64; fi
  curl -L --fail --remote-name-all https://github.com/cilium/cilium-cli/releases/download/${CILIUM_CLI_VERSION}/cilium-linux-${CLI_ARCH}.tar.gz
  sudo tar xzvfC cilium-linux-${CLI_ARCH}.tar.gz /usr/local/bin
  rm cilium-linux-${CLI_ARCH}.tar.gz
  ```
* *(Alternativa con Helm si no usas cilium-cli):*
  ```bash
  helm repo add cilium https://helm.cilium.io/
  helm repo update
  helm install cilium cilium/cilium --namespace kube-system
  ```

#### 3. Desplegar Cilium en el clúster:
```bash
cilium install
```

#### 4. Validar que todo esté verde (`Ready`):
```bash
# Espera a que los pods de Cilium estén listos
cilium status --wait

# Revisa tus nodos: ¡ahora todos deben estar en Ready!
kubectl get nodes
```

> [!TIP]
> Puedes validar la conectividad interna completa entre Pods ejecutando:
> ```bash
> cilium connectivity test
> ```

</details>

<details>
<summary><b>🌐 3. Clúster listo para Ingress (Puertos 80 y 443 abiertos) — <code>kind-ingress.yaml</code></b></summary>
<br>

Ideal para la **Semana 3 (Redes)**. Conecta los puertos `80` y `443` de tu computador directamente con el clúster para abrir tus aplicaciones en el navegador sin usar `port-forward`:

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
    kubeadmConfigPatches:
      - |
        kind: InitConfiguration
        nodeRegistration:
          kubeletExtraArgs:
            node-labels: "ingress-ready=true"
    extraPortMappings:
      - containerPort: 80
        hostPort: 80
        protocol: TCP
      - containerPort: 443
        hostPort: 443
        protocol: TCP
  - role: worker
```
**Cómo crearlo:**
```bash
kind create cluster --name cnm-redes --config semana-01-arquitectura/0.prepara-tu-laboratorio/kind-ingress.yaml
```
</details>

---

## 🧰 Paso 4: Kit de Supervivencia CLI (`kubectx`, `kubens`, `k9s` y `stern`)

Cuando tienes varios clústeres (`cnm-lab`, `cnm-cilium`, o el clúster del trabajo) y decenas de Pods ejecutándose al mismo tiempo, escribir comandos largos de `kubectl` es lento y propenso a errores.

Aquí tienes el resumen y la guía detallada de las **4 herramientas de terminal imprescindibles**:

| Herramienta | ¿Para qué sirve en palabras sencillas? | Comando rápido |
| :--- | :--- | :--- |
| **[kubectx](https://github.com/ahmetb/kubectx)** | **El control remoto de clústeres.** Cambia de un clúster (contexto) a otro en 1 segundo. | `kubectx kind-cnm-lab` |
| **[kubens](https://github.com/ahmetb/kubectx)** | **El selector de Namespaces.** Se instala junto con `kubectx` y te ahorra escribir `-n <namespace>` en cada comando. | `kubens kube-system` |
| **[k9s](https://k9scli.io/)** | **El panel de control interactivo en tu terminal.** Explora Pods, logs, eventos y shells con atajos de teclado. | `k9s` |
| **[stern](https://github.com/stern/stern)** | **El megáfono de logs multi-Pod.** Muestra los logs en vivo de varios Pods/contenedores a la vez diferenciados por colores. | `stern mi-app` |

---

### 🔀 1. `kubectx` y `kubens` — El control remoto de Clústeres y Namespaces

Normalmente, para cambiar de clúster o de namespace por defecto con `kubectl` tendrías que escribir comandos larguísimos como:
`kubectl config use-context kind-cnm-lab` o `kubectl config set-context --current --namespace=kube-system`.

Con **`kubectx`** y **`kubens`** ([github.com/ahmetb/kubectx](https://github.com/ahmetb/kubectx)) lo haces en una sola palabra.

#### 📦 Cómo instalar `kubectx` y `kubens`:

* **🍏 macOS (Homebrew):**
  ```bash
  brew install kubectx
  ```
* **🐧 Linux (Ubuntu / Debian / Git Clone):**
  ```bash
  # En Ubuntu 22.04+ / Debian:
  sudo apt update && sudo apt install -y kubectx

  # O instalación universal en cualquier distro Linux:
  sudo git clone https://github.com/ahmetb/kubectx /opt/kubectx
  sudo ln -s /opt/kubectx/kubectx /usr/local/bin/kubectx
  sudo ln -s /opt/kubectx/kubens /usr/local/bin/kubens
  ```
* **🪟 Windows (Winget / Chocolatey):**
  ```powershell
  winget install ahmetb.kubectx
  winget install ahmetb.kubens
  # O con Chocolatey: choco install kubectx kubens
  ```

#### 🚀 Cómo usar `kubectx` (Cambiar de Clúster):
```bash
# 1. Ver todos tus clústeres disponibles (resalta el actual)
kubectx

# 2. Cambiar al clúster de laboratorio 'kind-cnm-lab'
kubectx kind-cnm-lab

# 3. Volver rápidamente al clúster en el que estabas antes (como 'cd -')
kubectx -

# 4. Ponerle un apodo corto a un clúster con nombre largo
kubectx lab=kind-cnm-lab
```

#### 🚀 Cómo usar `kubens` (Cambiar de Namespace activo):
```bash
# 1. Ver todos los namespaces del clúster actual
kubens

# 2. Cambiar al namespace 'kube-system' (ahora 'kubectl get pods' consulta kube-system directamente)
kubens kube-system

# 3. Volver al namespace anterior (por ejemplo, 'default')
kubens -
```

---

### 🐶 2. `k9s` — El Panel de Control Interactivo en tu Terminal

**[k9s](https://k9scli.io/)** transforma tu terminal en un dashboard en vivo. Te permite navegar por tus Pods, Nodos, Deployments y Services usando el teclado, ver el consumo de CPU/RAM, leer logs en vivo o abrir una consola dentro de un contenedor con una sola tecla.

#### 📦 Cómo instalar `k9s`:

* **🍏 macOS (Homebrew):**
  ```bash
  brew install derailed/k9s/k9s
  ```
* **🐧 Linux (Binario Oficial / Homebrew / Pacman):**
  ```bash
  # Descarga e instala el paquete .deb oficial (Ubuntu/Debian amd64):
  wget https://github.com/derailed/k9s/releases/latest/download/k9s_linux_amd64.deb
  sudo apt install ./k9s_linux_amd64.deb && rm k9s_linux_amd64.deb
  ```
* **🪟 Windows (Winget / Chocolatey):**
  ```powershell
  winget install Derailed.k9s
  # O con Chocolatey: choco install k9s
  ```

#### ⌨️ Cómo usar `k9s` y atajos esenciales:
Ejecuta en tu terminal:
```bash
k9s
```

Una vez dentro de `k9s`, usa estos atajos de teclado:
| Tecla / Comando | Acción dentro de `k9s` |
| :---: | :--- |
| **`0`** | Ver Pods de **todos** los namespaces (`all`). |
| **`:pods`** o **`:po`** + `Enter` | Ir a la vista de **Pods**. |
| **`:nodes`** o **`:no`** + `Enter` | Ir a la vista de **Nodos** del clúster. |
| **`:ns`** + `Enter` | Ir a la vista de **Namespaces** y presiona `Enter` para entrar a uno. |
| **`l`** *(letra L)* | Ver los **Logs** en vivo del Pod seleccionado (`Esc` para regresar). |
| **`d`** | Hacer un **`describe`** del recurso seleccionado. |
| **`s`** | Abrir una **Shell interactiva (`sh`/`bash`)** dentro del contenedor seleccionado. |
| **`y`** | Ver el manifiesto **YAML** del recurso. |
| **`Ctrl + d`** | Eliminar el Pod o recurso seleccionado (con confirmación). |
| **`:q`** + `Enter` | Salir de `k9s`. |

---

### 📢 3. `stern` — El Megáfono de Logs Multi-Pod en Tiempo Real

Cuando tienes un Deployment con 5 réplicas de tu aplicación, `kubectl logs <nombre-pod>` te obliga a revisar Pod por Pod para encontrar un error. **[stern](https://github.com/stern/stern)** te permite hacer *tail* de los logs de **todos los Pods y contenedores que coincidan con un nombre o etiqueta al mismo tiempo**, asignándole un color distinto a cada Pod.

#### 📦 Cómo instalar `stern`:

* **🍏 macOS (Homebrew):**
  ```bash
  brew install stern
  ```
* **🐧 Linux (Binario Oficial):**
  ```bash
  STERN_VERSION=$(curl -s https://api.github.com/repos/stern/stern/releases/latest | grep tag_name | cut -d '"' -f 4 | sed 's/v//')
  curl -Lo stern.tar.gz "https://github.com/stern/stern/releases/download/v${STERN_VERSION}/stern_${STERN_VERSION}_linux_amd64.tar.gz"
  tar -xzf stern.tar.gz stern
  sudo mv stern /usr/local/bin/ && rm stern.tar.gz
  ```
* **🪟 Windows (Winget / Chocolatey):**
  ```powershell
  winget install stern.stern
  # O con Chocolatey: choco install stern
  ```

#### 🚀 Ejemplos prácticos de uso con `stern`:
```bash
# 1. Ver en vivo los logs de todos los Pods cuyo nombre contenga 'hola' o 'nginx'
stern hola

# 2. Ver los logs de TODOS los Pods del namespace actual al mismo tiempo
stern .

# 3. Ver los logs de todos los Pods de Cilium en el namespace kube-system
stern cilium -n kube-system

# 4. Ver solo los logs de los últimos 5 minutos y filtrar por etiqueta (label)
stern -l app=backend --since 5m
```

---

## 🖥️ Paso 5: Consola Visual Open Source — Headlamp

Si además de la terminal quieres inspeccionar tu clúster desde una interfaz gráfica moderna en tu navegador o escritorio, te recomendamos **[Headlamp](https://headlamp.dev/)**, la consola visual open source respaldada oficialmente por **Kubernetes SIGs**.

> 📖 **Guía completa con las 3 modalidades (Escritorio, Helm en el Clúster y Docker):**  
> Revisa el paso a paso detallado en [**`semana-01-arquitectura/headlamp.md`**](../headlamp.md).

### ⚡ Opción A: Instalar Headlamp como App de Escritorio (La más rápida)
Lee automáticamente tu archivo `~/.kube/config` sin necesidad de crear recursos ni tokens manuales:
* **🍏 macOS:** `brew install --cask headlamp`
* **🪟 Windows:** `winget install Headlamp.Headlamp`
* **🐧 Linux:** `flatpak install flathub io.headlamp.Headlamp` *(o descarga desde [GitHub Releases](https://github.com/kubernetes-sigs/headlamp/releases))*

### 🚀 Opción B: Desplegar Headlamp dentro del Clúster con Helm

1. **Añadir el repositorio de Helm e instalar Headlamp en `kube-system`:**
   ```bash
   helm repo add headlamp https://kubernetes-sigs.github.io/headlamp/
   helm repo update
   helm install headlamp headlamp/headlamp --namespace kube-system --set service.type=NodePort
   ```

2. **Crear el Secret para generar el Token de Administrador:**
   ```bash
   kubectl apply -f - <<EOF
   apiVersion: v1
   kind: Secret
   metadata:
     name: headlamp-admin
     namespace: kube-system
     annotations:
       kubernetes.io/service-account.name: headlamp
   type: kubernetes.io/service-account-token
   EOF
   ```

3. **Obtener y copiar tu Token de acceso:**
   ```bash
   kubectl get secret headlamp-admin -n kube-system -o jsonpath='{.data.token}' | base64 --decode ; echo
   ```

4. **Abrir la consola en tu navegador:**
   * **Vía Port-Forward (Universal en macOS / Windows / Linux):**
     ```bash
     kubectl port-forward -n kube-system svc/headlamp 8000:80
     ```
     Ingresa a **[http://localhost:8000](http://localhost:8000)** y pega el token del paso anterior.
   * **Vía NodePort directo (en Linux):**
     Consulta el puerto `3XXXX` con `kubectl get svc -n kube-system headlamp` y la IP del nodo con `kubectl get nodes -o wide`, y abre `http://<IP_DEL_NODO>:<PUERTO_NODEPORT>`.
