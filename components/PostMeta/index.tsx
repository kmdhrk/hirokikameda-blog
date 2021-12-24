import "dayjs/locale/ja";
import dayjs from "dayjs";
import styles from "./postMeta.module.scss";
import { Box } from "@mui/material";
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
      <h1 className={styles.postTitle}>{title}</h1>
      <Box sx={{ mt: 2, color: "#4B5563" }}>
        {published && publishedComponent(published)}
        {revised && revisedComponent(revised)}
        <span className="ml-5 text-sm underline">
          {category &&
            category.map((cat, index) => {
              return (
                <Box component="span" key={index} sx={{ mr: 1 }}>
                  {cat.name}
                </Box>
              );
            })}
        </span>
      </Box>
    </>
  );
}
