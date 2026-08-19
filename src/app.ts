import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorMiddleware } from './presentation/http/middlewares/error.middleware';
import appRoutes from './presentation/http/routes/AppRoutes';

// Cargar las variables de entorno
dotenv.config();

// Crear la aplicación de Express
const app = express();

// *Middlewares Globales
// Permite recibir peticiones desde otros dominios
app.use(cors());

// Agrega cabeceras de seguridad
app.use(helmet());

// Muestra información de las peticiones en consola
app.use(morgan('dev'));

// Permite recibir datos en formato JSON
app.use(express.json());

// Permite recibir datos desde formularios
app.use(express.urlencoded({ extended: true }));

// Route
app.use('/api', appRoutes);

// Middleware centralizado de errores
app.use(errorMiddleware);

// Exportar la aplicación
export default app;
