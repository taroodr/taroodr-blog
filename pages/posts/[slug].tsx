import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { Layout, PostBody, PostTitle, ShareButtons } from "../../components";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import Head from "next/head";
import markdownToHtml from "../../lib/markdownToHtml";
import createOgp from "../../lib/createOgp";

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
              <meta
                property="og:image"
                key="ogImage"
                content={`https://taroodr.com/ogp/${post.slug}.png`}
              />
              <meta
                name="twitter:card"
                key="twitterCard"
                content="summary_large_image"
              />
              <meta name="twitter:title" content={post.title} />
              <meta name="twitter:description" content={post.excerpt} />
              <meta
                name="twitter:image"
                key="twitterImage"
                content={`https://taroodr.com/ogp/${post.slug}.png`}
              />
            </Head>
            <PostTitle title={post.title} dateString={post.date} />
            <PostBody content={post.content} />
            <ShareButtons />
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
    "excerpt",
  ]);
  const content = await markdownToHtml(post.content || "");

  await createOgp(post.title, params.slug);

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
