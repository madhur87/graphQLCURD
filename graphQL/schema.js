const {
    buildSchema
} = require('graphql');

module.exports = buildSchema(
    `
    type User {
        username : String!
        email : String!
        _id : ID!
        password : String!
    }

    type Post {
        title : String!
        imageURL : String!
        createDate : String!
    }

    type Auth {
        token : String!
        userId : String!
    }

    type dataQuery {
        text : String!
        id : ID!
    }

    type Rootquery {
        hello: dataQuery!
        login(email: String!, password: String!) : Auth! 
    }

    input userData { 
        email : String!
        username : String!
        password : String!
    }

    input postData {
        title : String!
        imageURL : String!
    }

    type RootMutation {
        createUser(data : userData) : User! 
        createPost(data : postData) : Post!
    }
    
    schema {
        query : Rootquery
        mutation : RootMutation
    }
    `
);