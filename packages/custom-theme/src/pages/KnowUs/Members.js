import { Box, Text, Heading } from "@chakra-ui/react";
import Link from "@frontity/components/link";
import { HiOutlineExternalLink } from "react-icons/hi";

const Members = ({ memberInstitutions, linkColor }) => {
  return (
    <>
      <Heading as="h3" fontSize={["lg", "xl", "2xl"]} py={"4"} mb="4">
        {"Member Institutions"}
      </Heading>
      {memberInstitutions?.map(({ country, institutes }) => {
        return (
          <Box key={country} mb="6">
            <Text as="h4" fontSize={["md", "lg", "xl"]} mb="4">
              {country}
            </Text>
            {institutes.map(({ member_name, member_website_link }) => {
              return (
                <Text
                  key={member_name}
                  display="flex"
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  _hover={{ color: `${linkColor}` }}
                  textDecor={"underline"}
                  fontSize={{ base: "sm", md: "md" }}
                >
                  <Link link={member_website_link} target={"_blank"}>
                    {member_name}
                  </Link>
                  <HiOutlineExternalLink />
                </Text>
              );
            })}
          </Box>
        );
      })}
    </>
  );
};

export default Members;
