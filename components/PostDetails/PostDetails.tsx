import React from 'react';

import {NFTDetails} from '@/components';
import {useGetTransaction} from '@/hooks/useArweave';
import {parseErrors} from '@/utils/errors';

type ViewPostProps = {
  transactionId: string;
};

const PostDetails = (props: ViewPostProps): JSX.Element | null => {
  const {transactionId} = props;
  const {transaction, loading, error, refetch} =
    useGetTransaction(transactionId);

  if (error) {
    return (
      <div>
        <h3>Fetching failed</h3>
        <p>{parseErrors(error)}</p>
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (transaction) {
    return (
      <div>
        <NFTDetails transaction={transaction} />
        <div>
          <h4>Entry details</h4>
          <p>Title: {transaction.data.title}</p>
          <p>Body: {transaction.data.body}</p>
          <p>Author: {transaction.tags.Address}</p>
          <p>Arweave tx id: {transaction.id}</p>
          <p>Timestamp: {transaction.timestamp}</p>
        </div>
      </div>
    );
  }

  return null;
};

export default PostDetails;
