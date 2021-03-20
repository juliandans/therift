import React from 'react';
import { useRouter } from 'next/router'
import { Heading, Text, Container, Center, Link } from '@chakra-ui/react';

export default function Story(props) {
  const { query: { id } } = useRouter()
  console.log(id)

  if ( !isNaN(id) ) {
    return (
      <Container>
        <Center>
          <Heading as="h1">THE RIFT</Heading>
        </Center>
        <Text as="p">ID: {props.id}</Text>
      </Container>
    );
  } else {
    return (
      <Container>
        <Center>
          <Heading as="h1">THE RIFT</Heading>
        </Center>
        <Text as="i">This ID is incorrect!</Text><br />
        <Link href="../" color="teal.500">Homepage</Link>
      </Container>
    );
  }
}

/**
 * This ONLY runs the first time the page is loaded on the server!
 */
export async function getServerSideProps(context) {
  return {
    props: {}
  }
}
