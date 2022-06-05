# PoiBee Overpass

## Setup
```nvm use 12```

## Build / start server
```npm run build```
```npm run start```

## Swagger-UI
```http://localhost:3000/api/```

## Test execution
```npm run test```
```npm run test:e2e```

## Docker
```docker build -t poibee-overpass .```
```docker images```
```docker run -p 55555:3000 -d --name poibee-overpass-app poibee-overpass```
