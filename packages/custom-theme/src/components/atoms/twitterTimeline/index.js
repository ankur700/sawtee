import { styled } from "frontity";
import { Link } from "@chakra-ui/react";
// import GlassBox from "../glassBox";

const TwitterTimeline = ({ height, width, handle }) => {
  let link = `https://twitter.com/${handle}?ref_src=twsrc%5Etfw`;

  return (
    <Link
      className="twitter-timeline"
      data-lang="en"
      data-width={width}
      data-height={height}
      data-dnt="true"
      href={link}
    >
      Track SAWTEE on twitter
    </Link>
  );
};

export default TwitterTimeline;
