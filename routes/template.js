var serialize = require('serialize-javascript');
var css = process.env.NODE_ENV == 'PRODUCTION' ? '/css/styles.min.css' : '/css/styles.css';

export default ({ body, title, preloadedState }) => {
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <title>${title}</title>
            <meta charset="UTF-8">
            <meta http-equiv="Content-Type" content="text/html">
            <meta name="viewport" content="initial-scale=1.0">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
            <link href="https://fonts.googleapis.com/css?family=Assistant:300&subset=all" rel="stylesheet">
            <link rel="stylesheet" href=${css} />
        </head>
        <body>
            <div id="app">${body}</div>
            <script>
              // WARNING: See the following for security issues around embedding JSON in HTML:
              // http://redux.js.org/recipes/ServerRendering.html#security-considerations
              window.__PRELOADED_STATE__ = ${serialize(preloadedState, {isJSON: true})}
            </script>
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
            <script src="build/js/app.js"></script>
        </body>
    </html>
  `;
};
