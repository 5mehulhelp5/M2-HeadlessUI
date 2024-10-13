export const CreateCustomer = `
mutation CreateAccount(
  $email: String!, 
  $firstname: String!, 
  $lastname: String!, 
  $password: String!, 
  $is_subscribed: Boolean!
) {
  createCustomer(
    input: {
      email: $email, 
      firstname: $firstname, 
      lastname: $lastname, 
      password: $password, 
      is_subscribed: $is_subscribed
    }
  ) {
    customer {
      id
      firstname
      lastname
      email
      is_subscribed
    }
  }
}
`;
export const signInQuery = `mutation SignIn($email: String!, $password: String!) {  generateCustomerToken(email: $email, password: $password) {    token    __typename  }}`;

export const GetCustomerAfterSignIn = `query GetCustomerAfterSignIn {  customer {    firstname    middlename    lastname    suffix    email    addresses {      firstname      middlename      lastname      street      city      region {        region_code        region        __typename      }      postcode      country_code      telephone      __typename    }    __typename  }  customerCart {    id    __typename  }}`;

export const customerEdit = `mutation updateAccount($email: String!, $firstname: String!, $lastname: String!) {  updateCustomer(    input: {email: $email, firstname: $firstname, lastname: $lastname}  ) {    customer {      id      firstname      lastname      email      __typename    }    __typename  }}`