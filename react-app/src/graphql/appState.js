import gql from "graphql-tag";

export default gql`
  query {
    isAuth @client
  }
`;
