import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import link from "../link";
import { Button, Box, Stack, useColorModeValue, useBreakpointValue } from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import {
  HiChevronRight,
  HiChevronLeft,
  HiArrowLeft,
  HiArrowRight,
} from "react-icons/hi";

const paginate = (totalPages, currentPage) => {
  const delta = 1;
  const pagination = [];

  // Push items from "current - 1" (if available) to current + 1 (if available)
  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    // if current = 1, total = 7, pagination[] => [2]
    // if current = 5, total = 7, pagination[] => [4, 5, 6];
    // current = 7, total = 7, pagination[] => [6];
    pagination.push(i);
  }

  // if 3 or more pages exist before current page
  //  items from 2 to current - 2 will be "..."
  if (currentPage - delta > 2) {
    // add "..." to the beginning
    pagination.unshift("...");
  }

  // if 3 or more exists after current page
  // items from current + 2 to lastPage(totalPage) - 1 will be "..."
  if (currentPage + delta < totalPages - 1) {
    // add "..." to the end
    pagination.push("...");
  }

  // Always add 1 (first page) to the beginning
  pagination.unshift(1);
  // Always add totalPage (last page) to the end
  pagination.push(totalPages);

  return pagination;
};

const NumberedPagination = ({ state, actions, libraries }) => {
  const { route, query, totalPages, next, previous, page } = state.source.get(
    state.router.link
  );

  const [hover, setHover] = React.useState([false, false]);

  // get page link with page number
  const getPageLink = (page) =>
    libraries.source.stringify({ route, query, page });

  // Pagination - array of numbers/dots for pages
  const paginationArray = paginate(totalPages, page);

  // Prefetch next page if it hasn't been fetched yet.
  useEffect(() => {
    if (next) actions.source.fetch(next);
  }, []);

  return (
    <Stack
      direction={{ base: "column", sm: "row" }}
      as="nav"
      aria-label="Pagination"
      // spacing={2}
      w="full"
      justify="center"
      alignItems="center"
      mt={{ base: 3, md: 0 }}
    >
      <Box
        onMouseEnter={() => setHover([!hover[0], hover[1]])}
        onMouseLeave={() => setHover([!hover[0], hover[1]])}
      >
        <StyledLink link={previous}>
          <PaginationButton
            isDisabled={!previous}
            leftIcon={!hover[0] ? <HiChevronLeft /> : <HiArrowLeft />}
          >
            Newer Posts
          </PaginationButton>
        </StyledLink>
      </Box>
      <Stack direction="row">
        {paginationArray.map((item, index) => {
          // if item is dots, "..."
          if (item === "...") {
            return (
              <PaginationButton key={eval(item + 1)}>{`...`}</PaginationButton>
            );
          }

          // if item is current page
          if (item === page) {
            return (
              <PaginationButton key={eval(item + 1)} isActive={true}>
                {item}
              </PaginationButton>
            );
          }

          return (
            <StyledLink key={eval(item + 1)} link={getPageLink(item)}>
              <PaginationButton>{item}</PaginationButton>
            </StyledLink>
          );
        })}
      </Stack>
      <Box
        onMouseEnter={() => setHover([hover[0], !hover[1]])}
        onMouseLeave={() => setHover([hover[0], !hover[1]])}
      >
        <StyledLink link={next}>
          <PaginationButton
            isDisabled={!next}
            rightIcon={!hover[1] ? <HiChevronRight /> : <HiArrowRight />}
          >
            Older Posts
          </PaginationButton>
        </StyledLink>
      </Box>
    </Stack>
  );
};

const PaginationButton = ({ children, isDisabled, isActive, ...rest }) => {
  const activeStyle = {
    bg: useColorModeValue("primary.500", "primary.700"),
    color: "white",
  };

  const hoverStyle = {
    bg: useColorModeValue("primary.900", "whiteAlpha.900"),
    color: "white",
  };
  const size = useBreakpointValue(["sm", "md", "lg"]);

  return (
    <Button
      py={1}
      px={3}
      colorScheme={useColorModeValue("blackAlpha", "whiteAlpha")}
      size={size}
      variant="outline"
      rounded="md"
      border="none"
      color={isDisabled ? "gray.400" : "gray.800"}
      _hover={!isDisabled && hoverStyle}
      cursor={isDisabled && "not-allowed"}
      {...(isActive && activeStyle)}
      {...rest}
      _focus={{
        outline: "none",
      }}
    >
      {children}
    </Button>
  );
};

const StyledLink = styled(link)`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default connect(NumberedPagination);
