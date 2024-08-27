import React from "react";
import Image from "next/image";
import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";
import { getCabins } from "../lib/data-service";
import { Cabins } from "@/app/types/Cabins";

// Configuramos la revalidación para que los datos se actualicen cada 86400 segundos (1 día).
export const revalidate = 86400;

//Componente de la pagina 'About', definida de manera asíncrona para manejar cabañas que hay.
export default async function Page() {
  const cabins:Cabins[] = await getCabins();

  return (
    <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium ">
          Bienvendio al Horizonte verde
        </h1>
        <div className="space-y-8">
          <p>
            En Horizonte verde, nos apasiona ofrecer experiencias inolvidables
            en la naturaleza. Fundada en 1962, nuestra misión es brindar a
            nuestros huéspedes un refugio tranquilo y lujoso lejos del bullicio
            de la vida cotidiana. Ubicados en el corazón de los alpes, nuestras {cabins.length} cabañas están rodeadas de impresionantes paisajes
            que te invitan a relajarte y reconectar con la naturaleza.
          </p>
          <p>
            Cada una de nuestras cabañas ha sido cuidadosamente diseñada para
            combinar el encanto rústico con las comodidades modernas. Nos
            enorgullecemos de nuestro compromiso con la sostenibilidad y el
            respeto por el entorno natural, utilizando materiales ecológicos y
            prácticas de bajo impacto ambiental en todas nuestras operaciones.
          </p>
        </div>
      </div>

      <div className=" relative aspect-square col-span-2">
        <Image
          src={image1}
          className="object-cover"
          placeholder="blur"
          quality={85}
          alt="Familia en el bosque"
          fill
        />
      </div>

      <div className="relative aspect-square col-span-2">
        <Image
          src={image2}
          fill
          className="object-cover"
          alt="Family en el bosque"
        />
      </div>

      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          El mejor servicio
        </h1>
        <div className=" space-y-8">
          <p>
            Nuestro equipo está dedicado a proporcionar un servicio excepcional
            y personalizado. Desde el momento en que llegas hasta el día de tu
            partida, nos esforzamos por asegurarnos de que tu estancia sea
            cómoda, relajante y memorable. Ya sea que busques una escapada
            romántica, unas vacaciones familiares o un retiro tranquilo, estamos
            aquí para hacer realidad tus sueños.
          </p>
          <p>
            Gracias por elegir Horizonte verde. Esperamos darte la bienvenida
            pronto y compartir contigo la belleza y serenidad de nuestro rincón
            especial del mundo.
          </p>
          <div>
            <a
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg hover:bg-accent-600 transition-all"
            >
              Explora nuestas lujosas cabañas
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
