import { Input } from "@chakra-ui/input";
import { Heading, Link, Text } from "@chakra-ui/layout";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { showToast } from "../..";
import { AuthButton } from "../../components/AuthButton";
import { AuthFormContainer } from "../../components/AuthFormContainer";
import { validateEmail } from "../../utils/validateEmail";
import { Credentials, useLoginMutation } from "./authApi";
import { setUser } from "./authSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: any) => setEmail(event.target.value);
  const handlePasswordChange = (event: any) => setPassword(event.target.value);

  const [apiLogin] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const credentials: Credentials = { email, password };
      const user = await apiLogin(credentials).unwrap();
      dispatch(setUser(user));
      navigate("/app/inbox", { replace: true });
    } catch (e) {
      console.log(e);
      let description =
        "Problem communicating with server. Please try again later.";
      if ((e as any).status === 400 || (e as any).status === 403) {
        description = (e as any).data.error;
      } else if ((e as any).originalStatus === 400) {
        description = "Unknown error. Please try again later.";
      }
      showToast({
        title: "Error",
        description,
        status: "error",
        position: "top",
      });
    }
  };

  return (
    <AuthFormContainer>
      <Heading mb={4}>Login</Heading>
      <FormControl isInvalid={!email || !validateEmail(email)}>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Email"
          variant="outline"
          borderColor="gray.400"
          borderWidth={2}
          value={email}
          _invalid={{ borderColor: "gray.400" }}
          onChange={handleEmailChange}
        />
        <FormErrorMessage>
          {!email ? "Email Required" : "Invalid email"}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!password || password.length > 72}>
        <FormLabel>Password</FormLabel>
        <Input
          variant="outline"
          borderColor="gray.400"
          borderWidth={2}
          type="password"
          placeholder="Password"
          value={password}
          _invalid={{ borderColor: "gray.400" }}
          onChange={handlePasswordChange}
        />
        <FormErrorMessage>
          {!password
            ? "Password Required"
            : "Password must be less than 72 characters"}
        </FormErrorMessage>
      </FormControl>
      <AuthButton onClick={handleLogin}>Login</AuthButton>
      <Text p={2} color="gray.500">
        Need an account?{" "}
        <Link
          color="blue.700"
          _dark={{ color: "white" }}
          to="/signup"
          as={RouterLink}
        >
          Sign up here
        </Link>
      </Text>
    </AuthFormContainer>
  );
};
