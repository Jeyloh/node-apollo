import { gql } from "apollo-boost";


export const GET_NOTES = gql`
    query GetNotes {
        notes {
            id
            content
            favoriteCount
            favoritedBy {
                username
            }
            author {
                username
            }
            createdAt
            updatedAt
        }
    }
`;

export const GET_NOTE_BY_ID = gql`
  query NoteById($id: ID!) {
      note(id: $id) {
        id
        content
        author {
            username
        }
        createdAt
        updatedAt
      }
    
  }
`

export const GET_USER_BY_USERNAME = gql`
  query UserByUsername ($username: String!) {
    user (username: $username) {
      username
      email
      id
    }
  }
`

export const GET_USERS = gql`
  query GetUsers {

    users {
        username
        email
        id
    }
  }
`

export const GET_ME = gql`
  query GetMe { 
      me {
        username
        email
        id
        favorites {
            id
            content
            favoriteCount
            favoritedBy {
                username
            }
            author {
                username
            }
        }
        notes {
            id
            content
            favoriteCount
            favoritedBy {
                username
            }
            author {
                username
            }
        }
    }
  }
`

export const GET_NOTE_AND_USER = gql`
  query NoteWithUser ($id: ID!) {
    noteAndUser (id: $id) {
        id
        content
        author {
            username
            id
        }
    }
  }
`