const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../config/aws');
require('dotenv').config();

// Настройка загрузки файлов в S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const folder = req.params.folder || 'misc';
      const filename = Date.now().toString() + '-' + file.originalname;
      cb(null, `${folder}/${filename}`);
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Разрешены только изображения'), false);
    }
  }
});

// Функция для загрузки одного файла
exports.uploadSingle = (fieldName, folder) => {
  return (req, res, next) => {
    const uploadMiddleware = upload.single(fieldName);
    req.params.folder = folder;
    uploadMiddleware(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  };
};

// Функция для получения URL файла после загрузки
exports.getFileUrl = (file) => {
  if (!file) return null;
  return file.location;
};