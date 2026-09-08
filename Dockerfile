# ==========================================
# ETAPA 1: Construcción del frontend
# ==========================================
FROM node:20-alpine AS build

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Generar producción
RUN npm run build


# ==========================================
# ETAPA 2: Servir frontend con Nginx
# ==========================================
FROM nginx:alpine

# Eliminar configuración por defecto
RUN rm -rf /usr/share/nginx/html/*

# Copiar el dist generado en la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Puerto interno de Nginx
EXPOSE 80

# Ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]