import {ReactElement} from 'react';
import {useRouter} from 'next/router';

const NotFound = (): ReactElement => {
  const router = useRouter();

  return (
    <div>
      <h1>404</h1>
      <button onClick={() => router.push('/')}>Back Home</button>
    </div>
  );
};

export default NotFound;
