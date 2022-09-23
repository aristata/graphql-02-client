import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

/**
 * uri: apollo server 의 uri 를 입력한다
 * cache: 캐쉬 전략을 입력한다
 */
const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
      {
        ping
      }
    `
  })
  .then((data) => console.log(data));

export default client;
