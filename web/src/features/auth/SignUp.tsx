import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Flex, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import { FormControl, FormErrorIcon, FormErrorMessage } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/validateEmail";

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

  const handleLogin = async () => {
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

  return (
    <Flex direction="column" alignItems="center">
      <Heading>Sign Up</Heading>
      <Stack
        _dark={{ bg: "blue.900" }}
        bg="gray.100"
        p={5}
        rounded="xl"
        m={5}
        maxW="xl"
        w="full"
      >
        <FormControl isInvalid={!name}>
          <Input
            variant="outline"
            borderColor="gray.400"
            borderWidth={2}
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
          <FormErrorMessage>Name Required</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!email || !validateEmail(email)}>
          <Input
            placeholder="Email"
            variant="outline"
            borderColor="gray.400"
            borderWidth={2}
            value={email}
            onChange={handleEmailChange}
          />
          <FormErrorMessage>
            {!email ? "Email Required" : "Invalid email"}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!password || password.length > 72}>
          <Input
            type="password"
            variant="outline"
            borderColor="gray.400"
            borderWidth={2}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <FormErrorMessage>
            {!password
              ? "Password Required"
              : "Password must be less than 72 characters"}
          </FormErrorMessage>
        </FormControl>
        <Button colorScheme="blue" onClick={handleLogin}>
          Sign Up
        </Button>
        <Text p={2} color="gray.500">
          Already have an account?{" "}
          <Link
            _dark={{ color: "white" }}
            color="blue.700"
            to="/login"
            as={RouterLink}
          >
            Login here
          </Link>
        </Text>
      </Stack>
    </Flex>
  );
};
