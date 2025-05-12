# Usa una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos package.json y package-lock.json (si están presentes)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto en el que la aplicación escuchará (cambia el puerto si es necesario)
EXPOSE 3307

# Comando para iniciar la aplicación
CMD ["npm", "start"]