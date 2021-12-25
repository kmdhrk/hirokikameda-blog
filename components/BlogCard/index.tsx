import React from "react";
import { styled } from "@mui/system";
import { Box, Link, Typography } from "@mui/material";

const Card = styled(Link)(({ theme }) => ({
  border: "2px solid #f1f1f1",
  borderRadius: "6px",
  overflow: "hidden",
  display: "block",
  [theme.breakpoints.up("md")]: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
}));

const StyledImage = styled("img")({
  objectFit: "cover",
  objectPosition: "center",
  width: "100%",
  height: "100%",
});
const Title = styled(Typography)({
  color: "#333",
  fontSize: "18px",
  lineHeight: 1.4,
  fontWeight: "bold",
});

const Description = styled(Typography)({
  color: "#9ca3af",
  fontSize: "12px",
  lineHeight: 1.6,
});

const BlogCard = ({ cardData, children }) => {
  const blank = cardData.url.indexOf(process.env.NEXT_PUBLIC_DOMEIN) === -1;
  const blankProp = blank
    ? {
        target: "_blank",
        rel: "noopener nofollow",
      }
    : {};
  if (cardData.title) {
    return (
      <Card href={cardData.url} underline="none" {...blankProp}>
        <Box sx={{ flexBasis: "200px", flexShrink: 0, position: "relative" }}>
          <StyledImage
            src={cardData.image ? cardData.image : "/noimage.png"}
            alt=""
          />
        </Box>
        <Box sx={{ p: 2 }}>
          {cardData.title && <Title>{cardData.title}</Title>}
          {cardData.description && (
            <Box sx={{ mt: 1 }}>
              <Description>{cardData.description}</Description>
            </Box>
          )}
        </Box>
      </Card>
    );
  }
  return (
    <Link href={cardData.url} {...blankProp} underline="none">
      {children}
    </Link>
  );
};

export { BlogCard };
