import { Box, useColorModeValue } from "@chakra-ui/react";
import { connect, styled } from "frontity";
import React, { useEffect } from "react";
import { formatPostData, getPostData } from "../../helpers";
import useScrollProgress from "../../hooks/useScrollProgress";
import { LightPatternBox } from "../../styles/pattern-box";
import Section from "../../styles/section";
import PostProgressBar from "./post-progressbar";
import Script from "@frontity/components/script";

const NewsletterPost = ({ state }) => {
  const postData = getPostData(state);
  const post = formatPostData(state, postData);
  const patternBoxColor = useColorModeValue("whiteAlpha.700", "gray.700");
  const sectionBg = useColorModeValue("whiteAlpha.700", "gray.700");
  // Get the html2react component.

  // Once the post has loaded in the DOM, prefetch both the
  // home posts and the list component so if the user visits
  // the home page, everything is ready and it loads instantly.

  const [ref, scroll] = useScrollProgress();

  // Load the post, but only if the data is ready.
  if (!postData.isReady) return null;

  return (
    <LightPatternBox
      className="single_newsletter_page"
      bg={patternBoxColor}
      showPattern={state.theme.showBackgroundPattern}
      ref={ref}
      pt="0"
      pb={"40px"}
    >
      <Script src="https://documentcloud.adobe.com/view-sdk/main.js" async />
      {!postData.isPage && <PostProgressBar value={scroll} />}

      {/* Look at the settings to see if we should include the featured image */}
      <Section bg={sectionBg} pt="0px" size="lg">
        <PDFEMBED url={post.acf.resource_link} title={post.title} />
      </Section>
    </LightPatternBox>
  );
};

export default connect(NewsletterPost);

const PDFEMBED = ({ url, title }) => {
  const viewerConfig = {
    embedMode: "IN_LINE",
    showDownloadPDF: true,
  };

  useEffect(() => {
    document.addEventListener("adobe_dc_view_sdk.ready", function () {
      /* Initialize the AdobeDC View object */
      var adobeDCView = new AdobeDC.View({
        clientId: "a0b938dc0dda4ceba3ce648ec3caeb6a",
        divId: "adobe-dc-view",
      });
      adobeDCView.previewFile(
        {
          content: {
            location: {
              url: url,
            },
          },
          metaData: {
            fileName: title,
          },
        },
        viewerConfig
      );
    });
  }, []);

  return (
    <div>
      {/* <Script src="https://documentcloud.adobe.com/view-sdk/main.js" async /> */}
      <Box
        id="adobe-dc-view"
        className="full-window-div"
        style={{ width: "100%", height: "100vh", margin: "0 auto" }}
      ></Box>
    </div>
  );
};


// This component is the parent of the `content.rendered` HTML. We can use nested
// selectors to style that HTML.
const Content = styled.div`
  word-break: break-word;

  p {
    margin-inline: auto;
    width: max-content;
  }

  ul {
    padding: 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
  }

  h4 {
    font-size: 1.225rem;
  }

  h5 {
    font-size: 1.125rem;
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  figure {
    margin: 24px auto;
    /* next line overrides an inline style of the figure element. */
    width: 100% !important;
  }

  iframe {
    display: block;
    margin: auto;
  }

  /* Input fields styles */

  input[type="text"],
  input[type="email"],
  input[type="url"],
  input[type="tel"],
  input[type="number"],
  input[type="date"],
  textarea,
  select {
    display: block;
    padding: 6px 12px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 4px;
    outline-color: transparent;
    transition: outline-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin: 8px 0 4px 0;

    &:focus {
      outline-color: #1f38c5;
    }
  }

  input[type="submit"] {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid #1f38c5;
    padding: 12px 36px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
    color: #fff;
    background-color: #1f38c5;
  }

  /* WordPress Core Align Classes */

  @media (min-width: 420px) {
    img.aligncenter,
    img.alignleft,
    img.alignright {
      width: auto;
    }

    .aligncenter {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .alignright {
      float: right;
      margin-left: 24px;
    }

    .alignleft {
      float: left;
      margin-right: 24px;
    }
  }
`;
