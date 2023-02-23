# PopApp

Install dependencies with:
```sh
npm install
```

Start in development mode:

```sh
npm run dev
```
## General info
Application created with:
```sh
npx express-generator popapp --ejs
```

## Start a MongoDB Server in MacOS or Linux

```sh
./bin/mongod --dbpath ./data
```


## Start a MongoDB Server in WSL
In root directory type
```sh
sudo mkdir -p data/db
sudo chown -R `id -un` data/db
```
Then to start the server
```sh
mongod
```
To use MongoDB shell
```
mongo
```

## API Methods

### GET /api/advertisements
Returns all the advertisements list
```sh
"results": [
        {
            "_id": "63f51aa7e39d9030cd6dead9",
            "name": "bicicleta",
            "sell": true,
            "price": 230.15,
            "photo": "bici.jpg",
            "tags": [
                "lifestyle",
                "motor"
            ]
        },
            ...
```

### //GET /api/advertisements/(_id)

Returns only the advertisement asked by id
```sh
{
            "_id": "63f51b9be39d9030cd6deada",
            "name": "iphone3gs",
            "sell": false,
            "price": 50,
            "photo": "iphone.jpg",
            "tags": [
                "lifestyle",
                "mobile"
            ]
        }
```