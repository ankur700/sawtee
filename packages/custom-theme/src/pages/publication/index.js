import { styled, connect } from "frontity";
import { useEffect, useState } from "react";
import FeaturedMedia from "../../components/organisms/page/featured-media";
import {
  Post as _Post,
  PostHeader,
  PostTitle,
  PostCaption,
  SectionContainer,
} from "../../components/organisms/page/post-item";
import PostCategories from "../../components/organisms/page/post-categories";
import Link from "../../components/atoms/link";
import ItemsCarousel from "../../components/molecules/itemsCarousel";
import Grid, { GridItem } from "../../components/atoms/grid";
import SubscriptionCard from "../../components/atoms/subscriptionCard";
import { postdata, featuredEvents } from "../../data";
import TwitterTimeline from "../../components/atoms/twitterTimeline";

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
const Publication = ({ state, actions, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  // Get the data of the post.
  const post = state.source[data.type][data.id];

  const [loadAll, setLoadAll] = useState(false);

  /**
   * Once the post has loaded in the DOM, prefetch both the
   * home posts and the list component so if the user visits
   * the home page, everything is ready and it loads instantly.
   */
  useEffect(() => {
    actions.source.fetch("/");
  }, [actions.source]);

  const SIM = ({ data }) => {
    return (
      <Wrapper>
        <Title>Sawtee in Media</Title>
        <ul>
          {data.map((event, index) => {
            return (
              <li key={index}>
                <div className="title">
                  <h4>
                    <Link link={"#"}>{event.title}</Link>
                  </h4>
                </div>
                <div className="content">
                  <p>
                    <span>{event.publisher}</span>
                    {" | "}
                    <span>{event.date}</span>
                  </p>
                </div>
              </li>
            );
          })}
          {data.map((event, index) => {
            return (
              <li key={index}>
                <div className="title">
                  <h4>
                    <Link link={"#"}>{event.title}</Link>
                  </h4>
                </div>
                <div className="content">
                  <p>
                    <span>{event.publisher}</span>
                    {" | "}
                    <span>{event.date}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Wrapper>
    );
  };

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
      <Grid styles={PublicationGridStyles}>
        <GridItem styles={CarouselGridSection}>
          <Section>
            <Title>Trade Insight</Title>
            <ItemsCarousel
              data={postdata}
              slidesToShow={3}
              slidesToScroll={3}
            />
          </Section>
          <Section>
            <Title>Discussion Paper</Title>
            <ItemsCarousel
              data={postdata}
              slidesToShow={3}
              slidesToScroll={3}
            />
          </Section>
          <Section>
            <Title>Policy Brief</Title>
            <ItemsCarousel
              data={postdata}
              slidesToShow={3}
              slidesToScroll={3}
            />
          </Section>
          <Section>
            <Title>Briefing Paper</Title>
            <ItemsCarousel
              data={postdata}
              slidesToShow={3}
              slidesToScroll={3}
            />
          </Section>
          <Section>
            <Title>Issue Paper</Title>
            <ItemsCarousel
              data={postdata}
              slidesToShow={3}
              slidesToScroll={3}
            />
          </Section>
          <Section>
            <Title>Working Paper</Title>
            <ItemsCarousel
              data={postdata}
              slidesToShow={3}
              slidesToScroll={3}
            />
          </Section>
          <Section>
            <Title>Books</Title>
            <ItemsCarousel
              data={postdata}
              slidesToShow={3}
              slidesToScroll={3}
            />
          </Section>
          {loadAll ? (
            <>
              <Section>
                <Title>Others</Title>
                <ItemsCarousel
                  data={postdata}
                  slidesToShow={3}
                  slidesToScroll={3}
                />
              </Section>
              <Section>
                <Title>Research Briefs</Title>
                <ItemsCarousel
                  data={postdata}
                  slidesToShow={3}
                  slidesToScroll={3}
                />
              </Section>
              <Section>
                <Title>Book Chapters</Title>
                <ItemsCarousel
                  data={postdata}
                  slidesToShow={3}
                  slidesToScroll={3}
                />
              </Section>
            </>
          ) : (
            <Section>
              <LoadBtn onClick={() => setLoadAll(!loadAll)}>Load All</LoadBtn>
            </Section>
          )}
        </GridItem>
        <GridItem styles={SideBarGridSection}>
          <SIM data={featuredEvents} />

          <TwitterTimeline height="1200px" width="100%" handle="sawteenp" />
          <SubscriptionCard />
        </GridItem>
      </Grid>
    </PostArticle>
  ) : null;
};

export default connect(Publication);

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
  > div {
    position: absolute;
    margin: 0;
    left: 10rem;
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

  > div::after {
    content: "";
    width: 100%;
    height: 100%;
    background-color: hsla(0, 0%, 0%, 0.5);
    position: absolute;
    top: 0;
    left: 0;
  }
  & img {
    width: 100%;
    height: 390px;
    object-fit: cover;
    display: block;
  }
`;

const Section = styled.section`
  padding: 3rem;
  width: 100%;
  margin: 0 auto;
  position: relative;
`;

const PublicationGridStyles = `
  grid-template-columns: 65% 35%;
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 1rem;
  padding: 1.5rem 3rem;
  // background-color: #828990;
`;

const CarouselGridSection = `
  grid-column: 1/2;
  grid-row: 1/2;

`;
const SideBarGridSection = `
  grid-column: 2/3;
  grid-row: 1/2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: sticky;
  top: 12rem;
  align-self: start;

`;

const Title = styled.h3`
  font-size: 3rem;
  color: ${(props) => props.color || "#333"};
  margin: 2rem 0;
  padding: 0 2rem;

  @media (max-width: 762px) {
    font-size: 2rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  background-color: #fff;
  border-radius: 1.25rem;

  > ul {
    list-style: none;
    margin: 0;
    padding: 0;
    > li {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;

      .title > h4 {
        font-size: 1.75rem;
        margin: 0;
        font-weight: 500;
        letter-spacing: 0.1rem;

        a {
          text-decoration: none;

          &:hover {
            text-decoration: underline;
            text-underline-offset: 3px;
          }
        }
      }
      .content {
        p {
          font-size: 1.15rem;
        }
        p > span {
          margin: 0 0.5rem;
        }
      }
    }
  }
`;

const LoadBtn = styled.button`
  font-size: 1.8rem;
  font-family: monospace;
  text-transform: lowercase;
  letter-spacing: 1px;
  padding: 13px 50px 13px;
  outline: 0;
  margin: 0 auto;
  display: block;
  color: #333;
  z-index: 9 !important;
  border: 3px solid black;
  cursor: pointer;
  position: relative;
  background-color: transparent;

  &:hover {
    background-color: #006181;
    color: #f5f1f1;
    transition: all 0.3s ease-in;
  }
`;
