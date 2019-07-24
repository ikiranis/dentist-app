# Dentist App Frontend

### Install prod server

``
git clone git@github.com:ikiranis/apache-for-vue-app.git .
``

- Edit .env file

``
docker-compose up -d
``

- Clone app files at /www folder

``
git clone git@github.com:ikiranis/dentist-app.git .
``

- Install npm depedencies

``
npm install
``

# Create and edit .env files

# Build app

``
npm run build
``

# Build and run node/vue docker environment

``
docker-compose build
``

``
docker-compose run --rm --service-ports nod_dev_env
``

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
