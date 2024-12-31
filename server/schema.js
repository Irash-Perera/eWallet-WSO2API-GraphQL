export const typeDefs = `#graphql
  type User{
    user_id: ID!,
    user_name: String!,
    email: String!
  }

  type Balance{
    user_id: ID!,
    amount: Float!,
    lastUpdated_on: String!,
  }

  type Transaction{
    trans_id: ID!,
    user_id: ID!,
    amount: Float!,
    isExpense: Boolean!,
    date: String!,
    type: String!,

  }
  
  type Query{
    users: [User]!,
    balances: [Balance]!,
    transactions: [Transaction]!
    user(email: String!): User
    transactionsBasedOnUser(user_id: ID!): [Transaction]!,
    balancesBasedOnUser(user_id: ID!): Balance!
  }
  
  type Mutation{
    createUser(user: UserInput!): User,
    createTransaction(transaction: TransactionInput!): Transaction,
  }
  
  input UserInput{
    user_name: String!,
    email: String!
  },

  input TransactionInput{
    user_id: ID!,
    amount: Float!,
    isExpense: Boolean!,
    date: String!,
    type: String!,
  }
`