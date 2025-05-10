# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock into the container
COPY package.json yarn.lock ./

# Install the app dependencies using Yarn
RUN yarn install --production

# Copy the rest of your application’s source code into the container
COPY . .

# Build the Next.js app for production
RUN yarn build

# Expose the port the app will run on (default for Next.js is 3000)
EXPOSE 3000

# Start the Next.js app when the container runs
CMD ["yarn", "start"]
