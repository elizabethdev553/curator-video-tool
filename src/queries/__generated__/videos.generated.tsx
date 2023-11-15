import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVideosQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.VideoWhereInput>;
}>;


export type GetVideosQuery = { __typename: 'Query', videos: Array<{ __typename: 'Video', createdAt: any, description?: string | null, id: string, title?: string | null, media?: { __typename: 'StorageDataObject', id: string } | null, channel: { __typename: 'Channel', id: string, title?: string | null, ownerMember?: { __typename: 'Membership', handle: string, id: string } | null } }> };


export const GetVideosDocument = gql`
    query GetVideos($where: VideoWhereInput) {
  videos(orderBy: createdAt_DESC, where: $where) {
    createdAt
    description
    id
    title
    media {
      id
    }
    channel {
      id
      title
      ownerMember {
        handle
        id
      }
    }
  }
}
    `;

/**
 * __useGetVideosQuery__
 *
 * To run a query within a React component, call `useGetVideosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideosQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetVideosQuery(baseOptions?: Apollo.QueryHookOptions<GetVideosQuery, GetVideosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideosQuery, GetVideosQueryVariables>(GetVideosDocument, options);
      }
export function useGetVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideosQuery, GetVideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideosQuery, GetVideosQueryVariables>(GetVideosDocument, options);
        }
export type GetVideosQueryHookResult = ReturnType<typeof useGetVideosQuery>;
export type GetVideosLazyQueryHookResult = ReturnType<typeof useGetVideosLazyQuery>;
export type GetVideosQueryResult = Apollo.QueryResult<GetVideosQuery, GetVideosQueryVariables>;