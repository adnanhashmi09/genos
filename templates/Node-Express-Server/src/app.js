const express = require('express');
const Routes = require('./Routes/route');

const app = express();

// middleware
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

// routes
app.use(Routes);
