import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { PostProps } from "lib/types";
import Link from "next/link";
import Container from "components/Container";
import { getAllPostsSlug, getPostBySlug } from "lib/db";

type Props = {
  post: PostProps;
};

const LocationPage: NextPage<Props> = ({ post }) => {
  return (
    <Container title={post.title}>
      <h1>{post.title}</h1>
      <Link href="/">
        <a style={{ textDecoration: "none", fontSize: "28px" }}>&#8592;</a>
      </Link>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const result = await getAllPostsSlug();

  const paths = result.map((item) => ({
    params: { slug: item.value },
    locale: item.locale,
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale as string;
  const { slug } = context.params as { slug: string };
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { post },
  };
};

export default LocationPage;
