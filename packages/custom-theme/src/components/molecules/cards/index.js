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
import React, { useState, useEffect } from "react";

const today = new Date();
import { PostImage, PostOverlay } from "../featured-post/components";
import generateGradient from "../featured-post/genarate-gradient";
import FLink from "../../atoms/link";
import { formatDateWithMoment } from "../../helpers";

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
  imageUrl:
    "https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
};

export const PostCategories = (category) => {
  const { id, name, link } = category;
  return (
    <Box
      as="a"
      px={3}
      py={1}
      className="primary-link category"
      bg={useColorModeValue("rgb(230 247 255/1)", "rgb(88,175,223,.1)")}
      fontSize="sm"
      fontWeight="700"
      rounded="md"
      href={link ? link : defaultValues.categoryLink}
    >
      {name ? name : defaultValues.category}
    </Box>
  );
};

export const TopImageCard = (props) => {
  const {
    categories,
    title,
    target,
    excerpt,
    authorId,
    date,
    featured_media,
    showAvatar,
  } = props;

  const [category, setCategory] = useState([]);
  const [author, setAuthor] = useState(async () => {
    const url = `https://sawtee.ankursingh.com.np/wp-json/wp/v2/users/${authorId}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      setAuthor(result);
    } catch (error) {
      console.log("error", error.message);
    }
  });
  const [media, setMedia] = useState(async () => {
    const url = `https://sawtee.ankursingh.com.np/wp-json/wp/v2/media/${featured_media}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      setMedia(result);
    } catch (error) {
      console.log("error", error.message);
    }
  });

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setCategory([...category, result]);
      } catch (error) {
        console.log("error", error.message);
      }
    };

    categories.forEach((category) => {
      fetchData(
        `https://sawtee.ankursingh.com.np/wp-json/wp/v2/categories/${category}`
      );
    });
  }, []);

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
      {media.guid && (
        <PostImage
          src={media.source_url}
          pos="relative"
          alt={media?.alt_text || media.title.rendered}
        />
      )}

      {/* {Object.keys(media).length === 0 && (
        <Box
          role="group"
          cursor="pointer"
          height="400px"
          width="100%"
          bgImage={generateGradient()}
          pos="relative"
        >
          <PostOverlay />
        </Box>
      )} */}

      <Box p={6}>
        <Box>
          <Box display="flex" className="categories">
            {category.map((item) => {
              return (
                <LinkOverlay
                  href={item.link ? item.link : defaultValues.categoryLink}
                >
                  <Box
                    as="a"
                    key={item.id}
                    px={3}
                    py={1}
                    className="primary-link category"
                    bg={useColorModeValue(
                      "rgb(230 247 255/1)",
                      "rgb(88,175,223,.1)"
                    )}
                    fontSize="sm"
                    fontWeight="700"
                    rounded="md"
                    href={item.link ? item.link : defaultValues.categoryLink}
                  >
                    {item.name ? item.name : defaultValues.category}
                  </Box>
                </LinkOverlay>
              );
            })}
          </Box>
          <Text
            display="block"
            color={useColorModeValue("gray.700", "whiteAlpha.700")}
            fontWeight="bold"
            fontSize={{ base: "lg", md: "xl" }}
            mt={2}
            _hover={{
              color: `${useColorModeValue("gray.800", "whiteAlpha.800")}`,
              textDecor: "underline",
            }}
          >
            <LinkOverlay href={target ? target : "#"} className="primary-link">
              {title ? title : defaultValues.title}
            </LinkOverlay>
          </Text>
          <Text
            mt={2}
            fontSize={{ base: "sm", md: "md" }}
            noOfLines={3}
            color={useColorModeValue("gray.600", "whiteAlpha.600")}
            dangerouslySetInnerHTML={{
              __html: excerpt ? excerpt : defaultValues.excerpt,
            }}
          />
        </Box>

        <Box mt={4}>
          <Flex
            flexDir={{ base: "column", md: "row" }}
            alignItems={{ base: "start", md: "center" }}
            gap={"10"}
            justifyContent={"space-between"}
          >
            {/* <Show above="md">
              {author && (
                <Flex alignItems="center">
                  {showAvatar
                    ? showAvatar
                    : defaultValues.showAvatar && (
                        <Image
                          h={10}
                          w={10}
                          fit="cover"
                          rounded="full"
                          src={
                            author
                              ? author.avatar_urls[48]
                              : defaultValues.avatar
                          }
                          alt={author.name}
                        />
                      )}
                  <Link
                    mx={2}
                    fontWeight="bold"
                    color={useColorModeValue("gray.600", "whiteAlpha.600")}
                    href={author.link ? author.link : defaultValues.authorLink}
                  >
                    {author.name ? author.name : defaultValues.author}
                  </Link>
                </Flex>
              )}
            </Show> */}
            <Box
              as="time"
              mx={1}
              fontSize="sm"
              color={useColorModeValue("gray.600", "whiteAlpha.600")}
            >
              {date ? formatDateWithMoment(date) : defaultValues.date}
            </Box>
          </Flex>
        </Box>
      </Box>
    </LinkBox>
  );
};

