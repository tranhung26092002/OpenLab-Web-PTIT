# Sử dụng image Node.js chính thức để build ứng dụng
FROM node:20 AS build

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép các file cấu hình của dự án (package.json và package-lock.json nếu có)
COPY package.json package-lock.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Mở cổng 4000 để phục vụ ứng dụng
EXPOSE 4000

# Chạy ứng dụng React/Vite ở chế độ development
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
