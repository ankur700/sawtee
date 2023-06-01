import { Box, Text, Heading, SlideFade, Link } from "@chakra-ui/react";
// import Link from "@frontity/components/link";
import { HiOutlineExternalLink } from "react-icons/hi";
import React from "react";

const Members = ({ memberInstitutions, linkColor }) => {
  const [hovered, setHovered] = React.useState([]);

  console.log("🚀 ~ file: Members.js:8 ~ Members ~ hovered:", hovered);

  React.useEffect(() => {
    memberInstitutions.map(({ country, institutes }) => {
      let array = institutes.map((_) => false);
      setHovered((prev) => [...prev, { [`${country}`]: [...array] }]);
    });
  }, [memberInstitutions]);

  return (
    <>
      <Heading as="h3" fontSize={["lg", "xl", "2xl"]} py={"4"} mb="4">
        {"Member Institutions"}
      </Heading>
      {memberInstitutions?.map(({ country, institutes }, id) => {
        let array = [...hovered];

        return (
          <Box key={country} mb="6">
            <Text as="h4" fontSize={["md", "lg", "xl"]} mb="4">
              {country}
            </Text>
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
                    href={member_website_link}
                    target={"_blank"}
                    onMouseEnter={() => {
                      array[id][country][idx] = true;
                      setHovered([...array]);
                    }}
                    onMouseLeave={() => {
                      array[id][country][idx] = false;
                      setHovered([...array]);
                    }}
                    _hover={{ color: linkColor }}
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
    </>
  );
};

export default Members;
