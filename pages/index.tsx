import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Navbar, HomeGrid } from "../components";

const Home: NextPage = () => {
  return (
    <div className=" bg-white h-screen relative flex flex-col max-h-screen max-w-7xl mx-auto ">
      <Head>
        <title>Game of Life</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main className=" grow ">
        <HomeGrid />
      </main>
    </div>
  );
};
export default Home;
