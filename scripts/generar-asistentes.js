#!/usr/bin/env node
/**
 * Script generador del Muro de Asistentes (ASISTENTES.md), del Mosaico Visual en README.md
 * y de los Portafolios Profesionales de Aprendizaje (aportes-comunidad/soluciones-retos/<usuario>/README.md)
 * a partir de asistentes.json, las soluciones validadas de 2.reto-roto/ y las bitácoras semanales (bitacora.md).
 *
 * - Excluye al dueño/instructor (edwinbermudez91) y colaboradores de la tabla de puntajes y los muestra como Equipo Organizador.
 * - Valida que cada archivo entregado corresponda realmente al ejercicio de 2.reto-roto/ y tenga la solución aplicada.
 * - Genera automáticamente el Portafolio Profesional KubeCafé (Cloud Native Medellín) con insignias compartibles para cada estudiante activo.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const JSON_PATH = path.join(ROOT, 'asistentes.json');
const MD_PATH = path.join(ROOT, 'ASISTENTES.md');
const README_PATH = path.join(ROOT, 'README.md');
const SOLUCIONES_DIR = path.join(ROOT, 'aportes-comunidad', 'soluciones-retos');
const REPO_URL = 'https://github.com/edwinbermudez91/Fundamentos-Kubernetes';

const INSTRUCTORS = ['edwinbermudez91', 'santiago1023', 'vdevalen', 'andresqb198', 'ka1999'];

const WEEK_METADATA = {
  'semana-00': {
    title: '🐳 Semana 00: Fundamentos de Docker (De Código a Contenedor)',
    shortBadge: '🐳_Docker_&_OCI',
    color: '2496ED',
    logo: 'docker',
    skills: 'Dockerfile, imágenes OCI, seguridad rootless, .dockerignore y redes en contenedores'
  },
  'semana-01': {
    title: '🌱 Semana 01: Arquitectura de Kubernetes y Pods',
    shortBadge: '🌱_K8s_Pods_&_Arquitectura',
    color: '326CE5',
    logo: 'kubernetes',
    skills: 'Control Plane, Worker Nodes, kubectl, diagnóstico de Pods (ImagePullBackOff, CrashLoopBackOff, Pending)'
  },
  'semana-02': {
    title: '🔄 Semana 02: Deployments, Réplicas y Autorreparación',
    shortBadge: '🔄_K8s_Deployments_&_Rollouts',
    color: '10B981',
    logo: 'kubernetes',
    skills: 'ReplicaSets, Deployments, Self-Healing, Rolling Updates con cero caídas y Rollbacks'
  },
  'semana-03': {
    title: '🌐 Semana 03: Redes en Kubernetes (Services e Ingress)',
    shortBadge: '🌐_K8s_Services_&_Ingress',
    color: '06B6D4',
    logo: 'kubernetes',
    skills: 'ClusterIP, NodePort, CoreDNS y enrutamiento HTTP con Ingress Controllers'
  },
  'semana-04': {
    title: '💾 Semana 04: Configuración y Datos Persistentes',
    shortBadge: '💾_K8s_Config_&_Storage',
    color: '8B5CF6',
    logo: 'kubernetes',
    skills: 'ConfigMaps, Secrets, PersistentVolumes (PV) y PersistentVolumeClaims (PVC)'
  },
  'semana-05': {
    title: '🛡️ Semana 05: Salud, Límites y Seguridad (RBAC)',
    shortBadge: '🛡️_K8s_Security_&_Probes',
    color: 'F59E0B',
    logo: 'kubernetes',
    skills: 'Liveness/Readiness Probes, Resource Requests/Limits y control de acceso RBAC'
  },
  'semana-06': {
    title: '🎓 Semana 06: Empaquetado con Helm y Proyecto Final KubeCafé',
    shortBadge: '🎓_Helm_&_Arquitectura_K8s',
    color: 'EC4899',
    logo: 'helm',
    skills: 'Helm Charts, plantillas parametrizadas y despliegue multicapa de alta disponibilidad'
  }
};

function cleanGithubUser(input, fallbackUser = '') {
  if (!input) return fallbackUser;
  let val = input.trim();
  if (
    !val ||
    val.toLowerCase() === '_no response_' ||
    val.toLowerCase() === 'no response' ||
    val.toLowerCase() === 'tu-usuario' ||
    val.toLowerCase().includes('tu-usuario')
  ) {
    return fallbackUser;
  }
  val = val.replace(/^https?:\/\/(www\.)?github\.com\//i, '');
  val = val.split(/[/?#]/)[0];
  val = val.replace(/\.png$/i, '');
  val = val.replace(/^@/, '').trim();
  return val || fallbackUser;
}

function cleanLinkedin(url) {
  if (!url) return '';
  let trimmed = url.trim();
  if (
    !trimmed ||
    trimmed.toLowerCase() === '_no response_' ||
    trimmed.toLowerCase() === 'no response' ||
    trimmed.toLowerCase() === 'n/a' ||
    trimmed.toLowerCase() === 'ninguno' ||
    trimmed.includes('tu-perfil') ||
    trimmed.includes('tu-usuario')
  ) {
    return '';
  }
  if (!/^https?:\/\//i.test(trimmed)) {
    if (trimmed.startsWith('www.linkedin.com') || trimmed.startsWith('linkedin.com')) {
      trimmed = 'https://' + trimmed;
    } else if (!trimmed.includes('/')) {
      trimmed = `https://www.linkedin.com/in/${trimmed}`;
    } else {
      trimmed = 'https://' + trimmed;
    }
  }
  return trimmed;
}

function parseExtraSocialLinks(input) {
  if (!input) return [];
  if (Array.isArray(input)) {
    return input.map(s => String(s).trim()).filter(Boolean);
  }
  const str = String(input).trim();
  if (
    !str ||
    str.toLowerCase() === '_no response_' ||
    str.toLowerCase() === 'no response' ||
    str.toLowerCase() === 'n/a' ||
    str.toLowerCase() === 'ninguna' ||
    str.toLowerCase() === 'ninguno'
  ) {
    return [];
  }
  return str
    .split(/[\r\n,;]+|\s+(?=https?:\/\/)/)
    .map(s => s.trim())
    .filter(s => s && !s.includes('tu-usuario') && !s.includes('tu-portafolio'))
    .map(s => (/^https?:\/\//i.test(s) ? s : `https://${s}`));
}

function buildSocialBadge(url) {
  const lower = url.toLowerCase();
  if (lower.includes('x.com/') || lower.includes('twitter.com/')) {
    return `[![X](https://img.shields.io/badge/X-000000?style=flat-square&logo=x&logoColor=white)](${url})`;
  }
  if (lower.includes('instagram.com/')) {
    return `[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=flat-square&logo=instagram&logoColor=white)](${url})`;
  }
  if (lower.includes('youtube.com/') || lower.includes('youtu.be/')) {
    return `[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=flat-square&logo=youtube&logoColor=white)](${url})`;
  }
  if (lower.includes('dev.to/')) {
    return `[![Dev.to](https://img.shields.io/badge/dev.to-0A0A0A?style=flat-square&logo=devdotto&logoColor=white)](${url})`;
  }
  if (lower.includes('medium.com/')) {
    return `[![Medium](https://img.shields.io/badge/Medium-12100E?style=flat-square&logo=medium&logoColor=white)](${url})`;
  }
  if (lower.includes('gitlab.com/')) {
    return `[![GitLab](https://img.shields.io/badge/GitLab-FC6D26?style=flat-square&logo=gitlab&logoColor=white)](${url})`;
  }
  if (lower.includes('twitch.tv/')) {
    return `[![Twitch](https://img.shields.io/badge/Twitch-9146FF?style=flat-square&logo=twitch&logoColor=white)](${url})`;
  }
  if (lower.includes('facebook.com/')) {
    return `[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=flat-square&logo=facebook&logoColor=white)](${url})`;
  }
  if (lower.includes('tiktok.com/')) {
    return `[![TikTok](https://img.shields.io/badge/TikTok-000000?style=flat-square&logo=tiktok&logoColor=white)](${url})`;
  }
  if (lower.includes('bsky.app/')) {
    return `[![Bluesky](https://img.shields.io/badge/Bluesky-0285FF?style=flat-square&logo=bluesky&logoColor=white)](${url})`;
  }
  return `[![Web](https://img.shields.io/badge/Web-4285F4?style=flat-square&logo=google-chrome&logoColor=white)](${url})`;
}

/**
 * Elimina líneas de comentarios (# ...) para validar únicamente las instrucciones reales del Dockerfile o YAML.
 */
