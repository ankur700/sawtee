import { Box, Text, Stack, Heading, Image } from "@chakra-ui/react";
import Link from "@frontity/components/link";
import { HiOutlineExternalLink } from "react-icons/hi";

const Members = ({ memberInstitutions }) => {
  return (
    <>
      <Heading as="h3" fontSize={["2xl", "3xl", "4xl"]} py={"4"} mb="4">
        {"Member Institutions"}
      </Heading>
      {memberInstitutions?.map(({ country, institutes }) => {
        return (
          <Box key={country} mb="6">
            <Text as="h4" fontSize={["xl", "2xl", "3xl"]} mb="4">
              {country}
            </Text>
            {institutes.map(({ member_name, member_website_link }) => {
              return (
                <Box
                  key={member_name}
                  display="flex"
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Link link={member_website_link}>{member_name}</Link>
                  <HiOutlineExternalLink />
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
