"use client";
import Image from "next/image";
import {signIn} from "next-auth/react";

// Componente para manejar el botón de inicio de sesión con Google.
function SignInButton() {
  const handleSignIn = async () => {
    await signIn("google", {callbackUrl: "/account"});
  }

  return (
      <button onClick={handleSignIn} className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Entra con Google</span>
      </button>
  );
}

export default SignInButton;
