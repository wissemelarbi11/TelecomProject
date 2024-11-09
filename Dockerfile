FROM node:20.5.0-alpine AS build
RUN mkdir -p /app
# Create a Virtual directory inside the docker image
WORKDIR /app
# Copy files to virtual directory
COPY package.json package-lock.json ./
# Run command in Virtual directory
RUN npm cache clean --force
# Copy files from local machine to virtual directory in docker image
COPY . .
RUN npm install --force
RUN npm run build --prod

### STAGE 2: RUN ###
FROM nginx:alpine
# Set the working directory
WORKDIR /usr/share/nginx/html
# Copy the built Angular app files from the build stage
COPY --from=build /app/dist/angular-front .