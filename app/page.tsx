import Image from "next/image";
import styles from "./page.module.css";

import { SanityDocument } from "next-sanity";
import Posts from "@/app/_components/Posts";
import { postsQuery } from "@/sanity/lib/queries";
// preview stuf
import { sanityFetch, token } from "@/sanity/lib/sanityFetch";
import { draftMode } from "next/headers";
import PreviewPosts from "@/app/_components/PreviewPosts";
import PreviewProvider from "@/app/_components/PreviewProvider";

export default async function Home() {
  const posts = await sanityFetch<SanityDocument[]>({ query: postsQuery });
  const isDraftMode = draftMode().isEnabled;

  if (isDraftMode && token) {
    return (
      <main className={styles.main}>
        <PreviewProvider token={token}>
          <PreviewPosts posts={posts} />
        </PreviewProvider>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <PreviewPosts posts={posts} />
    </main>
  );
}
