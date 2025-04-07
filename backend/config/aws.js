const AWS = require('aws-sdk');
require('dotenv').config();

// Конфигурация AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT, // Опционально, для S3-совместимых хранилищ
  s3ForcePathStyle: true, // Необходимо для S3-совместимых хранилищ
  signatureVersion: 'v4'
});

// Создание экземпляра S3
const s3 = new AWS.S3();

// Функция для загрузки файла в S3
const uploadToS3 = async (file, folder = 'uploads') => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${folder}/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read' // или 'private' для приватных файлов
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location; // Возвращает публичный URL файла
  } catch (err) {
    console.error('S3 Upload Error:', err);
    throw new Error('Failed to upload file to S3');
  }
};

// Функция для удаления файла из S3
const deleteFromS3 = async (fileUrl) => {
  const key = new URL(fileUrl).pathname.substring(1); // Извлекаем ключ из URL

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key
  };

  try {
    await s3.deleteObject(params).promise();
    return true;
  } catch (err) {
    console.error('S3 Delete Error:', err);
    throw new Error('Failed to delete file from S3');
  }
};

// Функция для генерации подписанного URL (для временного доступа к приватным файлам)
const getSignedUrl = async (fileKey, expires = 3600) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey,
    Expires: expires // Время жизни URL в секундах
  };

  try {
    return await s3.getSignedUrlPromise('getObject', params);
  } catch (err) {
    console.error('S3 Signed URL Error:', err);
    throw new Error('Failed to generate signed URL');
  }
};

module.exports = {
  s3,
  uploadToS3,
  deleteFromS3,
  getSignedUrl
};