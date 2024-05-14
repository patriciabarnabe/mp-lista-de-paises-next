type Country = {
  name: {
    common: string;
  };
};

async function getCountries(): Promise<Country[]> {
  //Retorna uma promise que será um array de countries
  const response = await fetch("https://restcountries.com/v3.1/all"); //Next sobrescreve esse fetch e adiciona opções para lidar com cache dos dados, exemplo: ao chamar o mesmo endpoint 2x, os dados já estarão armazenados em cache (mas essa opção também pode ser alterada/configurada)
  return response.json();
}

export default async function Home() {
  const countries = await getCountries(); //Um console nesse ponto não irá gerar retorno no dev tools, apenas no terminal onde o Next está rodando, pois na verdade esses dados estão no servidor já que estamos utilizando o Server Components do React -> A página é construída no servidor e é enviada por streaming (aos poucos), mas o HTML já chegará pronto no frontend, ou seja, não é gerado/criado pelo cliente
  return (
    <section className="container flex w-full">
      {countries.map((country) => (
        <h1 key={country.name.common}>{country.name.common}</h1>
      ))}
    </section>
  );
}
