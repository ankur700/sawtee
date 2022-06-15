import { styled } from "frontity";
import Link from "../../link";

const PrimaryMenuLink = ({ link, ariaCurrent, text }) => {
  return (
    <MenuLink link={link} aria-current={ariaCurrent} text={text}>
      {text}
    </MenuLink>
  );
};

const MenuLink = styled(Link)`
  display: block;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  padding: 0.5rem 1rem;
  --c: #006181; /* the color  */
  --h: 1.8em; /* the height */
  line-height: var(--h);
  color: #0000;
  overflow: hidden;
  text-shadow: 0 calc(-1 * var(--h) * var(--_i, 0)) var(--c),
    0 calc(var(--h) * (1 - var(--_i, 0))) #fff;
  background: linear-gradient(var(--c) 0 0) no-repeat
    calc(200% - var(--_i, 0) * 100%) 100% / 200%
    calc(100% * var(--_i, 0) + 0.05em);
  transition: 0.3s calc(var(--_i, 0) * 0.3s),
    background-position 0.3s calc(0.3s - calc(var(--_i, 0) * 0.3s));

  &:hover,
  &[aria-current="page"] {
    --_i: 1;
  }
`;

export default PrimaryMenuLink;
