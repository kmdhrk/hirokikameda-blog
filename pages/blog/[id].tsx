import { client } from "../../libs/client";
import { GetStaticPaths } from "next";
import Header from "../../components/Header";
import blogStyles from "../../styles/blog.module.scss";
import "dayjs/locale/ja";
import dayjs from "dayjs";
import Image from "next/image";
import cheerio from "cheerio";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import Link from "next/link";
import Toc from "../../components/Toc";
import Seo from "../../components";
import { useRouter } from "next/router";

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
  publishedAt: string;
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
      <main className={blogStyles.post}>
        <div className="max-w-3xl px-4 py-6 md:p-11 mx-auto  sm:rounded-xl bg-white shadow-sm">
          <h1>{content.title}</h1>
          <div className="mt-2">
            <span className="text-gray-600">
              {dayjs(content.publishedAt).format("YYYY.MM.DD")}
            </span>
            <span className="ml-5 text-sm text-gray-600 underline">
              {content.category && `${content.category.name}`}
            </span>
          </div>
          <div className="my-6 md:my-12">
            {content.eyecatch ? (
              <Image
                src={content.eyecatch.url}
                width={content.eyecatch.width}
                height={content.eyecatch.height}
              />
            ) : (
              <Image src="/noimage.png" alt="No Image" />
            )}
          </div>
          <Toc toc={toc} />
          <div dangerouslySetInnerHTML={{ __html: highlightedBody }}></div>
        </div>
        <div className="mt-12 text-center text-blue-600 underline">
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

export const getStaticProps = async ({ params, previewData }) => {
  const id = params.id;

  const isDraft = (item: any): item is { draftKey: string } =>
    !!(item?.draftKey && typeof item.draftKey === "string");
  const draftKey = isDraft(previewData);
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

  const headings: any = $('h1, h2, h3').toArray();
  const toc:TocProps = headings.map(data => ({
    text: data.children[0].data,
    id: data.attribs.id,
    name: data.name
  }))

  return {
    props: {
      content,
      highlightedBody: $.html(),
      toc,
    },
  };
};
