import {
  Box,
  Text,
  HStack,
  Stack,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { formatDateWithMoment } from "../../../helpers";
import Link from "../../../atoms/link";

const NewsletterCard = ({ post, linkColor }) => {
  const { title, publishDate, link, featured_media } = post;
  // For even id show card on left side
  // For odd id show card on right side

  return (
    <HStack
      flex={1}
      p={{ base: 3, sm: 6 }}
      bg={useColorModeValue("gray.100", "blackAlpha.300")}
      spacing={5}
      rounded="lg"
      alignItems="center"
      justifyContent="space-between"
      pos="relative"
      w="full"
      maxW={"2xl"}
    >
      {/* <Icon as={FaRegNewspaper} w={8} h={8} color={linkColor} /> */}
      <Image
        boxSize="150px"
        objectFit="cover"
        src={featured_media.src}
        alt={"Cover image"}
        fallbackSrc="https://via.placeholder.com/120x150"
      />
      <Stack
        spacing={2}
        direction={"column"}
        justifyContent={"space-between"}
        alignItems="center"
        w="full"
      >
        <Text
          color={useColorModeValue("gray.700", "whiteAlpha.800")}
          _hover={{ color: linkColor }}
          fontSize="2xl"
          lineHeight={1.2}
          fontWeight="bold"
        >
          <Link link={link}>{title}</Link>
        </Text>
      </Stack>
    </HStack>
  );
};

export default NewsletterCard;
