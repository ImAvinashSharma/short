import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spinner, Box } from "@chakra-ui/react";
import NotFound from "../component/not-found.js";

const Code = () => {
  const [spinner, setSpinner] = useState(true);
  const [isInvalid, setInvalid] = useState(false);
  const router = useRouter();
  const { code } = router.query;
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/url-short/${code}`);
      const { data } = await res.json();
      if (data !== null && data !== undefined) {
        if (data.includes("http") || data.includes("https")) {
          window.location.replace(data);
        } else {
          window.location.replace(`https://${data}`);
        }
      } else {
        setSpinner(false);
        setInvalid(true);
      }
    }
    fetchData();
  }, [code]);
  return (
    <>
      <Box height="100vh" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        {!isInvalid && <Box as="p">Redirecting you to the site</Box>}
        {spinner && <Spinner />}
        {isInvalid && <NotFound />}
      </Box>
    </>
  );
};

export default Code;
