# langai-node

A LangAI API client written in Node.js.

Check the [API Docs](https://docs.lang.ai) and the [Developer site](https://lang.ai/developers) for more info on how to use and integrate the API.

> To work with the LangAI API, you must have a token. If you don't have a token already, [request an invite](https://lang.ai/developers).

## Installation

Install [`langai-node`](https://www.npmjs.com/package/langai-node) in your Node.js project with npm.

```
npm install -save langai-node
```

```
yarn add langai-node
```

See the example below on how to require and use the LangAI API to analyze intents in new texts. A projectId is required. Check the [`workflow`](https://docs.lang.ai/#workflow) documentation to get an overview of the process.

## Usage

```javascript
import Lang from 'langai-node';
// or
// const Lang = require('langai-node').default;

const lang = new Lang({
	token: 'your-token',
});

lang
	.analyze({
		text: 'your-text',
		projectId: 'your-projectId',
	})
	.then(data => {
		console.log(data);
	})
	.catch(err => {
		console.log(err);
	});
```

> Note: This feature[`import`] is only just beginning to be implemented in browsers natively at this time. It is implemented in many transpilers, such as TypeScript and Babel, and bundlers such as Rollup, Webpack and Parcel.
