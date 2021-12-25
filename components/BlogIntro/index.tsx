export default function BlogIntro({ contents }) {
  return <div dangerouslySetInnerHTML={{ __html: contents }}></div>;
}
