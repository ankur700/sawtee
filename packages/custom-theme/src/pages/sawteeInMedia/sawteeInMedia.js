import { useArchiveInfiniteScroll } from "@frontity/hooks";
import { connect, styled } from "frontity";
import React from "react";
import Loading from "../../components/atoms/loading";
import MediaList from "./mediaList";
import { LightPatternBox } from "../../components/styles/pattern-box";
import Publication1 from "../../assets/publications-1.jpg";
import { Box, Image, Heading, useColorModeValue } from "@chakra-ui/react";

const ButtonContainer = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
`;

const Button = styled.button`
  position: relative;
  background: #1f38c5;
  color: white;
  padding: 12px;
  font-weight: bold;
  border: none;
`;

const SawteeInMedia = ({state}) => {
  const { pages, isLimit, isFetching, isError, fetchNext } =
    useArchiveInfiniteScroll({ limit: 3 });

  return (
    <LightPatternBox
      bg={useColorModeValue("whiteAlpha.300", "gray.800")}
      showPattern={state.theme.showBackgroundPattern}
      pt="0"
    >
      <Box pb={{ base: "2rem", lg: "50px" }} pos="relative">
        <Box
          as="figure"
          mt={4}
          height="500px"
          _after={{
            display: "block",
            content: '""',
            width: "100%",
            height: "500px",
            background: "rgba(0,0,0,0.4)",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        >
          <Box as={Image} boxSize="100%" objectFit="cover" src={Publication1} />
        </Box>

        <Box
          textAlign="center"
          mt={{ base: "20px", lg: "4rem" }}
          px={{ base: "32px", md: "0" }}
          color={"whiteAlpha.900"}
          position="absolute"
          bottom="15%"
          left="15%"
        >
          <Heading
            fontWeight="bold"
            size={"3xl"}
            mt="30px"
            mb={{ base: "20px", lg: "32px" }}
            textTransform="uppercase"
          >
            {data.type}
          </Heading>
        </Box>
      </Box>
      {pages.map(({ key, link, isLast, Wrapper }) => (
        <Wrapper key={key}>
          <MediaList link={link} />
          {!isLast && <hr />}
        </Wrapper>
      ))}
      <ButtonContainer>
        {isFetching && <Loading />}
        {isLimit && <Button onClick={fetchNext}>Load Next Page</Button>}
        {isError && (
          <Button onClick={fetchNext}>Something failed - Retry</Button>
        )}
      </ButtonContainer>
    </LightPatternBox>
  );
};

export default connect(SawteeInMedia);
