import { Heading, Spinner, VStack } from "@chakra-ui/react";

export const MessageSpinner = ({ title }: { title: string }) => (
  <VStack spacing={5}>
    <Heading size="lg">{title}</Heading>
    <Spinner size="xl" />
  </VStack>
);
