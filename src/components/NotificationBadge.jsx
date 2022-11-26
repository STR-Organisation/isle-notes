import { Badge } from '@chakra-ui/react';
import React from 'react';

export default function NotificationBadge({ text, ...props }) {
  const textMap = {
    approved: 'Approved',
    rejected: 'Rejected',
    none: 'N/A',
  };

  const colorMap = {
    approved: 'green',
    rejected: 'red',
    none: 'blue',
  };

  return (
    <Badge {...props} textAlign={'center'} colorScheme={colorMap[text]}>
      {textMap[text]}
    </Badge>
  );
}
