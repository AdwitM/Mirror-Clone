import {ReactElement} from 'react';

const MyError = ({statusCode}: {statusCode: string}): ReactElement => {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  );
};

MyError.getInitialProps = async ({res, err}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return {statusCode};
};

export default MyError;
