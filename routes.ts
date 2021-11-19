const routes = {
  home: '/',
  entries: {
    create: '/entries/create',
    view: (transactionId: string): string => `/entries/view/${transactionId}`,
  },
  api: {
    arweave: {
      post: '/api/arweave/post',
      get: (transactionId: string): string => `/api/arweave/${transactionId}`,
      last: '/api/arweave/last',
    },
  },
};

export default routes;
