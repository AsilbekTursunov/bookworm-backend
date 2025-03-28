import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'url';

// __dirname o'rniga fileURLToPath dan foydalanamiz
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOAD_DIR = path.join(__dirname, '../uploads');
export async function saveImage(base64String) {

  // Agar uploads papkasi yo'q bo'lsa, yaratish
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  try {
    const match = base64String.match(/^data:(image\/\w+);base64,/);
    if (!match) throw new Error('Invalid image format');

    const mimeType = match[1];
    const extension = mimeType.split('/')[1];

    const fileName = `${uuid()}.${extension}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    fs.writeFileSync(filePath, buffer);

    return `${process.env.DOMAIN_URL}/uploads/${fileName}`
  } catch (error) {
    console.error('Error saving image:', error);
    return null;
  }
}

export const deleteImage = async (imageId) => {
  try {
    const imagePath = path.join(__dirname, '../uploads', imageId); // Rasm manzilini aniqlash 
    // Fayl bor yoki yo'qligini tekshirish
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath); // Faylni o'chirish 
    }
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};

export const getImageNameFromUrl = (url) => {
  return url.split('/').pop(); // Oxirgi qismni ajratib oladi
};