import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client'
// import { BasicChannelFieldsFragmentDoc } from './channels.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVideoCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.VideoWhereInput>;
}>;


export type GetVideoCountQuery = { __typename: 'Query', videosConnection: { __typename: 'VideoConnection', totalCount: number } };

export type GetVideosQueryVariables = Types.Exact<{
  // whereVideo?: Types.InputMaybe<Types.VideoWhereInput>;
  // whereChannel?: Types.InputMaybe<Types.ChannelWhereInput>;
  // skip?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?:Types.VideoOrderByInput
  where?:Types.InputMaybe<Types.VideoWhereInput>;
  // text: Types.Scalars['String'];

}>

export type GetVideosQuery = any;

export type BasicVideoFieldsFragment = { __typename: 'Video', id: string, title?: string | null, createdAt: any };

export const BasicVideoFieldsFragmentDoc = gql`
    fragment BasicVideoFields on Video {
  id
  title
  createdAt
}
    `;
export const GetVideoCountDocument = gql`
    query GetVideoCount($where: VideoWhereInput) {
  videosConnection(first: 0, where: $where) {
    totalCount
  }
}
    `;


export function useGetVideoCountQuery(baseOptions?: Apollo.QueryHookOptions<GetVideoCountQuery, GetVideoCountQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetVideoCountQuery, GetVideoCountQueryVariables>(GetVideoCountDocument, options);
}
export function useGetVideoCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoCountQuery, GetVideoCountQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetVideoCountQuery, GetVideoCountQueryVariables>(GetVideoCountDocument, options);
}
export type GetVideoCountQueryHookResult = ReturnType<typeof useGetVideoCountQuery>;
export type GetVideoCountLazyQueryHookResult = ReturnType<typeof useGetVideoCountLazyQuery>;
export type GetVideoCountQueryResult = Apollo.QueryResult<GetVideoCountQuery, GetVideoCountQueryVariables>;
export const GetVideosDocument = gql`
    query GetVideos{
      videos(orderBy: createdAt_DESC, where: {createdAt_gt: "2023-11-13T00:50:12.000Z", createdAt_lt: "2023-11-13T22:50:12.000Z"}) {
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
    `
 
// ${BasicVideoFieldsFragmentDoc}`;


export function useGetVideosQuery(baseOptions: Apollo.QueryHookOptions<GetVideosQuery, GetVideosQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetVideosQuery, GetVideosQueryVariables>(GetVideosDocument, options);
}
export function useGetVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideosQuery, GetVideosQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetVideosQuery, GetVideosQueryVariables>(GetVideosDocument, options);
}
// lo.useLazyQuery<GetVideosQuery, GetVideosQueryVariables>(GetVideosDocument, options);
// }
export type GetVideosQueryHookResult = ReturnType<typeof useGetVideosQuery>;
export type GetVideosLazyQueryHookResult = ReturnType<typeof useGetVideosLazyQuery>;
export type GetVideosQueryResult = Apollo.QueryResult<GetVideosQuery, GetVideosQueryVariables>;