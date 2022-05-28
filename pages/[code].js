import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spinner, Box } from "@chakra-ui/react";
import NotFound from "../component/not-found.js";
import Head from "next/head";

const Code = () => {
  const [spinner, setSpinner] = useState(true);
  const [isInvalid, setInvalid] = useState(false);
  const router = useRouter();
  const { code } = router.query;
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/url-short/${code}`);
        const { data } = await res.json();
        if (!res.ok) {
          throw new Error(`This is an HTTP error: The status is ${res.status}`);
        }
        console.log(data)
        if (data !== null && data !== undefined) {
          if (data.includes("http") || data.includes("https")) {
            window.location.replace(data);
          } else {
            window.location.replace(`https://${data}`);
          }
        }
      } catch (err) {
        console.log(err);
        setInvalid(true);
      } finally {
        setSpinner(false);
        setInvalid(true);
      }
    }
    fetchData();
  }, [code]);
  return (
    <>
      <Head>
        <title>URL Shotener</title>
        <meta name="description" content="Create short links easy and faster. in seconds" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box height="100vh" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        {!isInvalid && <Box as="p">Redirecting you to the site</Box>}
        {spinner && <Spinner />}
        {isInvalid && <NotFound />}
      </Box>
    </>
  );
};

export default Code;
