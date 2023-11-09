import { useEffect, useMemo } from 'react';

import { useGetVideoCountLazyQuery, useGetVideosQuery } from '@/queries';

// import { useBasicVideo } from '@/api/hooks/video' 

import { ForSelectedCouncil } from './types';

export function useVideos({ council }: ForSelectedCouncil) {
  const [fetchCreated, createdQuery] = useGetVideoCountLazyQuery();
  const [totalCreated, totalQuery] = useGetVideoCountLazyQuery();

  // const { video, loading } = useBasicVideo(id ?? '', {
  //   skip: !id,
  //   onError: (error) => SentryLogger.error('Failed to fetch video', 'VideoTile', error, { video: { id } }),
  // })

  console.log(fetchCreated,"FETCH", totalCreated, "TOTAL")
  // const [, ] = useGetVideosQuery();

  useEffect(() => {
    if (!council) return;

    let variables = {
      where: { createdAt_gt: council.electedAt.timestamp, createdAt_lt: council.endedAt?.timestamp },
    };

    fetchCreated({
      variables,
    });

    variables = {
      where: { createdAt_gt: '2013-01-10T22:50:12.000Z', createdAt_lt: council.endedAt?.timestamp },
    };

    totalCreated({
      variables,
    });
  }, [council]);

  const created = useMemo(() => createdQuery.data?.videosConnection.totalCount, [createdQuery.data]);
  const total = useMemo(() => totalQuery.data?.videosConnection.totalCount, [totalQuery.data]);

  return {
    created,
    total,
    loading: createdQuery.loading,
    error: createdQuery.error,
  };
}
