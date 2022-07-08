
# Image Processing API



## Run Locally

Clone the project

```bash
  git clone https://github.com/DGCP3/Image-Processing-API.git
```

Go to the project directory

```bash
  cd Image-Processing-API
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
For testing

```bash
  npm test
```


## Features

- Resize image
- Blur/Sharp image quality
- Convert image format type
- Other things that shap can handle

## API Reference


#### Image processing route

```http
  GET /image
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `filename` | `string` | **Required**. filename of image that you want to process |
| `width`    | `number` | **Optional**. width of processed image |
| `height`   | `number` | **Optional**. height of processed image|
| `format`   | `string` | **Optional**. file type of processed image|

#### Health check

```http
  GET /
```
*Return 200 if server is up and running*


## Tech Stack

**Server:** Typescript, Node, Express, Sharp


## Authors

- [@dgcp3](https://www.github.com/dgcp3)

