import React, { useCallback } from 'react';
import { Heading, Text, Container, Center, Link } from '@chakra-ui/react';
import {GoogleLogin} from "react-google-login"
import { useCurrentUser } from '../state/currentUser';

async function handleLogin(googleData) {
  const res = await fetch(process.env.REACT_APP_API_URL+"/authenticate", {
    method: "POST",
    body: JSON.stringify({
      token: googleData.tokenId
    }),
  headers: {
    "Content-Type": "application/json"
    }
  })
  return await res.json()
}

export default function Login() {
  const { setCurrentUser } = useCurrentUser()

  const onSuccess = useCallback(async (googleData) => {
    const user = await handleLogin(googleData)
    setCurrentUser(user)
  }, [])

  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Log in with Google"
        onSuccess={onSuccess}
        onFailure={() => console.log("THERE WAS A FAILURE")}
        cookiePolicy={'single_host_origin'}
      />
    </>
  );
}
