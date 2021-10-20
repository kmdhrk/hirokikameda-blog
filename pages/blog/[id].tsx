import { client } from "../../libs/client";
import { GetStaticPaths } from "next";
import Header from "../../components/Header";
import cheerio from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import Link from "next/link";
import Toc from "../../components/Toc";
import Seo from "../../components";
import { useRouter } from "next/router";
import Eyecatch from "../../components/Eyecatch";
import BlogContents from "../../components/BlogContents";
import PostMeta from "../../components/PostMeta";

export type BlogProps = {
  content: contentProps;
  highlightedBody: string;
  toc: TocProps;
};

export type TocProps = {
  name: string;
  id: string;
  text: string;
}[];

export type contentProps = {
  id: string;
  crearedAt: string;
  updatedAt: string;
  revisedAt: string;
  title: string;
  description: string;
  category: {
    id: string;
    crearedAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    name: string;
  };
  body?: string;
  eyecatch: {
    url: string;
    height: number;
    width: number;
  };
};

export default function Blogid({ content, highlightedBody, toc }: BlogProps) {
  const router = useRouter();
  const pagePath = `https://micro-cms-blog-nu.vercel.app${router.asPath}`;

  return (
    <>
      <Seo
        pageTitle={content.title}
        pagePath={pagePath}
        pageDescription={content.description}
        pageImg={content.eyecatch.url}
        pageImgHeight={content.eyecatch.height}
        pageImgWidth={content.eyecatch.width}
      />
      <Header />
      <main>
        <div className="max-w-3xl px-4 py-6 md:p-11 mx-auto  sm:rounded-xl bg-white shadow-sm">
          <div className="my-6 md:my-12">
            <Eyecatch
              url={content.eyecatch.url}
              width={content.eyecatch.width}
              height={content.eyecatch.height}
            />
          </div>
          <Toc toc={toc} />
          <BlogContents contents={highlightedBody} />
        </div>
        <div className="mt-12 pb-12 text-center text-blue-600 underline">
          <Link href="/">
            <a>TOPへ戻る</a>
          </Link>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data: any = await client.get({ endpoint: "blog" });
  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const id = context.params?.slug;
  
  const draftKey = context.previewData?.draftKey;

  console.log(context.previewData?.draftKey);
  const content: contentProps = await fetch(
    `https://webdock.microcms.io/api/v1/blog/${id}${
      draftKey !== undefined ? `?draftKey=${draftKey}` : ""
    }`,
    { headers: { "X-API-KEY": process.env.API_KEY || "" } }
  ).then((res) => res.json());

  const $ = cheerio.load(content.body);
  $("pre code").each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });

  const headings: any = $("h2").toArray();
  const toc: TocProps = headings.map((data) => ({
    text: data.children[0].data,
    id: data.attribs.id,
    name: data.name,
  }));

  return {
    props: {
      content,
      highlightedBody: $.html(),
      toc,
    },
  };
};
