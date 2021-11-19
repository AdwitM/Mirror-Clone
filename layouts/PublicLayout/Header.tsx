import Link from 'next/link';
import routes from 'routes';
import {ReactElement, useState} from 'react';

import {useWeb3} from '@/hooks/useWeb3';

import Navigation from './Navigation';

const Header = (): ReactElement => {
  const {address, connect, disconnect} = useWeb3();
  const [fetching, setFetching] = useState(false);

  const connectToggle = async () => {
    setFetching(true);
    try {
      if (address) {
        disconnect();
        alert(
          'To fully disconnect, click "Connected" on MetaMask and disconnect your account.',
        );
      } else {
        await connect();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown Error';
      alert(`Connection attempt failed: ${errorMessage}`);
    } finally {
      setFetching(false);
    }
  };

  return (
    <div>
      <div>
        <Navigation />
        <button onClick={connectToggle} disabled={fetching}>
          {address ? 'Disconnect' : 'Connect'}
        </button>
        {address && <Link href={`/profile/${address}`}>Profile</Link>}
      </div>
    </div>
  );
};

export default Header;
