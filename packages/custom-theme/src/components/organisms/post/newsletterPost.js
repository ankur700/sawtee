import { Box, useColorModeValue } from "@chakra-ui/react";
import { connect } from "frontity";
import React, { useEffect } from "react";
import { formatPostData, getPostData } from "../../helpers";
import Section from "../../styles/section";
import Script from "@frontity/components/script";

const NewsletterPost = ({ state }) => {
  const post = formatPostData(state, getPostData(state));
  const sectionBg = useColorModeValue("whiteAlpha.700", "gray.700");

  return (
    <Section bg={sectionBg} pt="0px" size="lg">
      <Script src="https://documentcloud.adobe.com/view-sdk/main.js" async />
      <PDFEMBED url={post.acf.resource_link} title={post.title} />
    </Section>
  );
};

export default connect(NewsletterPost);

const PDFEMBED = ({ url, title }) => {
  const viewerConfig = {
    embedMode: "IN_LINE",
    defaultViewMode: "CONTINUOUS",
    showDownloadPDF: true,
    showPrintPDF: true,
  };

  useEffect(() => {
    document.addEventListener("adobe_dc_view_sdk.ready", function () {
      /* Initialize the AdobeDC View object */
      const adobeDCView = new AdobeDC.View({
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
      <Box
        id="adobe-dc-view"
        className="full-window-div"
        style={{ width: "100%", height: "100vh", margin: "0 auto" }}
      ></Box>
    </div>
  );
};


