# Use an official Node.js runtime as a parent image
FROM node:22.3.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 (or the port your app is listening on)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]