function stripComments(text) {
  return text
    .split(/\r?\n/)
    .map(line => line.replace(/#.*$/, '').trim())
    .filter(Boolean)
    .join('\n');
}

/**
 * Reglas de validación de contenido real para cada reto roto del repositorio.
 * Evita que alguien suba un archivo cualquiera o deje el reto sin arreglar.
 */
const CHALLENGE_VALIDATORS = {
  'semana-00': [
    {
      id: '01',
      name: '01-dockerfile-roto',
      validate: files =>
        files.some(f => {
          const code = stripComments(f.content);
          return /FROM\s+nginx/i.test(code) && /daemon\s+off/i.test(code);
        })
    },
    {
      id: '02',
      name: '02-variable-entorno-faltante',
      validate: files =>
        files.some(f => {
          const code = stripComments(f.content);
          return /ENV\s+APP_SECRET_TOKEN/i.test(code);
        })
    },
    {
      id: '03',
      name: '03-contenedor-como-root',
      validate: files =>
        files.some(f => {
          const code = stripComments(f.content);
          const isReto03File =
            /0?3/.test(f.relPath) || /RETO\s*3/i.test(f.content) || /root/i.test(f.relPath);
          return (
            isReto03File &&
            /FROM\s+python/i.test(code) &&
            /USER\s+(appuser|10001)/i.test(code)
          );
        })
    },
    {
      id: '04',
      name: '04-dockerignore-y-archivos-secretos',
      validate: files => {
        const hasDockerignore = files.some(
          f =>
            f.relPath.toLowerCase().includes('dockerignore') &&
            /\.env/.test(stripComments(f.content))
        );
        const hasFixedDockerfile = files.some(f => {
          const code = stripComments(f.content);
          const isReto04 = /0?4/.test(f.relPath) || /RETO\s*4/i.test(f.content) || /leak/i.test(f.content);
          return isReto04 && /COPY\s+(--chown=\S+\s+)?app\.py/i.test(code) && !/COPY\s+\.\s+\./i.test(code);
        });
        return hasDockerignore || hasFixedDockerfile;
      }
    },
    {
      id: '05',
      name: '05-puerto-y-host-desalineado',
      validate: files =>
        files.some(f => {
          const code = stripComments(f.content);
          const isReto05 = /0?5/.test(f.relPath) || /app\.py$/i.test(f.relPath) || /RETO\s*5/i.test(f.content);
          return isReto05 && /0\.0\.0\.0/.test(code) && /8080/.test(code);
        })
    }
  ],
  'semana-01': [
    {
      id: '01',
      name: '01-pod-con-errores',
      validate: files =>
        files.some(f => {
          const code = stripComments(f.content);
          const isReto01 = /name:\s*reto-01-imagen/.test(code) || /0?1/.test(f.relPath);
          return (
            isReto01 &&
            /kind:\s*Pod/.test(code) &&
            /image:\s*nginx:(latest|alpine|1\.\d+)/.test(code) &&
            !code.includes('version-fantasma-999') &&
            /containerPort:\s*80\b/.test(code) &&
            !code.includes('80809')
          );
        })
    },
    {
      id: '02',
      name: '02-pod-crashloop',
      validate: files =>
        files.some(f => {
          const code = stripComments(f.content);
          const isReto02 = /name:\s*reto-02-crash/.test(code) || /0?2/.test(f.relPath);
          return (
            isReto02 &&
            /kind:\s*Pod/.test(code) &&
            /\becho\b/.test(code) &&
            !code.includes('echho')
          );
        })
    },
    {
      id: '03',
      name: '03-pod-pendiente-infinito',
      validate: files =>
        files.some(f => {
          const code = stripComments(f.content);
          const isReto03 = /name:\s*reto-03-exigente/.test(code) || /0?3/.test(f.relPath);
          return (
            isReto03 &&
            /kind:\s*Pod/.test(code) &&
            /memory:/.test(code) &&
            !code.includes('500Gi') &&
            !code.includes('"64"')
          );
        })
    },
    {
      id: '04',
      name: '04-pod-yaml-molesto',
      validate: files =>
        files.some(f => {
          const code = stripComments(f.content);
          const isReto04 = /name:\s*reto-04-sintaxis/.test(code) || /0?4/.test(f.relPath);
          return (
            isReto04 &&
            /apiVersion:\s*v1\b/.test(code) &&
            !code.includes('apiVersion: v2') &&
            /image:\s*nginx/.test(code) &&
            !code.includes('imaeg:') &&
            /containerPort:\s*80\b/.test(code)
          );
        })
    }
  ],
  'semana-02': [
    {
      id: '01',
      name: '01-deployment-selector-roto',
      validate: files =>
        files.some(f => {
          const code = stripComments(f.content);
          const isReto01 = /reto-?01|kubecafe-pedidos-api/.test(code) || /0?1/.test(f.relPath);
          return (
            isReto01 &&
            /kind:\s*Deployment/.test(code) &&
            !code.includes('etiqueta-equivocada-web') &&
            /app:\s*cafeteriamovil-api/.test(code)
          );
        })
    },
    {
      id: '02',
      name: '02-deployment-imagen-caida-rollback',
      validate: files =>
        files.some(f => {
          const code = stripComments(f.content);
          const isReto02 = /reto-?02|kubecafe-checkout-v2/.test(code) || /0?2/.test(f.relPath);
          return (
            isReto02 &&
            /kind:\s*Deployment/.test(code) &&
            !code.includes('version-fantasma-prod-999') &&
            /image:\s*nginx/.test(code)
          );
        })
    },
    {
      id: '03',
      name: '03-deployment-estrategia-invalida',
      validate: files =>
        files.some(f => {
          const code = stripComments(f.content);
          const isReto03 = /reto-?03|kubecafe-notificaciones/.test(code) || /0?3/.test(f.relPath);
          return (
            isReto03 &&
            /kind:\s*Deployment/.test(code) &&
            !code.includes('Rollingupdates') &&
            /type:\s*RollingUpdate/.test(code) &&
            /rollingUpdate:/.test(code)
          );
        })
    },
    {
      id: '04',
      name: '04-deployment-yaml-identacion',
      validate: files =>
        files.some(f => {
          const code = stripComments(f.content);
          const isReto04 = /reto-?04|kubecafe-fidelizacion/.test(code) || /0?4/.test(f.relPath);
          return (
            isReto04 &&
            /kind:\s*Deployment/.test(code) &&
            !/apiVersion:\s*v1\b/.test(code) &&
            /apiVersion:\s*apps\/v1/.test(code) &&
            /replicas:\s*2/.test(code)
          );
        })
    }
  ]
};

/**
 * Descubre automáticamente las semanas en el repositorio y combina con los validadores de contenido.
 */
function discoverOfficialChallenges() {
  const weeks = {};
  const entries = fs.readdirSync(ROOT, { withFileTypes: true });
  for (const dir of entries) {
    if (!dir.isDirectory()) continue;
    const match = dir.name.match(/^(semana-\d+)/i);
    if (!match) continue;
    const weekKey = match[1].toLowerCase();
    if (CHALLENGE_VALIDATORS[weekKey]) {
      weeks[weekKey] = CHALLENGE_VALIDATORS[weekKey].map(c => c.id);
      continue;
    }
    const retoDir = path.join(ROOT, dir.name, '2.reto-roto');
    if (!fs.existsSync(retoDir)) continue;
    const items = fs.readdirSync(retoDir);
    const challengeNums = [];
    for (const item of items) {
      const m = item.match(/^(\d{2})-/);
      if (m && !challengeNums.includes(m[1])) {
        challengeNums.push(m[1]);
      }
    }
    challengeNums.sort();
    if (challengeNums.length > 0) {
      weeks[weekKey] = challengeNums;
    }
  }
  return weeks;
}

function listFilesRecursive(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  let results = [];
  const list = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of list) {
    if (entry.name === '.git' || entry.name === '.DS_Store') continue;
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(listFilesRecursive(fullPath));
    } else {
      const lower = entry.name.toLowerCase();
      if (lower !== 'readme.md' && lower !== 'bitacora.md') {
        results.push(fullPath);
      }
    }
  }
  return results;
}

