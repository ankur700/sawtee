import { Box, Text, Heading, SlideFade } from "@chakra-ui/react";
// import Link from "@frontity/components/link";
import { HiOutlineExternalLink } from "react-icons/hi";
import React from "react";
import Link from "../../components/atoms/link";

const Members = ({ memberInstitutions, linkColor }) => {
  const [hovered, setHovered] = React.useState([]);

  React.useEffect(() => {
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
                  fontSize={{ base: "sm", md: "md" }}
                >
                  <Link
                    link={member_website_link}
                    // target={"_blank"}
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
                      textUnderlineOffset: "3px",
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
                      <HiOutlineExternalLink />
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

export default Members;
