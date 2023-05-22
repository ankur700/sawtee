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

const PublicationSliders = ({ sliderData, show, checkedItems }) => {
  return (
    <Stack
      spacing={8}
      style={{
        rowGap: "60px",
      }}
    >
      {sliderData.map((item, idx) => {
        if (checkedItems[idx] && item.slides.length > 0) {
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
                      key={slide.alt + `${idx}`}
                      w={
                        show
                          ? `calc(100% / ${show} - 20px)`
                          : `calc(100% - 20px)`
                      }
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
                      {idx <= 5 ? (
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
                      ) : (
                        <LinkOverlay title={"view all"} href={item.link}>
                          <Box
                            bg={"gray.600"}
                            rounded="xl"
                            border={`1px solid`}
                            borderColor={useColorModeValue(
                              "gray.900",
                              "whiteAlpha.900"
                            )}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            style={{ width: "175px", height: "230px" }}
                          >
                            <Button variant="ghost">
                              <Text>{item.name}</Text>
                            </Button>
                          </Box>
                        </LinkOverlay>
                      )}
                    </LinkBox>
                  );
                })}
              </Carousel>
            </Stack>
          );
        }
      })}
    </Stack>
  );
};

export default PublicationSliders;
