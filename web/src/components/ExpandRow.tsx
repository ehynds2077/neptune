import { AddIcon, ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, HStack, Icon, Text } from "@chakra-ui/react";

export const ExpandRow = ({
  title,
  buttonTitle,
  isExpanded,
  setExpand,
  onClick,
}: {
  title: string;
  buttonTitle: string;
  isExpanded: boolean;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
}) => (
  <HStack w="full">
    <HStack
      w="full"
      py={1}
      alignItems="center"
      rounded="md"
      _hover={{ bg: "whiteAlpha.100", cursor: "pointer" }}
      onClick={() => setExpand((expand) => !expand)}
    >
      <Icon m={3} as={isExpanded ? ChevronDownIcon : ChevronRightIcon} />

      <Text fontSize="md" fontWeight="bold">
        {title}
      </Text>
    </HStack>
    <Button
      onClick={onClick}
      justifyContent="start"
      variant="ghost"
      gap={4}
      w="40"
    >
      <AddIcon />
      <Text fontWeight="bold">{buttonTitle}</Text>
    </Button>
  </HStack>
);
