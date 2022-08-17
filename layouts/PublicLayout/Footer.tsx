import {Box, Text} from 'degen';
import React, {ReactElement} from 'react';

const Footer = (): ReactElement => {
  return (
    <Box textAlign="center" paddingTop="5" paddingBottom="9">
      <Text><a href="https://github.com/AdwitM/Mirror-Clone">Check the Source Code</a></Text>
    </Box>
  );
};

export default Footer;
