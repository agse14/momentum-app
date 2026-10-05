# Momentum Repostería — Portal y panel de administración

Sitio web + panel de administración propio para **Momentum Repostería** (Brunch & Coffee).
Está construido con **SvelteKit 2 / Svelte 5** y usa **Firebase** (Firestore, Storage, Authentication y
Hosting) como gestor de contenido. **No depende de WordPress ni de plantillas.**

---

## 1. Enlaces y accesos

| Recurso | URL |
|---|---|
| Sitio público (Firebase) | https://momentum-reposteria.web.app |
| Panel de administración | https://momentum-reposteria.web.app/admin |
| Repositorio GitHub | https://github.com/agse14/momentum-app |
| Consola Firebase | https://console.firebase.google.com/project/momentum-reposteria |

### Credenciales del administrador

| Campo | Valor |
|---|---|
| Usuario | `admin@momentumreposteria.com` |
| Contraseña inicial | `Momentum2026!` |

> ⚠️ **Cambia esta contraseña** en cuanto entres (ver sección 5.1). El acceso al panel se controla con
> el permiso `admin=true` en la cuenta de Firebase Authentication.

---

## 2. Cómo entrar al panel

1. Abre `/admin` (por ejemplo https://momentum-reposteria.web.app/admin).
2. Ingresa tu correo y contraseña.
3. Al entrar verás el menú lateral con las secciones:

| Sección | Qué permite editar |
|---|---|
| **Inicio** | Contadores y accesos rápidos. |
| **Sitio** | Nombre, eslogan, contacto, redes, color, portada, logo, footer y textos de novedades. |
| **Páginas** | Páginas del sitio, su contenido, plantilla, imagen y galería. |
| **Productos** | Catálogo de productos (nombre, categoría, imagen, orden, activo). |
| **Noticias** | Notas de "Novedades" (título, fecha, texto, imagen). |
| **Menú** | Enlaces del menú principal y de la barra superior. |

**Los cambios se guardan al instante en la base de datos** y se reflejan en el sitio al recargar la
página. **No hace falta recompilar ni volver a desplegar** para cambiar contenido, textos, imágenes o
precios.

---

## 3. Cómo editar el contenido (uso diario)

### 3.1 Editar textos e imágenes de una página
1. Panel → **Páginas**.
2. Haz clic en el título (o en **Editar**).
3. Modifica título, extracto y **Contenido (HTML)**.
4. En **Imagen principal** puedes pegar una URL o **subir una imagen** desde tu equipo.
5. En **Galería** puedes añadir/quitar imágenes (cada una se puede subir).
6. Marca **Mostrar en home** si quieres que aparezca como tarjeta en la portada.
7. **Guardar**.

> El campo **Contenido** acepta HTML básico (`<p>`, `<strong>`, `<a>`, listas…). Para insertar un salto
> de párrafo usa `<p>...</p>`.

### 3.2 Agregar una página nueva
1. Panel → **Páginas** → **+ Nueva página**.
2. Escribe un **identificador (slug)** sin espacios (ej. `temporada-navidena`) y el título.
3. Elige la **plantilla**:
   - `Focus (galería)`: título + imagen + galería.
   - `Parallax`: sección con imagen de fondo fija.
   - `Panel (imagen izq./der.)`: dos columnas.
   - `Panel centrado`: texto centrado.
   - `Página simple`: solo texto.
4. Guarda. La página quedará en `https://momentumreposteria.com/<slug>`.

### 3.3 Productos
Panel → **Productos** → **+ Nuevo producto** (o Editar). Define nombre, categoría, orden e imagen.
Desmarca **Activo** para ocultarlo sin borrarlo.

### 3.4 Noticias
Panel → **Noticias** → **+ Nueva noticia**. La fecha controla el orden (más reciente primero).

### 3.5 Menú (superior y principal)
Panel → **Menú**:
- **Menú principal**: enlaces de navegación. Los que empiezan con `/#` hacen scroll a una sección de la
  portada (ej. `/#contacto`); los que empiezan con `/` van a una página.
- **Barra superior**: teléfono y "Aviso de Privacidad".
- Ajusta **Orden** para reordenar y pulsa **Guardar menú**.

### 3.6 Subir imágenes
En cualquier campo de imagen verás:
- Un campo de texto (para pegar una URL o ruta existente).
- Un selector de archivo para **subir desde tu equipo** → se guarda en Firebase Storage y se inserta la
  URL automáticamente.

---

## 4. Desarrollo local

Requisitos: **Node.js 22** y npm.

```bash
cd ~/Desktop/MPN/momentum-app
npm install
npm run dev        # http://localhost:5173
```

Otros comandos:

```bash
npm run build      # compilación local (salida estática en build/)
npm run preview    # previsualizar el build
npm run check      # revisión de tipos de Svelte/TS
```

> En local el proyecto usa `adapter-static`; en Vercel usa `adapter-vercel` automáticamente. No hay que
> configurar variables de entorno: la configuración de Firebase está en `src/lib/firebase.ts`.

---

## 5. Administración técnica

### 5.1 Cambiar la contraseña del admin
1. Firebase Console → **Authentication → Users**.
2. Busca `admin@momentumreposteria.com` → menú `⋮` → **Reset password** (o cambia la contraseña
   directamente). También puedes pedir "restablecer contraseña" desde el propio login si se habilita el
   envío de correos.

### 5.2 Crear otro administrador
1. Firebase Console → Authentication → **Add user** (correo + contraseña).
2. Copia el **UID** del nuevo usuario.
3. Da el permiso de admin con la API/SDK (custom claim `admin=true`). Pídelo al desarrollador o usa:

```bash
# Requiere credenciales con permisos (owner). Ejemplo con la REST de Identity Toolkit:
curl -X POST "https://identitytoolkit.googleapis.com/v1/projects/momentum-reposteria/accounts:update" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" -H "Content-Type: application/json" \
  -d '{"localId":"<UID>","customAttributes":"{\"admin\":true}"}'
```

Sin ese permiso, la cuenta podrá autenticarse pero **no podrá editar** (las reglas bloquean la escritura).

### 5.3 Modelo de datos (Firestore)
| Colección | Documento | Contenido |
|---|---|---|
| `site` | `main` | Ajustes globales (nombre, contacto, portada, logo, redes). |
| `menu` | `<id>` | Enlaces del menú (`label`, `href`, `order`, `location`). |
| `pages` | `<slug>` | Páginas (`title`, `content`, `template`, `image`, `gallery`, `order`, `showOnHome`, `published`). |
| `products` | `<id>` | Productos. |
| `news` | `<id>` | Noticias. |

Las reglas de seguridad están en `firestore.rules` y `storage.rules`: **lectura pública, escritura solo
para admin**.

### 5.4 Migrar/reimportar el contenido inicial desde WordPress
Los scripts leen las credenciales del entorno (no van escritas en el repo):

```bash
SEED_EMAIL=admin@momentumreposteria.com SEED_PASS='TuPassword' node scripts/seed.mjs
SEED_EMAIL=admin@momentumreposteria.com SEED_PASS='TuPassword' node scripts/update-menu.mjs
```

---

## 6. Despliegue

### 6.1 Contenido (uso diario)
No requiere despliegue: se guarda en Firebase y se publica al instante.

### 6.2 Código / diseño
El proyecto se despliega desde **GitHub**:

1. Haz commit de los cambios:
   ```bash
   git add -A
   git commit -m "descripción del cambio"
   git push
   ```
2. Vercel (o Firebase) recompila y publica automáticamente si está conectado al repo.

### 6.3 Firebase Hosting (alternativa)
```bash
npm run deploy     # build local + firebase deploy --only hosting
```

---

## 7. Dominio y DNS

Dominio del cliente: **`momentumreposteria.com`**.

- El dominio está **registrado en GoDaddy**, pero su **zona DNS y el correo están en IONOS**
  (`ns1045.ui-dns.com`, `mx00/mx01.ionos.mx`).
- Para apuntarlo a Vercel, agrega en la zona DNS (IONOS):
  - `A` `@` → `76.76.21.21`
  - `CNAME` `www` → `cname.vercel-dns.com`
- **No modifiques MX ni SPF** para no perder el correo del cliente.
- Cambiar los *nameservers* a Vercel obliga a recrear MX/SPF allí; hazlo solo con cuidado.

### Paso obligatorio en Firebase
Authentication → **Settings → Authorized domains** → agrega `momentumreposteria.com` y
`www.momentumreposteria.com`. Sin esto, el login del panel falla en el dominio nuevo.

---

## 8. Estructura del proyecto

```
momentum-app/
├── src/
│   ├── lib/
│   │   ├── firebase.ts          # Config e inicialización de Firebase
│   │   ├── content.ts           # Lectura de contenido (site, pages, news…)
│   │   ├── admin.ts             # Guardado, borrado y subida de imágenes
│   │   ├── types.ts             # Tipos de datos
│   │   ├── stores/auth.ts       # Sesión y permisos del admin
│   │   └── components/          # Nav, Footer, Hero, Gallery, etc.
│   └── routes/
│       ├── +page.svelte         # Home
│       ├── [slug]/              # Páginas dinámicas
│       ├── noticias/            # Listado y detalle de noticias
│       └── admin/               # Panel de administración
├── static/
│   ├── img/                     # Logo, favicon, iconos sociales
│   └── uploads/                 # Imágenes migradas de WordPress
├── scripts/                     # seed.mjs, update-menu.mjs
├── firestore.rules              # Reglas de Firestore
├── storage.rules                # Reglas de Storage
├── firebase.json / .firebaserc  # Config de Firebase
└── svelte.config.js             # Adapter (Vercel / static)
```

---

## 9. Preguntas frecuentes

**¿Necesito tocar código para cambiar textos, fotos o productos?**
No. Todo se hace desde `/admin`.

**Cambié algo en el panel y no lo veo.**
Recarga la página; el sitio lee el contenido actualizado de Firebase en cada visita.

**No puedo iniciar sesión en el dominio nuevo.**
Falta agregar el dominio en Firebase → Authentication → Authorized domains (sección 7).

**Un cambio de diseño no aparece.**
Los cambios de código requieren `git push` y que Vercel/Firebase vuelva a compilar.

**¿Dónde están las imágenes?**
Las originales migradas en `static/uploads/`; las que subes desde el panel, en Firebase Storage.
