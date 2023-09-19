import {
  Button,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useColorModeValue,
} from "@chakra-ui/react";
import Iframe from "@frontity/components/iframe";

export const MapModel = ({ isOpen, onClose, mapLink }) => {
  const modalContentColor = useColorModeValue(
    "rgba(255, 255, 255, 0.7)",
    "rgba(0, 0, 0, 0.7)"
  );
  const modelHeaderColor = useColorModeValue("gray.700", "whiteAlpha.900");
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      closeOnOverlayClick={true}
      blockScrollOnMount={false}
    >
      <ModalOverlay />
      <ModalContent bg={modalContentColor} maxW={"3xl"}>
        <ModalHeader color={modelHeaderColor}>Our Location</ModalHeader>
        <ModalCloseButton />
        <ModalBody margin={"0 auto"}>
          <Iframe
            src={mapLink}
            title="SAWTEE's Location"
            height="450"
            width="700"
            loading="lazy"
          />
        </ModalBody>

        <ModalFooter>
          <Button variant="solid" colorScheme={"primary"}>
            <Link href="https://goo.gl/maps/fwZuwNSbjN5jwZia7" target="_blank">
              View Map
            </Link>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
