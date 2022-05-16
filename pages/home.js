import Head from "next/head";
import Image from "next/image";
import HeaderLink from "../Components/HeaderLink";
import ExploreIcon from "@mui/icons-material/Explore";
import GroupIcon from "@mui/icons-material/Group";
import OndemandVideoSharpIcon from "@mui/icons-material/OndemandVideoSharp";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { signIn, getProviders } from "next-auth/react";

export default function Home({ providers }) {
  return (
    <div className="relative space-y-10">
      <Head>
        <title>LinkedIn</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex items-center justify-around py-4">
        <div className="relative h-10 w-36">
          <Image src="https://rb.gy/vtbzlp" layout="fill" objectFit="contain" />
        </div>
        <div className="flex items-center divide-gray-300 sm:divide-x ">
          <div className="hidden pr-4 space-x-8 sm:flex">
            <HeaderLink Icon={ExploreIcon} Text="Discover" />
            <HeaderLink Icon={GroupIcon} Text="People" />
            <HeaderLink Icon={OndemandVideoSharpIcon} Text="Learning" />
            <HeaderLink Icon={BusinessCenterIcon} Text="Jobs" />
          </div>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <div className="pl-4">
                <button
                  className="text-blue-700 font-semibold rounded-full border border-blue-700 px-5 py-1.5 transition-all hover:border-2"
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                  Sign in
                </button>
              </div>
            </div>
          ))}
        </div>
      </header>
      <main className="flex flex-col items-center max-w-screen-lg mx-auto xl:flex-row">
        <div className="space-y-6 xl:space-y-10">
          <h1 className="text-3xl md:text-5xl text-amber-800/80 max-w-xl pl-4 xl:pl-0 !leading-snug">
            Welcome to your professional community
          </h1>
          <div className="space-y-4">
            <div className="intent">
              <h2 className="text-xl">Search for a job</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
            <div className="intent">
              <h2 className="text-xl">Find a person you know</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
            <div className="intent">
              <h2 className="text-xl">Learn a new skill</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
          </div>
        </div>
        <div className="relative xl:absolute w-80 h-80 xl:w-[650px] xl:h-[650px] top-14 right-5">
          <Image src="https://rb.gy/vkzpzt" layout="fill" priority />
        </div>
      </main>
    </div>
  );
}
export async function getServerSideProps(context) {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
