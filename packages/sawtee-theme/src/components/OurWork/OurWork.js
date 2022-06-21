import { styled, connect } from "frontity";
import { useEffect } from "react";
import FeaturedMedia from "../page/featured-media";
import {
  Post as _Post,
  PostHeader,
  PostTitle,
  PostCaption,
  SectionContainer,
} from "../page/post-item";

/**
 * The Post component that the TwentyTwenty theme uses for rendering any kind of
 * "post type" (posts, pages, attachments, etc.).
 *
 * It doesn't receive any prop but the Frontity store, which it receives from
 * {@link connect}. The current Frontity state is used to know which post type
 * should be rendered.
 *
 * @param props - The Frontity store (state, actions, and libraries).
 *
 * @example
 * ```js
 * <Switch>
 *   <Post when={data.isPostType} />
 * </Switch>
 * ```
 *
 * @returns The {@link Post} element rendered.
 */
const OurWork = ({ state, actions, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  // Get the data of the post.
  const post = state.source[data.type][data.id];

  const OurThemes = [
    {
      name: "COVID 19",
      href: "#",
    },
    {
      name: "Trade and Climate Change",
      href: "#",
    },
    {
      name: "Theme",
      href: "#",
    },
    {
      name: "Theme",
      href: "#",
    },
    {
      name: "Financial Mangement",
      href: "#",
    },
    {
      name: "Remittance and Development",
      href: "#",
    },
  ];

  /**
   * Once the post has loaded in the DOM, prefetch both the
   * home posts and the list component so if the user visits
   * the home page, everything is ready and it loads instantly.
   */
  useEffect(() => {
    actions.source.fetch("/");
  }, [actions.source]);

  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <PostArticle>
      <Header backgroundImage={FeaturedImage}>
        {state.theme.featuredMedia.showOnPost && (
          <FeaturedImage id={post.featured_media} isSinglePost={true} />
        )}
        <SectionContainer>
          {/* If the post has categories, render the categories */}
          {post.categories && <PostCategories categories={categories} />}
          <PostTitle
            as="h1"
            className="heading-size-1"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          {/* If the post has a caption (like attachments), render it */}
          {post.caption && (
            <PostCaption
              dangerouslySetInnerHTML={{ __html: post.caption.rendered }}
            />
          )}
          {/* The post's metadata like author, publish date, and comments */}
          {/* <PostMeta item={post} /> */}
        </SectionContainer>
      </Header>
      <Wrapper>
        <div className="inner">
          <div className="top-section">
            <ul>
              {OurThemes.map((theme, index) => {
                return (
                  <li key={index}>
                    <a href={theme.href}>{theme.name}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Wrapper>
    </PostArticle>
  ) : null;
};

export default connect(OurWork);

const Header = styled(PostHeader)`
  background-color: #fff;
  margin: 0;
  padding: 4rem 0;
  position: relative;
  display: flex;
  justify-content: center;
  height: 390px;
  @media (min-width: 700px) {
    padding: 8rem 0;
  }
  min-height: 385px;
  > div {
    position: absolute;
    margin: 0;
    left: 275px;
    bottom: 0;
    width: max-content;

    > h1 {
      color: #fff;
      font-size: 2.5em;
      text-transform: uppercase;
    }
  }
`;

const PostArticle = styled(_Post)`
  padding-top: 0 !important;
`;

const FeaturedImage = styled(FeaturedMedia)`
  margin-top: 0 !important;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  max-height: 100%;

  > div {
    position: relative;
    width: 100% !important;
    max-width: 100%;
    margin: 0;
  }
  & img {
    width: 100%;
    height: auto;
    max-height: 390px;
    object-fit: cover;
    display: block;
  }
`;

const Wrapper = styled.section`
  padding: 0;
  background-color: #828990;

  & .inner {
    max-width: 75%;
    margin: 0 auto;
    background-color: transparent;

    & .top-section {
      background-color: hsla(255, 100%, 100%, 0.3);
      padding: 2rem;

      & ul {
        list-style: none;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        grid-auto-rows: minmax(30px, auto);
        gap: 2rem;
        justify-items: center;

        & li {
          color: #fff;
          text-transform: capitalize;
          font-size: 2rem;
          text-align: center;

          & a {
            text-decoration: none;
            color: #fff;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
`;