/**
 * Evalúa los ejercicios resueltos y las bitácoras de un estudiante en aportes-comunidad/soluciones-retos/<usuario>/
 */
function evaluateUserProgress(githubUser, officialChallenges) {
  const cleanUser = cleanGithubUser(githubUser);
  let points = 10; // 10 XP base por registrarse
  let completedWeeksCount = 0;
  let totalSolvedChallenges = 0;
  let totalBitacoras = 0;
  const weekSummaries = [];
  const detailedReport = [];

  let userSolDir = null;
  let userFolderName = null;
  if (fs.existsSync(SOLUCIONES_DIR)) {
    const dirs = fs.readdirSync(SOLUCIONES_DIR, { withFileTypes: true });
    const found = dirs.find(d => d.isDirectory() && d.name.toLowerCase() === cleanUser.toLowerCase());
    if (found) {
      userSolDir = path.join(SOLUCIONES_DIR, found.name);
      userFolderName = found.name;
    }
  }

  for (const [weekKey, expectedNums] of Object.entries(officialChallenges)) {
    const totalExpected = expectedNums.length;
    let solvedCount = 0;
    let hasBitacora = false;
    let weekDirName = weekKey;
    const missingNums = [];
    const solvedNums = [];

    if (userSolDir) {
      const weekDirs = fs.readdirSync(userSolDir, { withFileTypes: true });
      const matchingWeekDir = weekDirs.find(
        d => d.isDirectory() && d.name.toLowerCase().startsWith(weekKey)
      );
      if (matchingWeekDir) {
        weekDirName = matchingWeekDir.name;
        const weekPath = path.join(userSolDir, matchingWeekDir.name);
        const bitacoraFile = path.join(weekPath, 'bitacora.md');
        if (fs.existsSync(bitacoraFile) && fs.readFileSync(bitacoraFile, 'utf8').trim().length > 40) {
          hasBitacora = true;
          totalBitacoras += 1;
        }

        const filePaths = listFilesRecursive(weekPath);
        const files = filePaths.map(fp => ({
          relPath: path.relative(weekPath, fp),
          content: fs.readFileSync(fp, 'utf8')
        }));

        const validators = CHALLENGE_VALIDATORS[weekKey];
        if (validators) {
          for (const v of validators) {
            if (v.validate(files)) {
              solvedNums.push(v.id);
            } else {
              missingNums.push(`${v.id} (${v.name})`);
            }
          }
          solvedCount = solvedNums.length;
        } else {
          for (const num of expectedNums) {
            const numInt = parseInt(num, 10);
            const regex = new RegExp(`(^|[^0-9])(0?${numInt})([^0-9]|$)`);
            if (files.some(f => regex.test(f.relPath) && stripComments(f.content).length > 10)) {
              solvedNums.push(num);
            } else {
              missingNums.push(num);
            }
          }
          solvedCount = solvedNums.length;
        }
      } else {
        missingNums.push(...expectedNums);
      }
    } else {
      missingNums.push(...expectedNums);
    }

    const isComplete = solvedCount === totalExpected && totalExpected > 0;
    const shortLabel = weekKey.replace('semana-', 'Sem ');
    const bitacoraTag = hasBitacora ? ' 📔' : '';

    if (solvedCount > 0) {
      points += solvedCount * 10; // +10 XP por cada reto roto validado
      totalSolvedChallenges += solvedCount;
      if (isComplete) {
        completedWeeksCount += 1;
        weekSummaries.push(`✅ ${shortLabel}: ${solvedCount}/${totalExpected}${bitacoraTag}`);
      } else {
        weekSummaries.push(`⏳ ${shortLabel}: ${solvedCount}/${totalExpected}${bitacoraTag}`);
      }
    } else if (hasBitacora) {
      weekSummaries.push(`📔 ${shortLabel}: Bitácora`);
    }

    detailedReport.push({
      weekKey,
      weekDirName,
      solvedCount,
      totalExpected,
      isComplete,
      hasBitacora,
      solvedNums,
      missingNums
    });
  }

  // También revisar si hay bitácoras en semanas futuras (ej. semana-03..06) que aún no tengan validadores activos
  if (userSolDir) {
    const weekDirs = fs.readdirSync(userSolDir, { withFileTypes: true });
    for (const d of weekDirs) {
      if (!d.isDirectory()) continue;
      const m = d.name.match(/^(semana-\d+)/i);
      if (!m) continue;
      const wk = m[1].toLowerCase();
      if (officialChallenges[wk]) continue;
      const bFile = path.join(userSolDir, d.name, 'bitacora.md');
      if (fs.existsSync(bFile) && fs.readFileSync(bFile, 'utf8').trim().length > 40) {
        totalBitacoras += 1;
        const shortLabel = wk.replace('semana-', 'Sem ');
        weekSummaries.push(`📔 ${shortLabel}: Bitácora`);
        detailedReport.push({
          weekKey: wk,
          weekDirName: d.name,
          solvedCount: 0,
          totalExpected: 4,
          isComplete: false,
          hasBitacora: true,
          solvedNums: [],
          missingNums: []
        });
      }
    }
  }

  let rango = '⛵ Marinero';
  if (completedWeeksCount >= 6) {
    rango = '⚓ Capitán K8s';
  } else if (completedWeeksCount >= 2) {
    rango = '🧭 Timonel';
  }

  const summaryText =
    weekSummaries.length > 0
      ? `**${points} XP** (${weekSummaries.join(' • ')})`
      : `**${points} XP** (Registro inicial)`;

  return {
    points,
    completedWeeksCount,
    totalSolvedChallenges,
    totalBitacoras,
    rango,
    summaryText,
    detailedReport,
    hasPortfolioDir: Boolean(userSolDir),
    userFolderName: userFolderName || cleanUser
  };
}

