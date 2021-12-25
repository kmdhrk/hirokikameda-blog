import "dayjs/locale/ja";
import dayjs from "dayjs";
import { Box, Typography } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import { VFC } from "react";

const revisedComponent: VFC = (revised: string) => {
  return (
    <>
      <UpdateOutlinedIcon sx={{ verticalAlign: "-0.25em", mx: 1 }} />
      {dayjs(revised).format("YYYY.MM.DD")}
    </>
  );
};

const publishedComponent: VFC = (published: string) => {
  return (
    <>
      <AccessTimeOutlinedIcon sx={{ verticalAlign: "-0.25em", mr: 1 }} />
      {dayjs(published).format("YYYY.MM.DD")}
    </>
  );
};

export default function PostMeta({ title, published, category, revised }) {
  return (
    <>
      <Typography
        sx={{
          mt: 0,
          fontSize: { xs: "1.6rem", md: "2.5rem" },
          color: "#000",
          lineHeight: 1.4,
          fontWeight: "bold",
        }}
        component="h1"
      >
        {title}
      </Typography>
      <Box sx={{ mt: 2, color: "#4B5563" }}>
        {published && publishedComponent(published)}
        {revised && revisedComponent(revised)}
        <Box component="span" sx={{ml: 2, fontSize: '0.925rem', textDecoration: 'underLine'}}>
          {category &&
            category.map((cat, index) => {
              return (
                <Box component="span" key={index} sx={{ mr: 1 }}>
                  {cat.name}
                </Box>
              );
            })}
        </Box>
      </Box>
    </>
  );
}
