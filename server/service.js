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

    const changeStream = users.watch();
    const changeStream2 = transactions.watch();

    changeStream.on("change", async (change) => {
      if (change.operationType === "insert") {
        const newUser = change.fullDocument;

        try {
          await balances.insertOne({
            user_id: newUser.user_id,
            amount: 0,
            lastUpdated_on: new Date().toISOString()
          })
        }catch (error) {
          console.error(error);
        }
      }
    })

    changeStream2.on("change", async (change) => {
      if (change.operationType === "insert") {
        const newTransaction = change.fullDocument;

        try {
          const exisitingBalance = await balances.findOne({ user_id: newTransaction.user_id });
          const newBalance = exisitingBalance.amount + (newTransaction.isExpense ? -newTransaction.amount : newTransaction.amount);
          await balances.updateOne({ user_id: newTransaction.user_id }, { $set: { amount: newBalance, lastUpdated_on: new Date().toISOString() } });
          
        } catch (error) {
          console.log(error);
        }
      }
    })
    
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
        },
        async user(_, args) {
          return await users.findOne({email: args.email});
        },
        async transactionsBasedOnUser(_, args) {
          return await transactions.find({ user_id: Number(args.user_id) }).toArray();
        },
        async balancesBasedOnUser(_, args) {
          return await balances.findOne({ user_id: Number(args.user_id) });
        }
      },

      Mutation: {
        async createUser(_, args) {
          const newUser = {
            user_id: Math.floor(Math.random() * 1000),
            user_name: args.user.user_name,
            email: args.user.email
          };
          await users.insertOne(newUser);
          return newUser;
        },

        async createTransaction(_, args) {
          const newTransaction = {
            trans_id: Math.floor(Math.random() * 100000),
            user_id: Number(args.transaction.user_id),
            amount: args.transaction.amount,
            isExpense: args.transaction.isExpense,
            date: args.transaction.date,
            type: args.transaction.type
          };

          await transactions.insertOne(newTransaction);
          return newTransaction;
        }

        // async createBalance(_, args) {
        //   const newBalance = {
        //     user_id: Number(args.balance.user_id),
        //     amount: args.balance.amount,
        //     lastUpdated_on: new Date().toISOString()
        //   };

        //   await balances.insertOne(newBalance);
        //   return newBalance;
        // }
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