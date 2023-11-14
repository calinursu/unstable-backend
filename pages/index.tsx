import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import regenerate from "../lib/regenerate";
import translations, { TranslationsType } from "../lib/translations";
import styles from "../styles/Home.module.css";

type Content = {
  isDown: boolean;
};

export type Props = {
  content: Content;
  lastRegenerationTime: string;
  translations: TranslationsType;
};

export default function Home({
  content,
  lastRegenerationTime,
  translations,
}: Props) {
  const links = ["product/1", "product/2", "product/3"];
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Unstable backend</h1>
        <h2>{translations.globalHeadlineAlias || "globalHeadlineAlias"}</h2>
        <h4 style={{ fontWeight: 300 }}>Should regenerate every 5 seconds</h4>
        <div>
          <Link href="/">Home </Link>
          {links.map((n) => (
            <Fragment key={n}>
              | <Link href={`/${n}`}>{`/${n} `}</Link>
            </Fragment>
          ))}
        </div>

        <p className={styles.description}>
          Backend is{" "}
          <code
            className={
              styles.code + " " + (content.isDown ? styles.down : styles.up)
            }
          >
            {content.isDown ? "Down" : "Operational"}
          </code>
        </p>
        <p className={styles.description}>
          Last regeneration time: <code>{lastRegenerationTime}</code>
        </p>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { feature, lastRegenerationTime } = await regenerate();
  const data = await translations();

  if (!feature) {
    return {
      notFound: true,
      revalidate: true,
    };
  }

  return {
    props: {
      content: feature,
      lastRegenerationTime,
      translations: data,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 5, // In seconds
  };
};
