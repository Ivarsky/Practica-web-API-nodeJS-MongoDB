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
