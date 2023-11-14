import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MintedTokensQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.RewardPaymentEventWhereInput>;
}>;


export type MintedTokensQuery = { __typename: 'Query', rewardPaymentEvents: Array<{ __typename: 'RewardPaymentEvent', inBlock: number, councilMemberId: string, id: string, paidBalance: string, missingBalance: string, councilMember: { __typename: 'CouncilMember', electedInCouncilId: string, member: { __typename: 'Membership', id: string } } }> };

export type WorkingGroupTokenQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BudgetUpdatedEventWhereInput>;
}>;


export type WorkingGroupTokenQuery = { __typename: 'Query', budgetUpdatedEvents: Array<{ __typename: 'BudgetUpdatedEvent', groupId: string, budgetChangeAmount: string, inBlock: number, id: string }> };

export type CouncilTokensQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BudgetRefillEventWhereInput>;
}>;


export type CouncilTokensQuery = { __typename: 'Query', budgetRefillEvents: Array<{ __typename: 'BudgetRefillEvent', id: string, balance: string, inBlock: number }> };

export type GetFundedQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.RequestFundedEventWhereInput>;
}>;


export type GetFundedQuery = { __typename: 'Query', requestFundedEvents: Array<{ __typename: 'RequestFundedEvent', id: string, amount: string }> };


export const MintedTokensDocument = gql`
    query mintedTokens($where: RewardPaymentEventWhereInput) {
  rewardPaymentEvents(where: $where) {
    inBlock
    councilMemberId
    id
    paidBalance
    missingBalance
    councilMember {
      electedInCouncilId
      member {
        id
      }
    }
  }
}
    `;

/**
 * __useMintedTokensQuery__
 *
 * To run a query within a React component, call `useMintedTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useMintedTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMintedTokensQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useMintedTokensQuery(baseOptions?: Apollo.QueryHookOptions<MintedTokensQuery, MintedTokensQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MintedTokensQuery, MintedTokensQueryVariables>(MintedTokensDocument, options);
      }
export function useMintedTokensLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MintedTokensQuery, MintedTokensQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MintedTokensQuery, MintedTokensQueryVariables>(MintedTokensDocument, options);
        }
export type MintedTokensQueryHookResult = ReturnType<typeof useMintedTokensQuery>;
export type MintedTokensLazyQueryHookResult = ReturnType<typeof useMintedTokensLazyQuery>;
export type MintedTokensQueryResult = Apollo.QueryResult<MintedTokensQuery, MintedTokensQueryVariables>;
export const WorkingGroupTokenDocument = gql`
    query workingGroupToken($where: BudgetUpdatedEventWhereInput) {
  budgetUpdatedEvents(where: $where) {
    groupId
    budgetChangeAmount
    inBlock
    id
  }
}
    `;

/**
 * __useWorkingGroupTokenQuery__
 *
 * To run a query within a React component, call `useWorkingGroupTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkingGroupTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkingGroupTokenQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useWorkingGroupTokenQuery(baseOptions?: Apollo.QueryHookOptions<WorkingGroupTokenQuery, WorkingGroupTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WorkingGroupTokenQuery, WorkingGroupTokenQueryVariables>(WorkingGroupTokenDocument, options);
      }
export function useWorkingGroupTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkingGroupTokenQuery, WorkingGroupTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WorkingGroupTokenQuery, WorkingGroupTokenQueryVariables>(WorkingGroupTokenDocument, options);
        }
export type WorkingGroupTokenQueryHookResult = ReturnType<typeof useWorkingGroupTokenQuery>;
export type WorkingGroupTokenLazyQueryHookResult = ReturnType<typeof useWorkingGroupTokenLazyQuery>;
export type WorkingGroupTokenQueryResult = Apollo.QueryResult<WorkingGroupTokenQuery, WorkingGroupTokenQueryVariables>;
export const CouncilTokensDocument = gql`
    query councilTokens($where: BudgetRefillEventWhereInput) {
  budgetRefillEvents(where: $where) {
    id
    balance
    inBlock
  }
}
    `;

/**
 * __useCouncilTokensQuery__
 *
 * To run a query within a React component, call `useCouncilTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useCouncilTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCouncilTokensQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useCouncilTokensQuery(baseOptions?: Apollo.QueryHookOptions<CouncilTokensQuery, CouncilTokensQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CouncilTokensQuery, CouncilTokensQueryVariables>(CouncilTokensDocument, options);
      }
export function useCouncilTokensLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CouncilTokensQuery, CouncilTokensQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CouncilTokensQuery, CouncilTokensQueryVariables>(CouncilTokensDocument, options);
        }
export type CouncilTokensQueryHookResult = ReturnType<typeof useCouncilTokensQuery>;
export type CouncilTokensLazyQueryHookResult = ReturnType<typeof useCouncilTokensLazyQuery>;
export type CouncilTokensQueryResult = Apollo.QueryResult<CouncilTokensQuery, CouncilTokensQueryVariables>;
export const GetFundedDocument = gql`
    query getFunded($where: RequestFundedEventWhereInput) {
  requestFundedEvents(where: $where) {
    id
    amount
  }
}
    `;

/**
 * __useGetFundedQuery__
 *
 * To run a query within a React component, call `useGetFundedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFundedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFundedQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetFundedQuery(baseOptions?: Apollo.QueryHookOptions<GetFundedQuery, GetFundedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFundedQuery, GetFundedQueryVariables>(GetFundedDocument, options);
      }
export function useGetFundedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFundedQuery, GetFundedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFundedQuery, GetFundedQueryVariables>(GetFundedDocument, options);
        }
export type GetFundedQueryHookResult = ReturnType<typeof useGetFundedQuery>;
export type GetFundedLazyQueryHookResult = ReturnType<typeof useGetFundedLazyQuery>;
export type GetFundedQueryResult = Apollo.QueryResult<GetFundedQuery, GetFundedQueryVariables>;