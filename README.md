# PopApp

Install dependencies with:
```sh
npm install
```
Initialize DB with:
```sh
npm run initDB
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


## Start a MongoDB Server in WSL2
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
### GET /api/advertisements/tags
Returns an array of tags available
```sh
"results": [
        "lifestyle",
        "motor",
        "mobile"
    ]
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
### //GET /api/advertisements?name=nameProduct
To search advertisements by name of product

available names: (bicicleta, iphone3gs, plumbus, mr.meeseks box, space ship)

### //GET /api/advertisements?tag=tagName
To search advertisements by tags

available tags: (lifestyle, motor, mobile)

### //GET /api/advertisements?sell=true
to search only SELLING 

### //GET /api/advertisements?sell=false
to search only BUYING 

### Pagination and skip
to restrict the amount of advertisements loaded:
```sh
/api/advertisements?limit=Number
```
to skip a number of advertisements:
```sh
/api/advertisements?skip=Number
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

## FRONTEND
### http://localhost:3000
To get a list of advertisements

query string with parameters

to search a product by name:
```sh
http://localhost:3000?name=nameProduct
```

available names: (bicicleta, iphone3gs, plumbus, mr.meeseks box, space ship)

To search advertisements by tags:
```sh
http://localhost:3000?tag=tagName
```

available tags: (lifestyle, motor, mobile)

to search only SELLING adds:
```sh
http://localhost:3000?sell=true
```

to search only BUYING adds:
```sh
http://localhost:3000?sell=false
```

to restrict the amount of advertisements loaded:
```sh
http://localhost:3000?limit=Number
```

to skip a number of advertisements:
```sh
http://localhost:3000?skip=Number
```