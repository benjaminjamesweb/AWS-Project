/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      name
      description
      image
      levels
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        levels
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getGameplay = /* GraphQL */ `
  query GetGameplay($id: ID!) {
    getGameplay(id: $id) {
      id
      gameid
      proficiency
      q1
      a1
      q2
      a2
      q3
      a3
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listGameplays = /* GraphQL */ `
  query ListGameplays(
    $filter: ModelGameplayFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGameplays(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        gameid
        proficiency
        q1
        a1
        q2
        a2
        q3
        a3
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
