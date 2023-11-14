import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetTerminatedWorkderQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.TerminatedWorkerEventWhereInput>;
}>;


export type GetTerminatedWorkderQuery = { __typename: 'Query', terminatedWorkerEvents: Array<{ __typename: 'TerminatedWorkerEvent', groupId: string, workerId: string, createdAt: any, worker: { __typename: 'Worker', membershipId: string } }> };

export type GetWorkerExitedQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WorkerExitedEventWhereInput>;
}>;


export type GetWorkerExitedQuery = { __typename: 'Query', workerExitedEvents: Array<{ __typename: 'WorkerExitedEvent', createdAt: any, groupId: string, workerId: string, worker: { __typename: 'Worker', membershipId: string } }> };

export type GetOpeningFilledQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.OpeningFilledEventWhereInput>;
}>;


export type GetOpeningFilledQuery = { __typename: 'Query', openingFilledEvents: Array<{ __typename: 'OpeningFilledEvent', createdAt: any, groupId: string, workersHired: Array<{ __typename: 'Worker', membershipId: string }> }> };


export const GetTerminatedWorkderDocument = gql`
    query getTerminatedWorkder($where: TerminatedWorkerEventWhereInput) {
  terminatedWorkerEvents(where: $where) {
    groupId
    workerId
    createdAt
    __typename
    worker {
      membershipId
    }
  }
}
    `;

/**
 * __useGetTerminatedWorkderQuery__
 *
 * To run a query within a React component, call `useGetTerminatedWorkderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTerminatedWorkderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTerminatedWorkderQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetTerminatedWorkderQuery(baseOptions?: Apollo.QueryHookOptions<GetTerminatedWorkderQuery, GetTerminatedWorkderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTerminatedWorkderQuery, GetTerminatedWorkderQueryVariables>(GetTerminatedWorkderDocument, options);
      }
export function useGetTerminatedWorkderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTerminatedWorkderQuery, GetTerminatedWorkderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTerminatedWorkderQuery, GetTerminatedWorkderQueryVariables>(GetTerminatedWorkderDocument, options);
        }
export type GetTerminatedWorkderQueryHookResult = ReturnType<typeof useGetTerminatedWorkderQuery>;
export type GetTerminatedWorkderLazyQueryHookResult = ReturnType<typeof useGetTerminatedWorkderLazyQuery>;
export type GetTerminatedWorkderQueryResult = Apollo.QueryResult<GetTerminatedWorkderQuery, GetTerminatedWorkderQueryVariables>;
export const GetWorkerExitedDocument = gql`
    query getWorkerExited($where: WorkerExitedEventWhereInput) {
  workerExitedEvents(where: $where) {
    createdAt
    groupId
    workerId
    __typename
    worker {
      membershipId
    }
  }
}
    `;

/**
 * __useGetWorkerExitedQuery__
 *
 * To run a query within a React component, call `useGetWorkerExitedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkerExitedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkerExitedQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetWorkerExitedQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkerExitedQuery, GetWorkerExitedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkerExitedQuery, GetWorkerExitedQueryVariables>(GetWorkerExitedDocument, options);
      }
export function useGetWorkerExitedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkerExitedQuery, GetWorkerExitedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkerExitedQuery, GetWorkerExitedQueryVariables>(GetWorkerExitedDocument, options);
        }
export type GetWorkerExitedQueryHookResult = ReturnType<typeof useGetWorkerExitedQuery>;
export type GetWorkerExitedLazyQueryHookResult = ReturnType<typeof useGetWorkerExitedLazyQuery>;
export type GetWorkerExitedQueryResult = Apollo.QueryResult<GetWorkerExitedQuery, GetWorkerExitedQueryVariables>;
export const GetOpeningFilledDocument = gql`
    query getOpeningFilled($where: OpeningFilledEventWhereInput) {
  openingFilledEvents(where: $where) {
    createdAt
    groupId
    workersHired {
      membershipId
    }
  }
}
    `;

/**
 * __useGetOpeningFilledQuery__
 *
 * To run a query within a React component, call `useGetOpeningFilledQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOpeningFilledQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOpeningFilledQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetOpeningFilledQuery(baseOptions?: Apollo.QueryHookOptions<GetOpeningFilledQuery, GetOpeningFilledQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOpeningFilledQuery, GetOpeningFilledQueryVariables>(GetOpeningFilledDocument, options);
      }
export function useGetOpeningFilledLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOpeningFilledQuery, GetOpeningFilledQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOpeningFilledQuery, GetOpeningFilledQueryVariables>(GetOpeningFilledDocument, options);
        }
export type GetOpeningFilledQueryHookResult = ReturnType<typeof useGetOpeningFilledQuery>;
export type GetOpeningFilledLazyQueryHookResult = ReturnType<typeof useGetOpeningFilledLazyQuery>;
export type GetOpeningFilledQueryResult = Apollo.QueryResult<GetOpeningFilledQuery, GetOpeningFilledQueryVariables>;