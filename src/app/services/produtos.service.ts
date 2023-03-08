import { httpClient } from "app/http"
import { Produto } from "app/models/produtos"

const resorceURL:string = "/api/produtos"

export const useProdutoService = ()=>{
    
    const salvar = async (produto:Produto):Promise<Produto> => {
        console.log(produto)
        const response = await httpClient.post<Produto>(resorceURL, produto)
        return response.data
    }

    const atualizar = async(produto:Produto):Promise<void> => {
        const url:string = `${resorceURL}/${produto.id}`
        await httpClient.put<Produto>(url, produto)
    }

    return{
        salvar,
        atualizar
    }
}