import Head from "next/head";
import { DateFormatter, Layout } from "../components";
import { getAllPosts } from "../lib/api";
import Link from "next/link";

export default function Home({ allPosts }: { allPosts: any[] }) {
  return (
    <Layout>
      <Head>
        <title>taroodr.dev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {allPosts.map((post) => (
          <section className="entry" key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              <a className="block pb-6">
                <h2>{post.title}</h2>
                <p className="mt-1 text-sm text-gray-600">
                  <DateFormatter dateString={post.date} />
                </p>
                <p className="mt-4 text-sm text-gray-700 leading-loose">
                  {post.excerpt}
                </p>
              </a>
            </Link>
          </section>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
}
