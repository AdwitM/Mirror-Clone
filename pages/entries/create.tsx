import React from 'react';

import {withPublicLayout} from '@/layouts';
import {CreatePostForm, PageContainer} from '@/components';

const CreateEntry = () => {
  return (
    <PageContainer>
      <div>
        <h1>New post</h1>
        <h3>Create and save your post</h3>
        <CreatePostForm />
      </div>
    </PageContainer>
  );
};

export default withPublicLayout(CreateEntry);
