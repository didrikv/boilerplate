import {renderToString} from 'react-dom/server'
import store from "./src/app/store.js"
import App from "./src/app/app.js"

const preloadedState = store.getState()
const html = renderToString( <App /> )

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css">
	<link rel="stylesheet" href="./react-bootstrap-table-all.min.css">
      <head>
        <title>Redux Universal Example</title>
		<meta charset="UTF-8">
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>
    `
}
