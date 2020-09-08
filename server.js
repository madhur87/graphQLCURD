var express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var {
    graphqlHTTP
} = require('express-graphql');
var {
    buildSchema
} = require('graphql');
const schema = require('./graphQL/schema');
const resolver = require('./graphQL/resolver');

dotenv.config();

mongoose.connect(
    "mongodb://localhost/GraphQLAPI", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log('connect to db')
);


var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
    formatError(err) {
        if (!err.originalError) {
            return err
        }
        const data = err.originalError.data
        const message = err.originalError.message || 'An error occured'
        const code = err.originalError.code || 500
        return {
            message: message,
            status: code,
            data: data
        }
    }
}));


app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));