import Arweave from 'arweave';

export const initialize = (): Arweave => {
  return Arweave.init({
    host: process.env.ARWEAVE_HOST,
    port: process.env.ARWEAVE_PORT
      ? parseInt(process.env.ARWEAVE_PORT, 10)
      : 443,
    protocol: process.env.ARWEAVE_PROTOCOL || 'https',
  });
};
