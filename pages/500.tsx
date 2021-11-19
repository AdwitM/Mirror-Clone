import {ReactElement} from 'react';
import {useRouter} from 'next/router';

const ServerError = (): ReactElement => {
  const router = useRouter();

  return (
    <div>
      <h1>500</h1>
      <button onClick={() => router.push('/')}>Back Home</button>
    </div>
  );
};

export default ServerError;
