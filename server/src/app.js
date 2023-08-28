const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const routes = require('./Routes/fileRoute')
const app = express();
const PORT = 3001;


// Configurar express-fileupload
app.use(fileUpload({
  createParentPath: true
}));

app.use(routes);

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
