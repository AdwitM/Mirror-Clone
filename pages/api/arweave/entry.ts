import type {NextApiRequest, NextApiResponse} from 'next';

import {initialize} from 'lib/arweave';

const arweave = initialize();

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<string>,
): Promise<any> {
  try {
    const {data, address} = req.body;

    // Initialize wallet using ARWEAVE_WALLET environmental variable (Tip: Use JSON.parse)\
    const wallet = JSON.parse(process.env.ARWEAVE_WALLET as string);
    const transaction = await arweave.createTransaction({data: data}, wallet);
    transaction.addTag('App-Name', process.env.APP_NAME as string);
    transaction.addTag('Content-Type', 'application/json');
    transaction.addTag('Address', address);
    await arweave.transactions.sign(transaction, wallet);
    await arweave.transactions.post(transaction);
    res.status(200).json(transaction.id);
  } catch (error) {
    console.log('ERROR', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}