export default function Country({
  params: { name }, //Está relacionado ao [name] que é o nome da pasta onde esse arquivo está (o parâmetro deve ter o mesmo nome da pasta)
}: {
  params: { name: string }; //Criação de tipo para o parâmetro que vem do path da rota da URL
}) {
  return <h1>{name}</h1>;
}
