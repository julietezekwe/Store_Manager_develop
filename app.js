import dotenv from 'dotenv';
import app from './server/index';

dotenv.config();
const newLocal = process.env.PORT;
// Listen for requests
const port = newLocal;
app.listen(port, () => {
  console.log(`App is running, check me out on http://localhost:${port}`);
});

export default app;
