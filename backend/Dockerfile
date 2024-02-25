# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /backend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install

# Bundle app source
COPY . .

# Make port available to the world outside this container
EXPOSE 8080

# Build the app 
# RUN npm run build

# Run the app when the container launches
CMD ["npm", "run", "dev"]
