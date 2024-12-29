export const typeDefs = `#graphql
  type User{
    user_id: ID!,
    user_name: String!,
    email: String!,
  }

  type Balance{
    user_id: ID!,
    amount: Float!,
    LastUpdated: String!,
  }

  type Transaction{
    trans_id: ID!,
    user_id: ID!,
    amount: Float!,
    isExpense: Boolean!,
    date: String!,
    type: String!
  }
  
  type Query{
    users: [User]!,
    balances: [Balance]!,
    transactions: [Transaction]!
  }
`