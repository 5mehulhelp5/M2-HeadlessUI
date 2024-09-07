import axios from 'axios';
const magentoGraphQl = async (endpoint:string,operationName:any,query: string, variables: any) => {
  endpoint = endpoint || '/api/graphql/';
  try {
    const { data } = await axios.post(endpoint, {
      operationName,
      query,
      variables,
    });
    return data;
  } catch (error) {
    console.error('An error occurred:', error);
    // Handle the error here, e.g. show an error message to the user
    throw error; // Rethrow the error to propagate it to the caller
  }
};

export default magentoGraphQl;