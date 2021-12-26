import { styled } from "@mui/system";
import { Box, Link, Typography } from "@mui/material";
import { VFC } from "react";

type TocProps = {
  toc: {
    name: string;
    id: string;
    text: string;
  }[];
};

const wrap = {
  border: "2px solid #f1f1f1",
  borderRadius: "5px",
  padding: { xs: "0.8em 1em", md: "1em 1.5em" },
  fontSize: { xs: "0.9375em", md: "1em" },
};

const tocList = {
  counterReset: "list-count",
  listStyleType: "none",
  paddingLeft: "1.5em",
  position: 'relative' as 'relative',
};

const listItem = [
  {
    "&:before": {
      content: 'counter(list-count) "."',
      counterIncrement: "list-count",
      fontWeight: "bold",
      position: "absolute",
      left: 0,
    },
  },
  {
    lineHeight: 1.6,
  },
];

export const Toc: VFC<TocProps> = (toc) => {
  return (
    <Box sx={wrap}>
      <Box component="p" sx={{ fontWeight: "bold", mb: 1 }}>
        目次
      </Box>
      <Box sx={tocList} component="ol" >
        {toc.toc.length
          ? toc.toc.map((toc, index) => (
              <Box
                component="li"
                sx={listItem}
                id={"list" + toc.name}
                key={index}
              >
                <Box
                  component="a"
                  href={"#" + toc.id}
                  sx={{ fontSize: "1em", color: "inherit" }}
                >
                  {toc.text}
                </Box>
              </Box>
            ))
          : ""}
      </Box>
    </Box>
  );
};

export default Toc;
