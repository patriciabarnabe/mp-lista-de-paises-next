import type { Country } from "@/app/page";
import CountryCard from "@/components/CountryCard";
import Image from "next/image";
import Link from "next/link";

async function getCountryByName(name: string): Promise<Country> {
  //Função irá receber o parâmetro name do tipo string e retornará uma promise do tipo country
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fullText=true`
  );

  return (await response.json())[0]; //API retorna o conteúdo do país dentro de um array. Precisamos acessar a posição zero do array, então podemos inserir um outro await para aguardar enquanto fazemos esse acesso dentro do array.
}

//Outra maneira de fazer a busca dos detalhes dos países utilizando o cache do Next 13
// async function getCountryByNameWithCache(name: string): Promise<Country> {
//   const response = await fetch("https://restcountries.com/v3.1/all"); // Essa busca já foi feita na outra página, então o Next criará cache, por padrão, para os dados dessa requisição. Portanto, podemos aproveitar esses dados cacheados e apenas filtrar/procurar o país desejado
//   const countries: Country[] = await response.json();

//   return countries.find((country: Country) => country.name.common === name)!; // Exclamação significa que essa informação (no caso, esse país) será retornado com certeza, ou seja, nunca será nulo ou undefined. É chamado de operador de asserção de não nulo (non-null)
// }

//Para obter o nome e a bandeira de cada país que faz fronteira, precisamos filtrá-los a partir da lista de países
async function getCountryBordersByName(name: string) {
  const response = await fetch("https://restcountries.com/v3.1/all");

  const countries: Country[] = await response.json(); //Todos os países

  const country = countries.find(
    //País detalhado
    (country: Country) => country.name.common === name
  )!;

  return country.borders?.map((border) => {
    const countryBorder = countries.find((country) => country.cca3 === border)!;

    return {
      name: countryBorder.name.common,
      ptName: countryBorder.translations.por.common,
      flag: countryBorder.flags.svg,
      flagAlt: countryBorder.flags.alt,
    };
  });
}

export default async function CountryDetail({
  params: { name }, //Está relacionado ao [name] que é o nome da pasta onde esse arquivo está (o parâmetro deve ter o mesmo nome da pasta)
}: {
  params: { name: string }; //Criação de tipo para o parâmetro que vem do path da rota da URL
}) {
  const country = await getCountryByName(name);

  // const country = await getCountryByNameWithCache(decodeURI(name));

  const countryBorders = await getCountryBordersByName(decodeURI(name));

  const formatter = Intl.NumberFormat("en", { notation: "compact" }); //API de internacionalização do JS

  return (
    <section className="container flex flex-col">
      <h1 className="text-5xl font-bold text-gray-800 my-16 text-center">
        {country.translations.por.common}
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
      <article className="flex md:flex-row flex-col justify-between min-w-full p-10 bg-white rounded-xl">
        <section>
          {country.capital && ( //Tratamento de erro: Essa informação será exibida somente se existir valor para essa propriedade
            <h2 className="text-xl text-gray-800 mt-3">
              <b>🏙️ Capital:</b> {country.capital}
            </h2>
          )}
          <h2 className="text-xl text-gray-800 mt-3">
            <b>🗺️ Continente:</b> {country.region}
            {country.subregion && ` - ${country.subregion}`}
          </h2>
          <h2 className="text-xl text-gray-800 mt-3">
            <b>👨🏻‍👩🏼‍👧🏻‍👦🏼 População:</b> ~
            {formatter.format(country.population)}
          </h2>
          {country.languages && ( //Tratamento de erro: Essa informação será exibida somente se existir valor para essa propriedade
            <h2 className="text-xl text-gray-800 mt-3">
              <b>🗣️ Idiomas:</b>
              <br />
              {Object.values(country.languages).map((language) => (
                <span
                  key={language}
                  className="inline-block px-2 bg-indigo-700 mr-2 text-white text-sm rounded-full"
                >
                  {language}
                </span>
              ))}
              {/*Pegar os valores que estão dentro das propriedades do objeto languages e criar um span para cada idioma*/}
            </h2>
          )}
        </section>
        <div className="relative h-48 my-2 md:h-auto w-96 shadow-md md:order-last order-first rounded-xl">
          <Image
            src={country.flags.svg}
            alt={country.flags.alt}
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </article>
      <section>
        <h3 className="mt-12 text-2xl font-semibold text-gray-800">
          Países que fazem fronteira:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-2 my-3">
          {countryBorders?.map((border) => (
            <CountryCard key={border.name} {...border} />
          ))}
        </div>
      </section>
    </section>
  );
}
