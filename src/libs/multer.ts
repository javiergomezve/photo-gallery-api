import path from 'path';
import multer from 'multer';
import { v4 as uuid } from 'uuid';

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));
    },
});

export default multer({ storage });
