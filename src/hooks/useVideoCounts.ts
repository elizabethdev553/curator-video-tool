import { useEffect, useMemo } from 'react';

import { useGetVideoCountLazyQuery } from '@/queries';


export function useVideoCounts(date:string) {

  const createdAt = new Date(date).toISOString();
  const endedAt = new Date(date+ "T23:59:59.999Z").toISOString();

  const variables = {
    where: { createdAt_gt: createdAt, createdAt_lt: endedAt },
  };
  const [getCount, getCountQuery]= useGetVideoCountLazyQuery({variables});

  useEffect(() => {
    if (!date) return;
    getCount({variables})
  }, [date]);
  
  const data = useMemo(() => getCountQuery.data?.videosConnection.totalCount, [getCountQuery.data]);

  console.log(data, "data")
  return {
    data,
    loading_qn: getCountQuery.loading,
    error_qn: getCountQuery.error,
  };
}
