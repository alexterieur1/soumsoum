const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'video/mp4': 'mp4'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    callback(null, req.body.categorie + '_' + req.body.nomProduit + '_' + Date.now() + '.' + extension);
  }
});
module.exports = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Limite de taille du fichier à 10 Mo
    fieldSize: 10* 1024 * 1024, // Limite de taille du champ en octets (ici, 1 Mo)
  }
}).fields(
  [
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
    { name: 'imageposter', maxCount: 1 }
  ]);