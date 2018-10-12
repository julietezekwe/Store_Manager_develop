import app from './server/index';
import dotenv from "dotenv";
dotenv.config();
// Listen for requests
const port = process.env.PORT;
app.listen(port, () => {
	console.log(`App is running, check me out on http://localhost:${port}`);
})

export default app;
