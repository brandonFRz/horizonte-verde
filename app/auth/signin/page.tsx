
import SignInButton from "@/app/ui/SignInButton";

export default function Page() {
    return (
      <div className="flex flex-col gap-10 mt-10 items-center">
        <h2 className="text-3xl font-semibold">
          Inicie sesión para reservar una cabaña
        </h2>

        <SignInButton/>
      </div>
    );
  }
  