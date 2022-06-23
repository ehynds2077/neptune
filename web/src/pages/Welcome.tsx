import { Flex, Heading, Link } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { List } from "@chakra-ui/layout";
import React from "react";
import { Link as RouteLink } from "react-router-dom";

export const Welcome = () => {
  return (
    <VStack direction="column" mt={5} spacing={10} w="full" alignItems="center">
      <WelcomeBox>
        <Heading>Achieve mind like water </Heading>
        <Text>
          Capture and organize your thoughts, lower your stress, and increase
          your productivity
        </Text>
      </WelcomeBox>
      <WelcomeBox>
        <Heading>Built for Getting Things Done</Heading>
        <Text>
          We're building the ultimate solution for the GTD methodology
        </Text>
      </WelcomeBox>
      <WelcomeBox>
        <Heading>Free and Open Source</Heading>
        <Text>Own your own data</Text>
        <Text>Freedom to self host</Text>
      </WelcomeBox>
    </VStack>
  );
};

const WelcomeBox = ({ children }: { children: React.ReactNode }) => (
  <Box
    w="full"
    maxW="4xl"
    bg="whiteAlpha.200"
    _light={{ bg: "gray.100" }}
    rounded="lg"
    p={5}
  >
    {children}
  </Box>
);
