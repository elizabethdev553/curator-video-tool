import { useEffect, useMemo } from 'react';

import { useGetVideosLazyQuery } from '@/queries';


export function useVideos(createdAt:String, endedAt:String) {

  const variables = {
    where: { createdAt_gt: createdAt, createdAt_lt: endedAt },
    limit:50000
  };
  const [getVideo, getVideoQuery]= useGetVideosLazyQuery({variables});

  useEffect(() => {
    if (!createdAt||!endedAt) return;
    getVideo({variables})
  }, [createdAt, endedAt]);
  

  const data = useMemo(() => getVideoQuery.data?.videos.map((item: any) => {
    const temp: any = {};
    temp.key = item['id'];
    temp.video_title = item['title'];
    temp.video_media_id = item['media']['id'];
    temp.video_owner_handle = item['channel']['ownerMember']['handle'];
    temp.video_createdAt = item['createdAt'];
    temp.video_yt_id = item['ytVideoId'];
    temp.video_channel_title = item['channel']['title'];
    item['nft']==null ?temp.video_nft_id = 'No': temp.video_nft_id = "Yes";

    return temp
  }), [getVideoQuery.data]);

  return {
    data,
    loading: getVideoQuery.loading,
    error: getVideoQuery.error,
  };
}
