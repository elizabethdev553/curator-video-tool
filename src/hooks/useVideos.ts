import { useEffect, useMemo } from 'react';

import { useGetVideosLazyQuery, VideoOrderByInput } from '@/queries';

// import { useBasicVideo } from '@/api/hooks/video' 

export function useVideos(date:string) {

  const createdAt = new Date(date).toISOString();
  const endedAt = new Date(date+ "T23:59:59.999Z").toISOString();
  console.log(createdAt, endedAt, "dfdfdfdfdfd")
  const [getVideo, getVideoQuery]= useGetVideosLazyQuery();

  useEffect(() => {
    let variables = {
      where: { createdAt_gt: createdAt, createdAt_lt: endedAt },
    };
    getVideo({variables})
  }, [date]);

  const data = useMemo(() => getVideoQuery.data, [getVideoQuery.data]);
console.log(data, "MMMMMMMMMMMMMMMMMMMMMMM")
  return {
    data,
    loading: getVideoQuery.loading,
    error: getVideoQuery.error,
  };
}
