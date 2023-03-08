import { useState } from "react";
import { Produto } from "app/models/produtos";
import { useProdutoService } from "app/services";
import { Layout, Input, Message } from "components";
import { Alert } from "components/common/message";
import * as yup from "yup";
import Link from "next/link";

const msgRequired = "Campo Obrigatorio";

const validadeForm = yup.object().shape({
  sku: yup.string().trim().required(msgRequired),
  nome: yup.string().required(msgRequired),
  descricao: yup.string().required(msgRequired),
  preco: yup
    .number()
    .required(msgRequired)
    .moreThan(0, "Valor deve ser maior que 0 (Zero)"),
});

interface FromErros {
  sku?: string;
  preco?: string;
  descricao?: string;
  nome?: string;
}

export const CadastroProdutos: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [sku, setSku] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [preco, setPreco] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [dataCadastro, setDataCadastro] = useState<string>("");
  const [mensagem, setMensagem] = useState<Array<Alert>>([]);
  const [error, setError] = useState<FromErros>({});

  const service = useProdutoService();

  const submit = () => {
    const produto: Produto = {
      id,
      sku,
      nome,
      preco: preco ? parseFloat(preco) : 0,
      descricao,
    };
    console.log(produto);

    validadeForm
      .validate(produto)
      .then((obj) => {
        setError({});
        if (id) {
          service.atualizar(produto).then((response) => {
            setMensagem([
              {
                texto: "Produto Atualizado com sucesso",
                tipo: "success",
              },
            ]);
          });
        } else {
          service.salvar(produto).then((produtoResposta) => {
            setId(produtoResposta.id!);
            setDataCadastro(produtoResposta.dataCadastro!);
            setMensagem([
              {
                texto: "Produto Salvo com sucesso",
                tipo: "success",
              },
            ]);
          });
        }
      })
      .catch((err) => {
        const fields = err.path;
        const texto = err.message;
        setError({
          [fields]: texto,
        });
      });
  };

  return (
    <Layout titulo="Cadastro de Produtos" mesagens={mensagem}>
      {id && (
        <div className="columns">
          <Input
            disabled
            value={id}
            id="inputId"
            label="Codigo:"
            classColumn="is-half"
          />

          <Input
            disabled
            id="inputPreco"
            value={dataCadastro}
            classColumn="is-half"
            label="Data de Cadastro"
          />
        </div>
      )}
      <div className="columns">
        <Input
          id="inputSKU"
          label="SKU: *"
          value={sku}
          onChange={setSku}
          classColumn="is-half"
          placeholder="Digite o Sku do produto"
          error={error.sku}
        />

        <Input
          id="inputPreco"
          label="Preço: *"
          value={preco}
          onChange={setPreco}
          classColumn="is-half"
          placeholder="Digite o Preço do produto"
          currency={true}
          maxLength={16}
          error={error.preco}
        />
      </div>
      <div className="columns">
        <Input
          id="inputNome"
          label="Nome: *"
          value={nome}
          onChange={setNome}
          classColumn="is-full"
          placeholder="Digite o Nome do produto"
          error={error.nome}
        />
      </div>
      <div className="columns">
        <div className="field column is-full">
          <label htmlFor="inputDesc" className="label">
            Descrição: *
          </label>
          <div className="control">
            <textarea
              id="inputDesc"
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
              className="textarea"
              placeholder="Digite a Descrição detalhada do produto"
            />
            {error.descricao && (
              <p className="help is-danger">{error.descricao}</p>
            )}
          </div>
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control is-link">
          <button className="button" onClick={submit}>
            {id ? "Atulizar" : "Salvar"}
          </button>
        </div>
        <div className="control">
          <Link href={"/consultas/produtos"}>
            <button className="button">Voltar</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
