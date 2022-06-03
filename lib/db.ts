import type { AllPostProps, PostProps } from "lib/types";
import { graphqlRequest } from "lib/datocms";
import { gql } from "graphql-request";

export const getAllPosts = async (locale: string): Promise<AllPostProps[]> => {
  const ALLPOSTS_QUERY = gql`
    {
      allPosts(orderBy: _createdAt_DESC, locale: ${locale}) {
        title
        slug
        description
      }
    }
  `;

  const { allPosts } = await graphqlRequest(ALLPOSTS_QUERY);

  return JSON.parse(JSON.stringify(allPosts));
};

export const getPostBySlug = async (
  slug: string,
  locale: string
): Promise<PostProps | null> => {
  const POST_QUERY = gql`
    query MyQuery($slug: String) {
      post(filter: { slug: { eq: $slug } }, locale: ${locale}) {
        title
        slug
      }
    }
  `;

  const variables = {
    slug: slug,
  };

  const { post } = await graphqlRequest(POST_QUERY, variables);

  if (!post) {
    return null;
  }

  return JSON.parse(JSON.stringify(post));
};

export const getAllPostsSlug = async (): Promise<
  { value: string; locale: string }[]
> => {
  const ALLPOSTS_SLUG_QUERY = gql`
    {
      allPosts {
        _allSlugLocales {
          value
          locale
        }
      }
    }
  `;

  const { allPosts } = (await graphqlRequest(ALLPOSTS_SLUG_QUERY)) as {
    allPosts: { _allSlugLocales: { value: string; locale: string }[] }[];
  };
  const data = allPosts.map((item) => item._allSlugLocales);
  const en = data.map((item) => item[0]);
  const es = data.map((item) => item[1]);
  const allSlugLocales = [...en, ...es];

  return JSON.parse(JSON.stringify(allSlugLocales));
};
