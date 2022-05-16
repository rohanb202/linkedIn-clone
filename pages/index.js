import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";

import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { useRouter } from "next/router";
import Feed from "../Components/Feed";
import Modal from "../Components/Modal";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom.js";
import { modalTypeState } from "../atoms/modalAtom.js";
import { connectToDatabase } from "../utils/mongodb";
import Widgets from "../Components/Widgets";

export default function Home({ posts, articles }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/home");
    },
  });
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);

  //console.log(session);
  return (
    <div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>Feed | LinkedIn</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex justify-center gap-x-5 sm:px-12">
        <div className="flex flex-col gap-5 md:flex-row">
          {/* Sidebar */}
          <Sidebar />
          <Feed posts={posts} />

          {/* feed */}
        </div>
        <Widgets articles={articles} />

        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>
        {/* widgets */}
      </main>
    </div>
  );
}
export async function getServerSideProps(context) {
  //user authenticated on the server side
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
    };
  }
  //Get posts from the server side
  const { db } = await connectToDatabase();
  const posts = await db
    .collection("posts")
    .find()
    .sort({ timestamp: -1 })
    .toArray();
  //get google news api
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.NEWS_API_KEY}`
  );
  const dataNews = await res.json();

  return {
    props: {
      session,
      posts: posts.map((post) => ({
        _id: post._id.toString(),
        input: post.input,
        photoURL: post.photoURL,
        username: post.username,
        email: post.email,
        userImg: post.userImg,
        createdAt: post.createdAt,
      })),
      articles: dataNews.articles,
    },
  };
}
