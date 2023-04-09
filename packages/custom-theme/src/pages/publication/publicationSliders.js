// import { connect } from "frontity";
import {
  LinkOverlay,
  Stack,
  Text,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import Link from "@frontity/components/link";
import Carousel from "../../components/molecules/Carousel";

const PublicationSliders = ({ sliderData, show }) => {
  return (
    <Stack
      spacing={8}
      style={{
        rowGap: "60px",
      }}
    >
      {sliderData.map((cat) => {
        return (
          <Stack key={cat.name} spacing="4">
            <Text
              as="h3"
              m="0"
              fontSize={{ base: "xl", lg: "3xl" }}
              fontFamily="heading"
              color={useColorModeValue("gray.800", "whiteAlpha.800")}
            >
              <Link link={cat.link}>{cat.name}</Link>
            </Text>
            <Carousel show={show} gap={"10px"}>
              {cat.slides.map((slide, idx) => {
                return (
                  <Link
                    key={slide.alt + idx}
                    title={sliderData.alt}
                    href={slide.link}
                    pos={"relative"}
                    w={`calc(100% / ${show} )`}
                    _before={{
                      content: `''`,
                      position: "absolute",
                      top: 0,
                      left: "unset",
                      right: "unset",
                      width: "220px",
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
                    <Image
                      src={slide.src ? slide.src : slide.featured_media.src}
                      srcSet={
                        slide.srcSet
                          ? slide.srcSet
                          : slide.featured_media.srcSet
                      }
                      alt={slide.alt}
                      title={slide.alt}
                      rounded="xl"
                      border={`1px solid`}
                      borderColor={useColorModeValue(
                        "gray.900",
                        "whiteAlpha.900"
                      )}
                      objectFit="cover"
                      style={{ width: "220px", height: "280px" }}
                    />
                  </Link>
                );
              })}
            </Carousel>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default PublicationSliders;
