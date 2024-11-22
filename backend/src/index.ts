import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';

// Define the app with bindings
export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// Add routes
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

// Export the app
export default app;


