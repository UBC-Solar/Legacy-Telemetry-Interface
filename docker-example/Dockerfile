FROM node:14

# Moves into the node folder
WORKDIR /usr/src/app

# Copies package files and install dependencies
COPY package*.json ./
RUN npm install

# Copies all required files for web server
COPY . .

# Allows acces to on port 3000
EXPOSE 3000

# Runs the applications
CMD ["npm", "start"]