import Express from "express";
import mongodb from 'mongodb';

const app = Express();
const port = 3000;

const uri = "mongodb+srv://admin:admin@cluster0.mxrir.mongodb.net/testDB?retryWrites=true&w=majority";
let MongoClient = mongodb.MongoClient;

//https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database

//https://docs.mongodb.com/drivers/node/current/fundamentals/crud/read-operations/retrieve/
async function main(){
    const client = new MongoClient(uri,  { useNewUrlParser: true, useUnifiedTopology: true });
    try{

    await client.connect();

    await listDatabases(client);

    await listCollection(client,'testDB');
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client){
    let databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(` --${db.name}`);
    });
}

async function listCollection(client, dbName){
    let collectionList = await client.db(dbName).listCollections().toArray();
    console.log(collectionList);
}

main().catch(console.error);