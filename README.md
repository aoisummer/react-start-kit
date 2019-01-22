# react-start-kit

Basic example to create a React App.

## Features

- Compile ES2015+, React, JSX to ES5 syntax with Babel, also include polyfill.
- Autoprefixed CSS with PostCSS.
- Live development server with hotload.
- Bundle JS, CSS.

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

Sometimes you may want to import react from off-site CDN or a special path, follow below steps:

- Remove those `import` from `main.js`
- Remove `optimization` part from `webpack.config.js`
- Modify your html
