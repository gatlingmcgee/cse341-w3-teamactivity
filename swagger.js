const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'Users API',
      description: 'Users API',
    },
    host: 'localhost:8080',
    schemes: ['http', 'https'],
  };
  
  const outputFile = './swagger.json';
  const endpointsFiles = ['./routes/index.js'];
  
swaggerAutogen(outputFile, endpointsFiles, doc);