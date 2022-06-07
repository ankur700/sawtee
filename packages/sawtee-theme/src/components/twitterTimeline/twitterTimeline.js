import { css, styled } from "frontity";

const TwitterTimeline = ({ height, width, handle }) => {
  let link = `https://twitter.com/${handle}?ref_src=twsrc%5Etfw`;

  return (
    <>
      <a
        className="twitter-timeline"
        data-lang="en"
        data-width={width}
        data-height={height}
        data-dnt="true"
        href={link}
      >
        Tweets by SAWTEE
      </a>
    </>
  );
};

export default TwitterTimeline;
