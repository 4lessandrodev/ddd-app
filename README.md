# DDD APP

## Simple App

App built using `types-ddd` v3 [Link Here](https://www.npmjs.com/package/types-ddd)

A minimum project to test the domain driven design lib

![](docs/tests-result.png)

### How to run this app

- Install deps

```sh

$ yarn install

```

- Run the tests

```sh

$ yarn test

```

- Run the app

```sh

$ yarn dev

```

- Open your browser

```sh

# List products 

$ curl http://localhost:3000/products | jq '.'

```

```sh

# Create Product

$ curl -X POST -H "Content-Type: application/json" \
-d '{ "name": "valid name", "price": 21.00 }' \
http://localhost:3000/products | jq '.'

```

```sh

# Update Product

$ curl -X PUT -H "Content-Type: application/json" \
-d '{ "name": "new name", "price": 42.00 }' \
http://localhost:3000/products/:id | jq '.'


```
