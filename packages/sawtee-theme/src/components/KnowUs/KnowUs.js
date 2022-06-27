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
import Link from "../link";
import { HiOutlineExternalLink, HiOutlineLink } from "react-icons/hi";
import Accordian from "../reusable/accordian/accordian";

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

  const Members = [
    {
      country: "Bangladesh",
      institutions: [
        {
          name: "Bangladesh Environmental Lawyers’ Association (BELA), Dhaka",
          link: "http://www.belabangla.org/",
        },
        {
          name: "Unnayan Shamannay, Dhaka",
          link: "https://www.unsy.org/",
        },
      ],
    },
    {
      country: "India",
      institutions: [
        {
          name: "Citizen consumer and civic Action Group (CAG), Chennai",
          link: "http://www.cag.org.in/",
        },
        {
          name: "Consumer Unity & Trust Society (CUTS), Jaipur",
          link: "http://www.cuts-international.org/",
        },
        {
          name: "Development Research and Action Group (DRAG), New Delhi",
          link: "https://dragindia.org/",
        },
      ],
    },
    {
      country: "Nepal",
      institutions: [
        {
          name: "Society for Legal and Environmental Analysis and Development Research (LEADERS), Kathmandu",
          link: "http://leadersnepal.org.np/",
        },
        {
          name: "Forum for Protection of Public Interest (Pro Public), Kathmandu",
          link: "http://www.propublic.org/",
        },
      ],
    },
    {
      country: "Pakistan",
      institutions: [
        {
          name: "Journalists for Democracy and Human Rights (JDHR), Islamabad",
          link: "http://www.jdhr.org/",
        },
        {
          name: "Sustainable Development Policy Institute (SDPI), Islamabad",
          link: "http://www.sdpi.org/",
        },
      ],
    },
    {
      country: "Sri Lanka",
      institutions: [
        {
          name: "Institute of Policy Studies (IPS), Colombo",
          link: "http://www.ips.lk/",
        },
        {
          name: "Law & Society Trust (LST), Colombo",
          link: "https://lstlanka.org/",
        },
      ],
    },
  ];

  const Strategies = [
    {
      id: 1,
      name: "Policy Research",
      content: `
        <p>Realizing the capacity and resource constraints faced by South Asian NGOs to conduct research on various policy issues; come out with policy recommendations; and prepare well-argued advocacy strategy, SAWTEE, together with its member institutions and academics of the region, conducts policy research on issues such as World Trade Organization (WTO) rules, regional cooperation, intellectual property rights (IPRs), competition policy, farmers’ rights, climate change and development dimension of trade liberalization. The research findings are widely disseminated among South Asian as well as international audiences comprising, inter alia, trade negotiators, NGOs, the media, the academia, research institutions, international and regional inter-governmental organizations and the donor community, in English as well as various South Asian vernaculars. </p>
        <p>Policy research conducted by SAWTEE includes: &nbsp;</p>
        <ul><li>Mechanism for pruning the sensitive list under SAFTA </li><li>Trade and climate change in the context of South Asia</li><li>Traditional health services in South Asia</li><li>Liberalization of services trade in South Asia </li><li>Mechanisms for protecting farmers’ rights to livelihood in the Hindu-Kush Himalayan Region </li><li>Positive trade agenda for South Asian LDCs</li><li>Agricultural liberalization in South Asia </li><li>Gender implications of Nepal’s accession to the WTO&nbsp;								</li></ul>
        `,
    },
    {
      id: 2,
      name: "Advocacy",
      content: `
        <p>SAWTEE conducts various programmes advocating the cause of social justice and economic equity in the context of globalization and liberalization in general and trade liberalization in particular. SAWTEE and its member institutions organize conferences, seminars, policy dialogues, consultation meetings, talk programmes, monthly forums and interaction programmes at regular intervals to achieve this objective. The advocacy at the policy level is also supplemented by publication and distribution of policy briefs, briefing papers and issue papers on relevant issues on a timely manner.</p>
        <p>Successful advocacy campaigns of SAWTEE and its member institutions include:</p>
        <ul><li>Adoption of the concept of regional “seed bank” as an instrument for protecting food security in South Asia, which is reflected in the Declaration adopted by the 16th Summit of the South Asian Association for Regional Cooperation (SAARC) held in Bhutan in April 2010. </li><li>Convincing the Government of Nepal to preserve policy space required for achieving its development objectives in the process of signing Trade and Investment Framework Agreement (TIFA) with the United States. &nbsp;</li><li>Convincing the Government of Nepal to preserve the policy space required for achieving its development objectives in the process of the country’s accession to the WTO. </li><li>Convincing South Asian governments not to join the International Union for the Protection of New Varieties of Plant (UPOV), which could be detrimental to the interest of nearly 800 million farmers in the region. </li></ul>
      `,
    },
    {
      id: 3,
      name: "Capacity Building",
      content: `
        <p>Recognizing the need to build the capacity of the concerned stakeholders in South Asia so as to better equip them with information and advocacy tools to provide adequate safety nets for the protection of poor, marginalized and vulnerable communities and people through enhanced regional and international cooperation, SAWTEE conducts capacity-building activities at various levels. Training workshops, monthly forums, information dissemination, internship programmes, etc., are the major vehicles through which SAWTEE builds the capacity of its member institutions, network institutions and other NGOs.</p>\
        <p>Some of the capacity-building efforts of SAWTEE and its member institutions include:</p>
        <ul><li>Training of South Asian Economic Journalists on WTO issues and subsequent formation of South Asian Centre for Economic Journalists (SACEJ).</li><li>Training of South Asian researchers on Computable General Equilibrium (CGE) modelling for three consecutive years since 2008. </li><li>Creating a batch of young WTO practitioners from South Asia, through continuous training to the same group of people for eight years (between 1997 and 2004). </li><li>Capacity building of Nepali customs officials on Nepal’s obligations under multilateral, regional and bilateral trade agreements.&nbsp; </li><li>Capacity building of Nepal's Ministry of Commerce and Supplies (MoCS) on emerging trade issues. </li><li>Capacity building of Nepali trade negotiators on issues and modalities of negotiations of SAARC Framework Agreement on Services (SAFAS). </li></ul>
      `,
    },
    {
      id: 4,
      name: "Sensitization",
      content: `
        <p>To inform, educate and provoke action from a wide readership, SAWTEE and its member institutions regularly publish briefing papers on issues related to globalization, liberalization, multilateral trading system, regional cooperation, competition policy, environment, IPRs, food security, farmers’ rights, etc. SAWTEE also publishes a quarterly magazine titled Trade Insight in which it includes analytical articles on contemporary trade and sustainable development issues. Besides, office bearers and staff members of SAWTEE as well as those of its member institutions publish articles on contemporary issues and agenda pursued by SAWTEE, in national, regional and international newspapers, magazines and journals.</p>
        <p>Successful sensitization programmes conducted by SAWTEE and its member institutions include:</p>
        <ul><li>Sensitization of consumers on the role they need to play in the regulation of electricity.</li><li>Sensitization of foreign ministry officials of South Asia through the publication of special briefs prior to the 16th SAARC Summit. </li><li>Sensitization of Member of Parliaments of Nepal and Pakistan on trade and development issues. </li><li>Sensitization of farmers and indigenous communities on their rights under the Convention of Biological Diversity (CBD) and the International Treaty on Plant Genetic Resources for Food and Agriculture (ITPGRFA), and how to protect these rights in the context of the attempt at ratcheting up intellectual property protection under the WTO's Agreement on Trade-Related Aspects of Intellectual Property Rights (TRIPS) and IPR provisions included in various bilateral and regional trade arrangements. </li></ul>
      `,
    },
    {
      id: 5,
      name: "Networking and alliance building",
      content: `
        <p>SAWTEE as well as its member institutions are active members of various national, regional and international alliances. By virtue of this networking, they are involved in collective efforts to realize the objective of fair trade and equitable development in the region. SAWTEE has established network linkages with the media, the academia and research institutions at national, regional and international levels, and seeks and obtains critical inputs from them. At the international level, SAWTEE has established close institutional linkages with ActionAid, London, Bangkok and Kathmandu; Centre for International Environmental Law (CIEL), Geneva; Centre for Policy Dialogue (CPD), Dhaka; Consumers International (CI), London and Kuala Lumpur; EU-LDC Network, Rotterdam; Friedrich Ebert Stiftung (FES), Germany and Kathmandu; Gene Campaign, New Delhi; Institute of Agriculture and Trade Policy (IATP), Minneapolis; International Centre for Trade and Sustainable Development (ICTSD), Geneva; International Plant Genetic Resources Institute (IPGRI), Rome; International Development Research Centre (IDRC), Ottawa; Local Initiatives for Biodiversity, Research and Development (LI-BIRD), Pokhara; MS Swaminathan Research Foundation (MSSRF), Chennai; Novib, The Hague; Oxfam, New Delhi; Southern and Eastern African Trade Information and Negotiations Institute (SEATINI), Harare; Southeast Asian Council for Food Security & Fair Trade (SEACON), Kuala Lumpur; The World Conservation Union (IUCN), Kathmandu; United Nations Conference on Trade and Development (UNCTAD), Geneva and New Delhi; Wageningen University, Wageningen; World Trade Institute (WTI), Berne; and World Trade Organisation (WTO), Geneva, among others. </p>
      `,
    },
  ];

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
            <Section id="Genesis">
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
            <Section id="registration">
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
            <Section id="VGO">
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
              <Accordian data={Strategies} />
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

              {Members.map(({ country, institutions }, i) => {
                return (
                  <div key={country}>
                    <h3>{country}</h3>
                    <ol className="members-list">
                      {institutions.map((item, i) => {
                        return (
                          <li key={i} className="members-list-item">
                            <ExternalLink link={item.link} target="__blank">
                              {item.name}
                              <HiOutlineExternalLink className="link-icon" />
                            </ExternalLink>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                );
              })}
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
  padding: 4rem 2rem 0;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  height: 390px;
  @media (min-width: 700px) {
    padding: 8rem 4rem 0;
  }
  > div {
    position: absolute;
    display: flex;
    justify-content: flex-start;
    margin: 0;
    width: 100%;

    @media (min-width: 992px) {
      h1 {
        width: 80rem;
      }
    }

    > h1 {
      color: #fff;
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

  > div {
    position: relative;
    width: 100% !important;
    max-width: 100%;
    margin: 0;
    height: 390px;
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
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Section = styled.section`
  display: block;
  margin: 4rem auto;

  h2 {
    color: #292524;
  }
  h3 {
    color: #4b5563;
  }

  & p,
  ul {
    font-weight: bold;
    color: #404040;
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
    color: #006181;
    cursor: pointer;
    background-color: transparent;
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
    background: transparent;
    align-self: center;
    padding: 3.5rem;
    background: #dcdcdc;
    box-shadow: inset 10px 10px 15px #bbbbbb, inset -10px -10px 15px #fdfdfd;
    & p,
    ul {
      margin: 0;
    }
  }

  .tabs input[type="radio"] {
    display: none;
  }

  .tabs input[type="radio"]:checked + label {
    background: #006181;
    border: none;
    color: #fff;
  }

  .tabs input[type="radio"]:checked + label + .tab {
    display: block;
    margin-top: 2rem;
  }
`;

const ExternalLink = styled(Link)`
  text-decoration: none;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-style: dotted;
    text-decoration-color: #000;
  }

  & .link-icon {
    justify-self: flex-end;
  }
`;
