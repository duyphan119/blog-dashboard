// import { ACCESS_TOKEN_KEY } from "@/constants";
// import { decodeToken } from "@/utils/jwt";
import { SERVER } from "@/constants";
import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";
// import axios from "axios";
// import Cookies from "universal-cookie";

// const httpLink = createHttpLink({
//   uri: "http://localhost:4000/graphql",
// });

// const authLink = setContext(async (_, { headers }) => {
//   const cookies = new Cookies();
//   let accessToken = cookies.get(ACCESS_TOKEN_KEY);
//   const { data } = await axios
//     .create({
//       withCredentials: true,
//     })
//     .post(`http://localhost:4000`);
//   console.log(data);
//   if (accessToken) {
//     const decoded = decodeToken(accessToken);

//     console.log("refresh", decoded.exp * 1000 < new Date().getTime());
//     // if (decoded.exp * 1000 < new Date().getTime()) {
//     //   const { data } = await axios
//     //     .create({
//     //       withCredentials: true,
//     //     })
//     //     .post(
//     //       `http://localhost:4000`
//     //       //   JSON.stringify({
//     //       //     query: `mutation Mutation {
//     //       //   newAccessToken
//     //       // }`,
//     //       //   })
//     //     );
//     //   // const res = await fetch(`http://localhost:4000/graphql`, {
//     //   //   method: "POST",
//     //   //   body: JSON.stringify({
//     //   //     query: `mutation Mutation {
//     //   //     newAccessToken
//     //   //   }`,
//     //   //   }),
//     //   //   headers: {
//     //   //     "Content-type": "application/json",
//     //   //   },
//     //   //   credentials: "same-origin",
//     //   // });
//     //   // const { data } = await res.json();
//     //   console.log("data", data);
//     //   const { newAccessToken } = data;
//     //   accessToken = newAccessToken;
//     // }
//   }

//   return {
//     headers: {
//       ...headers,
//       authorization: accessToken ? `Bearer ${accessToken}` : "",
//     },
//   };
// });

const client = new ApolloClient({
  uri: SERVER,
  cache: new InMemoryCache(),
  // link: authLink.concat(httpLink),
  credentials: "include",
});

export const privateClient = () =>
  new ApolloClient({
    uri: SERVER,
    cache: new InMemoryCache(),
    // headers: {
    //   authorization: `Beader ${getAccessToken()}`,
    // },
  });

export default client;
