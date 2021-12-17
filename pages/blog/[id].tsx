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
import BlogIntro from "../../components/BlogIntro";
import Image from "next/image";
import { ReactDOM } from "react";

export type BlogProps = {
  content: contentProps;
  highlightedBody: string;
  toc: TocProps;
  contentPerse: ReactDOM;
  links: any;
  cardDatas: string[];
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
  publishedAt?: string;
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
  intro?: string;
  eyecatch: {
    url: string;
    height: number;
    width: number;
  };
};

export default function Blogid({
  content,
  highlightedBody,
  toc,
  cardDatas,
}: BlogProps) {
  const router = useRouter();
  const pagePath = `https://micro-cms-blog-nu.vercel.app${router.asPath}`;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
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
          <PostMeta
            title={content.title}
            published={content.publishedAt}
            category={content.category}
          />
          {content.eyecatch ? (
            <div className="my-6 md:my-12">
              <Eyecatch
                url={content.eyecatch.url}
                width={content.eyecatch.width}
                height={content.eyecatch.height}
              />
            </div>
          ) : null}
          {content.intro ? <BlogIntro contents={content.intro} /> : null}
          {toc.length ? (
            <div className="my-6 md:my-12">
              <Toc toc={toc} />
            </div>
          ) : null}
          <BlogContents contents={highlightedBody} cardDatas={cardDatas}/>
        </div>
        <div className="max-w-3xl mx-auto mt-6 py-8 px-4 sm:px-11 sm:rounded-xl bg-white shadow-sm ">
          <p className="font-bold text-lg sm:text-xl">この記事を書いた人</p>
          <div className="sm:flex mt-5 items-center">
            <div className="rounded-full overflow-hidden border-2 relative w-[150px] h-[150px] flex-shrink-0 mx-auto sm:mx-0">
              <Image
                src="/person.jpg"
                alt="写真: ヒロの人物画像"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
            <p className="mt-6 sm:mt-0 sm:ml-10 text-sm leading-7 text-[#333]">
              <span className="text-base text-[#000]">
                ヒロ (
                <a
                  href="https://twitter.com/hirokiweblax"
                  className="text-blue-600 underline"
                >
                  @hirokiweblax
                </a>
                )
              </span>
              <br />
              フリーランス歴3年のコーダー兼ディレクターです
              <br />
              デイトラやウルトラデザインスクールのメンター
              <br />
              ブログでは公式ドキュメントを根拠とした正しいコーディングの知識、実際に現場で使っている知識の発信をしています。
            </p>
          </div>
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
  return { paths, fallback: true };
};

export const getStaticProps = async (context) => {
  const id = context.params?.id;
  const draftKey = context.previewData?.draftKey;

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

  const highlightedBody = $.html('body').replace(/<body>/, '')

  const headings: any = $("h2").toArray();
  const toc: TocProps = headings.map((data) => ({
    text: data.children[0].data,
    id: data.attribs.id,
    name: data.name,
  }));

  const links = $("a")
    .toArray()
    .map((data) => {
      const url =
        data.attribs.href.indexOf("http") === -1
          ? `https://micro-cms-blog-nu.vercel.app${data.attribs.href}`
          : data.attribs.href;
      return { url: url };
    });

  let cardDatas = [];
  const temps = await Promise.all(
    links.map(async (link) => {
      const metas = await fetch(link.url)
        .then((res) => res.text())
        .then((text) => {
          const $ = cheerio.load(text);
          const metas = $("meta").toArray();
          const metaData = {
            url: link.url,
            title: "",
            description: "",
            image: "",
          };
          for (let i = 0; i < metas.length; i++) {
            if (metas[i].attribs?.property === "og:title")
              metaData.title = metas[i].attribs.content;
            if (metas[i].attribs?.property === "og:description")
              metaData.description = metas[i].attribs.content;
            if (metas[i].attribs?.property === "og:image")
              metaData.image = metas[i].attribs.content;
          }
          return metaData;
        })
        .catch((e) => {
          console.log(e);
        });
      return metas;
    })
  );
  cardDatas = temps.filter((temp) => temp !== undefined);

  return {
    props: {
      content,
      highlightedBody: highlightedBody,
      toc,
      cardDatas,
    },
  };
};