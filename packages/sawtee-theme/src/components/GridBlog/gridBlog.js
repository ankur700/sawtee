import { styled } from "frontity";

const GridBlog = ({ data }) => {
  return (
    <>
      <Band className="band">
        {data?.map((article, i) => {
          return (
            <div key={article.id} className={"item-" + (i + 1)}>
              <Card href="#" className="card">
                <div
                  className="thumb"
                  style={{
                    backgroundImage: `url(
                    ${article.imageUrl}
                  )`,
                  }}
                ></div>
                <article>
                  <h3>{article.title}</h3>
                  {article.excerpt ? <p>{article.excerpt}</p> : null}
                  <span>{article.date}</span>
                </article>
              </Card>
            </div>
          );
        })}
      </Band>
    </>
  );
};

export default GridBlog;

const Band = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 20px;

  & .item-1 {
    @media (min-width: 60em) {
      grid-column: 1 / span 2;

      & h3 {
        font-size: 24px;
      }
    }
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Card = styled.a`
  background: white;
  text-decoration: none;
  color: #444;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-height: 100%;
  overflow: hidden;

  // sets up hover state
  position: relative;
  top: 0;

  &:hover {
    top: -2px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
    transition: all 0.1s ease-in;
  }

  &:hover article > h3 {
    text-decoration: underline;
    // text-decoration-style: wavy;
    text-decoration-offset: 3px;
    transition: text-decoration 0.3s ease;
  }

  & article {
    padding: 20px;
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.5rem;

    & h3 {
      font-size: 20px;
      margin: 0;
      color: #333;
      line-height: 1.4;
    }

    & p {
      line-height: 1.4;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    & span {
      font-size: 12px;
      font-weight: bold;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 2em 0 0 0;
    }
  }

  & .thumb {
    padding-bottom: 60%;
    background-size: cover;
    background-position: center center;

    &:hover {
      transform: scale(1.08);
      transition: transform 0.4s ease-out;
    }
  }
`;