/**
 * Construye enlaces y textos pre-armados para compartir en LinkedIn, Instagram, YouTube, WhatsApp y Telegram.
 */
function buildShareLinks(user, nombre, rango, points, hasPortfolioDir = false, folderName = '') {
  const cleanUser = cleanGithubUser(user);
  const targetFolder = folderName || cleanUser;
  const portfolioUrl = hasPortfolioDir
    ? `${REPO_URL}/tree/main/aportes-comunidad/soluciones-retos/${targetFolder}`
    : `${REPO_URL}/blob/main/ASISTENTES.md`;

  const rankBadgeUrl =
    rango.includes('Capitán')
      ? `https://img.shields.io/badge/KubeCafé_CNCF-⚓_Capitán_K8s_(${points}_XP)-f59e0b?style=for-the-badge&logo=kubernetes&logoColor=white`
      : rango.includes('Timonel')
        ? `https://img.shields.io/badge/KubeCafé_CNCF-🧭_Timonel_K8s_(${points}_XP)-7c3aed?style=for-the-badge&logo=kubernetes&logoColor=white`
        : `https://img.shields.io/badge/KubeCafé_CNCF-⛵_Tripulante_K8s_(${points}_XP)-0284c7?style=for-the-badge&logo=kubernetes&logoColor=white`;

  const shareMessage = `☸️ ¡Sigo construyendo mi Portafolio Práctico de Docker y Kubernetes en el workshop "De Cero a Capitán en Kubernetes" con la comunidad Cloud Native Medellín (CNCF)! 🏔️☕\n\n🎖️ Rango actual: ${rango} (${points} XP)\n📂 Mi Portafolio de Laboratorios y Bitácora verificada: ${portfolioUrl}\n\nAgradecimientos a @Cloud Native Colombia por este espacio de formación abierta:\n🏢 LinkedIn: https://www.linkedin.com/company/cloud-native-colombia/\n📸 Instagram: https://www.instagram.com/colombiacloudnative/\n▶️ YouTube: https://www.youtube.com/@CloudNativeColombia\n🔗 Capítulo oficial CNCF: https://ocgroups.dev/cncf/group/2majk4r\n\n#Kubernetes #Docker #CloudNative #DevOps #KubeCafe #CNCFMedellin #OpenSource`;

  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(portfolioUrl)}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(portfolioUrl)}&text=${encodeURIComponent(
    `☸️ Mi Portafolio Práctico de Docker y Kubernetes en Cloud Native Medellín (${rango} • ${points} XP) 🏔️☕`
  )}`;

  const instagramShareUrl = 'https://www.instagram.com/colombiacloudnative/';
  const youtubeShareUrl = 'https://www.youtube.com/@CloudNativeColombia';
  const linkedinCompanyUrl = 'https://www.linkedin.com/company/cloud-native-colombia/';

  const badgesBar = [
    `[![Compartir en LinkedIn](https://img.shields.io/badge/Compartir_en-LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](${linkedinShareUrl})`,
    `[![Instagram @colombiacloudnative](https://img.shields.io/badge/Instagram-@colombiacloudnative-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](${instagramShareUrl})`,
    `[![YouTube @CloudNativeColombia](https://img.shields.io/badge/YouTube-@CloudNativeColombia-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](${youtubeShareUrl})`,
    `[![LinkedIn Empresa](https://img.shields.io/badge/LinkedIn-Cloud_Native_Colombia-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](${linkedinCompanyUrl})`,
    `[![Compartir en WhatsApp](https://img.shields.io/badge/Compartir_en-WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](${whatsappShareUrl})`,
    `[![Compartir en Telegram](https://img.shields.io/badge/Compartir_en-Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](${telegramShareUrl})`
  ].join(' ');

  const githubProfileSnippet = `[![Portafolio Kubernetes KubeCafé](${rankBadgeUrl})](${portfolioUrl})`;

  return {
    portfolioUrl,
    rankBadgeUrl,
    shareMessage,
    linkedinShareUrl,
    instagramShareUrl,
    youtubeShareUrl,
    linkedinCompanyUrl,
    whatsappShareUrl,
    telegramShareUrl,
    badgesBar,
    githubProfileSnippet
  };
}

/**
 * Genera el archivo README.md del Portafolio Profesional de Aprendizaje dentro de
 * aportes-comunidad/soluciones-retos/<usuario>/README.md
 */
