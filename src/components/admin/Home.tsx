import {useParams} from 'react-router-dom'
import { Videos } from '@/components';
import { useVideos } from '@/hooks';
import Spinner from "../layout/Spinner"

const Home = () => {
  const { start, end } = useParams();
  
// console.log(start, end, "start, end")
  const { data, loading, error } = useVideos(start, end);
  
  if (loading) {
    <Spinner />
  }
  
  if (error) {
    return <div className="sub_panel loading">error</div>;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Upload List</h1>
      {
      <Videos results={data} />
      }
    </section>
  );
};

export default Home