import {
  Box,
  Image,
  Link,
  Text,
  LinkOverlay,
  LinkBox,
  useColorModeValue,
  Button,
  Flex,
  Show,
} from "@chakra-ui/react";
const today = new Date();

const defaultValues = {
  category: "Product",
  avatar:
    "https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80",
  title: "",
  href: "#",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.",
  author: "",
  showAvatar: false,
  date: today.getDate(),
  categoryLink: "#",
  imageUrl:
    "https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
};

export const TopImageCard = (props) => {
  const {
    category,
    imageUrl,
    title,
    href,
    content,
    author,
    date,
    categoryLink,
    avatar,
    showAvatar,
  } = props;

  return (
    <LinkBox
      as="article"
      rounded="lg"
      shadow="md"
      bg={useColorModeValue("rgba(255, 255, 255, 0.25)", "rgba(0,0,0,0.3)")}
      maxW="5xl"
      paddingTop={"4"}
      px="4"
    >
      <Image
        rounded="lg"
        mx="auto"
        w="full"
        h="auto"
        fit="cover"
        mt={"2"}
        boxShadow="sm"
        src={imageUrl ? imageUrl : defaultValues.imageUrl}
        alt="Article"
      />

      <Box p={6}>
        <Box>
          <Text
            as="a"
            fontSize="xs"
            textTransform="uppercase"
            color={useColorModeValue("primary.600", "primary.400")}
            href={categoryLink ? categoryLink : defaultValues.categoryLink}
          >
            {category ? category : defaultValues.category}
          </Text>
          <LinkOverlay href={href ? href : "#"}>
            <Text
              display="block"
              color={useColorModeValue("gray.800", "whiteAlpha.800")}
              fontWeight="bold"
              fontSize={{ base: "lg", md: "xl" }}
              mt={2}
              _hover={{
                color: "gray.600",
                textDecor: "underline",
              }}
            >
              {title ? title : defaultValues.title}
            </Text>
          </LinkOverlay>
          <Text
            mt={2}
            fontSize={{ base: "sm", md: "md" }}
            noOfLines={3}
            color={useColorModeValue("gray.600", "whiteAlpha.600")}
          >
            {content ? content : defaultValues.content}
          </Text>
        </Box>

        <Box mt={4}>
          <Flex
            flexDir={{ base: "column", md: "row" }}
            alignItems={{ base: "start", md: "center" }}
            gap={"10"}
            justifyContent={"space-between"}
          >
            <Show above="md">
              <Flex alignItems="center">
                {showAvatar
                  ? showAvatar
                  : defaultValues.showAvatar && (
                      <Image
                        h={10}
                        w={10}
                        fit="cover"
                        rounded="full"
                        src={avatar ? avatar : defaultValues.avatar}
                        alt="Avatar"
                      />
                    )}
                <Link
                  mx={2}
                  fontWeight="bold"
                  color={useColorModeValue("gray.700", "whiteAlpha.700")}
                >
                  {author ? author : defaultValues.author}
                </Link>
              </Flex>
            </Show>
            <Box
              as="time"
              mx={1}
              fontSize="sm"
              color={useColorModeValue("gray.600", "whiteAlpha.600")}
            >
              {date ? date : defaultValues.date()}
            </Box>
          </Flex>
        </Box>
      </Box>
    </LinkBox>
  );
};

