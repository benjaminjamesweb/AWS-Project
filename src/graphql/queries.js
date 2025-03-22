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
      q1media
      a1 {
        text
        points
        __typename
      }
      q2
      q2media
      a2 {
        text
        points
        __typename
      }
      q3
      q3media
      a3 {
        text
        points
        __typename
      }
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
        q1media
        q2
        q2media
        q3
        q3media
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUserInfo = /* GraphQL */ `
  query GetUserInfo($id: ID!) {
    getUserInfo(id: $id) {
      id
      totalPoints
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listUserInfos = /* GraphQL */ `
  query ListUserInfos(
    $filter: ModelUserInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        totalPoints
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
