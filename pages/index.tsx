import { client } from "../libs/client";
import { GetStaticProps } from "next";
import Header from "../components/Header";
import CardLists from "../components/CardLists";

export default function Home({ blog }) {
  return (
    <>
      <Header />
      <main>
        <div className="mx-auto px-4">
          <CardLists blog={blog} />
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data: any = await client.get({ endpoint: "blog" });
  return {
    props: {
      blog: data.contents,
    },
  };
};
