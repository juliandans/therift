import React from 'react';
import { Heading, Text, Container, Center, Link } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Home() {
  const [ session, loading ] = useSession()

  return (
    <Container>
      <Center>
          <Heading as="h1" style={{fontSize: "50px"}}>THE RIFT</Heading>
          <Text as="i" style={{fontSize: "45px"}}><Heading>A Create Your Own Adventure Story</Heading></Text>
        </Center>
        <Center>
          <Link href="/story/0000" color="teal.500" style={{fontSize: "35px", marginTop: "20px"}}>Begin</Link>
          {!session && <>
            Not signed in <br/>
            <button onClick={() => signIn()}>Sign in</button>
          </>}
          {session && <>
            Signed in as {session.user.email} <br/>
            <button onClick={() => signOut()}>Sign out</button>
          </>}
        </Center>
    </Container>
  );
}