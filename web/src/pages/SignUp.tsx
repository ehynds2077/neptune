import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Flex, Heading, Stack } from "@chakra-ui/layout";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "@chakra-ui/layout";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Text } from "@chakra-ui/layout";
import { useAuth } from "../providers/AuthProvider";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (event: any) => setName(event.target.value);
  const handleEmailChange = (event: any) => setEmail(event.target.value);
  const handlePasswordChange = (event: any) => setPassword(event.target.value);

  const auth = useAuth();
  const navigate = useNavigate();

  // const handleLogin = () => {
  //   console.log("helo9hehellehlllhell");
  //   axios
  //     .post("http://localhost:4000/register", {
  //       name,
  //       email,
  //       password,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     });
  // };

  const register = async () => {
    try {
      const res = await auth.register(name, email, password);
      if (res) {
        navigate("/app", { replace: true });
      }
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
