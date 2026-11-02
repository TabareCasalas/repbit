# REP/BIT v2.4 — GitHub Pages

Web app estática para seguimiento personal de entrenamiento. No necesita servidor, dependencias ni compilación.

## Publicar

1. Crear un repositorio **público** en GitHub (por ejemplo, `repbit`).
2. En ese repositorio, usar **Add file > Upload files** y subir **los archivos extraídos de este ZIP** (no subir el ZIP como un único archivo). Debe quedar `index.html` en la raíz, junto a `app.js`, `styles.css`, el manifiesto, el service worker y los iconos.
3. En **Settings > Pages > Build and deployment**, seleccionar **Deploy from a branch**, `main` y `/(root)`, y guardar.
4. La URL típica es `https://TU-USUARIO.github.io/repbit/`. El repositorio puede tener otro nombre; la URL cambiará según corresponda.

## Datos y privacidad

- La aplicación usa almacenamiento **local en el navegador**. Publicar el código en GitHub Pages **no sincroniza** automáticamente tus registros entre dispositivos.
- Antes de dejar de usar otra versión: **Tus datos > Exportar JSON**; en la nueva URL: **Importar JSON**. Los orígenes del archivo HTML y de GitHub Pages tienen almacenamientos distintos.
- La página publicada es accesible públicamente. No incluyas backups JSON o CSV con registros personales en el repositorio.
- GitHub Pages funciona con HTTPS y admite instalación como aplicación web desde navegadores compatibles.

Guía oficial: https://docs.github.com/es/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
