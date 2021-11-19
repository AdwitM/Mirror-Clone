import React from 'react';
import {useRouter} from 'next/router';

import {withPublicLayout} from '@/layouts';
import {PageContainer, PostDetails} from '@/components';

const ShowEntry = (): JSX.Element | null => {
  const router = useRouter();
  const {transactionId} = router.query;

  if (transactionId) {
    return (
      <PageContainer>
        <PostDetails transactionId={transactionId as string} />
      </PageContainer>
    );
  }

  return null;
};

export default withPublicLayout(ShowEntry);
