// import { ACCESS_TOKEN_KEY } from "@/constants";
// import { decodeToken } from "@/utils/jwt";
import { SERVER } from "@/utils/constants";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createClient } from "graphql-ws";

export const client = new ApolloClient({
  uri: SERVER,
  cache: new InMemoryCache(),
  // link: authLink.concat(httpLink),
  credentials: "include",
});

export const wsClient = createClient({
  url: "ws://localhost:4000/graphql",
});

// const httpLink = new HttpLink({
//   uri: "http://localhost:4000/graphql",
// });

// const wsLink = new GraphQLWsLink(
//   createClient({
//     url: "ws://localhost:4000/subscriptions",
//   })
// );

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   httpLink
// );

// export const client = new ApolloClient({
//   link: splitLink,
//   cache: new InMemoryCache(),
//   credentials: "include",
// });

export const privateClient = () => client;

export default client;
