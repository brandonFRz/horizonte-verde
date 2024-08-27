import { getCountries } from '@/app/lib/data-service';

///Interfaces///
interface SelectCountryProps {
  defaultCountry: string;
  name: string;
  id: string;
  className: string;
}

// Componente SelectCountry como función asincrónica
async function SelectCountry({ defaultCountry, name, id, className }: SelectCountryProps): Promise<JSX.Element> {
  // Obtiene la lista de países de la función 'getCountries'
  const countries = await getCountries();

  // Encuentra la bandera del país por defecto, o usa una cadena vacía si no se encuentra
  const flag = countries.find((country) => country.name === defaultCountry)?.flag ?? '';

  return (
    <select
      name={name}
      id={id}
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value=''>Seleccione su pais...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;