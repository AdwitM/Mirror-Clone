import {ReactElement} from 'react';
import Link from 'next/link';

import routes from '@/routes';

const Navigation = (): ReactElement => {
  return (
    <div>
      <Link href={routes.home}>Home</Link>
    </div>
  );
};

export default Navigation;
