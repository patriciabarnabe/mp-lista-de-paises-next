import type { Country } from "@/app/page";
import Image from "next/image";
import Link from "next/link";

async function getCountryByName(name: string): Promise<Country> {
  //Função irá receber o parâmetro name do tipo string e retornará uma promise do tipo country
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fullText=true`
  );

  return (await response.json())[0]; //API retorna o conteúdo do país dentro de um array. Precisamos acessar a posição zero do array, então podemos inserir um outro await para aguardar enquanto fazemos esse acesso dentro do array.
}

export default async function CountryDetail({
  params: { name }, //Está relacionado ao [name] que é o nome da pasta onde esse arquivo está (o parâmetro deve ter o mesmo nome da pasta)
}: {
  params: { name: string }; //Criação de tipo para o parâmetro que vem do path da rota da URL
}) {
  const country = await getCountryByName(name);

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
      <article className="flex justify-between min-w-full p-10 bg-white rounded-xl">
        <section>
          <h2 className="text-xl text-gray-800 mt-3">
            <b>🏙️ Capital:</b> {country.capital}
          </h2>
          <h2 className="text-xl text-gray-800 mt-3">
            <b>🗺️ Continente:</b> {country.region} - {country.subregion}
          </h2>
          <h2 className="text-xl text-gray-800 mt-3">
            <b>👨🏻‍👩🏼‍👧🏻‍👦🏼 População:</b> ~
            {formatter.format(country.population)}
          </h2>
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
        </section>

        <div className="relative h-auto w-96 shadow-md">
          <Image
            src={country.flags.svg}
            alt={country.flags.alt}
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </article>
    </section>
  );
}
