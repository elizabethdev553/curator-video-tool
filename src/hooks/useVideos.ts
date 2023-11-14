import { useEffect, useMemo } from 'react';

import { useGetVideosLazyQuery, VideoOrderByInput } from '@/queries';

// import { useBasicVideo } from '@/api/hooks/video' 

import { ForSelectedCouncil } from './types';

export function useVideos() {
  // const [fetchCreated, createdQuery] = useGetVideoCountLazyQuery();
  // const [totalCreated, totalQuery] = useGetVideoCountLazyQuery();
  
  const [getVideo, getVideoQuery]= useGetVideosLazyQuery();
  // const { video, loading } = useBasicVideo(id ?? '', {
  //   skip: !id,
  //   onError: (error) => SentryLogger.error('Failed to fetch video', 'VideoTile', error, { video: { id } }),
  // })

  console.log(getVideo, getVideoQuery, "GGGGGGGGGGGGGGGGGGGGG")
  useEffect(() => {
    // if (!council) return;

    // let variables = {
    //   orderBy: "createdAt_DESC", where: {createdAt_gt: "2023-11-13T00:50:12.000Z", createdAt_lt: "2023-11-13T22:50:12.000Z"}
    //   // text:"welcome"
    // };

    // fetchCreated({
    //   variables,
    // });

    // variables = {
    //   where: { createdAt_gt: '2013-01-10T22:50:12.000Z', createdAt_lt: council.endedAt?.timestamp },
    // };

    // totalCreated({
    //   variables,
    // });
    getVideo()
  }, []);

  // const created = useMemo(() => createdQuery.data?.videosConnection.totalCount, [createdQuery.data]);
  const data = useMemo(() => getVideoQuery.data, [getVideoQuery.data]);
console.log(data, "DATATATATAT")

  return {
    // created,
    data,
    loading: getVideoQuery.loading,
    error: getVideoQuery.error,
  };
}
