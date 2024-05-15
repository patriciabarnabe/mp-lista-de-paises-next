import Link from "next/link";
import Image from "next/image";

export default function CountryCard({
  //Definição e tipagem das props do compopnente
  name,
  ptName,
  flag,
  flagAlt,
}: {
  name: string;
  ptName: string;
  flag: string;
  flagAlt: string;
}) {
  return (
    <Link href={`/country/${name}`} key={name}>
      <article className="h-64 min-w-full p-2 bg-white border-2 rounded-xl hover:border-indigo-200 transition-all hover:shadow-xl hover:cursor-pointer flex flex-col justify-around">
        <div className="relative w-full h-40 p-2 overflow-hidden rounded-xl">
          <Image src={flag} alt={flagAlt} fill className="object-cover" />
        </div>

        <h1 className="text-center font-bold text-xl">{ptName}</h1>
      </article>
    </Link>
  );
}
