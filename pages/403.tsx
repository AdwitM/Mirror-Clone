import {ReactElement} from 'react';
import {useRouter} from 'next/router';

const NotAuthorized = (): ReactElement => {
  const router = useRouter();

  return (
    <div>
      <h1>403</h1>
      <button onClick={() => router.push('/')}>Back Home</button>
    </div>
  );
};

export default NotAuthorized;
