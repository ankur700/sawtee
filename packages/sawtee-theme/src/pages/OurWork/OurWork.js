import { styled, connect } from "frontity";
import { useEffect } from "react";
import FeaturedMedia from "../../components/page/featured-media";
import {
  Post as _Post,
  PostHeader,
  PostTitle,
  PostCaption,
  SectionContainer,
} from "../../components/page/post-item";
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
                  <li className="heading-size-6" key={index}>
                    <a href={theme.href}>{theme.name}</a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="intro">
            {/* <div className="blob"> </div> */}
            <p className="heading-size-5">
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

    & .top-section {
      padding: 2rem;
      margin-bottom: 2rem;
      border-radius: 15px;
      background: #dcdcdc;
      box-shadow: inset 10px 10px 15px #bbbbbb, inset -10px -10px 15px #fdfdfd;
      backdrop-filter: blur(15px);
      // position: sticky;
      // top: 12rem;
      // z-index: 99;

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
          text-align: center;
          // font-family: cursive;
          font-size: 1.6rem;
          margin: 0;

          & a {
            text-decoration: none;
            color: #555;
            font-weight: normal;
            letter-spacing: 0.1rem;

            &:hover {
              color: #222;
            }
          }
        }
      }
    }
    & .intro {
      background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

      padding: 2rem 4rem;
      margin: 2rem auto;
      text-align: left;
      color: #1f2937;
      border-radius: 15px;
      font-size: 2.25rem;
      position: relative;

      p {
        font-family: "Hoefler Text", Garamond, "Times New Roman", serif;
        text-align: justify;
        font-weight: 500;
        line-height: 1.5;
      }
    }

    & .cards {
      display: flex;
      gap: 0.5rem;
      margin: 2rem 0;
      justify-content: center;
      @media (max-width: 900px) {
        flex-direction: column;
        > .card {
          width: 100% !important;
        }
      }

      & .card {
        position: relative;
        border-radius: 20px;
        max-width: 700px;
        width: 40%;
        height: 500px;
        border: 3px solid #000;
        overflow: hidden;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        background-blend-mode: multiply;
        background-color: darkgrey;
        @media (min-width: 900px) {
          width: 50%;
        }

        & div {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          // font-family: "Poppins", sans-serif;
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
            color: #000;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: justify;
            margin: 0;
            font-size: 2.25rem;

            @media (max-width: 1140px) {
              font-size: 1.75rem;
            }
          }
        }
      }
    }
  }
`;
