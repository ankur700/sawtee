import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import Link from "../../atoms/link";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import {
  Box,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

export const PaginationButton = styled(Button)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  padding: 0.8rem 1rem;
  min-height: 60px;
`;

export const PrevLink = ({
  isDisabled,
  label = "See older posts",
  link,
  ...props
}) => (
  <Box width="100%" {...props}>
    <Link link={link} aria-disabled={isDisabled}>
      <PaginationButton
        colorScheme={useColorModeValue("blackAlpha", "whiteAlpha")}
        aria-label={label}
        isDisabled={isDisabled}
        color={useColorModeValue("gray.700", "whiteAlpha.800")}
        variant="outline"
      >
        <Box width="40px" height="auto" as={IoIosArrowRoundBack} />
        <span>Older posts</span>
      </PaginationButton>
    </Link>
  </Box>
);

export const NextLink = ({
  isDisabled,
  label = "See newer posts",
  link,
  ...props
}) => (
  <Box width="100%" {...props}>
    <Link link={link} aria-disabled={isDisabled}>
      <PaginationButton
        colorScheme={useColorModeValue("blackAlpha", "whiteAlpha")}
        aria-label={label}
        color={useColorModeValue("gray.700", "whiteAlpha.800")}
        isDisabled={isDisabled}
        variant="outline"
      >
        <span>Newer posts</span>
        <Box width="40px" height="auto" as={IoIosArrowRoundForward} />
      </PaginationButton>
    </Link>
  </Box>
);

const Pagination = ({ state, actions, libraries, ...props }) => {
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

  // Fetch the next page if it hasn't been fetched yet.
  useEffect(() => {
    if (isThereNextPage) actions.source.fetch(nextPageLink);
  }, []);

  return (
    <Stack direction="row" spacing="40px" {...props}>
      <PrevLink link={nextPageLink} isDisabled={!isTherePreviousPage} />
      <NextLink link={prevPageLink} isDisabled={!isThereNextPage} />
    </Stack>
  );
};

export default connect(Pagination);
