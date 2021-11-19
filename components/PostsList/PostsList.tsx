import {ReactElement, useEffect, useState} from 'react';
import Link from 'next/link';
import axios from 'axios';

import routes from '@/routes';
import {DataT} from '@/types';

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

type PostListProps = {
  address?: string;
};

const PostsList = (props: PostListProps): ReactElement => {
  const {address = ''} = props;
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<DataT[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadLastPosts = async () => {
    setLoading(false);
    setError(null);
    try {
      const response = await axios.get(`/api/arweave/search/${address}`);
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
      {loading ? (
        <div>Loading...</div>
      ) : posts ? (
        <DisplayPosts data={posts} />
      ) : error ? (
        <div>
          <h4>Fetching failed</h4>
          <p>{error}</p>
        </div>
      ) : null}
    </div>
  );
};

export default PostsList;
