const http = require('http');
const app= require('./app');

const port= process.env.PORT || 8400;

const server= http.createServer(app);
server.listen(8400, console.log(`app is running at ${port}`));
