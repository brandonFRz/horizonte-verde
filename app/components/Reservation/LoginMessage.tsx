import Link from "next/link";

// Componente que muestra un mensaje de inicio de sesión cuando no hay un usuario registrado
export default function LoginMessage() {
  return (
    <div className='grid bg-primary-800 '>
      <p className='text-center text-xl py-12 self-center'>
        PorFavor{' '}
        <Link href='/auth/signin' className='underline text-accent-500'>
          Inicie sesión
        </Link>{' '}
        para reservar 
        <br /> una cabaña ahora
      </p>
    </div>
  );
}
