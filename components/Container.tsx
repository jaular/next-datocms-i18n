import Head from "next/head";
import LenguageSelector from "components/LenguageSelector";

type Props = {
  title: string;
  children: React.ReactNode;
};

const Container = ({ title, children }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <LenguageSelector />

        {children}
      </main>
    </>
  );
};

export default Container;
