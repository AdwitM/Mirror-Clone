import {ReactElement, useCallback, useState} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';

import {useWeb3} from '@/hooks/useWeb3';
import routes from '@/routes';

const createJsonMetaData = (data: any) => {
  return JSON.stringify(data);
};

export type CreatePostFormValues = {
  title: string;
  body: string;
};

const CreatePostForm = (): ReactElement => {
  const router = useRouter();
  const {address, contract, provider} = useWeb3();
  const [values, setValues] = useState<CreatePostFormValues>({
    title: '',
    body: '',
  });
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleTitleChange = (event) => {
    setValues((prevState) => {
      return {
        ...prevState,
        title: event.currentTarget.value,
      };
    });
  };

  const handleBodyChange = (event) => {
    setValues((prevState) => {
      return {
        ...prevState,
        body: event.currentTarget.value,
      };
    });
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        setSubmitting(true);

        if (!address) {
          throw new Error(
            'You need to be connected to Metamask to create a post',
          );
        }

        if (provider && contract) {
          // Submit Arweave transaction
          const data = createJsonMetaData(values);
          const response = await axios.post(routes.api.arweave.post, {
            data,
            address,
          });
          const transactionId = response.data;

          // Mint NFT
          const signer = provider.getSigner();
          const contractWithSigner = contract.connect(signer);

          const resp = await contractWithSigner.createToken(transactionId);
          const rec = await resp.wait();

          console.log(rec);
        }

        router.push({
          pathname: routes.home,
        });
      } catch (error) {
        console.log('Error: ', error);
        const errorMessage =
          error instanceof Error ? error.message : 'Something went wrong.';
        alert(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
    [values],
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Title..."
            value={values.title}
            onChange={handleTitleChange}
          />
        </div>

        <div>
          <textarea
            placeholder="Body..."
            value={values.body}
            onChange={handleBodyChange}
          />
        </div>

        <button type="submit" data-testid="submit-btn" disabled={submitting}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
