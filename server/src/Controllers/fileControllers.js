//require('dotenv').config();
const path = require('path');
require('dotenv').config();
const fs = require('fs');
const ruta = process.env.ruta



module.exports = {
    get: async (req, res) => {

        fs.readdir(ruta, (err, files) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json({ files });
        });
    },
    uploadArchivo: async (req, res) => {
        console.log(req.files)
        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send({
                    message: "No se subió el archivo"
                });
            }

            const file = req.files.file;
            //const uploadPath = path.join(__dirname, '../uploads', file.name);
            const ruta= process.env.ruta;
            const uploadPath = path.join(ruta, file.name);
            //const uploadPath = path.join('/home/revvitx/Documentos/nube', file.name);

            await new Promise((resolve, reject) => {
                file.mv(uploadPath, function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });

            console.log(req.files);
            res.json({ message: 'File uploaded successfully.' });  // Devuelve una respuesta JSON

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: error.message
            });
        }
    }
};