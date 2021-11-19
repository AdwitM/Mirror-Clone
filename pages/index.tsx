import React from 'react';
import Link from 'next/link';

import routes from '@/routes';
import {withPublicLayout} from '@/layouts';
import {PageContainer, PostsList} from '@/components';

const Home = () => {
  return (
    <PageContainer>
      <h1 role="heading">Mirror Clone Tutorial</h1>
      <div>
        <Link href={routes.entries.create} passHref>
          <button>Create New Post</button>
        </Link>
        <h3>Recent posts</h3>
        <PostsList />
      </div>
    </PageContainer>
  );
};

export default withPublicLayout(Home);
