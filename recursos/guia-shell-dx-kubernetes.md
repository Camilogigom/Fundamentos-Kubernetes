# ⚡ Terminal Pro en KubeCafé: Productividad y Velocidad con `kubectl` — Cloud Native Medellín 🏔️☕

<div align="center">

[![Documentación Oficial kubectl](https://img.shields.io/badge/Docs_Oficiales-Cheat_Sheet_kubectl-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/es/docs/reference/kubectl/cheatsheet/)
[![Krew Plugins](https://img.shields.io/badge/Gestor_de_Plugins-Krew_SIG_CLI-00C7B7?style=for-the-badge&logo=kubernetes&logoColor=white)](https://krew.sigs.k8s.io/)
[![Starship Prompt](https://img.shields.io/badge/Prompt_Inteligente-Starship.rs-DD0B78?style=for-the-badge&logo=starship&logoColor=white)](https://starship.rs/)

</div>

> ☕ **La Estación del Barista Senior en KubeCafé:**  
> Un barista experto no busca la cuchara ni el termómetro cada vez que entra un pedido: tiene su estación organizada para preparar un café expreso perfecto en segundos y sin equivocarse de mesa.  
> En ingeniería Cloud Native (y en certificaciones prácticas de la CNCF como **CKA**, **CKAD** y **CKS**), preparar tu terminal reduce errores humanos, evita que apliques cambios en el clúster equivocado y multiplica tu velocidad al diagnosticar los **Retos Rotos** de cada semana.

---

## 🎯 ¿Qué vas a lograr en tu estación de trabajo?

1. **Tablero de control en tu prompt (`Starship`):** Verás en todo momento en qué **clúster** y en qué **namespace** de KubeCafé estás conectado (`☕ kind-kubecafe (sucursal-centro)`).
2. **Autocompletado oficial (`kubectl completion`):** Al presionar `Tab`, la terminal completará por ti los nombres de Pods, Deployments y parámetros sin errores de digitación.
3. **Buscador interactivo (`fzf`):** Podrás filtrar cualquier comando de tu historial o seleccionar recursos del clúster en segundos.
4. **Extensiones oficiales con `Krew`:** Cambiarás de sucursal (*namespace*) al instante, limpiarás manifiestos exportados y leerás logs de múltiples réplicas simultáneamente.

---

## 🛠️ Paso 1: Equipa tu Estación (Instalación por Sistema Operativo)

Selecciona tu sistema operativo para instalar los utilitarios recomendados por la comunidad de **Cloud Native Medellín**:

<details open>
<summary><b>🍎 macOS (con Homebrew)</b></summary>
<br>

```bash
# 1. Utilitarios de terminal, resaltado de sintaxis YAML y buscador interactivo
brew install zsh fzf starship zsh-autosuggestions zsh-syntax-highlighting bat jq yq

# 2. Selector rápido de clúster y namespace
brew install kubectx

# 3. Activar búsqueda interactiva con Ctrl+R en el historial
"$(brew --prefix)"/opt/fzf/install --key-bindings --completion --no-update-rc
```
</details>

<details>
<summary><b>🐧 Linux (Ubuntu / Debian / WSL2 en Windows)</b></summary>
<br>

```bash
# 1. Instalar Zsh, fzf, bat y jq desde repositorios oficiales
sudo apt update && sudo apt install -y zsh fzf bat jq curl git zsh-autosuggestions zsh-syntax-highlighting

# Crear enlace estándar para bat en Ubuntu/Debian:
mkdir -p ~/.local/bin
ln -sf /usr/bin/batcat ~/.local/bin/bat

# 2. Instalar Starship Prompt (instalador oficial)
curl -sS https://starship.rs/install.sh | sh

# 3. Instalar yq para inspeccionar archivos YAML
sudo wget -qO /usr/local/bin/yq https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64
sudo chmod +x /usr/local/bin/yq
```
</details>

---

## 🧭 Paso 2: Muestra el Clúster y la Sucursal (`Namespace`) en tu Prompt

El accidente más común administrando Kubernetes es lanzar un `kubectl delete` pensando que estás en tu laboratorio de **Kind** cuando sigues conectado a un entorno compartido. Con [**Starship**](https://starship.rs/) tu terminal te muestra siempre dónde estás parado.

1. Configura el indicador de Kubernetes en `~/.config/starship.toml`:
   ```bash
   mkdir -p ~/.config
   cat << 'EOF' >> ~/.config/starship.toml
   [kubernetes]
   format = 'en [☕ ⛵ $context \($namespace\)](bold cyan) '
   disabled = false
   EOF
   ```
2. Agrega la inicialización al final de tu archivo `~/.zshrc` (o `~/.bashrc`):
   ```bash
   # Si usas Zsh (~/.zshrc):
   eval "$(starship init zsh)"

   # Si usas Bash (~/.bashrc):
   # eval "$(starship init bash)"
   ```

Tu línea de comandos lucirá así automáticamente:
```text
~/Fundamentos-Kubernetes en ☕ ⛵ kind-kubecafe (default) ❯
```

---

## ⚡ Paso 3: Autocompletado Oficial y Atajos de KubeCafé

En lugar de escribir `kubectl` completo decenas de veces por sesión, configura el alias oficial `k` junto con las variables rápidas recomendadas en el [Cheat Sheet Oficial de Kubernetes](https://kubernetes.io/es/docs/reference/kubectl/cheatsheet/):

Agrega este bloque a tu `~/.zshrc`:

```zsh
# =========================================================================
# ☕ CONFIGURACIÓN DE TERMINAL KUBECAFÉ — CLOUD NATIVE MEDELLÍN (CNCF)
# =========================================================================
autoload -Uz compinit && compinit
source <(kubectl completion zsh)

# Alias corto con soporte completo de autocompletado (Tab)
alias k='kubectl'
compdef __start_kubectl k

# Atajos de diagnóstico para los Retos Rotos
alias kgp='kubectl get pods -o wide'
alias kgd='kubectl get deployments -o wide'
alias kgs='kubectl get services -o wide'
alias kgn='kubectl get nodes -o wide'
alias kga='kubectl get all'
alias kdp='kubectl describe pod'
alias kdd='kubectl describe deployment'
alias kl='kubectl logs'
alias klf='kubectl logs -f'
alias kex='kubectl exec -it'

# Aplicación y generación rápida de manifiestos YAML (estilo examen CKA/CKAD)
alias kap='kubectl apply -f'
alias krep='kubectl replace --force -f'
export do="--dry-run=client -o yaml"
export now="--force --grace-period=0"
```

### 💡 Truco de Velocidad: Genera tus plantillas YAML en 3 segundos con `$do`
Nunca escribas un manifiesto YAML desde cero arriesgándote a fallar en la indentación. Pídele a `kubectl` que arme el esqueleto oficial por ti:

```bash
# Generar el YAML de un Deployment de 3 réplicas para KubeCafé sin aplicarlo aún:
k create deployment kubecafe-pedidos-api --image=nginx:1.27-alpine --replicas=3 $do > pedidos-deployment.yaml

# Previsualizar en pantalla el YAML de un Pod con colores usando bat:
k run barista-prueba --image=nginx:alpine --port=80 $do | bat -l yaml
```

---

## 🧩 Paso 4: Superpoderes Oficiales con `Krew` (Kubernetes SIG CLI)

[**Krew**](https://krew.sigs.k8s.io/) es el gestor oficial de complementos de `kubectl` mantenido por la comunidad de Kubernetes.

### 1. Instala Krew en tu terminal (macOS / Linux):
```bash
(
  set -x; cd "$(mktemp -d)" &&
  OS="$(uname | tr '[:upper:]' '[:lower:]')" &&
  ARCH="$(uname -m | sed -e 's/x86_64/amd64/' -e 's/\(arm\)\(64\)\?.*/\1\2/' -e 's/aarch64$/arm64/')" &&
  KREW="krew-${OS}_${ARCH}" &&
  curl -fsSLO "https://github.com/kubernetes-sigs/krew/releases/latest/download/${KREW}.tar.gz" &&
  tar zxvf "${KREW}.tar.gz" &&
  ./"${KREW}" install krew
)
```

Añade la ruta de Krew a tu `~/.zshrc`:
```zsh
export PATH="${KREW_ROOT:-$HOME/.krew}/bin:$PATH"
```

### 2. Instala los complementos favoritos para diagnosticar el clúster:
```bash
kubectl krew install ctx          # Cambia de clúster con menú interactivo
kubectl krew install ns           # Cambia de namespace con menú interactivo
kubectl krew install neat         # Limpia metadatos internos al exportar un YAML del clúster
kubectl krew install stern        # Sigue los logs en vivo de todas las réplicas de un Deployment
kubectl krew install tree         # Muestra la jerarquía Deployment -> ReplicaSet -> Pods como un árbol
```

#### 🧪 Ponlos a prueba con los ejercicios de la Semana 02:
```bash
# 1. Ver el árbol completo desde el Deployment hasta sus ReplicaSets y Pods hijos:
kubectl tree deployment kubecafe-pedidos-api

# 2. Ver los logs en tiempo real de los 3 baristas (Pods) al mismo tiempo:
kubectl stern -l app=cafeteriamovil-api

# 3. Exportar un manifiesto limpio de un Pod en ejecución:
kubectl get pod <nombre-del-pod> -o yaml | kubectl neat | bat -l yaml
```

---

## 📚 Enlaces a la Documentación Oficial

* ☸️ **Kubernetes:** [Cheat Sheet Oficial de `kubectl`](https://kubernetes.io/es/docs/reference/kubectl/cheatsheet/) • [Autocompletado Oficial en Zsh](https://kubernetes.io/es/docs/tasks/tools/included/optional-kubectl-configs-zsh/) • [Autocompletado Oficial en Bash](https://kubernetes.io/es/docs/tasks/tools/included/optional-kubectl-configs-bash-linux/)
* 🧩 **Krew (Kubernetes SIG CLI):** [Guía de Instalación de Krew](https://krew.sigs.k8s.io/docs/user-guide/setup/install/) • [Catálogo Oficial de Plugins](https://krew.sigs.k8s.io/plugins/)
* 🚀 **Utilidades CLI:** [Starship Prompt](https://starship.rs/guide/) • [fzf Buscador Interactivo](https://github.com/junegunn/fzf) • [kubectx & kubens](https://github.com/ahmetb/kubectx)
