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
  id: string;
  content: Content;
  lastRegenerationTime: string;
  translations: TranslationsType;
};

export default function Product({
  id,
  content,
  lastRegenerationTime,
  translations,
}: Props) {
  const router = useRouter();
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
        <h1 className={styles.title}> #{id.padStart(5, "0")}</h1>
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
          <Link href="/">Home </Link>|{" "}
          <Link href="/product/1">/product/1 </Link>|{" "}
          <Link href="/product/2">/product/2 </Link>|{" "}
          <Link href="/product/3">/product/3 </Link>
          {links.map((n) => (
            <Fragment key={n}>
              | <Link href={`/product/${n}`}>{`/product/${n} `}</Link>
            </Fragment>
          ))}
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data, lastRegenerationTime } = await regenerate();
  const translationsData = await translations();

  if (!data) {
    return {
      notFound: true,
      revalidate: true,
    };
  }

  console.log(params.id, data);

  if (
    data.errorProductCodes &&
    data.errorProductCodes.includes(params.id as string)
  ) {
    return {
      notFound: true,
      revalidate: true,
    };
  }

  return {
    props: {
      content: data,
      lastRegenerationTime,
      translations: translationsData,
      id: params.id,
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
