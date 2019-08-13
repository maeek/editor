# Editor
Source files for file editor application, based on codemirror library built with Vue and integrated with gist.github.com

### Preview
[Live preview](https://editor.eswomp.it)
![Editor preview desktop](https://raw.githubusercontent.com/maeek/editor/master/src/assets/preview.png)
![Editor preview mobile](https://raw.githubusercontent.com/maeek/editor/master/src/assets/preview_m.png)

### TODO
  - Downloading files
  - Star gist in editor view
  - Create new gist from files (drag and drop or manual selecion)
  - Modifying gists (file names, public/private etc.)
  - User gists pages
  - Load only focused files
  - Revisions
  - Comments

## Installing
To setup login with github you need to provide api key for oauth.io in `src/state/session.js` - `state.api_key`
```
npm install
```

### Run
```
npm run start
```

### Compile for production
```
npm run build
```
