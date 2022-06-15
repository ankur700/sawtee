import { css, styled } from "frontity";
import Link from "../link";

const TwitterTimeline = ({ height, width, handle }) => {
  let link = `https://twitter.com/${handle}?ref_src=twsrc%5Etfw`;

  return (
    <TwitterEmbed
      className="twitter-timeline"
      data-lang="en"
      data-width={width}
      data-height={height}
      // data-dnt="true"
      href={link}
    >
      Track SAWTEE on twitter
    </TwitterEmbed>
  );
};

export default TwitterTimeline;

const TwitterEmbed = styled.a``;
