import express from 'express'
import "dotenv/config"
import { auth } from './lib/auth.js';
import { toNodeHandler } from 'better-auth/node';
import cors from 'cors'
import { registerRoutes } from './routs/index.js';
import { errorHandler } from './middleware/error-handler.middleware.js';
import { serve } from 'inngest/express'
import { inngest } from './inngest/client.js';
import { functions } from './inngest/index.js'
const app = express();//express initialize
const PORT = process.env.PORT;
const clientUrl = process.env.CLIENT_URL ?? "http://localhost:3001";
app.use(
    cors({
        origin: clientUrl,
        credentials: true,
    }),
)

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());

app.use("/api/inngest", serve({ client: inngest, functions}))
app.get("/",( req , res ) =>{
    res.send("NoMercey...")
})
app.get("/health",( req , res ) => {
    res.json({ status: "ok" });
})

registerRoutes(app);
app.use(errorHandler)
app.listen( PORT , () => {
    console.log(`Server running on http://localhost:${PORT}`);
})

