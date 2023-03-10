import { Produto } from "app/models/produtos";
import { Layout } from "components";
import Link from "next/link";
import { TabelaProdutos } from "./tabela";
import useSWR from "swr";
import { AxiosResponse } from "axios";
import { httpClient } from "app/http";
import { Loader } from "components/common/loader";

export const ListagemProdutos: React.FC = () => {
  const { data: result } = useSWR<AxiosResponse<Produto[]>>(
    "api/produtos",
    (url) => httpClient.get(url)
  );

  return (
    <Layout titulo="Produtos">
      <Link href={"/cadastros/produtos"}>
        <button className="button is-warning">Novo</button>
      </Link>
      <Loader show={!result} />
      <TabelaProdutos produtos={result?.data || []} />
    </Layout>
  );
};
