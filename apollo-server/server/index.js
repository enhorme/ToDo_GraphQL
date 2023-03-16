import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import resolvers from './resolvers.js';
import typeDefs from './typeDefs.js';

async function initServer() {
    const app = express();
    const apolloServer = new ApolloServer({typeDefs,resolvers});
    await apolloServer.start();
    apolloServer.applyMiddleware({app})
    app.use((req,res)=>{
        res.send('server is started')
    })
    const PORT = process.env.PORT || 5000
    app.listen(PORT, ()=>console.log(`Server is running on PORT ${PORT}`))
}

initServer()