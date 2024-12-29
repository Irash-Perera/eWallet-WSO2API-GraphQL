import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import { typeDefs } from './schema.js';

config();

const MONGO_URI = process.env.DATABASE_URI;
const MONGO_CLIENT = new MongoClient(MONGO_URI);

async function startService() {
  try {
    await MONGO_CLIENT.connect();
    console.log('Connected to MongoDB.');

    const database = MONGO_CLIENT.db('eWallet');
    const users = database.collection('users');
    const balances = database.collection('balances');
    const transactions = database.collection('transactions');
    
    const resolvers = {
      Query: {
        async transactions() {
          return await transactions.find().toArray();
        },
        async users() {
          return await users.find().toArray();
        },
        async balances() {
          return await balances.find().toArray();
        }
      }
    };

    const server = new ApolloServer({
      typeDefs,
      resolvers
    })
    
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
    
    console.log(`🚀  Server ready at: ${url}`);

  } catch (error) {
    console.error(error);
  }

}

startService();