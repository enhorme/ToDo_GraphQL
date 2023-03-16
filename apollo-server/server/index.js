import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import resolvers from './resolvers.js';
import typeDefs from './typeDefs.js';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose'

async function initServer() {
    const app = express();
    app.use(cors());
    dotenv.config();
    const apolloServer = new ApolloServer({typeDefs,resolvers});
    await apolloServer.start();
    apolloServer.applyMiddleware({app})
    app.use((req,res)=>{
        res.send('server is started')
    });
    const PORT = process.env.PORT || 5000;
    try {
       await mongoose.connect(process.env.mongodb)
        console.log('Connected to MONGODB')
    } catch (e) {
         console.log(e)
    }
    app.listen(PORT, ()=>console.log(`Server is running on PORT ${PORT}`))
}

initServer()