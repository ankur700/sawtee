import { Link } from "@chakra-ui/react";
import Title from "../../atoms/title";

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
      <Title text={"Track SAWTEE on TWITTER"} />
    </Link>
  );
};

export default TwitterTimeline;
