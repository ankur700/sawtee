import { Stack } from "@chakra-ui/react";
import { connect } from "frontity";
import React from "react";

export const Sidebar = ({ children }) => {
  return (
    <Stack spacing={16} maxW={"lg"}>
      {children}
    </Stack>
  );
};

export default connect(Sidebar);
