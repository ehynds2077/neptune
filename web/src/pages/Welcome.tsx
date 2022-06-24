import { Box, Heading, HStack, Link, Text, VStack } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { Button, Icon } from "@chakra-ui/react";
import React from "react";
import { IoLogoGithub } from "react-icons/io";

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
        <Heading>
          Built for{" "}
          <Link
            color="blue.200"
            _light={{ color: "blue.500" }}
            // colorScheme="blue"
            isExternal
            href="https://gettingthingsdone.com"
          >
            Getting Things Done<Text display="inline">®</Text>
          </Link>{" "}
        </Heading>
        <Text>
          We're building the ultimate software solution for the GTD methodology
        </Text>
      </WelcomeBox>
      <WelcomeBox>
        <Flex gap={2} mb={2} flexWrap="wrap" justify="space-between">
          <Heading>Free and Open Source</Heading>
          <Button
            as={Link}
            alignItems="center"
            leftIcon={<Icon boxSize={7} as={IoLogoGithub} />}
            colorScheme="blue"
            fontWeight="bold"
            isExternal
            href="https://github.com/ehynds2077/neptune"
          >
            Visit us on GitHub
          </Button>
        </Flex>
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
