import { Checkbox } from '@chakra-ui/react';
import React from 'react';

export default function CustomCheckbox({ option, onChange, value }) {
  return (
    <Checkbox
      onChange={e => {
        if (e.target.checked) {
          onChange([option, ...value]);
          return;
        }
        onChange(value.filter(item => item !== option));
      }}
    >
      {option}
    </Checkbox>
  );
}
