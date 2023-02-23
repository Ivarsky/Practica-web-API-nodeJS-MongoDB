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

### //PUT /api/advertisements:(id) (body)
Update advertisement with new parameters added in the body
```sh
{
    "result": {
        "_id": "63f51aa7e39d9030cd6dead9",
        "name": "bicicleta",
        "sell": true,
        "price": 230.15,
        "photo": "bici.jpg",
        "tags": [
            "lifestyle",
            "motor"
        ]
    }
}

```
to

```sh
{
    "result": {
        "_id": "63f51aa7e39d9030cd6dead9",
        "name": "bicicleta",
        "sell": true,
        "price": 150,
        "photo": "bici.jpg",
        "tags": [
            "lifestyle",
            "motor"
        ]
    }
}
```
parameter "price" changed.

### //POST /api/advertisements (body)
Create a new advertisement sending a POST pettition through API inserting in the body the parameters and the new values of them (use x-www-form-urlencoded)

```sh
{
    "result": {
        "name": "ItemName",
        "sell": true or false,
        "price": PriceNumber,
        "photo": "Photofile.jpg",
        "tags": [tag, tag],
        "_id": "id",
        "__v": 0
    }
}
```

### //DELETE /api/advertisements/:(id)
Delete an advertisement sending a DELETE petition inserting in the url the id of the advertisement you want to delete.