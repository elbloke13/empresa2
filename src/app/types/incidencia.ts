export type Severidad = "Baja" | "Media" | "Alta" | "Crítica";

export type EstadoIncidencia = "Abierta" | "En progreso" | "Resuelta";

export type CategoriaIncidencia =  | "Phishing"  | "Malware"  | "Vulnerabilidad"  | "Acceso no autorizado"  | "Otro";

export type Incidencia = {
  id?: string;
  titulo: string;
  categoria: CategoriaIncidencia;
  severidad: Severidad;
  estado: EstadoIncidencia;
  fecha: string;
  descripcion: string;
};