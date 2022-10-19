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
import Grid, { GridItem } from "../reusable/grid/grid";
import TI_IMAGE from "../../assets/publications-2.jpg";
import Globe from "../../assets/Article-1_img_1.jpg";

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
const Events = ({ state, actions, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  // Get the data of the post.
  const post = state.source[data.type][data.id];

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
        <Inner>
          <div className="main">
            <article className="entry entry-lede">
              <img
                className="entry-img"
                src="https://assets.codepen.io/467/horse02.jpg"
                alt="A handsome young horse in front of an expansive sky"
              />
              <div className="entry-content">
                <h1 className="entry-headline primary-headline">
                  This horse sure knows how to code
                </h1>
                <time className="entry-date meta">January 24, 2021</time>
                <span className="entry-byline meta">by Alex Trost</span>
                <p className="entry-summary">
                  Aliquam justo enim, mollis a justo et, sagittis vulputate
                  turpis. Nulla facilisi. Proin quis mattis ipsum, eu eleifend
                  dolor. Nulla auctor ex vel ipsum varius viverra. Vestibulum
                  convallis elit nec quam bibendum varius. Morbi ut mattis dui.
                  Aenean a massa vitae magna commodo consequat. Duis ac lacus.
                </p>
              </div>
            </article>
            <article className="entry">
              <img
                className="entry-img"
                src="https://assets.codepen.io/467/horse03.jpg"
                alt="The profile view of three majestic brown horses"
              />
              <h1 className="entry-headline primary-headline">
                Trost’s tolt trots to TypeScript
              </h1>
              <time className="entry-date meta">January 24, 2021</time>
              <span className="entry-byline meta">by Alex Trost</span>
              <p className="entry-summary">
                Cras mollis dolor vitae tellus sollicitudin, quis sagittis
                mauris dictum. Donec aliquet ipsum et ex pulvinar, id vestibulum
                lectus egestas. Vestibulum non ultrices mauris, nec elementum
                mauris. Donec aliquet ipsum at risus vulputate viverra.
              </p>
            </article>
            <article className="entry">
              <img
                className="entry-img"
                src="https://assets.codepen.io/467/horse01.jpg"
                alt="The profile view of three majestic brown horses"
              />
              <h1 className="entry-headline primary-headline">
                This team of three does front end magic
              </h1>
              <time className="entry-date meta">January 24, 2021</time>
              <span className="entry-byline meta">by Alex Trost</span>
              <p className="entry-summary">
                Mauris ut volutpat quam. Duis vitae turpis volutpat dolor
                efficitur rhoncus. Aenean lacinia est non porta dictum.
                Curabitur cursus mauris est, nec pharetra nisi imperdiet eget.
                Suspendisse non ultricies ligula.
              </p>
            </article>
            <section className="trending">
              <article className="trending-entry">
                <time className="trending-entry-date meta">
                  January 24, 2021
                </time>
                <h1 className="trending-entry-headline primary-headline">
                  Gallop into the amazing new world of CSS
                </h1>
              </article>
              <article className="trending-entry">
                <time className="trending-entry-date meta">
                  January 24, 2021
                </time>
                <h1 className="trending-entry-headline primary-headline">
                  Horse around with new HTML5 tags
                </h1>
              </article>
              <article className="trending-entry">
                <time className="trending-entry-date meta">
                  January 24, 2021
                </time>
                <h1 className="trending-entry-headline primary-headline">
                  Five featured fonts of front end horse
                </h1>
              </article>
              <article className="trending-entry">
                <time className="trending-entry-date meta">
                  January 24, 2021
                </time>
                <h1 className="trending-entry-headline primary-headline">
                  Saddle up with Rust
                </h1>
              </article>
            </section>
          </div>
        </Inner>
      </Wrapper>
    </PostArticle>
  ) : null;
};

export default connect(Events);

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
    height: auto;
    max-height: 390px;
    object-fit: cover;
    display: block;
  }
`;

const Wrapper = styled.section`
  padding: 2rem 4rem;
  // background-color: hsla(210, 6%, 54%, 1);

  & .inner {
    max-width: 90%;
    margin: 0 auto;
    background-color: transparent;
    display: flex;
    flex-direction: column;

    @media (min-width: 1200px) {
      max-width: 80%;
    }
  }
