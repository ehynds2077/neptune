import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Flex, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useLoginMutation, useSignUpMutation } from "./authApi";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (event: any) => setName(event.target.value);
  const handleEmailChange = (event: any) => setEmail(event.target.value);
  const handlePasswordChange = (event: any) => setPassword(event.target.value);

  const navigate = useNavigate();

  const [apiSignUp] = useSignUpMutation();
  const [apiLogin] = useLoginMutation();

  const register = async () => {
    try {
      const loginCreds = { email, password };
      const signUpCreds = { name, ...loginCreds };
      await apiSignUp(signUpCreds).unwrap();
      await apiLogin(loginCreds).unwrap();
      navigate("/app", { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogin = () => {
    register();
  };

  return (
    <Flex direction="column" alignItems="center">
      <Heading>Sign Up</Heading>
      <Stack
        color="white"
        bg="blue.900"
        p={5}
        rounded="xl"
        m={5}
        maxW="xl"
        w="full"
      >
        <Input
          color="white"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
        <Input
          color="white"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button onClick={handleLogin}>Sign Up</Button>
        <Text p={2} color="gray.500">
          Already have an account?{" "}
          <Link color="white" to="/login" as={RouterLink}>
            Login here
          </Link>
        </Text>
      </Stack>
    </Flex>
  );
};
