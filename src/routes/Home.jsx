import { Divider, Grid, GridItem, Heading } from '@chakra-ui/react';
import React from 'react';
import { Navbar } from '../components/Navbar';
import ProposalNotification from '../components/ProposalNotification';
import { getKeyByValue, SUBJECT_SHORTHAND } from '../utils';

export default function Home() {
  return (
    <>
      <Navbar />
      <Grid templateColumns={'repeat(5, 1fr)'} h="93vh">
        <GridItem colSpan={4} bg="beige">
          Main Content
        </GridItem>
        <GridItem overflow={'auto'}>
          <Heading size="sm" p={3}>
            My Proposals
          </Heading>
          <Divider />
          <ProposalNotification
            title="Commands"
            status="approved"
            className={getKeyByValue(SUBJECT_SHORTHAND, 'spanish')}
          />
          <ProposalNotification
            title="Linear Motion"
            status="rejected"
            className={getKeyByValue(SUBJECT_SHORTHAND, 'phys')}
          />
          <ProposalNotification
            title="Photosynthesis"
            status="none"
            className={getKeyByValue(SUBJECT_SHORTHAND, 'bio')}
          />
        </GridItem>
      </Grid>
    </>
  );
}
