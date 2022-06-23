import { styled, connect } from "frontity";
import { useEffect } from "react";
import FeaturedMedia from "../page/featured-media";
import {
  EntryContent,
  Post as _Post,
  PostHeader,
  PostInner,
  PostTitle,
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
const KnowUs = ({ state, actions, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  // Get the data of the post.
  const post = state.source[data.type][data.id];

  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  // Get all categories
  const allCategories = state.source.category;

  /**
   * The item's categories is an array of each category id. So, we'll look up
   * the details of each category in allCategories.
   */
  const categories =
    post.categories && post.categories.map((catId) => allCategories[catId]);

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
          <PostTitle
            as="h1"
            className="heading-size-1"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </SectionContainer>
      </Header>

      {/* If the post has content, we render it */}
      {post.content && (
        <PostInner size="thin">
          <EntryContent>
            {/* <Html2React html={post.content.rendered} /> */}
            <Section>
              <h2>Genesis</h2>
              <p>
                Beginning the mid-1980s, most countries, across all regions of
                the world, started to rapidly embark on the path of
                globalization and liberalization. The global wave of
                globalization and liberalization also created a compelling
                situation for South Asian countries to follow suit. This led
                South Asian governments and stakeholders alike to design
                strategies and implement measures that enhance their capacities
                to benefit from regional and global integration, and respond to
                the adverse implications of globalization for their economies.
              </p>

              <p>
                In order to complement the efforts of South Asian governments
                and stakeholders, and to bring to the fore the views and
                concerns of the marginalized and poor segments of society, South
                Asia Watch on Trade, Economics and Environment (SAWTEE) was
                launched in 1994 as a loose regional network of non-governmental
                organizations (NGOs) from five South Asian countries:
                Bangladesh, India, Nepal, Pakistan and Sri Lanka. Taking into
                consideration the emerging need for fair, effective and
                meaningful integration of South Asian countries into the
                regional as well as global economies, the major motto of this
                regional initiative has been “GLOBALIZATION YES, BUT WITH SAFETY
                NETS”.
              </p>

              <p>
                From 1994 to 1997, its secretariat was housed in Kolkata, India
                at the office of Consumer Unity & Trust Society (CUTS), a
                founding member institution of the network. With the emergence
                of consensus among network members, in 1997, SAWTEE's
                secretariat was moved to Kathmandu, Nepal. Since then, SAWTEE
                has strengthened its activities ranging from sensitization and
                awareness raising to independent and concrete policy research,
                capacity building and advocacy on trade, economic and
                environmental issues at local, national, regional and
                international levels.
              </p>
            </Section>
            <Section>
              <h2>Registration and Recognition</h2>
              <p>
                SAWTEE was registered with the District Administration Office,
                Kathmandu, Nepal to operate as a non-profit, NGO in 1999. Due to
                its research capacity, policy outreach and developmental
                impacts, the organization has been growingly recognized as a
                think tank at local, national, regional and global levels.
                SAWTEE is also recognized in the capacity of a secretariat of a
                national network of Nepal-based national and international NGOs
                called National Alliance for Food Security in Nepal (NAFOS); a
                global network of civil society organizations (CSOs) working on
                biodiversity management and farmers rights issues called Farmers
                Rights Advocacy Network (FRANK); and a global network of
                least-developed countries (LDCs) established for the economic
                transformation of LDCs, called Least Developed Countries Network
                for Economic Transformation (LDC-NET). Its members and staff
                have served/been serving on the board of various international
                and national agencies working on trade, development, farmers
                rights and food security issues.
              </p>
            </Section>
            <Section>
              <h2>Vision, Goal and Objectives</h2>
              <div className="tabs">
                <input
                  type="radio"
                  name="tabs"
                  id="tabone"
                  defaultChecked="checked"
                />
                <label htmlFor="tabone">Vision</label>
                <div className="tab">
                  <p>
                    Ensuring fair, equitable, inclusive, and sustainable growth
                    and development in South Asia.
                  </p>
                </div>

                <input type="radio" name="tabs" id="tabtwo" />
                <label htmlFor="tabtwo">Goal</label>
                <div className="tab">
                  <p>
                    Enabling stakeholders, particularly the poor and
                    marginalized, to derive net benefits from changing political
                    economy and environmental landscapes.
                  </p>
                </div>

                <input type="radio" name="tabs" id="tabthree" />
                <label htmlFor="tabthree">Objectives</label>
                <div className="tab">
                  <ul>
                    <li>
                      To equip stakeholders with knowledge, information and
                      skills to represent their interests and assert their
                      rights to development.
                    </li>
                    <li>
                      To contribute to fair, equitable, inclusive, and
                      sustainable growth and development for a society directed
                      towards poverty reduction, food security and environmental
                      sustainability.
                    </li>
                    <li>
                      To contribute to informed and participatory policy-making
                      and implementation for fair, equitable, inclusive, and
                      sustainable growth and development.
                    </li>
                    <li>
                      To contribute to enhancing meaningful participation of
                      South Asian countries, particularly the least-developed
                      and landlocked, in and their integration into the
                      sub-regional, regional and multilateral trade, economic
                      and environmental systems.
                    </li>
                    <li>
                      To contribute to strengthening regional cooperation in
                      South Asia.
                    </li>
                  </ul>
                </div>
              </div>
            </Section>
            <Section>
              <h2>Strategies</h2>
              <ul>
                <li>
                  <a>Policy research</a>
                </li>
                <li>
                  <a>Advocacy</a>
                </li>
                <li>
                  <a>Capicity Building</a>
                </li>
                <li>
                  <a>Sensitization</a>
                </li>
                <li>
                  <a>Networking and alliance building</a>
                </li>
              </ul>
            </Section>
            <Section>
              <h2>Resources</h2>
              <p>
                SAWTEE has been sustaining itself through membership fees and
                contributions, sales proceeds of its publications and support
                from development partners. SAWTEE has received support from,
                among others, the following development partners:
              </p>
              <ul>
                <li>ActionAid, Kathmandu and Bangkok</li>
                <li>The Asia Foundation, Kathmandu</li>
                <li>CARITAS, Kathmandu</li>
                <li>Development Fund, Oslo</li>
                <li>Department for International Development, Kathmandu</li>
                <li>Friedrich Ebert Stiftung, New Delhi and Kathmandu</li>
                <li>Ford Foundation, New Delhi</li>
                <li>
                  International Centre for Integrated Mountain Development
                  (ICIMOD), Kathmandu
                </li>
                <li>
                  International Development Research Centre (IDRC), Ottawa
                </li>
                <li>MS Nepal, Kathmandu</li>
                <li>Oxfam Novib, The Hague</li>
                <li>
                  United Nations Conference on Trade and Development (UNCTAD),
                  Geneva
                </li>
                <li>
                  United Nations Development Programme (UNDP), Kathmandu,
                  Regional Centre in Colombo and Regional Centre in Bangkok
                </li>
                <li>
                  United Nations Fund for Women (UNIFEM) Regional Office, New
                  Delhi
                </li>
                <li>USC Canada, Kathmandu</li>
              </ul>
            </Section>
            <Section>
              <h2>Member Institutions</h2>
              <h3>Bangladesh</h3>
              <ol>
                <li>
                  <a href="http://www.belabangla.org/">
                    Bangladesh Environmental Lawyers’ Association (BELA), Dhaka
                  </a>
                </li>
                <li>
                  <a href="https://www.unsy.org/">Unnayan Shamannay, Dhaka</a>
                </li>
              </ol>
              <h3>India</h3>
              <ol>
                <li>
                  <a href="http://www.cag.org.in">
                    Citizen consumer and civic Action Group (CAG), Chennai
                  </a>
                </li>
                <li>
                  <a href="http://www.cuts-international.org">
                    Consumer Unity &amp; Trust Society (CUTS), Jaipur
                  </a>
                </li>
                <li>
                  <a href="https://dragindia.org/">
                    Development Research and Action Group (DRAG), New Delhi
                  </a>
                </li>
              </ol>
              <h3>Nepal</h3>
              <ol>
                <li>
                  <a href="http://leadersnepal.org.np/">
                    Society for Legal and Environmental Analysis and Development
                    Research (LEADERS), Kathmandu
                  </a>
                </li>
                <li>
                  <a href="http://www.propublic.org">
                    Forum for Protection of Public Interest (Pro Public),
                    Kathmandu
                  </a>
                </li>
              </ol>
              <h3>Pakistan</h3>
              <ol>
                <li>
                  <a href="http://www.jdhr.org">
                    Journalists for Democracy and Human Rights (JDHR), Islamabad
                  </a>
                </li>
                <li>
                  <a href="http://www.sdpi.org">
                    Sustainable Development Policy Institute (SDPI), Islamabad
                  </a>
                </li>
              </ol>
              <h3>Sri Lanka</h3>
              <ol>
                <li>
                  <a href="http://www.ips.lk">
                    Institute of Policy Studies (IPS), Colombo
                  </a>
                </li>
                <li>
                  <a href="https://lstlanka.org/">
                    Law &amp; Society Trust (LST), Colombo
                  </a>
                </li>
              </ol>
            </Section>
          </EntryContent>
        </PostInner>
      )}
    </PostArticle>
  ) : null;
};

export default connect(KnowUs);

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

const Section = styled.section`
  display: block;
  margin: 4rem auto;

  & p {
    font-weight: 600 !important;
  }

  .tabs {
    display: flex;
    flex-wrap: wrap;
    height: auto;
    width: 100%;
  }

  .tabs label {
    order: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 2rem;
    margin-right: 0.2rem;
    cursor: pointer;
    background-color: #fff;
    font-weight: bold;
    transition: background ease 0.3s;
    border: 1px solid #000;
  }

  .tabs .tab {
    order: 9;
    flex-grow: 1;
    width: 100%;
    height: 100%;
    display: none;
    padding: 1rem;
    background: #fff;
    padding: 20px;
    box-shadow: -10px 10px 0px 0px rgba(0, 0, 0, 1);
    & p {
      margin: 0;
    }
  }

  .tabs input[type="radio"] {
    display: none;
  }

  .tabs input[type="radio"]:checked + label {
    background: #006181;
    border: none;
  }

  .tabs input[type="radio"]:checked + label + .tab {
    display: block;
    margin-top: 2rem;
  }
`;
