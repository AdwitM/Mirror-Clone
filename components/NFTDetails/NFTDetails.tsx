import React, {useEffect, useMemo, useState} from 'react';

import {GetTransactionRespT, TransactionStatusE} from '@/types';
import {useWeb3} from '@/hooks/useWeb3';
import TransferNFTForm from '@/components/TransferNFTForm/TransferNFTForm';
import {Card, Text} from 'degen';
import {ErrorBlock, Loader} from '..';

type NFTDetailsProps = {
  transaction: GetTransactionRespT;
};

const NFTDetails = (props: NFTDetailsProps): JSX.Element | null => {
  const {transaction} = props;
  const {contract, address} = useWeb3();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tokenId, setTokenId] = useState<number>();
  const [nftOwner, setNftOwner] = useState<string | null>(null);

  useEffect(() => {
    const getInitialData = async () => {
      try {
        if (contract) {
          setError(null);
          setLoading(true);

          const tokenId = await contract.tokenURIToTokenId(transaction.id);
          const owner = await contract.ownerOf(tokenId);

          setTokenId(tokenId.toNumber());
          setNftOwner(owner);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    getInitialData();
  }, []);

  const isOwner = useMemo(() => address === nftOwner, [address, nftOwner]);

  if (error) {
    return <ErrorBlock title="Fetching failed" message={error} />;
  }

  if (loading) {
    return <Loader />;
  }

  if (transaction.status === TransactionStatusE.CONFIRMED) {
    return (
      <Card>
        <h4>NFT</h4>
        {tokenId ? (
          <div>
            <p>Token Id: {tokenId}</p>
            <p>Owner: {nftOwner}</p>
            {isOwner && <TransferNFTForm tokenId={tokenId} />}
          </div>
        ) : (
          <Text>{"Token hasn't been minted yet."}</Text>
        )}
      </Card>
    );
  }

  return null;
};

export default NFTDetails;
