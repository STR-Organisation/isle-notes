import { Badge } from '@chakra-ui/react';
import React from 'react';

export default function NotificationBadge({ text, ...props }) {
  const textMap = {
    approved: 'Approved',
    rejected: 'Rejected',
    none: 'Pending',
  };

  const colorMap = {
    approved: 'green',
    rejected: 'red',
    none: 'purple',
  };

  return (
    <Badge {...props} textAlign={'center'} colorScheme={colorMap[text]}>
      {textMap[text]}
    </Badge>
  );
}
