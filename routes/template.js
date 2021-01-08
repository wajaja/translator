var serialize = require('serialize-javascript');
import { BASE_PATH }       from 'config/api'
var css = process.env.NODE_ENV == 'production' ? BASE_PATH + '/build/css/styles.min.css' : BASE_PATH + '/build/css/styles.css';

export default ({ body, title, bundles, helmet, preloadedState }) => {
    return `
    <!DOCTYPE html>
    <html xmlns:og="http://ogp.me/ns#" ${helmet.htmlAttributes.toString()}>
        <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
            <link href="https://fonts.googleapis.com/css?family=Assistant:300&subset=all" rel="stylesheet">
            <link rel="stylesheet" href="${css}" />
        </head>
        <body ${helmet.bodyAttributes.toString()}>
            <div id="app">${body}</div>
            <script>
              // WARNING: See the following for security issues around embedding JSON in HTML:
              // http://redux.js.org/recipes/ServerRendering.html#security-considerations
              window.__PRELOADED_STATE__ = ${serialize(preloadedState, {isJSON: true})}
            </script>
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
            <script type="text/javascript" src=${BASE_PATH}/build/js/vendor.bundle.js></script>
            ${bundles.map(bundle => {
                return `<script src="${BASE_PATH}/build/js/${bundle.file}"></script>`
                // alternatively if you are using publicPath option in webpack config
                // you can use the publicPath value from bundle, e.g:
                // return `<script src="${bundle.publicPath}"></script>`
            }).join('\n')}
            <script src="${BASE_PATH}/build/js/app.js"></script>
        </body>
    </html>
  `;
};
