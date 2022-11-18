import { styled } from "frontity";

const TwitterTimeline = ({ height, width, handle }) => {
  let link = `https://twitter.com/${handle}?ref_src=twsrc%5Etfw`;

  return (
    <TwitterEmbed>
      <a
        className="twitter-timeline"
        data-lang="en"
        data-width={width}
        data-height={height}
        data-dnt="true"
        href={link}
      >
        Track SAWTEE on twitter
      </a>
    </TwitterEmbed>
  );
};

export default TwitterTimeline;

const TwitterEmbed = styled.div`
  display: flex;
  padding: 1.25rem;
  background-color: #fff;
  border-radius: 1.25rem;
  width: 100%;
  justify-content: center;
`;
