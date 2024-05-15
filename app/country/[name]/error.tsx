"use client"; //Se nada for escrito, o padrão da diretiva do documento será use server.

import Image from "next/image";
import Link from "next/link";

//Error boundary: limite/tratamento de erros que irá capturar os erros que ocorrerem ao acessar essa rota e/ou todas as rotas subsequentes

//OBS: Os componentes de erro rodam apenas no lado do cliente (Client Side) e não são renderizados no lado do servidor (Server Side Rendering) - como ocorre nas outras páginas que buscam conteúdos nas APIs. Por isso, eles precisam ter uma diretiva no topo do arquivo chamada use client para avisar que esse componente deve ser gerado no lado do cliente.

export default function Error() {
  return (
    <section className="flex flex-col container">
      <h1 className="text-5xl text-center font-bold text-gray-800 my-16">
        Ops, ocorreu um erro ao exibir esse país!
      </h1>

      <Link href="/" className="flex items-center py-2">
        <Image
          src="/arrow-back.svg"
          alt="Ícone de seta de voltar"
          width={24}
          height={24}
        />
        Voltar
      </Link>
    </section>
  );
}
