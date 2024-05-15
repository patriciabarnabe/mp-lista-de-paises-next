import Image from "next/image";
import Link from "next/link";

export type Country = {
  name: {
    common: string;
  };

  translations: {
    por: {
      common: string;
    };
  };

  flags: {
    svg: string;
    alt: string;
  };

  capital: string;
  region: string;
  subregion: string;
  population: number;
  languages?: {
    //Propriedades de languages é opcional
    [key: string]: string;
  };

  borders?: string[];
  cca3: string;
};

async function getCountries(): Promise<Country[]> {
  //Retorna uma promise que será um array de countries
  const response = await fetch("https://restcountries.com/v3.1/all"); //Next sobrescreve esse fetch e adiciona opções para lidar com cache dos dados, exemplo: ao chamar o mesmo endpoint 2x, os dados já estarão armazenados em cache (mas essa opção também pode ser alterada/configurada)
  return response.json();
}

export default async function Home() {
  const countries = await getCountries(); //Um console nesse ponto não irá gerar retorno no dev tools, apenas no terminal onde o Next está rodando, pois na verdade esses dados estão no servidor já que estamos utilizando o Server Components do React -> A página é construída no servidor e é enviada por streaming (aos poucos), mas o HTML já chegará pronto no frontend, ou seja, não é gerado/criado pelo cliente
  return (
    <section className="container grid grid-cols-5 w-full gap-2 mt-16">
      {countries.map((country) => (
        <Link
          href={`/country/${country.name.common}`}
          key={country.name.common}
        >
          <article className="h-64 min-w-full p-2 bg-white border-2 rounded-xl hover:border-indigo-200 transition-all hover:shadow-xl hover:cursor-pointer flex flex-col justify-around">
            <div className="relative w-full h-40 p-2 overflow-hidden rounded-xl">
              <Image
                src={country.flags.svg}
                alt={country.flags.alt}
                fill
                className="object-cover"
              />
            </div>

            <h1 className="text-center font-bold text-xl">
              {country.translations.por.common}
            </h1>
          </article>
        </Link>
      ))}
    </section>
  );
}
