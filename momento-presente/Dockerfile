# Usa la imagen oficial de Nginx.
FROM nginx:alpine

# Copia todos los archivos de tu sitio a la carpeta pública.
COPY . /usr/share/nginx/html

# Copia nuestro archivo de configuración personalizado, reemplazando el de por defecto.
COPY nginx.conf /etc/nginx/conf.d/default.conf