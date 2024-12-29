import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

// Supported in React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId='1013341919244-3r8l736gs37246et59704rcqci8bkah9.apps.googleusercontent.com'>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </GoogleOAuthProvider>
);
