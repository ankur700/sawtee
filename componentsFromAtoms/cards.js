import {
  Box,
  Image,
  Text,
  LinkOverlay,
  LinkBox,
  useColorModeValue,
  Flex,
  Show,
  Heading,
} from "@chakra-ui/react";
import PostCategories from "../organisms/post/post-categories";
import generateGradient from "../molecules/featured-post/genarate-gradient";
import { formatDateWithMoment } from "../helpers";
import { decode } from "frontity";

const imageUrl = generateGradient();
const today = new Date();

export const ImageCard = (props) => {
  const cardBg = useColorModeValue("blackAlpha.200", "blackAlpha.300");
  const {
    categories,
    title,
    target,
    excerpt,
    featured_media,
    date,
    linkColor,
    imageHeight,
  } = props;

  return (
    <LinkBox as="article" rounded="lg" bg={cardBg} shadow="lg" w="full">
      <Box
        role="group"
        cursor="pointer"
        width="100%"
        bgImage={imageUrl}
        pos="relative"
        borderRadius={"0.5rem 0.5rem 0 0"}
        overflow="hidden"
      >
        {featured_media && (
          <Image
            {...featured_media}
            h={imageHeight}
            w="100%"
            objectFit="cover"
            borderRadius={"0.5rem 0.5rem 0 0"}
          />
        )}
      </Box>

      <Box p={6}>
        <Box
          display="flex"
          className="categories"
          flexDir={{ base: "column", md: "row" }}
          alignItems={{ base: "start", md: "center" }}
          gap={"10"}
          justifyContent={"space-between"}
        >
          <PostCategories
            justify="flex-start"
            categories={categories}
            width="max-content"
          />

          {date && (
            <Box
              as="time"
              mx={1}
              fontSize="sm"
              color={useColorModeValue("gray.700", "whiteAlpha.700")}
            >
              {formatDateWithMoment(date) ||
                formatDateWithMoment(today.getDate())}
            </Box>
          )}
        </Box>
        <Heading
          as="h3"
          display="block"
          color={useColorModeValue("gray.800", "whiteAlpha.900")}
          fontSize={{ base: "sm", md: "lg", lg: "xl" }}
          mt={2}
          _hover={{
            color: linkColor,
            textDecor: "underline",
          }}
        >
          <LinkOverlay href={target}>{decode(title)}</LinkOverlay>
        </Heading>
        <Text
          mt={2}
          fontSize={{ base: "sm", lg: "md" }}
          noOfLines={3}
          color={useColorModeValue("gray.700", "whiteAlpha.700")}
          dangerouslySetInnerHTML={{
            __html: excerpt,
          }}
        />
      </Box>
    </LinkBox>
  );
};

export const Card = (props) => {
  const { categories, title, target, excerpt, author, date, linkColor } = props;
  const cardBg = useColorModeValue("blackAlpha.200", "blackAlpha.300");

  return (
    <LinkBox
      as="article"
      mx="auto"
      px={8}
      py={4}
      rounded="lg"
      shadow="lg"
      w="full"
      bg={cardBg}
      display="flex"
      flexDir={"column"}
      justifyContent={"center"}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <PostCategories
          justify="flex-start"
          categories={categories}
          width="max-content"
        />

        {date && (
          <Box
            as="time"
            fontSize="xs"
            color={useColorModeValue("gray.700", "whiteAlpha.700")}
          >
            {formatDateWithMoment(date)}
          </Box>
        )}
      </Flex>

      <Box mt={2}>
        <Heading
          as="h3"
          fontSize={{ base: "md", lg: "lg" }}
          color={useColorModeValue("gray.800", "whiteAlpha.900")}
          noOfLines={2}
          _hover={{
            color: linkColor,
            textDecor: "underline",
          }}
        >
          <LinkOverlay href={target}>{decode(title)}</LinkOverlay>
        </Heading>
        <Text
          mt={3}
          color="gray.700"
          _dark={{
            color: "whiteAlpha.700",
          }}
          noOfLines={2}
          fontSize={{ base: "sm", lg: "md" }}
          dangerouslySetInnerHTML={{
            __html: excerpt,
          }}
        />
      </Box>

      <Flex justifyContent="space-between" alignItems="center" mt={4}>
        {author && (
          <Show above="md">
            <Flex alignItems="center">
              <LinkOverlay
                color="gray.700"
                _dark={{
                  color: "whiteAlpha.700",
                }}
                fontWeight="700"
                cursor="pointer"
                href={author.link}
              >
                {author.name}
              </LinkOverlay>
            </Flex>
          </Show>
        )}
      </Flex>
    </LinkBox>
  );
};
