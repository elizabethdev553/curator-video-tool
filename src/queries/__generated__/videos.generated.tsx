import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVideosQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.VideoWhereInput>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetVideosQuery = { __typename: 'Query', videos: Array<{ __typename: 'Video', createdAt: any, description?: string | null, duration?: number | null, id: string, ytVideoId?: string | null, title?: string | null, nft?: { __typename: 'OwnedNft', id: string } | null, channel: { __typename: 'Channel', id: string, title?: string | null, ownerMember?: { __typename: 'Membership', handle: string, id: string } | null }, media?: { __typename: 'StorageDataObject', id: string } | null }> };

export type GetVideoCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.VideoWhereInput>;
}>;


export type GetVideoCountQuery = { __typename: 'Query', videosConnection: { __typename: 'VideoConnection', totalCount: number } };


export const GetVideosDocument = gql`
    query GetVideos($where: VideoWhereInput, $limit: Int) {
  videos(orderBy: createdAt_DESC, where: $where, limit: $limit) {
    createdAt
    description
    duration
    id
    ytVideoId
    nft {
      id
    }
    title
    channel {
      id
      title
      ownerMember {
        handle
        id
      }
    }
    media {
      id
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
 *      limit: // value for 'limit'
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
export const GetVideoCountDocument = gql`
    query GetVideoCount($where: VideoWhereInput) {
  videosConnection(first: 0, where: $where, orderBy: createdAt_DESC) {
    totalCount
  }
}
    `;

/**
 * __useGetVideoCountQuery__
 *
 * To run a query within a React component, call `useGetVideoCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideoCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideoCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetVideoCountQuery(baseOptions?: Apollo.QueryHookOptions<GetVideoCountQuery, GetVideoCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideoCountQuery, GetVideoCountQueryVariables>(GetVideoCountDocument, options);
      }
export function useGetVideoCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoCountQuery, GetVideoCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideoCountQuery, GetVideoCountQueryVariables>(GetVideoCountDocument, options);
        }
export type GetVideoCountQueryHookResult = ReturnType<typeof useGetVideoCountQuery>;
export type GetVideoCountLazyQueryHookResult = ReturnType<typeof useGetVideoCountLazyQuery>;
export type GetVideoCountQueryResult = Apollo.QueryResult<GetVideoCountQuery, GetVideoCountQueryVariables>;