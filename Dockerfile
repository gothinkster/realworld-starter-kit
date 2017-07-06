FROM php:7.1-apache

RUN a2enmod rewrite

# Packages & PHP Extensions
RUN apt-get update && \
  DEBIAN_FRONTEND=noninteractive apt-get install -y \
    libbz2-dev \
    libmcrypt-dev \
    zlib1g-dev \
    libpq-dev \
    libfreetype6-dev \
    libpng12-dev \
    libjpeg62-turbo-dev \
    git \
    gdebi --no-install-recommends \
    pdftk \
    libicu-dev \
    g++ \
  && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
  && docker-php-ext-configure intl \
  && docker-php-ext-install gd pdo_mysql mcrypt zip bz2 mbstring intl \
  && apt-get purge -y gdebi \
  && SUDO_FORCE_REMOVE=yes apt-get autoremove -y \
  && rm -r /var/lib/apt/lists/*

# Memory Limit
RUN echo "memory_limit=1024M" > $PHP_INI_DIR/conf.d/memory-limit.ini
RUN echo "upload_max_filesize=10M" > $PHP_INI_DIR/conf.d/upload-max-filesize.ini
RUN echo "post_max_size=10M" > $PHP_INI_DIR/conf.d/post-max-size.ini

# Time Zone
RUN echo "Europe/Berlin" > /etc/timezone && dpkg-reconfigure -f noninteractive tzdata
RUN echo "date.timezone=Europe/Berlin" > $PHP_INI_DIR/conf.d/date_timezone.ini

# Environmental Variables
ENV COMPOSER_HOME /root/composer
ENV COMPOSER_VERSION master
ENV COMPOSER_ALLOW_SUPERUSER 1

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer config --global github-protocols https
RUN composer global require "fxp/composer-asset-plugin:~1.3.1"

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer global require "fxp/composer-asset-plugin:~1.3.1"

RUN mkdir -p /data/vendor
RUN ln -sf /data/vendor /var/www/html/vendor

COPY composer.json /var/www/html/
RUN composer install --prefer-dist --no-interaction
COPY . /var/www/html

RUN mkdir -p /data/assets \
  && mkdir -p /data/runtime \
  && chown www-data /data/assets \
  && chown www-data /data/runtime \
  && rm -r /var/www/html/runtime \
  && ln -sf /data/assets /var/www/html/web/assets \
  && ln -sf /data/runtime /var/www/html/runtime

ENTRYPOINT ["./entry_script.sh"]
CMD ["apache2-foreground"]
