import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

type Props = {
  id: string;
};

export default function Product({ id = "0" }: Props) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}> #{id.padStart(5, "0")}</h1>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      id: params.id,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: false,
  };
};
