import {Button, Card, IconExclamation, Stack, Text} from 'degen';
import React from 'react';

type ErrorBlockProps = {
  title: string;
  message: string;
  retry?: () => void;
};

const ErrorBlock = (props: ErrorBlockProps): JSX.Element => {
  const {title, message, retry} = props;

  return (
    <Card padding="6">
      <Stack align="center">
        <IconExclamation size="32" color="red" />
        <Text variant="extraLarge">{title}</Text>
        <Text>{message}</Text>
        {retry && <Button onClick={retry}>Retry</Button>}
      </Stack>
    </Card>
  );
};

export default ErrorBlock;