function generateStudentPortfolioReadme(student, evalResult) {
  const user = cleanGithubUser(student.github);
  const folderName = evalResult.userFolderName || user;
  const userDir = path.join(SOLUCIONES_DIR, folderName);
  if (!fs.existsSync(userDir)) return;

  const nombre = (student.nombre || user).trim();
  const rol = (student.rol || 'Tripulante Cloud Native').trim();
  const rango = evalResult.rango;
  const points = evalResult.points;
  const motivacion = (student.motivacion || 'Dominar contenedores y Kubernetes desde la práctica.').trim();
  const share = buildShareLinks(user, nombre, rango, points, true, folderName);

  // Insignias de módulos
  const moduleBadges = Object.entries(WEEK_METADATA).map(([wk, meta]) => {
    const rep = evalResult.detailedReport.find(r => r.weekKey === wk);
    if (rep && rep.isComplete) {
      return `![${wk}](https://img.shields.io/badge/${meta.shortBadge}-✅_Completado-${meta.color}?style=for-the-badge&logo=${meta.logo}&logoColor=white)`;
    }
    if (rep && (rep.solvedCount > 0 || rep.hasBitacora)) {
      return `![${wk}](https://img.shields.io/badge/${meta.shortBadge}-⏳_En_Progreso-f59e0b?style=for-the-badge&logo=${meta.logo}&logoColor=white)`;
    }
    return `![${wk}](https://img.shields.io/badge/${meta.shortBadge}-⚪_Próximamente-475569?style=for-the-badge&logo=${meta.logo}&logoColor=white)`;
  });

  // Filas de progreso técnico por semana
  const tableRows = Object.entries(WEEK_METADATA).map(([wk, meta]) => {
    const rep = evalResult.detailedReport.find(r => r.weekKey === wk);
    const weekFolderExists = fs.existsSync(path.join(userDir, rep ? rep.weekDirName : wk));
    const folderLink = weekFolderExists ? `[📂 Ver Soluciones](./${rep ? rep.weekDirName : wk})` : '—';

    let statusBadge = '`⚪ Pendiente`';
    if (rep && rep.isComplete) {
      statusBadge = `\`✅ ${rep.solvedCount}/${rep.totalExpected} Verificados (+${rep.solvedCount * 10} XP)\``;
    } else if (rep && rep.solvedCount > 0) {
      statusBadge = `\`⏳ ${rep.solvedCount}/${rep.totalExpected} Verificados (+${rep.solvedCount * 10} XP)\``;
    }

    const bitacoraLink =
      rep && rep.hasBitacora
        ? `[📔 Leer Bitácora](./${rep.weekDirName}/bitacora.md)`
        : `[➕ Crear Bitácora](${REPO_URL}/issues/new?template=bitacora-semanal.yml)`;

    return `| **${meta.title}** | ${meta.skills} | ${statusBadge} | ${folderLink} | ${bitacoraLink} |`;
  });

  // Listar bitácoras escritas para mostrarlas destacadas
  const bitacoraItems = evalResult.detailedReport
    .filter(r => r.hasBitacora)
    .map(r => {
      const meta = WEEK_METADATA[r.weekKey] || { title: r.weekKey };
      return `- 📔 **[${meta.title}](./${r.weekDirName}/bitacora.md)** — *Reflexión técnica, diagnóstico de errores y comandos practicados.*`;
    });

  const bitacorasSection =
    bitacoraItems.length > 0
      ? bitacoraItems.join('\n')
      : `> 💡 *Aún no has registrado bitácoras escritas. Haz clic en **[📔 Registrar mi Bitácora de Aprendizaje en 1 minuto](${REPO_URL}/issues/new?template=bitacora-semanal.yml)** para documentar lo que aprendiste esta semana.*`;

  const socialLinksBar = [
    `[![GitHub](https://img.shields.io/badge/GitHub-@${user}-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/${user})`
  ];
  const linkedin = cleanLinkedin(student.linkedin);
  if (linkedin) {
    socialLinksBar.push(
      `[![LinkedIn](https://img.shields.io/badge/LinkedIn-Conectar-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](${linkedin})`
    );
  }

  const content = `<div align="center">

# 🎓 Portafolio Profesional Cloud Native & Kubernetes

<img src="https://github.com/${user}.png?size=160" width="80" height="80" style="border-radius: 50%; object-fit: cover; margin-top: 8px;" alt="${user}"/><br/>

### ${nombre} (\`@${user}\`)
**${rol}**

*«${motivacion}»*

${socialLinksBar.join(' ')}

---

### 🎖️ Insignias Oficiales y Rango Verificado (CI/CD)

[![Rango Oficial](${share.rankBadgeUrl})](${REPO_URL}/blob/main/ASISTENTES.md)
[![XP Verificado](https://img.shields.io/badge/⚡_Puntaje_Total-${points}_XP-10b981?style=for-the-badge&logo=githubactions&logoColor=white)](${REPO_URL}/blob/main/ASISTENTES.md)
[![Retos Superados](https://img.shields.io/badge/🛠️_Retos_Rotos_Resueltos-${evalResult.totalSolvedChallenges}-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](${REPO_URL}/blob/main/ASISTENTES.md)
[![Comunidad CNCF](https://img.shields.io/badge/🇨🇴_Capítulo_Oficial-CNCF_Medellín-00C7B7?style=for-the-badge&logo=cncf&logoColor=white)](https://ocgroups.dev/cncf/group/2majk4r)

</div>

---

## 🧩 Mapa de Competencias e Insignias por Módulo

<div align="center">

${moduleBadges.join('\n')}

</div>

---

## 📊 Evidencias Técnicas y Laboratorios Resueltos en ☕ KubeCafé

Cada entrega en este portafolio es validada automáticamente por el motor de integración continua de [**De Cero a Capitán en Kubernetes — Cloud Native Medellín (CNCF)**](${REPO_URL}) frente a escenarios reales de resolución de fallos (*Troubleshooting*):

| Módulo del Workshop | Habilidades Practicadas | Estado de Validación | Código / Manifiestos | Bitácora Técnica |
| :--- | :--- | :---: | :---: | :---: |
${tableRows.join('\n')}

---

## 📔 Bitácoras de Reflexión e Ingeniería

<div align="left">

${bitacorasSection}

</div>

<div align="center">

[![Agregar Bitácora Semanal](https://img.shields.io/badge/📔_Registrar_o_Actualizar_Bitácora_Semanal_(Formulario_1_min)-2ea44f?style=for-the-badge&logo=github)](${REPO_URL}/issues/new?template=bitacora-semanal.yml)

</div>

---

## 📣 Comparte tu Portafolio e Insignia en Redes Sociales

Comparte tus avances con reclutadores, colegas y la comunidad haciendo clic en cualquiera de estos botones:

<div align="center">

${share.badgesBar}

</div>

<details>
<summary><b>📋 Ver texto listo para copiar y publicar en LinkedIn + Insignia para tu Perfil de GitHub</b></summary>
<br>

### 1️⃣ Texto sugerido para publicación en LinkedIn:
Copia y pega este texto en un post de LinkedIn (puedes adjuntar una captura de este portafolio o de tu terminal):

\`\`\`text
${share.shareMessage}
\`\`\`

### 2️⃣ Insignia dinámica para el README de tu perfil personal de GitHub (\`github.com/${user}/${user}\`):
Pega esta línea en el \`README.md\` de tu perfil de GitHub para mostrar tu rango y enlazar a este portafolio verificado:

\`\`\`markdown
${share.githubProfileSnippet}
\`\`\`

</details>

---

<div align="center">
  <sub>🏔️☕ Portafolio generado y verificado automáticamente por <b><a href="${REPO_URL}">Cloud Native Medellín (CNCF) — De Cero a Capitán en Kubernetes</a></b></sub>
</div>
`;

  fs.writeFileSync(path.join(userDir, 'README.md'), content, 'utf8');
}

function buildSocialBadgesString(entry) {
  const user = cleanGithubUser(entry.github);
  const badges = [
    `[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/${user})`
  ];

  const linkedin = cleanLinkedin(entry.linkedin);
  if (linkedin) {
    badges.push(
      `[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](${linkedin})`
    );
  }

  if (entry.hasPortfolioDir) {
    const folder = entry.userFolderName || user;
    badges.push(
      `[![Portafolio K8s](https://img.shields.io/badge/🎓_Portafolio_K8s-00C7B7?style=flat-square&logo=kubernetes&logoColor=white)](./aportes-comunidad/soluciones-retos/${folder}/README.md)`
    );
  }

  const extraLinks = [];
  if (entry.x && entry.x.trim()) {
    extraLinks.push(entry.x.trim());
  }
  if (entry.redes) {
    for (const link of parseExtraSocialLinks(entry.redes)) {
      if (!extraLinks.includes(link)) {
        extraLinks.push(link);
      }
    }
  }

  for (const link of extraLinks) {
    badges.push(buildSocialBadge(link));
  }

  return badges.join('<br>');
}

