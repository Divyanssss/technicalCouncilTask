
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY ../frontend/package.json ../frontend/package-lock.json ./
RUN npm install
COPY ../frontend ./
RUN npm run build


FROM node:20-alpine AS backend
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend ./
COPY --from=frontend-build /app/frontend/dist ./dist
EXPOSE 5000
CMD ["npm", "start"] 