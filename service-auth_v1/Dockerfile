FROM node:10

# App directory
WORKDIR /app

# Copy source code
COPY ./src ./

# Install dependencies
RUN npm install

EXPOSE 3005
CMD ["node", "/app/bin/www"]