function buildStudentRow(entry, rankPosition) {
  const user = cleanGithubUser(entry.github);
  const nombre = (entry.nombre || user).replace(/\|/g, '').replace(/\r?\n/g, ' ').trim();
  const rol = (entry.rol || 'Tripulante de la Comunidad').replace(/\|/g, '/').replace(/\r?\n/g, ' ').trim();
  const rango = (entry.rango || '⛵ Marinero').trim();
  const progreso = entry.progresoTexto || `**${entry.puntos || 10} XP** (Registro inicial)`;
  const motivacion = (entry.motivacion || 'Aprender y compartir en la comunidad Cloud Native Medellín.').replace(/\|/g, '').replace(/\r?\n/g, ' ').trim();

  let medal = `#${rankPosition}`;
  if (entry.puntos > 10) {
    if (rankPosition === 1) medal = '🥇 #1';
    else if (rankPosition === 2) medal = '🥈 #2';
    else if (rankPosition === 3) medal = '🥉 #3';
  }

  const avatar = `<img src="https://github.com/${user}.png?size=50" width="32" height="32" style="border-radius: 50%; vertical-align: middle; margin-right: 8px;"> **${nombre}**`;
  const badgesStr = buildSocialBadgesString(entry);

  return `| ${medal} | ${avatar} | ${rol} | ${badgesStr} | ${rango}<br><sub>${progreso}</sub> | ${motivacion} |`;
}

function buildReadmeMosaicSection(students, instructorsList = []) {
  const cols = 6;
  const rowsHtml = [];
  for (let i = 0; i < students.length; i += cols) {
    const chunk = students.slice(i, i + cols);
    const cells = chunk.map((entry, idx) => {
      const pos = i + idx + 1;
      const user = cleanGithubUser(entry.github);
      const fullName = (entry.nombre || user).replace(/<[^>]*>/g, '').trim();
      const parts = fullName.split(/\s+/);
      const shortName = parts.length > 2 ? `${parts[0]} ${parts[1]}` : fullName;
      const rango = (entry.rango || '⛵ Marinero').trim();
      const xp = entry.puntos || 10;
      let medal = '';
      if (xp > 10) {
        if (pos === 1) medal = '🥇 ';
        else if (pos === 2) medal = '🥈 ';
        else if (pos === 3) medal = '🥉 ';
      }
      const profileLink = entry.hasPortfolioDir
        ? `./aportes-comunidad/soluciones-retos/${entry.userFolderName || user}/README.md`
        : cleanLinkedin(entry.linkedin) || `https://github.com/${user}`;
      return `    <td align="center" width="140">\n      <a href="${profileLink}" title="${fullName} (@${user}) — ${xp} XP">\n        <img src="https://github.com/${user}.png?size=100" width="64" height="64" style="border-radius: 50%;" alt="${user}"/><br/>\n        <sub><b>${medal}${shortName}</b></sub>\n      </a><br/>\n      <sub>${rango} • <b>${xp} XP</b></sub>\n    </td>`;
    });
    rowsHtml.push(`  <tr>\n${cells.join('\n')}\n  </tr>`);
  }

  let instructorsBlock = '';
  if (instructorsList && instructorsList.length > 0) {
    const instCells = instructorsList.map(inst => {
      const user = cleanGithubUser(inst.github);
      const fullName = (inst.nombre || user).replace(/<[^>]*>/g, '').trim();
      const parts = fullName.split(/\s+/);
      const shortName = parts.length > 2 ? `${parts[0]} ${parts[1]}` : fullName;
      const isCaptain = user.toLowerCase() === 'edwinbermudez91';
      const isFemale =
        /colaboradora|instructora/i.test(inst.rol || '') ||
        /^(valentina|karen|ana|mar[ií]a|laura|paola|gloria|natalia|nathali|jeraldin|camila|karol|airy|sara|diana|luisa|carolina|andrea|daniela)\b/i.test(fullName);
      const roleTag = isCaptain
        ? '⚓ Capitán • Instructor'
        : isFemale
          ? '🤝 Colaboradora'
          : '🤝 Colaborador';
      const profileLink = cleanLinkedin(inst.linkedin) || `https://github.com/${user}`;
      return `    <td align="center" width="150">\n      <a href="${profileLink}" title="${fullName} (@${user})">\n        <img src="https://github.com/${user}.png?size=100" width="68" height="68" style="border-radius: 50%;" alt="${user}"/><br/>\n        <sub><b>${shortName}</b></sub>\n      </a><br/>\n      <sub>${roleTag}</sub>\n    </td>`;
    });
    instructorsBlock = `### 👨‍🏫 Capitán y Colaboradores de la Nave\n\n<table>\n  <tr>\n${instCells.join('\n')}\n  </tr>\n</table>\n\n### 🏆 Ranking de la Tripulación (${students.length} Tripulantes)\n\n`;
  }

  return `<!-- INICIO_MOSAICO_TRIPULACION -->
## 👥 Tripulación a Bordo y Ranking (${students.length} Tripulantes)

<div align="center">

[![Tripulantes a Bordo](https://img.shields.io/badge/⛵_Tripulantes_a_Bordo-${students.length}-00C7B7?style=for-the-badge)](./ASISTENTES.md)
[![Registrarme en 30 seg](https://img.shields.io/badge/➕_¡Regístrate_Aquí!_(Formulario_Visual)-2ea44f?style=for-the-badge&logo=github)](https://github.com/edwinbermudez91/Fundamentos-Kubernetes/issues/new?template=registro-asistente.yml)
[![Registrar Bitácora Semanal](https://img.shields.io/badge/📔_Bitácora_Semanal_y_Portafolio-8B5CF6?style=for-the-badge&logo=github)](https://github.com/edwinbermudez91/Fundamentos-Kubernetes/issues/new?template=bitacora-semanal.yml)
[![Actualizar mis Datos](https://img.shields.io/badge/✏️_Actualizar_mis_Datos_o_Redes-f57c00?style=for-the-badge&logo=github)](https://github.com/edwinbermudez91/Fundamentos-Kubernetes/issues/new?template=registro-asistente.yml)
[![Ver Ranking Completo](https://img.shields.io/badge/🏆_Ver_Tabla_de_Puntajes_y_Redes-326CE5?style=for-the-badge)](./ASISTENTES.md)

${instructorsBlock}<table>
${rowsHtml.join('\n')}
</table>

<sub>💡 <b>¿Aún no apareces aquí, quieres actualizar tus redes o registrar tu Bitácora Semanal?</b> Haz clic en <a href="https://github.com/edwinbermudez91/Fundamentos-Kubernetes/issues/new?template=registro-asistente.yml"><b>➕ Registrarme / ✏️ Actualizar Datos</b></a> o en <a href="https://github.com/edwinbermudez91/Fundamentos-Kubernetes/issues/new?template=bitacora-semanal.yml"><b>📔 Llenar Bitácora Semanal</b></a> y nuestro bot actualizará tu tarjeta y portafolio automáticamente en 15 segundos.</sub>

</div>
<!-- FIN_MOSAICO_TRIPULACION -->`;
}

