![home-page](./screenshots/home-page.png)

# eWallet
#### GraphQL and WSO2 API Manager Based eWallet Application.

With this application, users can sign in with their Google account and create an eWallet, which can be used to manage their expenses and incomes as well as to analyze their transaction history.

#### Technologies Used:
- GraphQL : For the backend API
- WSO2 API Manager : For API management
- Apollo Client/Server : For GraphQL client and server
- React : For the frontend
- Node.js : For the backend server
- MongoDB : For the database
- Google OAuth : For user authentication

#### Screenshots:
| Page | Screenshot |
| --- | --- |
| Home Page | ![home-page](./screenshots/home.png) |
| Sign In | ![sign-in](./screenshots/login.png) |
| Create Wallet Page | ![create-wallet](./screenshots/create-wallet.png) |
| Dashboard | ![dashboard](./screenshots/dashboard.png) |
| Add Transaction | ![add-transaction](./screenshots/add-transaction.png) |

#### Setup:

1. **Clone the repository**
Clone the repository using the following command.
```
git clone https://github.com/Irash-Perera/eWallet-WSO2API-GraphQL.git
```
2. **Install the dependencies**
Navigate to the project directory and install the dependencies in the client and server directories.
```
cd server
npm install
```
```
cd frontend
npm install
```

3. **Set up the environment variables**

- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a new cluster and get the connection string. Create a `.env` file in the server directory and add the connection string as follows.
```
DATABASE_URI="mongodb+srv://xxxxxxxxxxxxx
```

- Go to [Google Cloud Console](https://console.cloud.google.com/) and create a new project and get the OAuth client ID. Paste the client ID in the `/frontend/main.jsx` file in the `GoogleOAuthProvider` component.
```
<GoogleOAuthProvider clientId='1013341919244-xxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com'>
```
- Download the [WSO2 API Manager](https://wso2.com/api-manager/) and start the server. To start the server locally follow the instructions in the following [Quick Start Guide](https://apim.docs.wso2.com/en/latest/get-started/api-manager-quick-start-guide/).