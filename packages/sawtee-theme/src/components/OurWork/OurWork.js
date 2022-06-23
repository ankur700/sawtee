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
          <div className="intro">
            {/* <div className="blob"> </div> */}
            <p>
              Description about our work such as: In order to complement the
              efforts of South Asian governments and stakeholders, and to bring
              to the fore the views and concerns of the marginalized and poor
              segments of society, South Asia Watch on Trade, Economics and
              Environment (SAWTEE) was launched in 1994 as a loose regional
              network of non-governmental organizations (NGOs) from five South
              Asian countries: Bangladesh, India, Nepal, Pakistan and Sri Lanka.
              Taking into consideration the emerging need for fair, effective
              and meaningful integration of South Asian countries into the
              regional as well as global economies, the major motto of this
              regional initiative has been “GLOBALIZATION YES, BUT WITH SAFETY
              NETS”.
            </p>
          </div>
          <div className="cards">
            <a
              className="card"
              href="/programmes/"
              style={{ backgroundImage: `url(${Globe})` }}
            >
              <div>
                <h4 className="title"> Our Programmes</h4>
                <p className="content">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est
                </p>
              </div>
            </a>
            <a
              className="card"
              href="/research-output/"
              style={{
                backgroundImage: `url(${TI_IMAGE})`,
              }}
            >
              <div>
                <h4 className="title">Research</h4>
                <p className="content">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                  sea takimata sanctus est
                </p>
              </div>
            </a>
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

    & .top-section {
      background-color: hsla(0, 0%, 0%, 0.2);
      padding: 2rem;
      margin-bottom: 2rem;
      border-radius: 15px;
      background: hsla(210, 6%, 54%, 0.6);
      box-shadow: inset 7px 7px 14px #555a5e, inset -7px -7px 14px #b1bac4;
      backdrop-filter: blur(5px);
      z-index: 99;
      @media (min-width: 1140px) {
        position: sticky;
        top: 10rem;
      }

      & ul {
        list-style: none;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-auto-rows: minmax(30px, auto);
        gap: 1.5rem;
        justify-items: center;

        & li {
          text-transform: capitalize;
          font-size: 1.75rem;
          text-align: center;

          & a {
            text-decoration: none;
            color: #f5f1f1;

            &:hover {
              text-decoration: underline;
              color: #006181;
            }
          }
        }
      }
    }
    & .intro {
      background-color: transparent;
      padding: 1rem 3rem;
      margin: 2rem auto;
      text-align: left;
      color: #000;
      font-size: 2.25rem;
      position: relative;

      // & .blob {
      //   width: 1000px;
      //   position: absolute;
      //   top: 0;
      //   left: 0;
      //   height: 1000px;
      //   background-size: cover;
      //   background-repeat: no-repeat;
      //   background-image: url("data:image/svg+xml;utf8, %3Csvg width=%22100%25%22 height=%22100%25%22 viewBox=%220 0 1000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22 %3E %3Cdefs%3E %3CclipPath id=%22shape%22%3E %3Cpath fill=%22currentColor%22 d=%22M636.5%2C681.5Q290%2C863%2C283.5%2C488.5Q277%2C114%2C630%2C307Q983%2C500%2C636.5%2C681.5Z%22%3E%3C%2Fpath%3E %3C%2FclipPath%3E %3C%2Fdefs%3E %3Cg clip-path=%22url(%23shape)%22%3E %3Cpath fill=%22%23444cf7%22 d=%22M636.5%2C681.5Q290%2C863%2C283.5%2C488.5Q277%2C114%2C630%2C307Q983%2C500%2C636.5%2C681.5Z%22 %2F%3E %3C%2Fg%3E %3C%2Fsvg%3E");
      // }

      @media (max-width: 992px) {
        font-size: 1.75rem;
      }
    }

    & .cards {
      display: flex;
      gap: 0.5rem;
      margin: 2rem 0;
      justify-content: center;
      @media (max-width: 992px) {
        flex-direction: column;
        > .card {
          width: 100% !important;
        }
      }

      & .card {
        position: relative;
        border-radius: 20px;
        max-width: 700px;
        width: 50%;
        height: 600px;
        border: 3px solid #000;
        overflow: hidden;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        background-blend-mode: multiply;
        background-color: darkgrey;

        & div {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          height: 100%;
          cursor: pointer;
          &:hover {
            backdrop-filter: blur(2px);
            .title {
              background-color: hsla(195, 100%, 25%, 0.6);
              transition: background-color 0.4s ease-in;
            }
            > p {
              visibility: visible;
              background-color: hsla(0, 17%, 95%, 0.6);
              transition: all 0.4s ease-in;
            }
          }

          & .title {
            text-transform: uppercase;
            color: #f5f1f1;
            height: 25%;
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: center;
            margin: 0;
          }

          & .content {
            padding: 0 6rem;
            align-self: center;
            visibility: hidden;
            height: 75%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: justify;
            margin: 0;
            font-size: 2.5rem;

            @media (max-width: 1140px) {
              font-size: 2.25rem;
            }
          }
        }
      }
    }
  }
`;
