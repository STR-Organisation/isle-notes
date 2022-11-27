import React from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Heading } from '@chakra-ui/react';

export default function View() {
  const { id } = useParams();

  return (
    <>
      <Navbar />
      <Heading>{id}</Heading>
    </>
  );
}
