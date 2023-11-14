import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type WorkingGroupMetadataFieldsFragment = { __typename: 'WorkingGroupMetadata', about?: string | null, description?: string | null, status?: string | null, statusMessage?: string | null };

export type WorkerFieldsFragment = { __typename: 'Worker', id: string, runtimeId: number, applicationId: string, isLead: boolean, rewardPerBlock: string, missingRewardAmount?: string | null, stake: string, group: { __typename: 'WorkingGroup', id: string, name: string }, status: { __typename: 'WorkerStatusActive' } | { __typename: 'WorkerStatusLeaving' } | { __typename: 'WorkerStatusLeft' } | { __typename: 'WorkerStatusTerminated' } };

export type SpendingRewardFieldsFragment = { __typename: 'RewardPaidEvent', createdAt: any, deletedAt?: any | null, amount: string, worker: { __typename: 'Worker', membership: { __typename: 'Membership', handle: string } } };

export type SpendingBudgetFieldsFragment = { __typename: 'BudgetSpendingEvent', createdAt: any, deletedAt?: any | null, amount: string };

export type HireOpeningFillFieldsFragment = { __typename: 'OpeningFilledEvent', createdAt: any, deletedAt?: any | null, workersHired: Array<{ __typename: 'Worker', membership: { __typename: 'Membership', handle: string } }> };

export type FireTerminatedWorkerFieldsFragment = { __typename: 'TerminatedWorkerEvent', createdAt: any, deletedAt?: any | null, worker: { __typename: 'Worker', membership: { __typename: 'Membership', handle: string } } };

export type FireWorkeredExitedFieldsFragment = { __typename: 'WorkerExitedEvent', createdAt: any, deletedAt?: any | null, worker: { __typename: 'Worker', membership: { __typename: 'Membership', handle: string } } };

export type SlashStakeFieldsFragment = { __typename: 'StakeSlashedEvent', createdAt: any, deletedAt?: any | null, worker: { __typename: 'Worker', membership: { __typename: 'Membership', handle: string } } };

export type WorkingGroupFieldsFragment = { __typename: 'WorkingGroup', id: string, name: string, budget: string, metadata?: { __typename: 'WorkingGroupMetadata', about?: string | null, description?: string | null, status?: string | null, statusMessage?: string | null } | null, workers: Array<{ __typename: 'Worker', stake: string, missingRewardAmount?: string | null }>, rewardpaideventgroup?: Array<{ __typename: 'RewardPaidEvent', createdAt: any, deletedAt?: any | null, amount: string, worker: { __typename: 'Worker', membership: { __typename: 'Membership', handle: string } } }> | null, budgetspendingeventgroup?: Array<{ __typename: 'BudgetSpendingEvent', createdAt: any, deletedAt?: any | null, amount: string }> | null, openingfilledeventgroup?: Array<{ __typename: 'OpeningFilledEvent', createdAt: any, deletedAt?: any | null, workersHired: Array<{ __typename: 'Worker', membership: { __typename: 'Membership', handle: string } }> }> | null, terminatedworkereventgroup?: Array<{ __typename: 'TerminatedWorkerEvent', createdAt: any, deletedAt?: any | null, worker: { __typename: 'Worker', membership: { __typename: 'Membership', handle: string } } }> | null, workerexitedeventgroup?: Array<{ __typename: 'WorkerExitedEvent', createdAt: any, deletedAt?: any | null, worker: { __typename: 'Worker', membership: { __typename: 'Membership', handle: string } } }> | null, stakeslashedeventgroup?: Array<{ __typename: 'StakeSlashedEvent', createdAt: any, deletedAt?: any | null, worker: { __typename: 'Worker', membership: { __typename: 'Membership', handle: string } } }> | null, leader?: { __typename: 'Worker', membershipId: string, isActive: boolean, membership: { __typename: 'Membership', handle: string } } | null };

