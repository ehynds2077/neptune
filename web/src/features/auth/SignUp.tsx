import { Input } from "@chakra-ui/input";
import { Heading, Link, Text } from "@chakra-ui/layout";
import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { showToast } from "../..";
import { AuthButton } from "../../components/AuthButton";
import { AuthFormContainer } from "../../components/AuthFormContainer";
import { MessageSpinner } from "../../components/MessageSpinner";
import { validateEmail } from "../../utils/validateEmail";
import { useLoginMutation, useSignUpMutation } from "./authApi";
import { setUser } from "./authSlice";

export const SignUp = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (event: any) => setName(event.target.value);
  const handleEmailChange = (event: any) => setEmail(event.target.value);
  const handlePasswordChange = (event: any) => setPassword(event.target.value);

  const navigate = useNavigate();

  const [apiSignUp, { isLoading: signUpLoading }] = useSignUpMutation();
  const [apiLogin, { isLoading: loginLoading }] = useLoginMutation();

  const handleSignUp = async () => {
    try {
      const loginCreds = { email, password };
      const signUpCreds = { name, ...loginCreds };
      await apiSignUp(signUpCreds).unwrap();
      const user = await apiLogin(loginCreds).unwrap();
      dispatch(setUser(user));
      navigate("/app", { replace: true });
    } catch (e) {
      console.log(e);
      let description =
        "Problem communicating with server. Please try again later.";
      if ((e as any).status === 409 || (e as any).status === 400) {
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
      {signUpLoading && <MessageSpinner title="Signing Up" />}
      {loginLoading && <MessageSpinner title="Logging In" />}
      {!signUpLoading && !loginLoading && (
        <>
          <Heading mb={4} alignSelf="start">
            Sign Up
          </Heading>
          <FormControl isInvalid={!name}>
            <Input
              variant="outline"
              borderColor="gray.400"
              borderWidth={2}
              placeholder="Name"
              _invalid={{ borderColor: "gray.400" }}
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
              _invalid={{ borderColor: "gray.400" }}
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
              _invalid={{ borderColor: "gray.400" }}
              value={password}
              onChange={handlePasswordChange}
            />
            <FormErrorMessage>
              {!password
                ? "Password Required"
                : "Password must be less than 72 characters"}
            </FormErrorMessage>
          </FormControl>
          <AuthButton onClick={handleSignUp}>Sign Up</AuthButton>
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
        </>
      )}
    </AuthFormContainer>
  );
};
