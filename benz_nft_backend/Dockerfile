# Use the official Golang base image
FROM golang:alpine

ENV DB_USER=user
ENV DB_PASSWORD=Password123
ENV DB_HOST=db
ENV DB_NAME=benz_nft
WORKDIR /app

# Copy the necessary files to the container
COPY . .

EXPOSE 8000

# Build and run the application
CMD ["go", "run", "main.go"]