export type RewardPaidEventFieldsFragment = { __typename: 'RewardPaidEvent', id: string, amount: string, rewardAccount: string, createdAt: any, groupId: string, group: { __typename: 'WorkingGroup', leader?: { __typename: 'Worker', membership: { __typename: 'Membership', handle: string } } | null } };

export type GetWorkingGroupsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WorkingGroupWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.WorkingGroupOrderByInput> | Types.WorkingGroupOrderByInput>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetWorkingGroupsQuery = { __typename: 'Query', workingGroups: Array<{ __typename: 'WorkingGroup', id: string, name: string, budget: string, metadata?: { __typename: 'WorkingGroupMetadata', about?: string | null, description?: string | null, status?: string | null, statusMessage?: string | null } | null, workers: Array<{ __typename: 'Worker', stake: string, missingRewardAmount?: string | null }>, rewardpaideventgroup?: Array<{ __typename: 'RewardPaidEvent', createdAt: any, deletedAt?: any | null, amount: string, worker: { __typename: 'Worker', membership: { __typename: 'Membership', handle: string } } }> | null, budgetspendingeventgroup?: Array<{ __typename: 'BudgetSpendingEvent', createdAt: any, deletedAt?: any | null, amount: string }> | null, openingfilledeventgroup?: Array<{ __typename: 'OpeningFilledEvent', createdAt: any, deletedAt?: any | null, workersHired: Array<{ __typename: 'Worker', membership: { __typename: 'Membership', handle: string } }> }> | null, terminatedworkereventgroup?: Array<{ __typename: 'TerminatedWorkerEvent', createdAt: any, deletedAt?: any | null, worker: { __typename: 'Worker', membership: { __typename: 'Membership', handle: string } } }> | null, workerexitedeventgroup?: Array<{ __typename: 'WorkerExitedEvent', createdAt: any, deletedAt?: any | null, worker: { __typename: 'Worker', membership: { __typename: 'Membership', handle: string } } }> | null, stakeslashedeventgroup?: Array<{ __typename: 'StakeSlashedEvent', createdAt: any, deletedAt?: any | null, worker: { __typename: 'Worker', membership: { __typename: 'Membership', handle: string } } }> | null, leader?: { __typename: 'Worker', membershipId: string, isActive: boolean, membership: { __typename: 'Membership', handle: string } } | null }> };

export type GetWorkersQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WorkerWhereInput>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetWorkersQuery = { __typename: 'Query', workers: Array<{ __typename: 'Worker', id: string, runtimeId: number, applicationId: string, isLead: boolean, rewardPerBlock: string, missingRewardAmount?: string | null, stake: string, group: { __typename: 'WorkingGroup', id: string, name: string }, status: { __typename: 'WorkerStatusActive' } | { __typename: 'WorkerStatusLeaving' } | { __typename: 'WorkerStatusLeft' } | { __typename: 'WorkerStatusTerminated' } }> };

export type GetRewardsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.RewardPaidEventWhereInput>;
}>;


export type GetRewardsQuery = { __typename: 'Query', rewardPaidEvents: Array<{ __typename: 'RewardPaidEvent', id: string, amount: string, rewardAccount: string, createdAt: any, groupId: string, group: { __typename: 'WorkingGroup', leader?: { __typename: 'Worker', membership: { __typename: 'Membership', handle: string } } | null } }> };

export type GetBudgetSpendingQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BudgetSpendingEventWhereInput>;
}>;


export type GetBudgetSpendingQuery = { __typename: 'Query', budgetSpendingEvents: Array<{ __typename: 'BudgetSpendingEvent', amount: string, createdAt: any, groupId: string, group: { __typename: 'WorkingGroup', leader?: { __typename: 'Worker', membership: { __typename: 'Membership', handle: string } } | null } }> };

export const WorkerFieldsFragmentDoc = gql`
    fragment WorkerFields on Worker {
  id
  runtimeId
  group {
    id
    name
  }
  status {
    __typename
  }
  applicationId
  isLead
  rewardPerBlock
  missingRewardAmount
  stake
}
    `;