function updateReadmeWithMosaic(students, readmeContent, instructorsList = []) {
  const mosaicBlock = buildReadmeMosaicSection(students, instructorsList);
  const startMarker = '<!-- INICIO_MOSAICO_TRIPULACION -->';
  const endMarker = '<!-- FIN_MOSAICO_TRIPULACION -->';

  if (readmeContent.includes(startMarker) && readmeContent.includes(endMarker)) {
    const regex = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`);
    return readmeContent.replace(regex, mosaicBlock);
  }

  const targetHeading = '## 🏆 Rangos de Navegación (Gamificación)';
  if (readmeContent.includes(targetHeading)) {
    return readmeContent.replace(targetHeading, `${mosaicBlock}\n\n---\n\n${targetHeading}`);
  }
  return readmeContent + '\n\n' + mosaicBlock + '\n';
}

function renderAsistentesMarkdown(students, instructorsList, officialChallenges) {
  const rows = students.map((s, idx) => buildStudentRow(s, idx + 1)).join('\n');

  const weekChallengesText = Object.entries(officialChallenges)
    .map(([week, nums]) => `\`${week}\` (${nums.length} retos rotos)`)
    .join(', ');

  let instructorCard = '';
  if (instructorsList && instructorsList.length > 0) {
    const instRows = instructorsList.map(inst => {
      const u = cleanGithubUser(inst.github);
      const nom = (inst.nombre || u).trim();
      const rol = (inst.rol || '🤝 Colaborador').trim();
      const mot = (inst.motivacion || 'Compartir conocimiento y fortalecer la comunidad Cloud Native en Medellín. 🏔️☕').trim();
      const instBadges = buildSocialBadgesString(inst).replace(/<br>/g, ' &nbsp; ');
      return `| <img src="https://github.com/${u}.png?size=50" width="36" height="36" style="border-radius: 50%; vertical-align: middle; margin-right: 8px;"> **${nom}** | ${rol} | ${instBadges} | ${mot} |`;
    }).join('\n');
    instructorCard = `
## 👨‍🏫 Capitán y Colaboradores de la Nave (Equipo Organizador)

| 👤 Integrante | 💼 Rol / Especialidad | 🌐 Redes Profesionales | 🎯 Misión en la Comunidad |
| :--- | :--- | :---: | :--- |
${instRows}

---
`;
  }

  return `# 🙌 Muro de Asistentes y Ranking de la Tripulación — Cloud Native Medellín 🏔️☕

¡Te damos la bienvenida a bordo! Este muro es el registro histórico, el **directorio de Portafolios Profesionales KubeCafé** y la **tabla de posiciones (Leaderboard)** de todas las personas que hacen parte de esta travesía de aprendizaje: **De Cero a Capitán en Kubernetes**.

<div align="center">

[![Comunidad Oficial CNCF Medellín](https://img.shields.io/badge/🇨🇴_Únete_al_Capítulo-CNCF_Medellín-00C7B7?style=for-the-badge&logo=cncf&logoColor=white)](https://ocgroups.dev/cncf/group/2majk4r)
[![Registrarme en 30 seg](https://img.shields.io/badge/➕_¡Regístrate_Aquí!_(Nuevos_Tripulantes)-2ea44f?style=for-the-badge&logo=github)](https://github.com/edwinbermudez91/Fundamentos-Kubernetes/issues/new?template=registro-asistente.yml)
[![Registrar Bitácora Semanal](https://img.shields.io/badge/📔_Bitácora_Semanal_y_Portafolio-8B5CF6?style=for-the-badge&logo=github)](https://github.com/edwinbermudez91/Fundamentos-Kubernetes/issues/new?template=bitacora-semanal.yml)
[![Actualizar mis Datos](https://img.shields.io/badge/✏️_Actualizar_mis_Datos_o_Redes_Sociales-f57c00?style=for-the-badge&logo=github)](https://github.com/edwinbermudez91/Fundamentos-Kubernetes/issues/new?template=registro-asistente.yml)
[![Insignias y Portafolio](https://img.shields.io/badge/🎖️_Insignias_para_LinkedIn_y_GitHub-326CE5?style=for-the-badge&logo=linkedin)](./recursos/portafolio-y-badges.md)

</div>

---

## 🏆 Sistema de Puntaje (XP), Portafolio Profesional y Validación

A medida que avances semana a semana, nuestro bot de GitHub Actions inspeccionará tu carpeta \`aportes-comunidad/soluciones-retos/<tu-usuario>/semana-XX/\`, **validará tus soluciones de \`2.reto-roto/\`**, generará tu **Portafolio Profesional KubeCafé (\`README.md\`)** y actualizará tu puntaje en este muro:

| Acción / Logro | Puntos / Insignia | Regla de Validación Estricta |
| :--- | :---: | :--- |
| **1. Registro en el Muro** | **+10 XP** | Por registrarte en el formulario o vía Pull Request. |
| **2. Reto Roto Resuelto y Validado** | **+10 XP por reto** | Cada ejercicio de \`2.reto-roto/\` (${weekChallengesText}) que resuelvas y pase la validación de contenido suma **+10 XP** en la tabla de posiciones (ej. Semana 00 completa = +50 XP, Semana 01 completa = +40 XP). |
| **3. Bitácora de Navegación y Portafolio KubeCafé** | **🎓 Portafolio + 📔 Insignia** | Registra lo aprendido en el **[📔 Formulario Visual de Bitácora](https://github.com/edwinbermudez91/Fundamentos-Kubernetes/issues/new?template=bitacora-semanal.yml)** (o incluye \`bitacora.md\` en tu PR) para desbloquear tu **Portafolio Profesional K8s** con botones para compartir en LinkedIn, Instagram, WhatsApp y Telegram. |

### 🎖️ Requisitos para subir de Rango:
| Rango | Requisito | Insignia Oficial para tu Perfil | Lo que representa en la travesía |
| :---: | :---: | :---: | :--- |
| **⛵ Marinero** | Registro inicial (**10 XP**) | ![Marinero](https://img.shields.io/badge/KubeCafé-⛵_Marinero-0284c7?style=flat-square&logo=kubernetes&logoColor=white) | Te registraste en este muro y zarpó tu primer Pod en el clúster. |
| **🧭 Timonel** | **2+ Semanas Completadas al 100%** | ![Timonel](https://img.shields.io/badge/KubeCafé-🧭_Timonel-7c3aed?style=flat-square&logo=kubernetes&logoColor=white) | Resolviste y validaste **todos** los ejercicios de los _Retos Rotos_ de al menos 2 semanas. |
| **⚓ Capitán K8s** | **6 Semanas Completadas al 100%** | ![Capitán](https://img.shields.io/badge/KubeCafé-⚓_Capitán_K8s-f59e0b?style=flat-square&logo=kubernetes&logoColor=white) | Dominas la navegación del clúster, completaste todos los ejercicios de las 6 semanas y el proyecto final. |

---

## 📝 ¿Cómo registrarte, actualizar tus datos o llenar tu Bitácora Semanal?

No necesitas tocar código para registrarte o documentar tu bitácora semanal:

1. **➕ Registro o Actualización de Perfil (30 segundos):**
   - 👉 **[Abrir Formulario Visual de Registro / Actualización](https://github.com/edwinbermudez91/Fundamentos-Kubernetes/issues/new?template=registro-asistente.yml)**
   - Completa tu nombre, usuario de GitHub, rol y enlaces a LinkedIn/Redes, y haz clic en **\`Create\`**. En 15 segundos aparecerás en la tabla con tu foto oficial.
2. **📔 Bitácora de Aprendizaje Semanal y Portafolio Profesional (1 minuto):**
   - 👉 **[Abrir Formulario Visual de Bitácora Semanal](https://github.com/edwinbermudez91/Fundamentos-Kubernetes/issues/new?template=bitacora-semanal.yml)**
   - Elige la semana, escribe qué aprendiste y qué reto solucionaste, y haz clic en **\`Create\`**. El bot creará tu archivo \`bitacora.md\`, actualizará tu **🎓 Portafolio K8s** y te dará enlaces de 1 clic para compartir tu logro en LinkedIn, Instagram, WhatsApp y Telegram.
3. **🛠️ Vía Pull Request desde tu terminal (Para practicar Git):**
   - También puedes editar tu bloque en [\`asistentes.json\`](./asistentes.json) o copiar la [\`PLANTILLA-BITACORA.md\`](./aportes-comunidad/soluciones-retos/PLANTILLA-BITACORA.md) dentro de tu carpeta semanal.

---
${instructorCard}
## 👥 Tabla de Posiciones de la Tripulación (${students.length} Tripulantes)

<!-- INICIO_TABLA_ASISTENTES -->
| # | 👤 Tripulante | 💼 Rol / Especialidad | 🌐 Redes y Portafolio | 🎖️ Rango y Progreso (XP) | 🎯 ¿Qué te motivó a unirte? |
| :---: | :--- | :--- | :---: | :---: | :--- |
${rows}
<!-- FIN_TABLA_ASISTENTES -->

> [!TIP]
> **Impulsa tu Marca Profesional y Haz Networking:**  
> Haz clic en el botón **\`🎓 Portafolio K8s\`** de los tripulantes para ver sus laboratorios verificados y bitácoras, y visita la [**🎖️ Guía de Portafolio e Insignias para LinkedIn y GitHub (\`recursos/portafolio-y-badges.md\`)**](./recursos/portafolio-y-badges.md) para agregar tu insignia oficial a tu perfil. 🤝🚀
`;
}

