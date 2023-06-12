import React, { ReactNode } from "react";
import {
  Container,
  Flex,
  FlexProps,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { connect } from "frontity";

const PaginationContainer = ({ children }) => {
  return (
    <Container
      d="flex"
      maxWidth="7xl"
      w="full"
      h="218px"
      alignItems="center"
      p={{ base: 5, sm: 10 }}
    >
      {children}
    </Container>
  );
};

const PaginationButton = ({ children, isDisabled, isActive, ...props }) => {
  const activeStyle = {
    bg: useColorModeValue("gray.300", "gray.700"),
  };

  return (
    <Flex
      p={3}
      px={4}
      fontSize="md"
      fontWeight="500"
      lineHeight={0.8}
      opacity={isDisabled && 0.7}
      _hover={!isDisabled && activeStyle}
      cursor={isDisabled ? "not-allowed" : "pointer"}
      border="1px solid"
      mr="-1px"
      borderColor={useColorModeValue("gray.300", "gray.700")}
      {...(isActive && activeStyle)}
      {...props}
    >
      {children}
    </Flex>
  );
};

// Ideally, only the Pagination component should be used. The PaginationContainer component is used to style the preview.
const NumberedPagination = ({ state, actions, libraries, ...props }) => {
  const { totalPages } = state.source.get(state.router.link);
  const { path, page, query } = libraries.source.parse(state.router.link);

  const isThereNextPage = page > 1;
  const isTherePreviousPage = page < totalPages;
  const nextPageLink = libraries.source.stringify({
    path,
    page: page + 1,
    query,
  });

  const prevPageLink = libraries.source.stringify({
    path,
    page: page - 1,
    query,
  });

  const currentPageLink = libraries.source.stringify({
    path,
    page: page,
    query,
  });
  // Fetch the next page if it hasn't been fetched yet.
  React.useEffect(() => {
    if (isThereNextPage) actions.source.fetch(nextPageLink);
  }, []);

  return (
    <PaginationContainer>
      <Flex
        as="nav"
        aria-label="Pagination"
        w="full"
        justify="center"
        alignItems="center"
        mt={{ base: 3, md: 0 }}
      >
        <PaginationButton
          isDisabled={!isTherePreviousPage}
          borderTopLeftRadius="md"
          borderBottomLeftRadius="md"
        >
          <Link href={prevPageLink}>Previous</Link>
        </PaginationButton>
        {Array.from(Array(totalPages).keys()).map((id) => {
          return (
            <PaginationButton
              key={"1" + id.toString()}
              isActive={id + 1 === page}
            >
              <Link href={currentPageLink}>{id + 1}</Link>
            </PaginationButton>
          );
        })}
        <PaginationButton
          isDisabled={!isThereNextPage}
          borderTopRightRadius="md"
          borderBottomRightRadius="md"
        >
          <Link href={nextPageLink}></Link>Next
        </PaginationButton>
      </Flex>
    </PaginationContainer>
  );
};

export default connect(NumberedPagination);
