import {ReactElement, useEffect, useState} from 'react';
import Link from 'next/link';

import axios from 'axios';
import routes from 'routes';
import {DataT} from 'types';

const DisplayPosts = ({data}: {data: DataT[]}) => {
  return (
    <ul>
      {data.map(({transactionId, buffer}) => {
        return (
          <li key={transactionId}>
            <Link href={routes.entries.view(transactionId)}>
              {buffer?.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const MyPosts = (): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<DataT[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadLastPosts = async () => {
    setLoading(false);
    setError(null);
    try {
      const response = await axios.get('api/arweave/last');
      setPosts(response.data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLastPosts();
  }, []);

  return (
    <div>
      <h3>Latest posts on Mirror</h3>
      {loading ? (
        <div>Loading...</div>
      ) : posts ? (
        <DisplayPosts data={posts} />
      ) : error ? (
        <div>
          <h3>Fetching failed</h3>
          <p>{error}</p>
        </div>
      ) : null}
    </div>
  );
};

export default MyPosts;
