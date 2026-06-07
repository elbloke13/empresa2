import { reglasClasificacion } from "@/data/clasificacion";
import { CategoriaIncidencia, Severidad } from "@/app/types/incidencia";

type ResultadoClasificacion = {
  categoria: CategoriaIncidencia;
  severidad: Severidad;
};

export const clasificarIncidencia = (texto: string): ResultadoClasificacion => {
  const textoNormalizado = texto.toLowerCase();

  for (const regla of reglasClasificacion) {
    const encontrada = regla.keywords.some((keyword) =>
      textoNormalizado.includes(keyword.toLowerCase())
    );

    if (encontrada) {
      return {
        categoria: regla.categoria as CategoriaIncidencia,
        severidad: regla.severidad as Severidad,
      };
    }
  }

  return {
    categoria: "Otro",
    severidad: "Baja",
  };
};