export const NoImageCard = (props) => {
  const { categories, title, target, excerpt, authorId, date, showAvatar } =
    props;

  const [category, setCategory] = useState([]);
  const [author, setAuthor] = useState(async () => {
    const url = `https://sawtee.ankursingh.com.np/wp-json/wp/v2/users/${authorId}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("error", error.message);
    }
  });

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setCategory([...category, result]);
      } catch (error) {
        console.log("error", error.message);
      }
    };

    categories.forEach((category) => {
      fetchData(
        `https://sawtee.ankursingh.com.np/wp-json/wp/v2/categories/${category}`,
        "category"
      );
    });
  }, []);

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
      justifyContent="center"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Box
          as="time"
          fontSize="sm"
          color={useColorModeValue("gray.600", "whiteAlpha.600")}
        >
          {date ? formatDateWithMoment(date) : defaultValues.date}
        </Box>
        {category.map((item) => {
          return (
            <LinkOverlay
              href={item.link ? item.link : defaultValues.categoryLink}
            >
              <Box
                as="a"
                key={item.id}
                px={3}
                py={1}
                className="primary-link category"
                bg={useColorModeValue(
                  "rgb(230 247 255/1)",
                  "rgb(88,175,223,.1)"
                )}
                fontSize="sm"
                fontWeight="700"
                rounded="md"
                href={item.link ? item.link : defaultValues.categoryLink}
              >
                {item.name ? item.name : defaultValues.category}
              </Box>
            </LinkOverlay>
          );
        })}
      </Flex>

      <Box mt={2}>
        <Text
          fontSize={{ base: "md", md: "xl" }}
          color={useColorModeValue("gray.700", "whiteAlpha.700")}
          fontWeight="700"
          _hover={{
            color: "gray.600",
            _dark: {
              color: "whiteAlpha.600",
            },
            textDecor: "underline",
          }}
        >
          <LinkOverlay
            href={target ? target : defaultValues.target}
            className="primary-link"
          >
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
          dangerouslySetInnerHTML={{
            __html: excerpt ? excerpt : defaultValues.excerpt,
          }}
        />
      </Box>

      <Flex justifyContent="space-between" alignItems="center" mt={4}>
        <Text
          as="a"
          color="gray.800"
          _dark={{
            color: "whiteAlpha.800",
          }}
          _hover={{
            textDecor: "underline",
          }}
        >
          <LinkOverlay href={target}>Read more</LinkOverlay>
        </Text>
        {/* <Show above="md">
          <Flex alignItems="center">
            {showAvatar && author && (
              <Image
                mx={4}
                w={10}
                h={10}
                rounded="full"
                fit="cover"
                src={author ? author.avatar_urls[48] : defaultValues.avatar}
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
              href={author.link ? author.link : defaultValues.authorLink}
            >
              {author.name ? author.name : defaultValues.author}
            </Link>
          </Flex>
        </Show> */}
      </Flex>
    </LinkBox>
  );
};

// export const LeftImageCard = (props) => {
//   const { imageUrl, title, href, content } = props;
//   return (
//     <Box
//       bg={useColorModeValue("rgba(255, 255, 255, 0.25)", "gray.800")}
//       mx={{
//         lg: 8,
//       }}
//       display={{
//         lg: "flex",
//       }}
//       maxW={{
//         lg: "5xl",
//       }}
//       shadow={{
//         lg: "lg",
//       }}
//       rounded={{
//         lg: "lg",
//       }}
//     >
//       <Box
//         w={{
//           lg: "50%",
//         }}
//       >
//         <Box
//           h={{
//             base: 64,
//             lg: "full",
//           }}
//           rounded={{
//             lg: "lg",
//           }}
//           bgSize="cover"
//           style={{
//             backgroundImage: `url(${
//               imageUrl ? imageUrl : defaultValues.imageUrl
//             })`,
//           }}
//         ></Box>
//       </Box>

//       <Box
//         py={12}
//         px={6}
//         maxW={{
//           base: "xl",
//           lg: "5xl",
//         }}
//         w={{
//           lg: "50%",
//         }}
//       >
//         <Box
//           as="a"
//           fontSize={{
//             base: "2xl",
//             md: "3xl",
//           }}
//           color={useColorModeValue("gray.800", "white")}
//           fontWeight="bold"
//         >
//           <LinkOverlay href={href ? href : defaultValues.href}>
//             {title ? title : defaultValues.title}
//           </LinkOverlay>
//         </Box>
//         <Text mt={4} color={useColorModeValue("gray.600", "gray.400")}>
//           {content ? content : defaultValues.content}
//         </Text>

//         <Box mt={8}>
//           <Button
//             bg="gray.900"
//             color="gray.100"
//             px={5}
//             py={3}
//             fontWeight="semibold"
//             rounded="lg"
//             _hover={{
//               bg: "gray.800",
//             }}
//           >
//             <Text as="a" href="#">
//               Start Now
//             </Text>
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };
