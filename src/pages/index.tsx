import { Layout } from "components";
import Head from "next/head";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Vedas de</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout titulo="Cadastro" />
    </div>
  );
};
export default Home;
