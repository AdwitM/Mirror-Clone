const routes = {
  home: '/',
  entries: {
    create: '/entries/create',
    view: (transactionId: string): string => `/entries/view/${transactionId}`,
  },
  profile: (address: string): string => `/profile/${address}`,
  api: {
    arweave: {
      post: '/api/arweave/post',
      get: (transactionId: string): string => `/api/arweave/${transactionId}`,
      search: (address = ''): string => `/api/arweave/search/${address}`,
    },
  },
};

export default routes;
