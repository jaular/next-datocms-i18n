import type { GetStaticProps, NextPage } from "next";
import type { PageProps, AllPostProps } from "lib/types";
import Link from "next/link";
import { getAllPosts } from "lib/db";
import Container from "components/Container";

type Props = {
  page: PageProps;
  posts: AllPostProps[];
};

const Home: NextPage<Props> = ({ page, posts }) => {
  return (
    <Container title={page.title}>
      <h1>{page.title}</h1>

      <div>
        {posts.map((post) => (
          <div key={post.slug}>
            <h2>
              <Link href={`/loc/${post.slug}`}>
                <a> {post.title}</a>
              </Link>
            </h2>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale as string;
  const page = await import(`../lang/${locale}`);
  const posts = await getAllPosts(locale);

  return {
    props: { page: page.home, posts },
  };
};

export default Home;
