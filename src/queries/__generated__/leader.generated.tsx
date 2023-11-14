import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetLeadQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.OpeningFilledEventWhereInput>;
}>;


export type GetLeadQuery = { __typename: 'Query', openingFilledEvents: Array<{ __typename: 'OpeningFilledEvent', createdAt: any, groupId: string, workersHired: Array<{ __typename: 'Worker', membership: { __typename: 'Membership', handle: string } }>, opening: { __typename: 'WorkingGroupOpening', type: Types.WorkingGroupOpeningType } }> };

export type GetTerminatedWorkerQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.TerminatedWorkerEventWhereInput>;
}>;


export type GetTerminatedWorkerQuery = { __typename: 'Query', terminatedWorkerEvents: Array<{ __typename: 'TerminatedWorkerEvent', createdAt: any, groupId: string, group: { __typename: 'WorkingGroup', leader?: { __typename: 'Worker', membership: { __typename: 'Membership', handle: string } } | null }, worker: { __typename: 'Worker', isLead: boolean, membership: { __typename: 'Membership', handle: string } } }> };

export type GetExitedWorkerQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WorkerExitedEventWhereInput>;
}>;


export type GetExitedWorkerQuery = { __typename: 'Query', workerExitedEvents: Array<{ __typename: 'WorkerExitedEvent', createdAt: any, groupId: string, group: { __typename: 'WorkingGroup', leader?: { __typename: 'Worker', membership: { __typename: 'Membership', handle: string } } | null }, worker: { __typename: 'Worker', isLead: boolean, membership: { __typename: 'Membership', handle: string } } }> };

export type GetSlashWorkerQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WorkEntrySlashedEventWhereInput>;
}>;


export type GetSlashWorkerQuery = { __typename: 'Query', workEntrySlashedEvents: Array<{ __typename: 'WorkEntrySlashedEvent', createdAt: any, entry: { __typename: 'BountyEntry', worker: { __typename: 'Membership', handle: string } } }> };

export type GetPostOfLeadQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ProposalDiscussionPostWhereInput>;
}>;


export type GetPostOfLeadQuery = { __typename: 'Query', proposalDiscussionPosts: Array<{ __typename: 'ProposalDiscussionPost', createdAt: any, text: string, author: { __typename: 'Membership', handle: string } }> };


export const GetLeadDocument = gql`
    query getLead($where: OpeningFilledEventWhereInput) {
  openingFilledEvents(where: $where) {
    createdAt
    groupId
    workersHired {
      membership {
        handle
      }
    }
    opening {
      type
    }
  }
}
    `;

