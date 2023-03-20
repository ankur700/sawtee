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

import { decode } from "frontity";

const today = new Date();
import { formatDateWithMoment } from "../../helpers";
import PostCategories from "../../organisms/post/post-categories";
import generateGradient from "../../molecules/featured-post/genarate-gradient";

const defaultValues = {
  categories: ["Default", "Events", "Sawtee in Media", "Publications"],
  avatar:
    "https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80",
  title: "Default Title",
  target: "#",
  excerpt:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.",
  author: "",
  showAvatar: false,
  date: today.getDate(),
  categoryLink: "#",
  authorLink: "#",
  imageUrl: generateGradient(),
};

export const TopImageCard = (props) => {
  const {
    categories,
    title,
    target,
    excerpt,
    author,
    date,
    featured_media,
    linkColor,
  } = props;


  return (
    <LinkBox
      as="article"
      rounded="lg"
      bg={useColorModeValue("white", "rgba(0,0,0,0.3)")}
      shadow="lg"
      paddingTop={"4"}
      maxW="5xl"
      px="4"
    >
      <Box
        role="group"
        cursor="pointer"
        height="450px"
        width="100%"
        bgImage={defaultValues.imageUrl}
        pos="relative"
        rounded="lg"
      >
        {featured_media && (
          <Image
            {...featured_media}
            h="100%"
            w="100%"
            objectFit="cover"
            rounded="lg"
          />
        )}
      </Box>

      <Box p={6}>
        <Box display="flex" className="categories">
          <PostCategories
            justify="flex-start"
            categories={categories}
            color={useColorModeValue("gray.700", "whiteAlpha.700")}
          />
        </Box>
        <Text
          display="block"
          color={useColorModeValue("gray.700", "whiteAlpha.700")}
          fontWeight="bold"
          fontSize={{ base: "lg", md: "xl" }}
          mt={2}
          _hover={{
            color: linkColor,
            textDecor: "underline",
          }}
        >
          <LinkOverlay href={target ? target : "#"}>
            {title ? decode(title) : defaultValues.title}
          </LinkOverlay>
        </Text>
        <Text
          mt={2}
          fontSize={{ base: "sm", md: "md" }}
          noOfLines={3}
          color={useColorModeValue("gray.600", "whiteAlpha.600")}
          dangerouslySetInnerHTML={{
            __html: excerpt,
          }}
        />

        <Box mt={4}>
          <Flex
            flexDir={{ base: "column", md: "row" }}
            alignItems={{ base: "start", md: "center" }}
            gap={"10"}
            justifyContent={"space-between"}
          >
            {author && (
              <Show above="md">
                <Flex alignItems="center">
                  <Text
                    mx={2}
                    fontWeight="bold"
                    color={useColorModeValue("gray.600", "whiteAlpha.600")}
                    __hover={{
                      textDecor: "none",
                    }}
                  >
                    <LinkOverlay href={author.link}>
                      {author.name ? author.name : defaultValues.author}
                    </LinkOverlay>
                  </Text>
                </Flex>
              </Show>
            )}
            <Box
              as="time"
              mx={1}
              fontSize="sm"
              color={useColorModeValue("gray.600", "whiteAlpha.600")}
            >
              {date
                ? formatDateWithMoment(date)
                : formatDateWithMoment(defaultValues.date)}
            </Box>
          </Flex>
        </Box>
      </Box>
    </LinkBox>
  );
};

export const NoImageCard = (props) => {
  const { categories, title, target, excerpt, author, date, linkColor } = props;

  return (
    <LinkBox
      mx="auto"
      px={8}
      py={4}
      rounded="lg"
      shadow="lg"
      bg={useColorModeValue("white", "rgba(0,0,0,0.3)")}
      maxW="2xl"
      minH={"80"}
      display="flex"
      flexDir={"column"}
      justifyContent="space-between"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <PostCategories
          justify="flex-start"
          categories={categories}
          color={useColorModeValue("gray.700", "whiteAlpha.700")}
        />
      </Flex>

      <Box>
        <Text
          fontSize={{ base: "md", md: "xl" }}
          color={useColorModeValue("gray.700", "whiteAlpha.700")}
          fontWeight="bold"
          lineHeight={"normal"}
          noOfLines={2}
          _hover={{
            color: linkColor,
            textDecor: "underline",
          }}
        >
          <LinkOverlay href={target ? target : defaultValues.target}>
            {title ? decode(title) : defaultValues.title}
          </LinkOverlay>
        </Text>
        <Text
          mt={3}
          color="gray.600"
          _dark={{
            color: "whiteAlpha.600",
          }}
          noOfLines={3}
          fontSize={{ base: "sm", md: "md" }}
          dangerouslySetInnerHTML={{
            __html: excerpt ? excerpt : defaultValues.excerpt,
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
                href={author.link ? author.link : defaultValues.authorLink}
              >
                {author.name ? author.name : defaultValues.author}
              </LinkOverlay>
            </Flex>
          </Show>
        )}
        <Box
          as="time"
          fontSize="sm"
          color={useColorModeValue("gray.600", "whiteAlpha.600")}
        >
          {date ? formatDateWithMoment(date) : defaultValues.date}
        </Box>
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