`;

const Inner = styled.div`
  font-family: Fraunces, serif;
  font-size: 115%;
  line-height: 1.35;
  font-weight: 340;
  color: var(--text);
  background: var(--background);
  padding-bottom: 20vh;
  padding: 2rem;

  /* Typetura */
  --tt-key: html;
  --tt-max: 900;
  --tt-ease: cubic-bezier(0, 0.78, 0.53, 1);

  /* Grid */
  --max-width: 1200px;
  --columns: 6;
  --gutter: 1.5rem;

  /* Color */
  --primary: #f4663a;
  --background: #efeded;
  --background-alt: #ffffff;
  --text: #31355b;

  * {
    --grid: minmax(var(--gutter), 1fr)
      repeat(
        var(--columns),
        minmax(
          0,
          calc(
            (var(--max-width) - (var(--gutter) * (var(--columns) - 1))) /
              var(--columns)
          )
        )
      )
      minmax(var(--gutter), 1fr);
  }

  & .primary-headline {
    --tt-key: primary-headline;
    --tt-ease: cubic-bezier(1, 0, 1, 1);
    --tt-max: 585;
    line-height: 1;
    font-variation-settings: "SOFT" 0, "WONK" 1;
    margin: 0.5rem 0;
    font-size: 2.5rem;
  }

  & .main {
    column-gap: var(--gutter);
    grid-template-columns: var(--grid);
    padding: var(--gutter);
  }

  & .entry {
    margin-bottom: var(--gutter);
  }

  & .entry,
  .entry-content {
    display: flex;
    flex-direction: column;
  }

  & .entry-img {
    aspect-ratio: 5 / 3;
    object-fit: cover;
  }

  & .entry-date {
    order: -1;
  }

  & .entry-lede time {
    margin-bottom: 1rem;
  }

  & .entry-lede time::after {
    content: "";
    display: block;
    width: calc(100% + (var(--gutter) * 2));
    height: 1px;
    margin-left: calc(var(--gutter) * -2);
    background: var(--primary);
    mix-blend-mode: multiply;
    margin-top: 0.67rem;
  }

  & .trending {
    grid-row-start: 2;
    grid-column-start: 2;
    grid-column-end: span 6;
    margin-top: var(--gutter);
    transform: translatex(calc(var(--gutter) * -1));
  }

  @media (min-width: 30em) {
    --columns: 12;
    & .main,
    & .entry-lede {
      padding: 0;
      display: grid;
    }

    & .entry,
    & .trending {
      grid-column-start: 3;
      grid-column-end: span 10;
    }

    & .entry-lede {
      column-gap: var(--gutter);
      grid-template-columns: var(--grid);
      grid-column-start: 1;
      grid-column-end: span 14;
      margin-bottom: 4rem;
    }

    & .entry-lede > .entry-img {
      aspect-ratio: auto;
      grid-column-start: 1;
      grid-column-end: span 10;
    }

    & .entry-lede .entry-content {
      grid-column-start: 3;
      grid-column-end: span 11;
      margin: -2.5rem calc(var(--gutter) * -1) 0;
      background: var(--background-alt);
      padding: 0.5rem var(--gutter) 1rem;
    }
  }
  @media (min-width: 50em) {
    --columns: 24;

    & .main::before,
    & .main::after {
      content: "";
      display: block;
      grid-column-start: 8;
      grid-column-end: 26;
      grid-row-start: 2;
      grid-row-end: 3;
      background: var(--background-alt);
      margin: 0 calc(var(--gutter) * -1);
      z-index: -1;
    }
    & .main::after {
      grid-column-start: 2;
      background-color: var(--primary);
      height: 1px;
      mix-blend-mode: multiply;
    }

    & .entry {
      grid-column-end: span 9;
      margin-bottom: var(--gutter);
    }
    & .entry:nth-child(n + 2) {
      margin-top: -2rem;
      grid-row-start: 2;
    }
    & .entry:nth-child(2) {
      grid-column-start: 8;
    }
    & .entry:nth-child(3) {
      grid-column-start: 17;
    }

    & .entry-lede {
      column-gap: var(--gutter);
      grid-template-columns: var(--grid);
      grid-column-start: 1;
      grid-column-end: span 26;
      margin-bottom: 4rem;
    }

    & .entry-lede > .entry-img {
      aspect-ratio: auto;
      grid-column-start: 1;
      grid-column-end: span 13;
    }

    & .entry-lede .entry-content {
      grid-column-start: 14;
      grid-column-end: span 12;
      margin: 0.5rem 0;
      padding: 4rem 0 0;
      background: none;
    }

    & .trending {
      grid-row-start: 2;
      grid-column-start: 2;
      grid-column-end: span 6;
      margin-top: var(--gutter);
      transform: translatex(calc(var(--gutter) * -1));
    }
  }
`;
