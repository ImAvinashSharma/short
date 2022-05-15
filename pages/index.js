import Head from "next/head";
import React, { useReducer, useEffect, useRef } from "react";
import shortid from "shortid";
import { reducer, validURL } from "../component/reducer";
const initialState = {
  url: "",
  code: shortid.generate().substring(0, 4),
  isPressent: false,
  isLoading: false
};
export default function Home() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const [state, dispatch] = useReducer(reducer, initialState);

  shortid.characters("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_");

  const handleFormSubmit = async e => {
    e.preventDefault();
    if (!validURL(state.url)) {
      return alert("Please enter a valid URL");
    }
    dispatch({ type: "SET_LOADING" });
    const { code, url } = state;
    (async () => {
      const rawResponse = await fetch("/api/url-short", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code, url })
      });
      if (rawResponse.status !== 200) {
        alert("Invalid response");
      }
    })();
    dispatch({ type: "TOGGEL" });
  };
  return (
    <>
      <Head>
        <title>Url Shotener</title>
        <meta name="description" content="Create short links easy and faster." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen sm:h-sm items-center	justify-center bg-gradient-to-b	 from-gray-800 via-gray-900 to-black">
        <form onSubmit={handleFormSubmit}>
          <h1 className="text-center text-white text-4xl mb-3">URL Shortener</h1>
          <p className="text-center text-white text-lg mb-6">Create short links easy and faster.</p>
          <div className="flex border-2 border-white shadow-xl rounded-full text-white bg-white">
            <input ref={inputRef} className="text-black md:w-96 md:p-2 border-none ml-6 outline-none text-xl" type="text" value={state.url} onChange={e => dispatch({ type: "SET_URL", payload: e.target.value })} placeholder="Enter the URL..." />
            <button className="flex p-3 rounded-full hover:bg-yellow-300 text-black" type="submit">
              Shorten URL
            </button>
          </div>
          {state.isLoading && (
            <div className="flex items-center	justify-center pt-4">
              <img src="loader.gif" width="144" height="144" alt="loading..." className="rounded-full" />
            </div>
          )}
          <div>{state.isPressent && <ShortLink code={state.code} />}</div>
        </form>
      </div>
      <h1 className="text-white text-center bg-black h-9">
        Made with ❤️ by <a href="https://avinash-sharma.com/">Avinash Sharma</a>
      </h1>
    </>
  );
}

function ShortLink({ code }) {
  return (
    <pre className="bg-black m-4 p-4 pt-5 text-white rounded-xl">
      <code>{`${window.location.href}${code}`}</code>
      <button
        type="button"
        className="inline-block	items-start bg-green-500 rounded-md hover:bg-green-600 text-xs text-center text-white p-1"
        onClick={() => {
          navigator.clipboard.writeText(`${window.location.href}${code}`);
        }}
      >
        Copy
      </button>
    </pre>
  );
}
