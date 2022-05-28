import { Heading, Box } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Heading>Invalid URL</Heading>
      <Heading as="h2" size="lg">
        We are working hard to get this page.We recommend you to wait for sometime and try after.
      </Heading>
    </Box>
  );
};

export default NotFound;
