import React from "react";
import { styled } from "@mui/system";
import { Box, BoxProps } from "@mui/material";

type ListProps = {
  bgcolor: "blue" | "gray" | "yellow";
} & BoxProps;

const handleColorType = (bgcolor) => {
  switch (bgcolor) {
    case "blue":
      return "#E8F8FF";
    case "gray":
      return "#F6F6F6";
    case "yellow":
      return "#FFFBDC";
  }
};

const List = styled(Box)<ListProps>(({ theme, bgcolor }) => ({
  paddingLeft: "2.5em !important",
  backgroundColor: handleColorType(bgcolor),
  paddingTop: "1.5em",
  paddingBottom: "1.5em",
  paddingRight: "2em",
  [theme.breakpoints.up("md")]: {
    paddingLeft: "3em !important",
    borderRadius: "12px",
  },
}));

export default function ListBlogContents({ bgcolor, children }) {
  return (
    <List bgcolor={bgcolor} component="ul">
      {children}
    </List>
  );
}
