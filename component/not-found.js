import { Heading, Box } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Heading>Invalid URL</Heading>
      <Heading as="h2" size="lg">
        Try after sometime
      </Heading>
    </Box>
  );
};

export default NotFound;
