import { Checkbox } from '@chakra-ui/react';
import React from 'react';

export default function CustomCheckbox({ option, checked, add, remove }) {
  return (
    <Checkbox
      onChange={e => {
        if (e.target.checked) {
          add(option);
          return;
        }
        remove(option);
      }}
      defaultChecked={checked}
    >
      {option}
    </Checkbox>
  );
}
