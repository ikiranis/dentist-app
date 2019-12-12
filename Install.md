# Complete installation of Dentist App

# Install prod server

## Install Docker

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable edge"
sudo apt install -y docker-ce docker-compose
sudo usermod -aG docker ${USER}
su ${USER}
```

## Install npm

https://github.com/nodesource/distributions/blob/master/README.md#debinstall

```
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

sudo apt-get install -y nodejs
```

## Install Vue

```
sudo npm install -g @vue/cli
```


## Install php/composer

```
sudo apt install php7.3 php7.3-mysql libapache2-mod-php7.3 php7.3-mbstring php7.3-xml -y
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
sudo apt remove apache2 -y
```

## Install dentist app

``
git clone git@github.com:ikiranis/apache-for-vue-app.git .
``

**Edit .env file**

``
docker-compose build && docker-compose up -d
``

**Clone app files at /www folder**

``
git clone git@github.com:ikiranis/dentist-app.git .
``

**Install npm depedencies**

``
npm install
npm install --only=prod (on production)
``

**Create and edit .env files**

```
cp .env.production.example .env.production
nano .env.production
```

**Build app**

``
npm run build
``

## Install dentist api

```
git clone git@github.com:ikiranis/apache-mysql-for-laravel.git
```

**Edit .env and docker-compose.yml files with your settings**

``
docker-compose build && docker-compose up -d
``

**Put your laravel application files in /www folder**

```
git clone git@github.com:ikiranis/dentist-api.git .
```

**Edit .env**

At the host you must set the external ip of the server

**Install laravel depedencies**

```
composer install
```

**Generate key**

```
php artisan key:generate 
```

**Give permissions to storage directory**

**Install passport and take keys**

```
php artisan migrate

php artisan passport:install

php artisan db:seed --class=DentistSeeder
```

**Save the key for the app .env file**

**Fix storage permissions**

```
sudo chmod 777 storage/ -R
```

# Install develop env

Just git clone app and api source code, install the dependencies (npm/composer).

Run for api

```
php artisan serve
```

Run for app

```
npm run serve
```