export const WorkingGroupMetadataFieldsFragmentDoc = gql`
    fragment WorkingGroupMetadataFields on WorkingGroupMetadata {
  about
  description
  status
  statusMessage
}
    `;
export const SpendingRewardFieldsFragmentDoc = gql`
    fragment SpendingRewardFields on RewardPaidEvent {
  createdAt
  deletedAt
  amount
  worker {
    membership {
      handle
    }
  }
}
    `;
export const SpendingBudgetFieldsFragmentDoc = gql`
    fragment SpendingBudgetFields on BudgetSpendingEvent {
  createdAt
  deletedAt
  amount
}
    `;
export const HireOpeningFillFieldsFragmentDoc = gql`
    fragment HireOpeningFillFields on OpeningFilledEvent {
  createdAt
  deletedAt
  workersHired {
    membership {
      handle
    }
  }
}
    `;
export const FireTerminatedWorkerFieldsFragmentDoc = gql`
    fragment FireTerminatedWorkerFields on TerminatedWorkerEvent {
  createdAt
  deletedAt
  worker {
    membership {
      handle
    }
  }
}
    `;
export const FireWorkeredExitedFieldsFragmentDoc = gql`
    fragment FireWorkeredExitedFields on WorkerExitedEvent {
  createdAt
  deletedAt
  worker {
    membership {
      handle
    }
  }
}
    `;
export const SlashStakeFieldsFragmentDoc = gql`
    fragment SlashStakeFields on StakeSlashedEvent {
  createdAt
  deletedAt
  worker {
    membership {
      handle
    }
  }
}
    `;
export const WorkingGroupFieldsFragmentDoc = gql`
    fragment WorkingGroupFields on WorkingGroup {
  id
  name
  budget
  metadata {
    ...WorkingGroupMetadataFields
  }
  workers {
    stake
    missingRewardAmount
  }
  rewardpaideventgroup {
    ...SpendingRewardFields
  }
  budgetspendingeventgroup {
    ...SpendingBudgetFields
  }
  openingfilledeventgroup {
    ...HireOpeningFillFields
  }
  terminatedworkereventgroup {
    ...FireTerminatedWorkerFields
  }
  workerexitedeventgroup {
    ...FireWorkeredExitedFields
  }
  stakeslashedeventgroup {
    ...SlashStakeFields
  }
  leader {
    membershipId
    isActive
    membership {
      handle
    }
  }
}
    ${WorkingGroupMetadataFieldsFragmentDoc}
${SpendingRewardFieldsFragmentDoc}
${SpendingBudgetFieldsFragmentDoc}
${HireOpeningFillFieldsFragmentDoc}
${FireTerminatedWorkerFieldsFragmentDoc}
${FireWorkeredExitedFieldsFragmentDoc}
${SlashStakeFieldsFragmentDoc}`;
export const RewardPaidEventFieldsFragmentDoc = gql`
    fragment RewardPaidEventFields on RewardPaidEvent {
  id
  amount
  rewardAccount
  createdAt
  groupId
  group {
    leader {
      membership {
        handle
      }
    }
  }
}
    `;
export const GetWorkingGroupsDocument = gql`
    query GetWorkingGroups($where: WorkingGroupWhereInput, $orderBy: [WorkingGroupOrderByInput!], $offset: Int, $limit: Int) {
  workingGroups(where: $where, orderBy: $orderBy, offset: $offset, limit: $limit) {
    ...WorkingGroupFields
  }
}
    ${WorkingGroupFieldsFragmentDoc}`;

