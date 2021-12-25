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

const Wrap = styled(Box)(({ theme }) => ({
  border: "2px solid #f1f1f1",
  borderRadius: "5px",
  padding: "0.8em 1em",
  fontSize: "0.9375em",
  [theme.breakpoints.up("md")]: {
    padding: "1em 1.5em",
    fontSize: "1em",
  },
}));

export const Toc: VFC<TocProps> = (toc) => {
  return (
    <Wrap>
      <Box component="p" sx={{ fontWeight: "bold", mb: 1, mt: 0 }}>
        目次
      </Box>
      <Box
        component="ol"
        sx={{
          counterReset: "list-count",
          listStyleType: "none",
          position: "relative",
          paddingLeft: "1.5em",
        }}
      >
        {toc.toc.length
          ? toc.toc.map((toc, index) => (
              <Box
                component="li"
                sx={[
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
                  }
                ]}
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
    </Wrap>
  );
};

export default Toc;
