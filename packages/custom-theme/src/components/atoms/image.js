import { styled } from "frontity";

const Image = ({ src, alt, height, width }) => {
  return <CustomImage src={src} alt={alt} />;
};

const CustomImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default Image;
