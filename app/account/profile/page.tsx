import SelectCountry from "@/app/components/Account/SelectCountry";
import UpdateProfileForm from "@/app/components/Account/UpdateProfileForm";
import { getServerSession } from "next-auth";
import { Session } from "@/app/types/Session";
import { authOptions } from "@/app/lib/auth";
import { getGuest } from "@/app/lib/data-service";
import { Guest } from "@/app/types/Guest";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Perfil de usuario",
};

//Pagina que permite el actualizar el perfil del usuario.
export default async function Page() {
  // Obtiene la sesión actual del usuario.
  const session:Session = await getServerSession(authOptions)

	if (!session) {
    redirect("/auth/signin");
	}

    // Obtiene los datos del huésped utilizando el correo electrónico del usuario.
  const guest:Guest = await getGuest(session.user.email)

  //Renderiza el formulario con lo datos del perfil del huésped.
  return (
    <div>
      <h2 className="text-2xl font-semibold text-accent-400">
        Actualice su perfil de usuario
      </h2>

      <p className="text-lg py-3 text-primary-200">
        Si nos facilita la siguiente información, el proceso de facturación será
        más rápido y sencillo.
      </p>

      <UpdateProfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="w-full px-5 py-3 bg-primary-200 text-primary-800 shadow-sm rounded-sm  "
          defaultCountry={guest.nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
