========================================================
  OCR PARA TICKETS - DOCUMENTACIÓN TÉCNICA DEL PROYECTO
========================================================

DESCRIPCIÓN GENERAL
-------------------
Aplicación web full-stack que permite a los usuarios subir imágenes de tickets
o recibos, extraer el texto de forma automática mediante OCR (Reconocimiento
Óptico de Caracteres), guardar los resultados en una base de datos y consultarlos
o eliminarlos posteriormente. Cuenta con un sistema de registro e inicio de sesión
de usuarios.


========================================================
STACK TECNOLÓGICO
========================================================

BACKEND
-------
- Lenguaje:       JavaScript (Node.js)
- Framework:      Express.js
- ORM:            Sequelize (para interactuar con la base de datos)
- OCR Engine:     Tesseract.js (reconocimiento de texto en imágenes, configurado en español "spa")
- Subida de arch: Multer (middleware para manejar multipart/form-data)
- Base de datos:  MySQL

FRONTEND
--------
- Lenguaje:       JavaScript (JSX)
- Framework:      React (con ReactDOM)
- Estilos:        Bootstrap 5
- Bundler/Entry:  main.js (punto de entrada con ReactDOM.createRoot)


========================================================
ESTRUCTURA DE ARCHIVOS CLAVE
========================================================

Aplicacion.js              -> Punto de entrada del servidor Node/Express
config/database.js         -> Configuración de la conexión a MySQL con Sequelize
models/User.js             -> Modelo de usuario (email, password)
models/Extraction.js       -> Modelo de extracción OCR (texto extraído)
routes/auth.routes.js      -> Rutas de autenticación (registro y login)
routes/ocr.routes.js       -> Ruta para procesar imágenes con OCR
routes/extracciones.routes.js -> Rutas para consultar y eliminar extracciones
main.js                    -> Punto de entrada de React (frontend)


========================================================
BASE DE DATOS
========================================================

Motor:          MySQL
Base de datos:  crudjson
Usuario:        root
Contraseña:     12345
Host:           localhost

La conexión se establece en config/database.js usando Sequelize:

  new Sequelize("crudjson", "root", "12345", {
    host: "localhost",
    dialect: "mysql"
  });

Al iniciar el servidor, Sequelize sincroniza automáticamente los modelos con la
base de datos (db.sync()), creando las tablas si no existen.

TABLAS GENERADAS AUTOMÁTICAMENTE:
  - Users       (id, email, password, createdAt, updatedAt)
  - Extractions (id, text, createdAt, updatedAt)


========================================================
API REST - ENDPOINTS
========================================================

BASE URL: http://localhost:8080

-- AUTENTICACIÓN (/api/auth) --

  POST /api/auth/register
    Descripción: Registra un nuevo usuario.
    Body (JSON): { "email": "...", "password": "..." }
    Respuestas:
      200 -> Objeto del usuario creado
      400 -> Datos incompletos / El usuario ya existe
      500 -> Error interno

  POST /api/auth/login
    Descripción: Inicia sesión con un usuario existente.
    Body (JSON): { "email": "...", "password": "..." }
    Respuestas:
      200 -> Objeto del usuario autenticado
      401 -> Usuario no encontrado / Contraseña incorrecta
      500 -> Error interno

-- OCR (/api/ocr) --

  POST /api/ocr
    Descripción: Recibe una imagen (ticket/recibo), extrae el texto con
                 Tesseract.js y guarda el resultado en la base de datos.
    Content-Type: multipart/form-data
    Campo:        image (archivo de imagen)
    Respuestas:
      200 -> Objeto Extraction con el texto extraído y guardado
      400 -> No se recibió imagen
      500 -> Error en el proceso OCR

-- EXTRACCIONES (/api/extracciones) --

  GET /api/extracciones
    Descripción: Devuelve todas las extracciones OCR almacenadas.
    Respuestas:
      200 -> Array de objetos Extraction

  DELETE /api/extracciones/:id
    Descripción: Elimina una extracción por su ID.
    Respuestas:
      200 -> { "msg": "Extracción eliminada" }
      404 -> No encontrado
      500 -> Error interno


========================================================
SERVIDOR Y PUERTO
========================================================

El servidor Express corre en:  http://localhost:8080

Los archivos estáticos del frontend (carpeta /public) son servidos
directamente por Express mediante express.static.


========================================================
FLUJO GENERAL DE LA APLICACIÓN
========================================================

1. El usuario se registra o inicia sesión desde el frontend React.
2. Sube una imagen de un ticket a través del formulario.
3. La imagen es recibida por Multer y guardada temporalmente en /uploads.
4. Tesseract.js procesa la imagen y extrae el texto en español.
5. El texto extraído se guarda como un registro en la tabla Extractions.
6. El usuario puede consultar todas las extracciones o eliminar las que desee.


========================================================
DEPENDENCIAS PRINCIPALES (npm)
========================================================

  express       -> Framework web para Node.js
  sequelize     -> ORM para MySQL
  mysql2        -> Driver de MySQL requerido por Sequelize
  tesseract.js  -> Motor OCR en JavaScript
  multer        -> Middleware para subida de archivos
  react         -> Librería de UI para el frontend
  react-dom     -> Renderizado de React en el DOM
  bootstrap     -> Estilos CSS del frontend


========================================================
NOTAS ADICIONALES
========================================================

- Las contraseñas se almacenan en texto plano (sin hashing). Se recomienda
  implementar bcrypt para producción.
- No hay implementación de tokens JWT ni sesiones; el login devuelve el objeto
  de usuario directamente.
- Tesseract.js está configurado con el idioma "spa" (español), ideal para
  tickets en México/Latinoamérica.
- Las imágenes subidas quedan almacenadas en la carpeta /uploads del servidor
  y no se eliminan automáticamente tras el procesamiento.

========================================================
