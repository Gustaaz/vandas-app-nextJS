import { Produto } from "app/models/produtos";
import { Layout } from "components";
import Link from "next/link";
import { TabelaProdutos } from "./tabela";
import useSWR from "swr";
import { AxiosResponse } from "axios";
import { httpClient } from "app/http";

export const ListagemProdutos: React.FC = () => {
  const { data: result } = useSWR<AxiosResponse<Produto[]>>(
    "api/produtos",
    (url) => httpClient.get(url)
  );

  if (!result) {
    return <div>Carregando...</div>;
  }
  return (
    <Layout titulo="Produtos">
      <Link href={"/cadastros/produtos"}>
        <button className="button is-warning">Novo</button>
      </Link>
      <TabelaProdutos produtos={result.data} />
    </Layout>
  );
};