/**
 * __useGetWorkingGroupsQuery__
 *
 * To run a query within a React component, call `useGetWorkingGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkingGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkingGroupsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetWorkingGroupsQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>(GetWorkingGroupsDocument, options);
      }
export function useGetWorkingGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>(GetWorkingGroupsDocument, options);
        }
export type GetWorkingGroupsQueryHookResult = ReturnType<typeof useGetWorkingGroupsQuery>;
export type GetWorkingGroupsLazyQueryHookResult = ReturnType<typeof useGetWorkingGroupsLazyQuery>;
export type GetWorkingGroupsQueryResult = Apollo.QueryResult<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>;
export const GetWorkersDocument = gql`
    query GetWorkers($where: WorkerWhereInput, $offset: Int, $limit: Int) {
  workers(where: $where, offset: $offset, limit: $limit) {
    ...WorkerFields
  }
}
    ${WorkerFieldsFragmentDoc}`;

/**
 * __useGetWorkersQuery__
 *
 * To run a query within a React component, call `useGetWorkersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkersQuery({
 *   variables: {
 *      where: // value for 'where'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetWorkersQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkersQuery, GetWorkersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkersQuery, GetWorkersQueryVariables>(GetWorkersDocument, options);
      }
export function useGetWorkersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkersQuery, GetWorkersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkersQuery, GetWorkersQueryVariables>(GetWorkersDocument, options);
        }
export type GetWorkersQueryHookResult = ReturnType<typeof useGetWorkersQuery>;
export type GetWorkersLazyQueryHookResult = ReturnType<typeof useGetWorkersLazyQuery>;
export type GetWorkersQueryResult = Apollo.QueryResult<GetWorkersQuery, GetWorkersQueryVariables>;
export const GetRewardsDocument = gql`
    query GetRewards($where: RewardPaidEventWhereInput) {
  rewardPaidEvents(where: $where, limit: 10000) {
    ...RewardPaidEventFields
  }
}
    ${RewardPaidEventFieldsFragmentDoc}`;

/**
 * __useGetRewardsQuery__
 *
 * To run a query within a React component, call `useGetRewardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRewardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRewardsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetRewardsQuery(baseOptions?: Apollo.QueryHookOptions<GetRewardsQuery, GetRewardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRewardsQuery, GetRewardsQueryVariables>(GetRewardsDocument, options);
      }
export function useGetRewardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRewardsQuery, GetRewardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRewardsQuery, GetRewardsQueryVariables>(GetRewardsDocument, options);
        }
export type GetRewardsQueryHookResult = ReturnType<typeof useGetRewardsQuery>;
export type GetRewardsLazyQueryHookResult = ReturnType<typeof useGetRewardsLazyQuery>;
export type GetRewardsQueryResult = Apollo.QueryResult<GetRewardsQuery, GetRewardsQueryVariables>;
export const GetBudgetSpendingDocument = gql`
    query GetBudgetSpending($where: BudgetSpendingEventWhereInput) {
  budgetSpendingEvents(where: $where) {
    amount
    createdAt
    groupId
    group {
      leader {
        membership {
          handle
        }
      }
    }
  }
}
    `;

/**
 * __useGetBudgetSpendingQuery__
 *
 * To run a query within a React component, call `useGetBudgetSpendingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBudgetSpendingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBudgetSpendingQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetBudgetSpendingQuery(baseOptions?: Apollo.QueryHookOptions<GetBudgetSpendingQuery, GetBudgetSpendingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBudgetSpendingQuery, GetBudgetSpendingQueryVariables>(GetBudgetSpendingDocument, options);
      }
export function useGetBudgetSpendingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBudgetSpendingQuery, GetBudgetSpendingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBudgetSpendingQuery, GetBudgetSpendingQueryVariables>(GetBudgetSpendingDocument, options);
        }
export type GetBudgetSpendingQueryHookResult = ReturnType<typeof useGetBudgetSpendingQuery>;
export type GetBudgetSpendingLazyQueryHookResult = ReturnType<typeof useGetBudgetSpendingLazyQuery>;
export type GetBudgetSpendingQueryResult = Apollo.QueryResult<GetBudgetSpendingQuery, GetBudgetSpendingQueryVariables>;