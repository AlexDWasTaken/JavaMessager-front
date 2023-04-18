# JavaMessagerFront

The front-end project of JavaMessager for CSC1004 (2023 Spring) grading.

## Regarding code comments:

Most of the code is self-explanatory. I only commented some Regex and anonymous functions. 


## Regarding the structure of the project:

- All the views are stored in /src/views. Except TestView.vue, all other views are used.
- The /src/router/index.js contains the router.
- src/assets guarantees a good experiencing when debugging. It does nothing when the program runs smoothly.

I didn't add anything special to index.html, main.js and App.vue.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

Make sure you have run this at least one time. You need npm installed (which comes with nodeJS)

### Compile and Hot-Reload for Development

Type the following command:
```sh
npm run dev
```
Then press 'o' to open up the browser automatically.

### Compile and Minify for Production

```sh
npm run build
```
