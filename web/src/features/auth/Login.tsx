import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Flex, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { Credentials, useLoginMutation } from "./authApi";
import { selectUser, setUser } from "./authSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthError, setIsAuthError] = useState(false);

  // const { isOpen, onClose, onOpen } = useDisclosure();

  const handleEmailChange = (event: any) => setEmail(event.target.value);
  const handlePasswordChange = (event: any) => setPassword(event.target.value);

  const user = useSelector(selectUser);
  const [apiLogin, { isError }] = useLoginMutation();

  useEffect(() => {
    if (user) {
      navigate("/app", { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      setIsAuthError(false);
      const credentials: Credentials = { email, password };
      const user = await apiLogin(credentials).unwrap();
      dispatch(setUser(user));
      navigate("/app", { replace: true });
    } catch (e) {
      if ((e as any).originalStatus === 401) {
        setIsAuthError(true);
      }
      console.log(e);
    }
  };

  const loginAlert = (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>There was an error logging in</AlertTitle>
      <AlertDescription>
        {isAuthError
          ? "The account doesn't exist or the email/password is incorrect"
          : "Unknown error"}
      </AlertDescription>
    </Alert>
  );

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
        {isError && loginAlert}
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
