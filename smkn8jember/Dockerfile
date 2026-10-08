FROM php:8.2-cli

# Install dependencies sistem yang dibutuhkan Laravel
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libpq-dev

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions untuk MySQL/Postgres
RUN docker-php-ext-install pdo_mysql pdo_pgsql mbstring exif pcntl bcmath gd

# Install Composer resmi dari image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Tentukan direktori kerja di dalam container
WORKDIR /app

# Salin seluruh isi folder smkn8jemberAPI ke dalam container
COPY . /app

# Jalankan composer install untuk menginstal dependencies vendor
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Berikan izin akses folder storage dan bootstrap/cache
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache \
    && chmod -R 775 /app/storage /app/bootstrap/cache

# Port default Laravel built-in server
EXPOSE 8000

# Jalankan server Laravel saat container menyala
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]