import path from 'path';
import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import { options } from './swaggerOptions';
import passportMiddleware from './middlewares/passport';
import photoRoutes from './routes/photo.routes';
import authRoutes from './routes/auth.routes';

const app = express();

// settings
app.set('port', process.env.PORT || 4000);

// middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

const specs = swaggerJsDoc(options);

// routes
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api', photoRoutes);
app.use('/api', authRoutes);

// folder for upload public files
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;
