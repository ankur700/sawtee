import { styled } from "frontity";

const GridBlog = () => {
  return (
    <>
      <Band className="band">
        <div className="item-1">
          <Card href="#" className="card">
            <div
              className="thumb"
              style={{
                backgroundImage: `url(
                    https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/flex-1.jpg
                  )`,
              }}
            ></div>
            <article>
              <h1>International Artist Feature: Malaysia</h1>
              <span>Mary Winkler</span>
            </article>
          </Card>
        </div>
        <div className="item-2">
          <Card href="#" className="card">
            <div
              className="thumb"
              style={{
                backgroundImage: `url(
                    https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/users-2.png
                  )`,
              }}
            ></div>
            <article>
              <h1>How to Conduct Remote Usability Testing</h1>
              <p>
                Welcome to our monthly feature of fantastic tutorial results
                created by you, the Envato Tuts+ community!{" "}
              </p>
              <span>Harry Brignull</span>
            </article>
          </Card>
        </div>
        <div className="item-3">
          <Card href="#" className="card">
            <div
              className="thumb"
              style={{
                backgroundImage: `url(
                    https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/flex-5.jpg
                  )`,
              }}
            ></div>
            <article>
              <h1>Created by You, July Edition</h1>
              <p>
                Welcome to our monthly feature of fantastic tutorial results
                created by you, the Envato Tuts+ community!{" "}
              </p>
              <span>Melody Nieves</span>
            </article>
          </Card>
        </div>
        <div className="item-4">
          <Card href="#" className="card">
            <div
              className="thumb"
              style={{
                backgroundImage: `url(
                    https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/landing.png
                  )`,
              }}
            ></div>
            <article>
              <h1>How to Code a Scrolling “Alien Lander” Website</h1>
              <p>
                We’ll be putting things together so that as you scroll down from
                the top of the page you’ll see an “Alien Lander” making its way
                to touch down.
              </p>
              <span>Kezz Bracey</span>
            </article>
          </Card>
        </div>
        <div className="item-5">
          <Card href="#" className="card">
            <div
              className="thumb"
              style={{
                backgroundImage: ` url(
                    https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/strange.jpg
                  )`,
              }}
            ></div>
            <article>
              <h1>
                How to Create a “Stranger Things” Text Effect in Adobe Photoshop
              </h1>
              <p>
                Welcome to our monthly feature of fantastic tutorial results
                created by you, the Envato Tuts+ community!{" "}
              </p>
              <span>Rose</span>
            </article>
          </Card>
        </div>
        <div className="item-6">
          <Card href="#" className="card">
            <div
              className="thumb"
              style={{
                backgroundImage: `url(
                    https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/flor.jpg
                  )`,
              }}
            ></div>
            <article>
              <h1>
                5 Inspirational Business Portraits and How to Make Your Own
              </h1>
              <p>
                Welcome to our monthly feature of fantastic tutorial results
                created by you, the Envato Tuts+ community!{" "}
              </p>

              <span>Marie Gardiner</span>
            </article>
          </Card>
        </div>
        <div className="item-7">
          <Card href="#" className="card">
            <div
              className="thumb"
              style={{
                backgroundImage: `url(
                    https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/china.png
                  )`,
              }}
            ></div>
            <article>
              <h1>
                Notes From Behind the Firewall: The State of Web Design in China
              </h1>
              <p>
                Welcome to our monthly feature of fantastic tutorial results
                created by you, the Envato Tuts+ community!{" "}
              </p>
              <span>Kendra Schaefer</span>
            </article>
          </Card>
        </div>
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

      & h1 {
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

  // sets up hover state
  position: relative;
  top: 0;
  transition: all 0.1s ease-in;

  &:hover {
    top: -2px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  }

  &:hover article > h1 {
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
  }

  & h1 {
    font-size: 20px;
    margin: 0;
    color: #333;
    line-height: 1.4;
  }

  & p {
    // flex: 1;
    line-height: 1.4;
    margin: 0;
  }

  & span {
    font-size: 12px;
    font-weight: bold;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 2em 0 0 0;
  }

  & .thumb {
    padding-bottom: 60%;
    background-size: cover;
    background-position: center center;
  }
`;