function processAndSortData(rawData) {
  const officialChallenges = discoverOfficialChallenges();
  const map = new Map();

  for (const item of rawData) {
    const cleanUser = cleanGithubUser(item.github);
    const key = cleanUser.toLowerCase();
    if (!map.has(key)) {
      item.github = cleanUser;
      item.linkedin = cleanLinkedin(item.linkedin);
      item.redes = parseExtraSocialLinks(item.redes);
      if (item.x && !item.redes.includes(item.x)) item.redes.push(item.x);
      delete item.x;
      map.set(key, item);
    } else {
      const existing = map.get(key);
      if (item.linkedin && cleanLinkedin(item.linkedin)) existing.linkedin = cleanLinkedin(item.linkedin);
      if (item.rol && item.rol !== 'Tripulante de la Comunidad') existing.rol = item.rol;
      if (item.motivacion && !item.motivacion.startsWith('Aporte en PR')) existing.motivacion = item.motivacion;
      if (item.redes) {
        for (const r of parseExtraSocialLinks(item.redes)) {
          if (!existing.redes.includes(r)) existing.redes.push(r);
        }
      }
    }
  }

  const instructorsList = [];
  const students = [];

  let orderIndex = 0;
  for (const item of map.values()) {
    const isInstructor = INSTRUCTORS.includes(item.github.toLowerCase());
    if (isInstructor) {
      item.rango = '⚓ Capitán K8s';
      instructorsList.push(item);
    } else {
      const evalResult = evaluateUserProgress(item.github, officialChallenges);
      item.rango = evalResult.rango;
      item.puntos = evalResult.points;
      item.semanasCompletas = evalResult.completedWeeksCount;
      item.progresoTexto = evalResult.summaryText;
      item.hasPortfolioDir = evalResult.hasPortfolioDir;
      item.userFolderName = evalResult.userFolderName;
      item._evalResult = evalResult;
      item._order = orderIndex++;
      students.push(item);
    }
  }

  students.sort((a, b) => {
    if (b.puntos !== a.puntos) return b.puntos - a.puntos;
    return a._order - b._order;
  });

  const cleanJsonList = [];
  for (const inst of instructorsList) {
    cleanJsonList.push({
      github: inst.github,
      nombre: inst.nombre,
      rol: inst.rol,
      linkedin: inst.linkedin || '',
      redes: inst.redes || [],
      rango: inst.rango,
      motivacion: inst.motivacion
    });
  }
  for (const s of students) {
    cleanJsonList.push({
      github: s.github,
      nombre: s.nombre,
      rol: s.rol,
      linkedin: s.linkedin || '',
      redes: s.redes || [],
      rango: s.rango,
      puntos: s.puntos,
      motivacion: s.motivacion
    });
  }

  return {
    cleanJsonList,
    students,
    instructorsList,
    officialChallenges
  };
}

function syncAllFiles(rawData) {
  const { cleanJsonList, students, instructorsList, officialChallenges } = processAndSortData(rawData);
  fs.writeFileSync(JSON_PATH, JSON.stringify(cleanJsonList, null, 2) + '\n', 'utf8');

  // Generar el README.md de Portafolio Profesional para cada estudiante con carpeta en soluciones-retos/
  for (const s of students) {
    if (s.hasPortfolioDir && s._evalResult) {
      generateStudentPortfolioReadme(s, s._evalResult);
    }
  }

  const md = renderAsistentesMarkdown(students, instructorsList, officialChallenges);
  fs.writeFileSync(MD_PATH, md, 'utf8');
  if (fs.existsSync(README_PATH)) {
    const readme = fs.readFileSync(README_PATH, 'utf8');
    fs.writeFileSync(README_PATH, updateReadmeWithMosaic(students, readme, instructorsList), 'utf8');
  }
  return { cleanJsonList, students, instructorsList, officialChallenges };
}

if (require.main === module) {
  const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
  const { students } = syncAllFiles(data);
  const withPortfolio = students.filter(s => s.hasPortfolioDir).length;
  console.log(`✅ ASISTENTES.md, README.md y ${withPortfolio} Portafolios Profesionales actualizados (${students.length} estudiantes).`);
}

module.exports = {
  INSTRUCTORS,
  WEEK_METADATA,
  CHALLENGE_VALIDATORS,
  cleanGithubUser,
  cleanLinkedin,
  parseExtraSocialLinks,
  discoverOfficialChallenges,
  evaluateUserProgress,
  buildShareLinks,
  generateStudentPortfolioReadme,
  processAndSortData,
  syncAllFiles,
  updateReadmeWithMosaic,
  renderAsistentesMarkdown
};
