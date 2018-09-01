# react-start-kit

Basic example to create a React App.

## Usage

### Install

Download or clone this repo.

```
npm install
npm start
```

### Build for production

```
npm run build
```

### Without vendor bundle

Sometimes you may want to import react from CDN or a special path, follow below steps:

- Remove those `import` from `main.js`
- Remove `optimization` part from `webpack.common.js`
- Modify your html
