const express = require("express")
const { ApolloServer, gql } = require("apollo-server-express");
const db = require("./db");
require("dotenv").config();
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const models = require("./models");
const jwt = require("jsonwebtoken")
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;
const helmet = require("helmet")
const cors = require("cors")
console.log(DB_HOST)

db.connect(DB_HOST);

const app = express();

app.use(helmet())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello World!!")
})

const getUser = token => {
    if (token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            throw new Error("Session invalid")
        }
    }
}

// Apollo Server setup
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // Add the MongoDB models as context
    context: ({req}) => {
        const token = req.headers.authorization;
        const user = getUser(token);
        console.log(user);
        
        return {
            models,
            user
        }
    }
})

// Apply the Apollo GQL middleware and set the path to /api
server.applyMiddleware({ app, path: "/api" })

app.listen({ port }, () => console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`))

app.listen(4010, () => {
    console.log(`Server running at http://localhost:${port}`);
})