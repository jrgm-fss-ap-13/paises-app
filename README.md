# CountryApp 🌍

Aplicación web desarrollada con Angular para buscar y explorar información de países de todo el mundo. Utiliza la API de REST Countries para obtener datos actualizados sobre países, sus capitales, regiones y más.

## 📋 Descripción del Proyecto

CountryApp es una aplicación SPA (Single Page Application) que permite a los usuarios:
- Buscar países por nombre
- Buscar países por capital
- Explorar países por región
- Ver información detallada de cada país
- Guardar países favoritos

La aplicación consume la API pública de [REST Countries](https://restcountries.com/) para obtener información actualizada sobre los países del mundo.

## ✨ Características

- 🔍 **Búsqueda por nombre de país**: Encuentra países escribiendo su nombre
- 🏛️ **Búsqueda por capital**: Busca países a través de sus capitales
- 🌎 **Búsqueda por región**: Explora países agrupados por regiones geográficas
- ⭐ **Sistema de favoritos**: Guarda tus países favoritos para acceso rápido
- 📱 **Diseño responsive**: Interfaz adaptable a diferentes tamaños de pantalla
- ⚡ **Caché de consultas**: Optimización de rendimiento mediante caché de búsquedas

## 🛠️ Tecnologías Utilizadas

- **Angular** 19.0.0
- **TypeScript** 5.6.2
- **Tailwind CSS** 3.4.17
- **DaisyUI** 4.12.24
- **RxJS** 7.8.0
- **Angular Router** para navegación
- **HTTP Client** para consumo de APIs

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** (viene incluido con Node.js) o **yarn**

Puedes verificar las versiones instaladas ejecutando:

```bash
node --version
npm --version
```

## 🚀 Instalación

1. **Clona el repositorio** (o navega a la carpeta del proyecto):

```bash
cd 04-country-app
```

2. **Instala las dependencias**:

```bash
npm install
```

Este comando instalará todas las dependencias necesarias definidas en `package.json`.

## ▶️ Cómo Levantar el Proyecto

Una vez instaladas las dependencias, puedes levantar el proyecto de desarrollo de las siguientes formas:

### Opción 1: Usando npm start

```bash
npm start
```

### Opción 2: Usando Angular CLI directamente

```bash
ng serve
```
