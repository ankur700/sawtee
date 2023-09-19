import { connect } from "frontity";
import Section from "../../../styles/section";

import { formatPostData } from "../../../helpers";
import { PageSection } from "./pageSection";
import { Members } from "./members";
import { Content } from "../../../atoms/content";

const KnowUs = ({ state, data, libraries }) => {
  const post = formatPostData(state, data);
  const Html2React = libraries.html2react.Component;
  const linkColor = state.theme.colors.linkColor;
  const sections = post?.acf.sections || null;
  const memberInstitutions = post?.acf.memberInstitutions || null;

  return (
    <Content
      className="page_content"
      as={Section}
      px={{ base: "32px", md: "0" }}
      py={32}
      size="md"
      fontSize={{ base: "md", lg: "lg" }}
    >
      {sections !== null &&
        sections.map((section) => (
          <PageSection
            key={section.title}
            Html2React={Html2React}
            section={section}
          />
        ))}
      {memberInstitutions !== null && (
        <Members
          memberInstitutions={memberInstitutions}
          linkColor={linkColor}
        />
      )}
    </Content>
  );
};

export default connect(KnowUs);
