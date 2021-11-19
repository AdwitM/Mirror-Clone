import type {NextApiRequest, NextApiResponse} from 'next';
import Arweave from 'arweave';
import ArDB from 'ardb';
import {DataT} from '@/types';

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
});

const getData = async (txId: string) => {
  const buffer = (await arweave.transactions.getData(txId, {
    decode: true,
    string: true,
  })) as string;
  return {
    transactionId: txId,
    buffer: JSON.parse(buffer),
  };
};

export default async function (
  _req: NextApiRequest,
  res: NextApiResponse<DataT[] | string>,
): Promise<any> {
  try {
    const {query} = _req.query;
    const searchAddress = query && query[0];
    const ardb = new ArDB(arweave);

    const tags = [{name: 'App-Name', values: ['MirrorClone']}];

    if (searchAddress) {
      tags.push({name: 'Address', values: [searchAddress]});
    }

    const txs = await ardb.search('transactions').tags(tags).limit(10).find();

    const promises = txs.map((tx: any) => getData(tx._id));
    const data = await Promise.all(promises);

    res.status(200).json(data);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
