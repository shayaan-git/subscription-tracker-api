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
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: #333;
                min-height: 100vh;
            }
            .container {
                max-width: 800px;
                margin: 0 auto;
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            }
            h1 {
                color: #2c3e50;
                text-align: center;
                margin-bottom: 30px;
                font-size: 2.5em;
            }
            .status {
                background: #d4edda;
                border: 1px solid #c3e6cb;
                border-radius: 5px;
                padding: 15px;
                margin: 20px 0;
                text-align: center;
                color: #155724;
                font-weight: bold;
            }
            .endpoints {
                background: #f8f9fa;
                border-radius: 5px;
                padding: 20px;
                margin: 20px 0;
            }
            .endpoint {
                margin: 10px 0;
                padding: 10px;
                background: white;
                border-left: 4px solid #667eea;
                border-radius: 3px;
            }
            .method {
                font-weight: bold;
                color: #667eea;
                margin-right: 10px;
            }
            .description {
                color: #666;
                font-size: 0.9em;
                margin-top: 5px;
            }
            .note {
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 5px;
                padding: 15px;
                margin: 20px 0;
                color: #856404;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                color: #666;
                font-size: 0.9em;
            }
        </style>
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
                <br>
                Go to my GitHub link and copy the JSON data provided.
                </br><a href = "https://github.com/shayaan-git/subscription-tracker-api" target ="_blank"><em>Github link: </em><mark>Subscription Model Sample</mark></a>
                </div>
            
            <div class="footer">
                <p>🚀 Powered by Node.js & Express | 🛡️ Protected by Arcjet</p>
                <p>📊 MongoDB Database | 🔐 JWT Authentication</p>
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