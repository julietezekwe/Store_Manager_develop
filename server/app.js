import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import routes from './routes/index';
import imageValidator from './middlewares/imageValidator';

const swaggerDocument = require('../swagger.json');

// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Validator to check requests
app.use(expressValidator(imageValidator));


// Versioning and Routes
app.use('/api/v1/', routes);

// Document API with Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Setup a default catch-all route
app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'Page not found',
  });
  next();
});

dotenv.config();
// Listen for requests
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App is running, check me out on http://localhost:${port}`);
});
export default app;
