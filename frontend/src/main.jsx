import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { GoogleOAuthProvider } from "@react-oauth/google";
import * as ReactDOM from 'react-dom/client';
import App from './App';

const client = new ApolloClient({
  uri: 'https://localhost:8243/eWallet/v1',
  cache: new InMemoryCache(),
  headers: {
    // This is a test token, replace it with the actual token
    authorization: `Bearer eyJ4NXQiOiJOV1F3T1RSa01qQTVPV0ZqTm1VMk56QmxOVE0zWkRVd09EVXpZall3Wm1KbFpUTmtaREE0T0RVNFpUVXdaR0l3Tm1VeU1tWm1aVE5oWkRreU5qUTJaQSIsImtpZCI6Ik5XUXdPVFJrTWpBNU9XRmpObVUyTnpCbE5UTTNaRFV3T0RVellqWXdabUpsWlROa1pEQTRPRFU0WlRVd1pHSXdObVV5TW1abVpUTmhaRGt5TmpRMlpBX1JTMjU2IiwidHlwIjoiYXQrand0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJkNjc3ZDMyZC1hMzI3LTRlZDYtYjdiYi00N2E2NzVmOWQ1YmQiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6IlZ2TjY3Um1PQXljTWlLbm8xb1J6bW9ORVNPQWEiLCJuYmYiOjE3MzU2NDAyMzUsImF6cCI6IlZ2TjY3Um1PQXljTWlLbm8xb1J6bW9ORVNPQWEiLCJzY29wZSI6ImRlZmF1bHQiLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo5NDQzL29hdXRoMi90b2tlbiIsImV4cCI6MTczNTY0MzgzNSwiaWF0IjoxNzM1NjQwMjM1LCJqdGkiOiJhOGM4MzI1Yy1mZDI0LTRhMGEtYTY3Yy1jMmNmMzYwMWJiYjciLCJjbGllbnRfaWQiOiJWdk42N1JtT0F5Y01pS25vMW9Sem1vTkVTT0FhIn0.mvLA_JgQ8LeNFh7xSEHnlNif6A88nZCw0VrlmhijmGtuFsTA1o088T9TG8OAgpQ2nfReU29QmEYYVsq_pf3ADGw_IdtItvAbhWQDbdxaGaDbP7zVYZlhQTLAKklfOcAKFw4EphUDU5G7wMpBlxqPZfa9ZanaAgDgcppgeoXeFz0ndYJ-uMwBCjtReimMmlCtjBW2_S8zmA7SCfCdGdJ-6VlLx9_C7EZKydyJ-1rpQ13ghANH1HaIPa_K9m738DR4LXM30tF9UqXQCdw2PJyC0VZGOXz-j_X_nOzffPasvFVuDi3Gb3LDVPxEdZ5c9mAgeB4z4SPv2wax4lH0bLj0oA`,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId='1013341919244-3r8l736gs37246et59704rcqci8bkah9.apps.googleusercontent.com'>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </GoogleOAuthProvider>
);
