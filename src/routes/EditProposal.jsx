import { Heading } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export default function EditProposal() {
  const { id } = useParams();

  return (
    <>
      <Navbar />
      <Heading>{id}</Heading>
    </>
  );
}
