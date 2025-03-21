/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGame = /* GraphQL */ `
  mutation CreateGame(
    $input: CreateGameInput!
    $condition: ModelGameConditionInput
  ) {
    createGame(input: $input, condition: $condition) {
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
export const updateGame = /* GraphQL */ `
  mutation UpdateGame(
    $input: UpdateGameInput!
    $condition: ModelGameConditionInput
  ) {
    updateGame(input: $input, condition: $condition) {
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
export const deleteGame = /* GraphQL */ `
  mutation DeleteGame(
    $input: DeleteGameInput!
    $condition: ModelGameConditionInput
  ) {
    deleteGame(input: $input, condition: $condition) {
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
export const createGameplay = /* GraphQL */ `
  mutation CreateGameplay(
    $input: CreateGameplayInput!
    $condition: ModelGameplayConditionInput
  ) {
    createGameplay(input: $input, condition: $condition) {
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
export const updateGameplay = /* GraphQL */ `
  mutation UpdateGameplay(
    $input: UpdateGameplayInput!
    $condition: ModelGameplayConditionInput
  ) {
    updateGameplay(input: $input, condition: $condition) {
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
export const deleteGameplay = /* GraphQL */ `
  mutation DeleteGameplay(
    $input: DeleteGameplayInput!
    $condition: ModelGameplayConditionInput
  ) {
    deleteGameplay(input: $input, condition: $condition) {
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
export const createUserInfo = /* GraphQL */ `
  mutation CreateUserInfo(
    $input: CreateUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    createUserInfo(input: $input, condition: $condition) {
      id
      totalPoints
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateUserInfo = /* GraphQL */ `
  mutation UpdateUserInfo(
    $input: UpdateUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    updateUserInfo(input: $input, condition: $condition) {
      id
      totalPoints
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteUserInfo = /* GraphQL */ `
  mutation DeleteUserInfo(
    $input: DeleteUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    deleteUserInfo(input: $input, condition: $condition) {
      id
      totalPoints
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
