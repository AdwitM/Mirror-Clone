import type {NextApiRequest, NextApiResponse} from 'next';

import {GetTransactionRespT, PostTagsT, TransactionStatusE} from '@/types';
import {MIN_NUMBER_OF_CONFIRMATIONS} from '@/constants';

import {initialize} from 'lib/arweave';

const arweave = initialize();

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<GetTransactionRespT | string>,
): Promise<any> {
  try {
    const {transactionId} = req.query;

    const txDataResp = (await arweave.transactions.getData(
      transactionId as string,
      {
        decode: true,
        string: true,
      },
    )) as string;
    const txData = JSON.parse(txDataResp);

    const txStatusResp = await arweave.transactions.getStatus(
      transactionId as string,
    );

    const txStatus =
      txStatusResp.status === 200 &&
      txStatusResp.confirmed &&
      txStatusResp.confirmed.number_of_confirmations >=
        MIN_NUMBER_OF_CONFIRMATIONS
        ? TransactionStatusE.CONFIRMED
        : TransactionStatusE.NOT_CONFIRMED;

    // We should show only confirmed transactions to avoid sniffing and claiming NFT
    if (txStatus === TransactionStatusE.CONFIRMED) {
      const block = txStatusResp.confirmed
        ? await arweave.blocks.get(txStatusResp.confirmed.block_indep_hash)
        : null;

      const tx = await arweave.transactions.get(transactionId as string);

      const tags = {} as PostTagsT;
      (tx.get('tags') as any).forEach((tag) => {
        const key = tag.get('name', {decode: true, string: true});
        tags[key] = tag.get('value', {decode: true, string: true});
      });

      res.status(200).json({
        id: transactionId as string,
        data: txData,
        status: txStatus,
        timestamp: block?.timestamp,
        tags,
      });
    } else {
      throw new Error('Transaction not confirmed');
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
