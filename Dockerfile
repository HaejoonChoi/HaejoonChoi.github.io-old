   # Use an official nginx image as a base image
   FROM nginx:alpine

   # Copy the build output to replace the default nginx contents.
   COPY ./dist/haejoon-website /usr/share/nginx/html

   # Expose port 80
   EXPOSE 80

   # Start Nginx server
   CMD ["nginx", "-g", "daemon off;"]
