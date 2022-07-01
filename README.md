# Image Processing API

## Features

- Resize image
- Blur/Sharp image quality
- Convert image format type

## API Reference

#### process image

```http
  GET /image
```

| Parameter  | Type     | Description                                              |
| :--------- | :------- | :------------------------------------------------------- |
| `filename` | `string` | **Required**. filename of image that you want to process |
| `width`    | `number` | **Optional**. width of processed image                   |
| `height`   | `number` | **Optional**. height of processed image                  |
| `format`   | `string` | **Optional**. file type of processed image               |

## Tech Stack

**Server:** Typescript, Node, Express, Sharp

## Authors

- [@dgcp3](https://www.github.com/dgcp3)
