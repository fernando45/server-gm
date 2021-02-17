import MongoClient from  'mongodb';
import chalk from 'chalk';
class Database {

    async init() {
        const MONGODB = String(process.env.DATABASE);
        const client = await MongoClient.connect(MONGODB, {useNewUrlParser: true});

        const db = await client.db();

        if ( client.isConnected() ) {
            console.log('==========DATABASE===========');
            console.log( chalk.greenBright('STATUS: '+'ONLINE'));
            console.log( chalk.blueBright(db.databaseName) );

        }
        return db;

    }

}





export default Database;
