// import { connect } from "frontity";
import {
  Stack,
  Text,
  useColorModeValue,
  Image,
  Box,
  LinkBox,
  LinkOverlay,
  Button,
} from "@chakra-ui/react";
import Link from "@frontity/components/link";
import Carousel from "../../components/molecules/Carousel";
import React, { useState } from "react";

const PublicationSliders = ({ sliderData, show }) => {
  const [defaultValue, setDefaultValue] = useState(10);
  const data = sliderData.sort((a, b) => a.id - b.id);

  return (
    <Stack
      spacing={8}
      style={{
        rowGap: "60px",
      }}
    >
      {data.map((item, idx) => {
        if (idx < defaultValue && item.slides.length > 0) {
          return (
            <Stack key={item.name} spacing="4">
              <Text
                as="h3"
                m="0"
                fontSize={{ base: "xl", lg: "2xl" }}
                fontFamily="heading"
                color={useColorModeValue("gray.800", "whiteAlpha.800")}
              >
                <Link link={item.link}>{item.name}</Link>
              </Text>
              <Carousel show={show} gap={"20px"}>
                {item.slides.map((slide, idx) => {
                  return (
                    <LinkBox
                      key={slide.alt + idx}
                      w={`calc(100% / ${show} - 20px)`}
                      pos={"relative"}
                      _before={{
                        content: `''`,
                        position: "absolute",
                        top: 0,
                        left: "unset",
                        right: "unset",
                        width: "175px",
                        height: "100%",
                        borderRadius: "15px",
                        background: "rgba(0,0,0,0.3)",
                        backgroundBlendMode: "overlay",
                      }}
                      _hover={{
                        _before: {
                          background: "transparent",
                        },
                      }}
                    >
                      <LinkOverlay title={sliderData.alt} href={slide.link}>
                        <Image
                          src={slide.src ? slide.src : ""}
                          srcSet={slide.srcSet ? slide.srcSet : ""}
                          alt={slide.alt}
                          title={slide.alt}
                          rounded="xl"
                          border={`1px solid`}
                          borderColor={useColorModeValue(
                            "gray.900",
                            "whiteAlpha.900"
                          )}
                          objectFit="cover"
                          style={{ width: "175px", height: "230px" }}
                        />
                      </LinkOverlay>
                    </LinkBox>
                  );
                })}
              </Carousel>
            </Stack>
          );
        }
      })}
      {/* {defaultValue === 10 && (
        <Button onClick={() => setDefaultValue(20)}>Show All</Button>
      )} */}
    </Stack>
  );
};

export default PublicationSliders;
