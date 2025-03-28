import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'url'; 

// __dirname o'rniga fileURLToPath dan foydalanamiz
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

export const saveFile = async (file) => {
  console.log('file', file);
  try {
    const fileName = `${uuid()}.jpg`;
    const currentDir = __dirname;
    const staticDir = path.join(currentDir, '..', 'static');
    const filePath = path.join(staticDir, fileName);

    if (!fs.existsSync(staticDir)) {
      fs.mkdirSync(staticDir, { recursive: true });
    }

    // Faylni saqlash
    file.mv(filePath); // express-fileupload uchun

    return fileName;
  } catch (error) {
    throw new Error(`Error saving file: ${error}`);
  }
};
