import React from 'react';
import { Heading, Text, Container, Center, VStack, Button, Box, HStack } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/client'
import Link from 'next/link'

export default function Home() {
  const [ session, loading ] = useSession()

  return (
    <Container maxW="container.xl">
      <Center>
        <VStack>
          <Text
            bgGradient="linear(to-r,blue.300 0%,purple.700 33%, red.700 66%, orange.600 100%)"
            bgClip="text"
            fontSize="150" top="5" left="5"
            fontWeight="bold"
          >
            THE RIFT
          </Text>
          <Text as="i" style={{fontSize: "45px"}}><Heading>A Create Your Own Adventure Story</Heading></Text>
        </VStack>
        <HStack top="5" pos="absolute" right="5" >
          {!session && <>
            <Button onClick={() => signIn('google')}>Log In</Button>
          </>}
          {session && <>
            {/* Signed in as {session.user.email} <br/> */}
            <Link passHref={true} href="/story/6085de42c5d5710d0fac035f"><Button colorScheme="teal">Begin</Button></Link>
            <Button onClick={() => signOut()}>Log Out</Button>
          </>}
          <Text pos="fixed" right="5" bottom="5">Version 1.0.0</Text>
        </HStack>
      </Center>
      
    </Container>
  );
}
