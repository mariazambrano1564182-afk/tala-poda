---
name: Assets y contenido local
description: Restricciones duraderas de esta web para assets adjuntos y administración de contenido.
---

Las imágenes adjuntas a esta web deben estar dentro del directorio de assets del proyecto para que Vite pueda importarlas; los archivos conservados de una transición de conversación no se resuelven directamente desde el alias de assets.

**Why:** La primera ruta de referencia quedó fuera del árbol servido después de mover la conversación y produjo un error de importación hasta que se copió al directorio de assets.

**How to apply:** Al añadir una nueva referencia visual, verifica que exista dentro de `attached_assets/` antes de importarla. El panel administrativo actual persiste texto, testimonios, imágenes y videos en el navegador del editor; si se necesita administración compartida o segura entre dispositivos, hay que conectarlo a autenticación, almacenamiento y base de datos.