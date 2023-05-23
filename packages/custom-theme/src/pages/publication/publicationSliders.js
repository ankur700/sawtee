import {
  Stack,
  Text,
  useColorModeValue,
  Image,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import Link from "@frontity/components/link";
import Carousel from "../../components/molecules/Carousel";
import Loading from "../../components/atoms/loading";

const PublicationSliders = ({ sliderData, show, checkedItems }) => {
  const ImageBorderColor = useColorModeValue("gray.900", "whiteAlpha.900");
  const TitleTextColor = useColorModeValue("gray.800", "whiteAlpha.800");

  return (
    <Stack
      spacing={8}
      style={{
        rowGap: "60px",
      }}
    >
      {sliderData ? (
        sliderData.map((item, idx) => {
          return checkedItems[idx] ? (
            <Stack key={item.name} spacing="4">
              <Text
                as="h3"
                id={item.name}
                m="0 0 2rem 0"
                fontSize={{ base: "xl", lg: "2xl" }}
                fontFamily="heading"
                color={TitleTextColor}
              >
                <Link title={`View All ${item.name}`} link={item.link}>
                  {item.name}
                </Link>
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
                      {
                        <LinkOverlay title={sliderData.alt} href={slide.link}>
                          <Image
                            src={slide.src}
                            srcSet={slide.srcSet}
                            alt={slide.alt}
                            title={slide.alt}
                            rounded="xl"
                            border={`1px solid`}
                            borderColor={ImageBorderColor}
                            objectFit="cover"
                            style={{ width: "175px", height: "230px" }}
                          />
                        </LinkOverlay>
                      }
                    </LinkBox>
                  );
                })}
              </Carousel>
            </Stack>
          ) : null;
        })
      ) : (
        <Loading />
      )}
    </Stack>
  );
};

export default PublicationSliders;
