import Card from "../Card"

export default function CardLists({blog}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-11 max-w-screen-2xl mx-auto ">
      {blog.map((blog, index) => (
        <Card
          src={blog.eyecatch.url}
          width={blog.eyecatch.width}
          height={blog.eyecatch.height}
          title={blog.title}
          link={`/blog/${blog.id}`}
          date={blog.category.publishedAt}
          category={blog.category.name}
          key={index}
        />
      ))}
    </div>
  );
}
