import { gql } from "apollo-boost";


export const SIGN_UP = gql`
  mutation SignUp ($username: String!, $email: String!, $password: String! ) {
    signUp (username: $username, email: $email, password: $password) 
  }
`;

export const SIGN_IN = gql`

  mutation SignIn ($username: String!, $password: String! ) {
    signIn (username: $username, password: $password) 
    }
`
export const CREATE_NOTE = gql`
mutation CreateNote($content: String!) {
  newNote (content: $content) {
    content
    favoriteCount
    favoritedBy {
      username
    }
  }
}
`

export const DELETE_NOTE = gql`
mutation DeleteNote ($id: ID!) {
  deleteNote (id: $id)
}
`

export const UPDATE_NOTE = gql`
mutation UpdateNote ($id: ID!, $content: String!) {
	  updateNote(
      id: $id,
      content: $content
    ) {
    id
  	content
    favoriteCount
    createdAt
    updatedAt
  }
}
`

export const TOGGLE_FAVORITE = gql`
mutation ToggleFav ($id: ID!) {
  toggleFavorite(id: $id) {
    favoriteCount
  }
}
`