export const NoImageCard = (props) => {
  const {
    category,
    title,
    href,
    content,
    author,
    categoryLink,
    avatar,
    date,
    showAvatar,
  } = props;

  return (
    <LinkBox
      mx="auto"
      px={8}
      py={4}
      rounded="lg"
      shadow="lg"
      bg={useColorModeValue("rgba(255, 255, 255, 0.25)", "rgba(0,0,0,0.3)")}
      maxW="2xl"
      minH={"80"}
      display="flex"
      flexDir={"column"}
      justifyContent="center"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Box
          as="time"
          fontSize="sm"
          color={useColorModeValue("gray.600", "whiteAlpha.600")}
        >
          {date ? date : defaultValues.date()}
        </Box>
        <Box
          as="a"
          px={3}
          py={1}
          bg="gray.600"
          color="gray.100"
          fontSize="sm"
          fontWeight="700"
          rounded="md"
          _hover={{
            bg: "gray.500",
          }}
          href={categoryLink ? categoryLink : defaultValues.categoryLink}
        >
          {category ? category : defaultValues.category}
        </Box>
      </Flex>

      <Box mt={2}>
        <Text
          fontSize={{ base: "md", md: "xl" }}
          color={useColorModeValue("gray.800", "whiteAlpha.800")}
          fontWeight="700"
          _hover={{
            color: "gray.700",
            _dark: {
              color: "whiteAlpha.700",
            },
            textDecor: "underline",
          }}
        >
          <LinkOverlay href={href ? href : defaultValues.href}>
            {title ? title : defaultValues.title}
          </LinkOverlay>
        </Text>
        <Text
          mt={2}
          color="gray.600"
          _dark={{
            color: "whiteAlpha.600",
          }}
          noOfLines={3}
          fontSize={{ base: "sm", md: "md" }}
        >
          {content ? content : defaultValues.content}
        </Text>
      </Box>

      <Flex justifyContent="space-between" alignItems="center" mt={4}>
        <Text
          as="a"
          color="primary.600"
          _dark={{
            color: "primray.400",
          }}
          _hover={{
            textDecor: "underline",
          }}
        >
          Read more
        </Text>
        <Show above="md">
          <Flex alignItems="center">
            {showAvatar && (
              <Image
                mx={4}
                w={10}
                h={10}
                rounded="full"
                fit="cover"
                src={avatar ? avatar : defaultValues.avatar}
                alt="avatar"
              />
            )}
            <Link
              color="gray.700"
              _dark={{
                color: "whiteAlpha.700",
              }}
              fontWeight="700"
              cursor="pointer"
            >
              {author ? author : defaultValues.author}
            </Link>
          </Flex>
        </Show>
      </Flex>
    </LinkBox>
  );
};

export const LeftImageCard = (props) => {
  const { imageUrl, title, href, content } = props;
  return (
    <Box
      bg={useColorModeValue("rgba(255, 255, 255, 0.25)", "gray.800")}
      mx={{
        lg: 8,
      }}
      display={{
        lg: "flex",
      }}
      maxW={{
        lg: "5xl",
      }}
      shadow={{
        lg: "lg",
      }}
      rounded={{
        lg: "lg",
      }}
    >
      <Box
        w={{
          lg: "50%",
        }}
      >
        <Box
          h={{
            base: 64,
            lg: "full",
          }}
          rounded={{
            lg: "lg",
          }}
          bgSize="cover"
          style={{
            backgroundImage: `url(${
              imageUrl ? imageUrl : defaultValues.imageUrl
            })`,
          }}
        ></Box>
      </Box>

      <Box
        py={12}
        px={6}
        maxW={{
          base: "xl",
          lg: "5xl",
        }}
        w={{
          lg: "50%",
        }}
      >
        <Box
          as="a"
          fontSize={{
            base: "2xl",
            md: "3xl",
          }}
          color={useColorModeValue("gray.800", "white")}
          fontWeight="bold"
        >
          <LinkOverlay href={href ? href : defaultValues.href}>
            {title ? title : defaultValues.title}
          </LinkOverlay>
        </Box>
        <Text mt={4} color={useColorModeValue("gray.600", "gray.400")}>
          {content ? content : defaultValues.content}
        </Text>

        <Box mt={8}>
          <Button
            bg="gray.900"
            color="gray.100"
            px={5}
            py={3}
            fontWeight="semibold"
            rounded="lg"
            _hover={{
              bg: "gray.800",
            }}
          >
            <Text as="a" href="#">
              Start Now
            </Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
