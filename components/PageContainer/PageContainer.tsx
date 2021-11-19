import React from 'react';

type PageContainerProps = {
  children: React.ReactNode;
};

const PageContainer = (props: PageContainerProps): React.ReactElement => {
  const {children} = props;
  return <div>{children}</div>;
};

export default PageContainer;
