import { Badge } from '@chakra-ui/react';
import React from 'react';

export default function NotificationBadge({ text }) {
  const textMap = {
    approved: 'Approved',
    rejected: 'Rejected',
  };

  const colorMap = {
    approved: 'green',
    rejected: 'red',
  };

  return <Badge colorScheme={colorMap[text]}>{textMap[text]}</Badge>;
}
