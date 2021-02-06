import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { Layout, PostBody, PostTitle } from "../../components";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import Head from "next/head";
import markdownToHtml from "../../lib/markdownToHtml";

export default function Post({ post, preview }: { post: any; preview: any }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      {router.isFallback ? (
        <h1>Loading…</h1>
      ) : (
        <>
          <article className="mb-32">
            <Head>
              <title>{post.title} | taroodr.dev</title>
              <meta property="og:image" content={post.ogImage.url} />
            </Head>
            <PostTitle title={post.title} dateString={post.date} />
            <PostBody content={post.content} />
          </article>
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params }: { params: any }) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  console.log(posts);
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}