import React from 'react';

import {
  ErrorBlock,
  Loader,
  NFTDetails,
  PageContent,
  Timestamp,
} from '@/components';
import {useGetTransaction} from '@/hooks/useArweave';
import {parseErrors} from '@/utils/errors';
import {Box, Heading, Stack, Tag, Text} from 'degen';
import Link from 'next/link';
import routes from '@/routes';
import {addEllipsis} from '@/utils/string';

type ViewPostProps = {
  transactionId: string;
};

const PostDetails = (props: ViewPostProps): JSX.Element | null => {
  const {transactionId} = props;

  const {transaction, loading, error, refetch} =
    useGetTransaction(transactionId);

  if (error) {
    return (
      <ErrorBlock
        title="Fetching failed"
        message={parseErrors(error)}
        retry={refetch}
      />
    );
  }

  if (loading) {
    return <Loader />;
  }

  if (transaction) {
    return (
      <PageContent>
        <Box marginBottom="8">
          <NFTDetails transaction={transaction} />
        </Box>
        <Stack>
          <Heading>{transaction.data.title}</Heading>
          <Stack direction="horizontal">
            <Tag>
              <Link href={routes.profile(transaction.tags.Address)}>
                {addEllipsis(transaction.tags.Address)}
              </Link>
            </Tag>
            <Tag>
              <Timestamp timestamp={transaction.timestamp as number} />
            </Tag>
          </Stack>
          <Box paddingY="12">
            <Text>{transaction.data.body}</Text>
          </Box>
          <a
            href={`${process.env.NEXT_PUBLIC_ARWEAVE_BLOCK_EXPLORER_URL}tx/${transaction.id}`}
            target="_blank"
            rel="noreferrer"
          >
            {`Arweave tx id: ${transaction.id}`}
          </a>
        </Stack>
      </PageContent>
    );
  }

  return null;
};

export default PostDetails;
