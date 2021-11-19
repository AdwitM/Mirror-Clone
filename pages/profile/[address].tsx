import React from 'react';
import {useRouter} from 'next/router';

import {withPublicLayout} from '@/layouts';
import {PageContainer, PostsList} from '@/components';

const Profile = () => {
  const router = useRouter();
  const {address} = router.query;

  return (
    <PageContainer>
      <h3>Profile {address}</h3>
      {address && <PostsList address={address as string} />}
    </PageContainer>
  );
};

export default withPublicLayout(Profile);
