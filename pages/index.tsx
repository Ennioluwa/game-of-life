import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Navbar, HomeGrid } from "../components";

const Home: NextPage = () => {
  return (
    <div className=" bg-white min-h-screen ">
      <Head>
        <title>Game of Life</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main>
        <HomeGrid />
      </main>
    </div>
  );
};

export default Home;
