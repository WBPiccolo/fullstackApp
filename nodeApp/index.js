import Express from "express";
import mongodb from 'mongodb';
import cors from 'cors';

const app = Express();
const _cors = cors();
const port = 3000;
const dbName = 'testDB';
const uri = "mongodb+srv://admin:admin@cluster0.mxrir.mongodb.net/testDB?retryWrites=true&w=majority";
app.use(_cors);
let db;
let MongoClient = mongodb.MongoClient;

//https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database

//https://docs.mongodb.com/drivers/node/current/fundamentals/crud/read-operations/retrieve/
async function main(){
    const client = new MongoClient(uri,  { useNewUrlParser: true, useUnifiedTopology: true });

    try{

        await client.connect((err, database) => {
            db = database.db(dbName);
            app.listen(port, ()=> console.log("listening on port "+port));
        });

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

//https://medium.com/@thepradeep001/building-a-simple-app-using-nodejs-mongodb-and-expressjs-9678277e87e0
async function listUsers(){
    try{
        await client.connect();
        let cursor = await client.db(dbName).collection('users').find().toArray();
        return cursor;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

/**
 * Entry point che restituisce id e nome utente se l'utente esiste già, altrimenti false
 */
app.get('/login/:userID', (req, res) => {
    console.log(new Date().toString(),'login/',req.params.userID);
    db.collection('users').find().toArray((err, result) => {
        let idUserList = result.map((user) => {
            return {id: user._id.inc.toString(), username: user.name};
        });
        console.log(idUserList);
        let index = idUserList.map((element) => { return element.id}).indexOf(req.params.userID);
        let response = index === -1? false : idUserList[index];
        res.send({
            result: response,
        });
    });

});

main().catch(console.error);


/*
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
*/