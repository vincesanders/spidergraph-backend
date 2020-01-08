const server = require('./server');
const port = process.env.PORT || 4000;

server.listen(port,()=>{
    console.log(`/*** Server is listening on port ${port} ***/`);
    console.log(`/*** Current Environment is ${process.env.DB_ENV} ***/`)
});