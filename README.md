# Tecnologym - Backend

## Descripción

**Tecnologym** es un proyecto de comercio electrónico orientado a la venta de productos para gimnasios. Este repositorio corresponde al desarrollo del backend utilizando **Node.js**, **TypeScript** y **TypeORM**, siguiendo una arquitectura por capas que facilita el mantenimiento, la escalabilidad y la organización del código.

---

## Tecnologías utilizadas

- Node.js
- TypeScript
- Express.js
- PostgreSQL (Supabase)
- TypeORM
- Zod
- bcrypt
- JSON Web Token (JWT)
- dotenv

---

## Arquitectura del proyecto

El proyecto está organizado siguiendo una arquitectura por capas, separando las responsabilidades en diferentes módulos:

```text
src
│
├── config/          # Configuración de la aplicación y base de datos
├── controllers/     # Controladores de la API
├── dtos/            # Objetos de transferencia de datos
├── entities/        # Entidades de TypeORM
├── middlewares/     # Middlewares (validación, manejo de errores, etc.)
├── mappers/         # Conversión entre entidades y DTOs
├── repositories/    # Acceso a datos
├── routes/          # Definición de rutas
├── services/        # Lógica de negocio
├── utils/           # Funciones auxiliares
└── server.ts        # Punto de entrada de la aplicación
```

---

## Funcionalidades implementadas

### Módulo de Autenticación

Actualmente se encuentra implementado el módulo de autenticación, el cual incluye:

- Registro de usuarios.
- Inicio de sesión.
- Validación de datos mediante Zod.
- Encriptación de contraseñas utilizando bcrypt.
- Verificación de usuarios existentes.
- Generación de tokens JWT.
- Respuestas estructuradas para la API.

---

## Base de datos

Se configuró la conexión con **Supabase PostgreSQL** utilizando **TypeORM**.

Actualmente se encuentran implementadas las siguientes entidades:

- Roles
- Usuarios

También se configuró el sistema de migraciones para la creación y administración de la base de datos.

---

## Buenas prácticas implementadas

- Arquitectura por capas.
- Separación de responsabilidades.
- Uso de DTOs para validación de datos.
- Uso de Mappers para transformar entidades en respuestas.
- Repositorios para el acceso a la base de datos.
- Variables de entorno mediante dotenv.
- Validación de configuración utilizando Zod.
- Manejo centralizado de errores.
- Contraseñas almacenadas de forma segura mediante bcrypt.

---

## Estado actual del proyecto

En esta etapa del desarrollo se encuentra finalizado el módulo de autenticación y la configuración inicial de la base de datos.

Los próximos módulos que se implementarán son:

- Gestión de categorías.
- Gestión de productos.
- Gestión de usuarios.
- Carrito de compras.
- Pedidos.
- Historial de compras.
- Reportes.
- Autorización basada en roles y permisos.
- Documentación de la API.

---

## Objetivo del proyecto

Desarrollar un backend seguro, escalable y mantenible para un sistema de comercio electrónico especializado en productos para gimnasios, aplicando buenas prácticas de desarrollo de software y tecnologías modernas del ecosistema de Node.js.

---

## Autor

Proyecto desarrollado como evidencia de formación del **SENA** dentro del desarrollo del proyecto **Tecnologym**.
