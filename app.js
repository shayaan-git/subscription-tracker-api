import express from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js'
import errorMiddleware from './middlewares/error.middleware.js'
import arcjetMiddleware from './middlewares/arcjet.middleware.js'
import workflowRouter from './routes/workflow.routes.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);

// // Health check route - place this BEFORE your API routes
// app.get('/', (req, res) => {
//   res.json({ message: 'API is running successfully!' });
// });

// API routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);

// Error handling middleware should be last
app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Subscription Tracker API</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <div class="container">
            <h1>🔔 Subscription Tracker API</h1>
            
            <div class="status">
                ✅ API is running successfully!
            </div>
            
            <div class="endpoints">
                <h2>📋 Available Endpoints</h2>
                
                <div class="endpoint">
                    <span class="method">POST</span> <code>/api/v1/auth/sign-up</code>
                    <div class="description">Register a new user account</div>
                </div>
                
                <div class="endpoint">
                    <span class="method">POST</span> <code>/api/v1/auth/sign-in</code>
                    <div class="description">Login with existing credentials</div>
                </div>
                
                <div class="endpoint">
                    <span class="method">GET</span> <code>/api/v1/users</code>
                    <div class="description">Get users profile information</div>
                </div>

                <div class="endpoint">
                    <span class="method">GET</span> <code>/api/v1/users/:id</code>
                    <div class="description">Get user profile information</div>
                </div>
                
                
                <div class="endpoint">
                <span class="method">POST</span> <code>/api/v1/subscriptions</code>
                <div class="description">Create a new subscription</div>
                </div>
                
                <div class="endpoint">
                    <span class="method">GET</span> <code>/api/v1/subscriptions</code>
                    <div class="description">Get all user subscriptions</div>
                </div>

                <div class="endpoint">
                    <span class="method">GET</span> <code>/api/v1/workflows</code>
                    <div class="description">Get user workflows</div>
                </div>
            </div>
            
            <div class="note">
                <strong>💡 Development Tip:</strong> Use HTTPie for quick command-line API interactions.
                <br><br>
                <strong>API Playground:</strong> Use this <a href="https://httpie.io/app" target="_blank">Link to HTTPie</a>
                <br><br>
                <strong>Example:</strong> <code> GET https://subscription-tracker-api-m2wh.onrender.com/api/v1/subscriptions Authorization:"Bearer your-token"</code>
                <br><br>
                Go to my GitHub link and copy the JSON data provided in Subscription Model Sample.
                </br><a href = "https://github.com/shayaan-git/subscription-tracker-api" target ="_blank"><em>Github link: </em><mark>Subscription Model Sample</mark></a>
                </div>
            
            <div class="footer">
                <p>🚀 Powered by Node.js & Express | 🛡️ Protected by Arcjet</p>
                <p>📊 MongoDB Database | 🔐 JWT Authentication</p>
                <br><br>
                <p>📧 For support, contact: <a href="https://www.linkedin.com/in/mohdshayaan/" target="_blank">LinkedIn</a></p>
                <p>&copy; 2025 💻 SubDub Forge & Co. | All rights reserved.</p> 
            </div>
        </div>
    </body>
    </html>
  `);
});

app.listen(PORT, async () => {
  console.log('API is connected successfully! ✅');
  console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);
  console.log('Using Arcjet for monitoring and error tracking');
  console.log('Connecting to MongoDB...');

  await connectToDatabase();
});

export default app;