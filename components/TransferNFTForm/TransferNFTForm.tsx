import React, {ChangeEvent, useCallback, useState} from 'react';

import {useWeb3} from '@/hooks/useWeb3';

type TransferNFTFormProps = {
  tokenId: number;
  onSubmitted?: () => void;
};

const TransferNFTForm = (props: TransferNFTFormProps): JSX.Element | null => {
  const {tokenId, onSubmitted} = props;
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [recipient, setRecipient] = useState<string>('');
  const {contract, provider, address} = useWeb3();

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        setSubmitting(true);

        if (address && provider && contract) {
          setSubmitting(true);

          const signer = provider.getSigner();
          const contractWithSigner = contract.connect(signer);

          const resp = await contractWithSigner.transferFrom(
            address,
            recipient,
            tokenId,
          );
          const rec = await resp.wait();

          console.log(rec);

          if (onSubmitted) {
            onSubmitted();
          }

          alert('NFT transferred successfully');
        }
      } catch (err) {
        if (err instanceof Error) {
          alert(err.message);
        }
      } finally {
        setSubmitting(false);
      }
    },
    [address, recipient],
  );

  const handleRecipientChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRecipient(event.currentTarget.value);
  };

  if (!address) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={recipient}
        onChange={handleRecipientChange}
        placeholder="Recipient Address..."
      />
      <button type="submit" disabled={submitting}>
        Transfer NFT
      </button>
    </form>
  );
};

export default TransferNFTForm;
