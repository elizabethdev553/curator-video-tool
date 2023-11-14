import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetElectedCouncilsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ElectedCouncilWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.ElectedCouncilOrderByInput> | Types.ElectedCouncilOrderByInput>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetElectedCouncilsQuery = { __typename: 'Query', electedCouncils: Array<{ __typename: 'ElectedCouncil', id: string, electedAtBlock: number, endedAtBlock?: number | null, electedAtTime: any, endedAtTime?: any | null, electedAtNetwork: Types.Network, endedAtNetwork?: Types.Network | null, councilElections: Array<{ __typename: 'ElectionRound', cycleId: number }>, councilMembers: Array<{ __typename: 'CouncilMember', id: string, unpaidReward: string, stake: string, member: { __typename: 'Membership', councilMembers: Array<{ __typename: 'CouncilMember' }> } }> }> };

export type ElectedCouncilFieldsFragment = { __typename: 'ElectedCouncil', id: string, electedAtBlock: number, endedAtBlock?: number | null, electedAtTime: any, endedAtTime?: any | null, electedAtNetwork: Types.Network, endedAtNetwork?: Types.Network | null, councilElections: Array<{ __typename: 'ElectionRound', cycleId: number }>, councilMembers: Array<{ __typename: 'CouncilMember', id: string, unpaidReward: string, stake: string, member: { __typename: 'Membership', councilMembers: Array<{ __typename: 'CouncilMember' }> } }> };

export type CouncilMemberFieldsFragment = { __typename: 'CouncilMember', id: string, unpaidReward: string, stake: string, member: { __typename: 'Membership', councilMembers: Array<{ __typename: 'CouncilMember' }> } };

export const CouncilMemberFieldsFragmentDoc = gql`
    fragment CouncilMemberFields on CouncilMember {
  id
  member {
    councilMembers {
      __typename
    }
  }
  unpaidReward
  stake
}
    `;
export const ElectedCouncilFieldsFragmentDoc = gql`
    fragment ElectedCouncilFields on ElectedCouncil {
  id
  electedAtBlock
  endedAtBlock
  electedAtTime
  endedAtTime
  electedAtNetwork
  endedAtNetwork
  councilElections {
    cycleId
  }
  councilMembers {
    ...CouncilMemberFields
  }
}
    ${CouncilMemberFieldsFragmentDoc}`;
export const GetElectedCouncilsDocument = gql`
    query GetElectedCouncils($where: ElectedCouncilWhereInput, $orderBy: [ElectedCouncilOrderByInput!], $offset: Int, $limit: Int) {
  electedCouncils(
    where: $where
    orderBy: $orderBy
    offset: $offset
    limit: $limit
  ) {
    ...ElectedCouncilFields
    __typename
  }
}
    ${ElectedCouncilFieldsFragmentDoc}`;

/**
 * __useGetElectedCouncilsQuery__
 *
 * To run a query within a React component, call `useGetElectedCouncilsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetElectedCouncilsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetElectedCouncilsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetElectedCouncilsQuery(baseOptions?: Apollo.QueryHookOptions<GetElectedCouncilsQuery, GetElectedCouncilsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetElectedCouncilsQuery, GetElectedCouncilsQueryVariables>(GetElectedCouncilsDocument, options);
      }
export function useGetElectedCouncilsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetElectedCouncilsQuery, GetElectedCouncilsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetElectedCouncilsQuery, GetElectedCouncilsQueryVariables>(GetElectedCouncilsDocument, options);
        }
export type GetElectedCouncilsQueryHookResult = ReturnType<typeof useGetElectedCouncilsQuery>;
export type GetElectedCouncilsLazyQueryHookResult = ReturnType<typeof useGetElectedCouncilsLazyQuery>;
export type GetElectedCouncilsQueryResult = Apollo.QueryResult<GetElectedCouncilsQuery, GetElectedCouncilsQueryVariables>;