import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Flex, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useAuth } from "../providers/AuthProvider";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (event: any) => setEmail(event.target.value);
  const handlePasswordChange = (event: any) => setPassword(event.target.value);

  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      navigate("/app", { replace: true });
    }
  });

  const login = async () => {
    const res = await auth.login(email, password);

    if (res) {
      navigate("/app", { replace: true });
    }
  };

  const handleLogin = () => {
    login();
  };

  return (
    <Flex direction="column" alignItems="center">
      <Heading>Login</Heading>
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
        <Button onClick={handleLogin}>Login</Button>
        <Text p={2} color="gray.500">
          Need an account?{" "}
          <Link color="white" to="/signup" as={RouterLink}>
            Sign up here
          </Link>
        </Text>
      </Stack>
    </Flex>
  );
};
