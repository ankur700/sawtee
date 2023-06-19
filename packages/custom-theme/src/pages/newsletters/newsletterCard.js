import {
  Box,
  Text,
  HStack,
  Stack,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { FaRegNewspaper } from "react-icons/fa";
import { formatDateWithMoment } from "../../components/helpers";
import Link from "../../components/atoms/link";

const NewsletterCard = ({ post, linkColor }) => {
  const { title, publishDate, link, tags } = post;
  console.log(title);
  // For even id show card on left side
  // For odd id show card on right side

  return (
    <HStack
      flex={1}
      p={{ base: 3, sm: 6 }}
      bg={useColorModeValue("gray.100", "gray.800")}
      spacing={5}
      rounded="lg"
      alignItems="center"
      pos="relative"
    >
      <Icon as={FaRegNewspaper} w={8} h={8} color={linkColor} />
      <Box w="full">
        {/* <HStack spacing={2} mb={1}>
          {tags.map((tag) => (
            <Text fontSize="sm" key={tag.id}>
              {tag.name}
            </Text>
          ))}
        </HStack> */}
        <Stack
          spacing={2}
          direction={{ base: "column", md: "row" }}
          mb={3}
          justifyContent={"space-between"}
        >
          <Text
            color={useColorModeValue("gray.700", "whiteAlpha.700")}
            _hover={{ color: linkColor }}
            fontSize="xl"
            lineHeight={1.2}
            fontWeight="bold"
          >
            <Link link={link}>{title}</Link>
          </Text>
          <Text fontSize="sm">{formatDateWithMoment(publishDate)}</Text>
        </Stack>
      </Box>
    </HStack>
  );
};

export default NewsletterCard;
