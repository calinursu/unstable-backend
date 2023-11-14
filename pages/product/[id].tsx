import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import regenerate from "../../lib/regenerate";
import translations, { TranslationsType } from "../../lib/translations";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

type Content = {
  isDown: boolean;
};

export type Props = {
  content: Content;
  lastRegenerationTime: string;
  translations: TranslationsType;
};

export default function Product({
  content,
  lastRegenerationTime,
  translations,
}: Props) {
  const router = useRouter();
  const slug = (router.query.id as string) || "0";
  const [links, setLinks] = useState([8000, 800]);

  useEffect(() => {
    setLinks([
      Math.floor(Math.random() * 9000) + 1001,
      Math.floor(Math.random() * 1000) + 1,
    ]);
  }, [router.asPath]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}> #{slug.padStart(5, "0")}</h1>
        <h2>{translations.globalHeadlineAlias || "globalHeadlineAlias"}</h2>
        <p className={styles.description}>
          {translations.globalParagraphAlias || "globalParagraphAlias"}:{" "}
          {translations.globalOnlinePriceInformationLabel ||
            "globalOnlinePriceInformationLabel"}
        </p>
        <p className={styles.description}>
          Last regeneration time: <code>{lastRegenerationTime}</code>
        </p>
        <div>
          <Link href="/">Home </Link>
          {links.map((n) => (
            <Fragment key={n}>
              | <Link href={`/product/${n}`}>{`/product/${n} `}</Link>
            </Fragment>
          ))}
          | <Link href="/product/1">/product/1 </Link>|{" "}
          <Link href="/product/2">/product/2 </Link>|{" "}
          <Link href="/product/3">/product/3 </Link>
        </div>
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
