/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame($filter: ModelSubscriptionGameFilterInput) {
    onCreateGame(filter: $filter) {
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
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame($filter: ModelSubscriptionGameFilterInput) {
    onUpdateGame(filter: $filter) {
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
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame($filter: ModelSubscriptionGameFilterInput) {
    onDeleteGame(filter: $filter) {
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
export const onCreateGameplay = /* GraphQL */ `
  subscription OnCreateGameplay($filter: ModelSubscriptionGameplayFilterInput) {
    onCreateGameplay(filter: $filter) {
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
export const onUpdateGameplay = /* GraphQL */ `
  subscription OnUpdateGameplay($filter: ModelSubscriptionGameplayFilterInput) {
    onUpdateGameplay(filter: $filter) {
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
export const onDeleteGameplay = /* GraphQL */ `
  subscription OnDeleteGameplay($filter: ModelSubscriptionGameplayFilterInput) {
    onDeleteGameplay(filter: $filter) {
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
