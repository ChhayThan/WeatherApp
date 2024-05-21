# webpackTemplate

Includes ESLint

## Commands

### Start

1. npm init -y
2. npm install

### Scripts

1. npm run build
   - builds and run the production config
2. npm start
   - "webpack serve --open" Opens webpack-dev-server
3. npm watch
   - "webpack --watch" Watches all files within dependency graph for changes and auto builds

### Publish to github pages

#### Step 1

Remove the `dist` directory from the project’s `.gitignore` file (it’s ignored by default by Yeoman).

#### Step 2

Make sure git knows about your subtree (the subfolder with your site).

```sh
git add dist && git commit -m "Initial dist subtree commit"
```

#### Step 3

Use subtree push to send it to the `gh-pages` branch on GitHub.

```sh
git subtree push --prefix dist origin gh-pages
```

Boom. If your folder isn’t called `dist`, then you’ll need to change that in each of the commands above.

### Script

Each time you need to update your project’s live preview:

```sh
npm run gh-page
```

#### ESLint commands

```sh
npx eslint yourfile.js
```
