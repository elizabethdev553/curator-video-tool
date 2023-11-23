import { useEffect, useMemo } from 'react';

import { useGetVideoCountLazyQuery } from '@/queries';
import moment from 'moment';

export function useVideoCounts(start_date:any, end_date:any) {

  const createdAt =  moment.utc(start_date).toDate();
  const endedAt = moment.utc(end_date).toDate();

  const variables = {
    where: { createdAt_gt: createdAt, createdAt_lt: endedAt },
  };
  const [getCount, getCountQuery]= useGetVideoCountLazyQuery({variables});

  useEffect(() => {
    if (!start_date||!end_date) return;
    getCount({variables})
  }, [start_date,end_date]);
  
  const data = useMemo(() => getCountQuery.data?.videosConnection.totalCount, [getCountQuery.data]);

  console.log(data, "data")
  return {
    data,
    loading_qn: getCountQuery.loading,
    error_qn: getCountQuery.error,
  };
}
