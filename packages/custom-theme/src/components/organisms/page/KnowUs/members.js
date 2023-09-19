import { Box, useColorModeValue, Heading, SlideFade } from "@chakra-ui/react";
import { HiOutlineExternalLink } from "react-icons/hi";
import Link from "../../../atoms/link";
import { useState, useEffect } from "react";

export const Members = ({ memberInstitutions, linkColor }) => {
  const [hovered, setHovered] = useState([]);
  const headingColor = useColorModeValue("gray.900, whiteAlpha.900");
  const contentColor = useColorModeValue("gray.800", "whiteAlpha.800");
  useEffect(() => {
    memberInstitutions.map(({ country, institutes }) => {
      let array = institutes.map((_) => false);
      setHovered((prev) => [...prev, { [`${country}`]: [...array] }]);
    });
  }, [memberInstitutions]);

  return (
    <Box>
      <Heading
        as="h3"
        fontSize={["lg", "xl", "2xl"]}
        py={"4"}
        mb="4"
        fontFamily="heading"
        color={headingColor}
      >
        {"Member Institutions"}
      </Heading>
      {memberInstitutions?.map(({ country, institutes }, id) => {
        let array = [...hovered];

        return (
          <Box key={country} mb="6">
            <Heading
              as="h4"
              fontSize={["md", "lg", "xl"]}
              fontWeight="bold"
              mb="4"
              fontFamily="heading"
              color={headingColor}
            >
              {country}
            </Heading>
            {institutes.map(({ member_name, member_website_link }, idx) => {
              return (
                <Box
                  key={member_name}
                  display="flex"
                  alignItems={"center"}
                  gap={4}
                  fontSize={{ base: "md", md: "lg", lg: "xl" }}
                  color={contentColor}
                >
                  <Link
                    link={member_website_link}
                    onMouseEnter={() => {
                      array[id][country][idx] = true;
                      setHovered([...array]);
                    }}
                    onMouseLeave={() => {
                      array[id][country][idx] = false;
                      setHovered([...array]);
                    }}
                    _hover={{
                      color: linkColor,
                      textDecoration: "underline",
                      textDecorationColor: linkColor,
                      textUnderlineOffset: "6px",
                    }}
                    textDecoration="underline"
                    textUnderlineOffset="3px"
                    textDecorationColor="gray.500"
                  >
                    {member_name}
                  </Link>
                  {hovered.length > 0 && hovered[id][country][idx] && (
                    <SlideFade
                      direction="bottom"
                      in={hovered[id][country][idx]}
                      offsetY="20px"
                    >
                      <HiOutlineExternalLink color={linkColor} />
                    </SlideFade>
                  )}
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
};
