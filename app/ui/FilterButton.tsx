
///Interfaces///
interface ButtonProps {
    filter: string;//El valor del filtro que representa el botón.
    handleFilter: (filter: string) => void; //Función que maneja los cambios en el filtro cuando se hace click.
    activeFilter: string; //El botón actualmente activo para aplicar los estilos.
    children: React.ReactNode; // El contenido dentro del botón
  }

  //Este componente se usa para filtrar las cabañas según su tamaño y ademas aplicar estilo al botón activo.
export default function Button({ filter, handleFilter, activeFilter, children }: ButtonProps){
    return (
      <button
        onClick={() => handleFilter(filter)}
        className={`px-5 py-2 ${
          activeFilter === filter ? "bg-primary-800 text-primary-100" : ""
        }`}
      >
        {children}
      </button>
    );
  }