/**
 * __useGetLeadQuery__
 *
 * To run a query within a React component, call `useGetLeadQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLeadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLeadQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetLeadQuery(baseOptions?: Apollo.QueryHookOptions<GetLeadQuery, GetLeadQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLeadQuery, GetLeadQueryVariables>(GetLeadDocument, options);
      }
export function useGetLeadLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLeadQuery, GetLeadQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLeadQuery, GetLeadQueryVariables>(GetLeadDocument, options);
        }
export type GetLeadQueryHookResult = ReturnType<typeof useGetLeadQuery>;
export type GetLeadLazyQueryHookResult = ReturnType<typeof useGetLeadLazyQuery>;
export type GetLeadQueryResult = Apollo.QueryResult<GetLeadQuery, GetLeadQueryVariables>;
export const GetTerminatedWorkerDocument = gql`
    query getTerminatedWorker($where: TerminatedWorkerEventWhereInput) {
  terminatedWorkerEvents(where: $where) {
    createdAt
    groupId
    group {
      leader {
        membership {
          handle
        }
      }
    }
    worker {
      membership {
        handle
      }
      isLead
    }
  }
}
    `;

/**
 * __useGetTerminatedWorkerQuery__
 *
 * To run a query within a React component, call `useGetTerminatedWorkerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTerminatedWorkerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTerminatedWorkerQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetTerminatedWorkerQuery(baseOptions?: Apollo.QueryHookOptions<GetTerminatedWorkerQuery, GetTerminatedWorkerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTerminatedWorkerQuery, GetTerminatedWorkerQueryVariables>(GetTerminatedWorkerDocument, options);
      }
export function useGetTerminatedWorkerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTerminatedWorkerQuery, GetTerminatedWorkerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTerminatedWorkerQuery, GetTerminatedWorkerQueryVariables>(GetTerminatedWorkerDocument, options);
        }
export type GetTerminatedWorkerQueryHookResult = ReturnType<typeof useGetTerminatedWorkerQuery>;
export type GetTerminatedWorkerLazyQueryHookResult = ReturnType<typeof useGetTerminatedWorkerLazyQuery>;
export type GetTerminatedWorkerQueryResult = Apollo.QueryResult<GetTerminatedWorkerQuery, GetTerminatedWorkerQueryVariables>;
export const GetExitedWorkerDocument = gql`
    query getExitedWorker($where: WorkerExitedEventWhereInput) {
  workerExitedEvents(where: $where) {
    createdAt
    groupId
    group {
      leader {
        membership {
          handle
        }
      }
    }
    worker {
      membership {
        handle
      }
      isLead
    }
  }
}
    `;

/**
 * __useGetExitedWorkerQuery__
 *
 * To run a query within a React component, call `useGetExitedWorkerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExitedWorkerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExitedWorkerQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetExitedWorkerQuery(baseOptions?: Apollo.QueryHookOptions<GetExitedWorkerQuery, GetExitedWorkerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExitedWorkerQuery, GetExitedWorkerQueryVariables>(GetExitedWorkerDocument, options);
      }
export function useGetExitedWorkerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExitedWorkerQuery, GetExitedWorkerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExitedWorkerQuery, GetExitedWorkerQueryVariables>(GetExitedWorkerDocument, options);
        }
export type GetExitedWorkerQueryHookResult = ReturnType<typeof useGetExitedWorkerQuery>;
export type GetExitedWorkerLazyQueryHookResult = ReturnType<typeof useGetExitedWorkerLazyQuery>;
export type GetExitedWorkerQueryResult = Apollo.QueryResult<GetExitedWorkerQuery, GetExitedWorkerQueryVariables>;
export const GetSlashWorkerDocument = gql`
    query getSlashWorker($where: WorkEntrySlashedEventWhereInput) {
  workEntrySlashedEvents(where: $where) {
    createdAt
    entry {
      worker {
        handle
      }
    }
  }
}
    `;

/**
 * __useGetSlashWorkerQuery__
 *
 * To run a query within a React component, call `useGetSlashWorkerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSlashWorkerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSlashWorkerQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetSlashWorkerQuery(baseOptions?: Apollo.QueryHookOptions<GetSlashWorkerQuery, GetSlashWorkerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSlashWorkerQuery, GetSlashWorkerQueryVariables>(GetSlashWorkerDocument, options);
      }
export function useGetSlashWorkerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSlashWorkerQuery, GetSlashWorkerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSlashWorkerQuery, GetSlashWorkerQueryVariables>(GetSlashWorkerDocument, options);
        }
export type GetSlashWorkerQueryHookResult = ReturnType<typeof useGetSlashWorkerQuery>;
export type GetSlashWorkerLazyQueryHookResult = ReturnType<typeof useGetSlashWorkerLazyQuery>;
export type GetSlashWorkerQueryResult = Apollo.QueryResult<GetSlashWorkerQuery, GetSlashWorkerQueryVariables>;
export const GetPostOfLeadDocument = gql`
    query getPostOfLead($where: ProposalDiscussionPostWhereInput) {
  proposalDiscussionPosts(where: $where) {
    createdAt
    author {
      handle
    }
    text
  }
}
    `;

/**
 * __useGetPostOfLeadQuery__
 *
 * To run a query within a React component, call `useGetPostOfLeadQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostOfLeadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostOfLeadQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetPostOfLeadQuery(baseOptions?: Apollo.QueryHookOptions<GetPostOfLeadQuery, GetPostOfLeadQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostOfLeadQuery, GetPostOfLeadQueryVariables>(GetPostOfLeadDocument, options);
      }
export function useGetPostOfLeadLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostOfLeadQuery, GetPostOfLeadQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostOfLeadQuery, GetPostOfLeadQueryVariables>(GetPostOfLeadDocument, options);
        }
export type GetPostOfLeadQueryHookResult = ReturnType<typeof useGetPostOfLeadQuery>;
export type GetPostOfLeadLazyQueryHookResult = ReturnType<typeof useGetPostOfLeadLazyQuery>;
export type GetPostOfLeadQueryResult = Apollo.QueryResult<GetPostOfLeadQuery, GetPostOfLeadQueryVariables>;