import axios from 'axios';
const magentoGraphQl = async (endpoint: string, operationName: any, query: string, variables?: any, token?: string) => {
  endpoint = endpoint || '/api/graphql/';
  const headers = {
    'Content-Type': 'application/json',
   'X-Requested-With': 'XMLHttpRequest',
    ...(token ? { Authorization: `Bearer ${token}` } : {}), // Add the Authorization header if a token is provided
  };
  try {
    const { data } = await axios.post(endpoint, {
      operationName,
      query,
      variables,
    },
      {
        headers, // Pass headers as part of the request
      });
    return data;
  } catch (error) {
    console.error('An error occurred:', error);
    // Handle the error here, e.g. show an error message to the user
    throw error; // Rethrow the error to propagate it to the caller
  }
};

export default magentoGraphQl;