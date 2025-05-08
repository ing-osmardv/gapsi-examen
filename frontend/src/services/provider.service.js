import axios from "axios";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

export const getProviders = async (page, size) => {
  const res = await axios.get(
    `http://localhost:3000/providers?page=${page}&limit=${size}`
  );
  return res.data;
};

export const createProvider = async (payload) => {
  const res = await axios.post(`http://localhost:3000/providers`, payload);
  return res.data;
};

export const deleteProvider = async (id) => {
  await axios.delete(`http://localhost:3000/providers/${id}`);
};

export const getProvidersGQL = async (page = 1, limit = 10) => {
  const { data } = await client.query({
    query: gql`
      query GetProviders($page: Int!, $limit: Int!) {
        providers(page: $page, limit: $limit) {
          items {
            id
            name
            companyName
            address
          }
          total
          page
          totalPages
          limit
        }
      }
    `,
    variables: { page, limit },
  });
  return data.providers;
};

export const createProviderGQL = async (providerData) => {
  const { data } = await client.mutate({
    mutation: gql`
      mutation CreateProvider(
        $name: String!
        $companyName: String!
        $address: String!
      ) {
        createProvider(
          name: $name
          companyName: $companyName
          address: $address
        ) {
          id
          name
        }
      }
    `,
    variables: providerData,
  });
  return data.createProvider;
};

export const deleteProviderQGL = async (id) => {
  const { data } = await client.mutate({
    mutation: gql`
      mutation DeleteProvider($id: ID!) {
        deleteProvider(id: $id) {
          success
        }
      }
    `,
    variables: { id },
  });
  return data.deleteProvider;
};
