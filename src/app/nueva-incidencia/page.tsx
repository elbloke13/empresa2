"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../api/api";
import AppLayout from "../components/AppLayout";
import { clasificarIncidencia } from "@/lib/clasificarIncidencia";

const NuevaIncidenciaPage = () => {
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);

  const clasificacionPreview = useMemo(() => {
    const texto = `${titulo} ${descripcion}`.trim();

    if (!texto) {
      return {
        categoria: "Pendiente",
        severidad: "Sin clasificar",
      };
    }

    return clasificarIncidencia(texto);
  }, [titulo, descripcion]);

  const crearIncidencia = async () => {
    if (!titulo || !descripcion) {
      alert("Completa título y descripción");
      return;
    }

    try {
      setLoading(true);

      await api.post("/api/incidencias", {
        titulo,
        descripcion,
      });

      router.push("/");
    } catch (error: any) {
      alert(error.response?.data?.message || "Error al crear la incidencia");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="pageIntro">
        <span className="pageEyebrow">Nueva incidencia</span>
        <h1 className="pageTitle">Registrar incidencia</h1>
        <p className="pageSubtitle">
          Añade una nueva incidencia y revisa la clasificación automática antes de guardarla.
        </p>
      </div>

      <div className="createIncidentGrid">
        <section className="createIncidentMain">
          <div className="createCard">
            <div className="createCardHeader">
              <h2>Información principal</h2>
              <p>Introduce los datos básicos de la incidencia detectada.</p>
            </div>

            <div className="createFormGroup">
              <label>Título</label>
              <input
                type="text"
                placeholder="Ej. Correo sospechoso recibido"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>

            <div className="createFormGroup">
              <label>Descripción</label>
              <textarea
                placeholder="Describe lo ocurrido con el mayor detalle posible"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={8}
              />
            </div>

            <div className="keywordHints">
              <span className="keywordHint">phishing</span>
              <span className="keywordHint">malware</span>
              <span className="keywordHint">ransomware</span>
              <span className="keywordHint">acceso no autorizado</span>
              <span className="keywordHint">vulnerabilidad</span>
            </div>

            <div className="formButtons">
              <button className="secondaryButton" onClick={() => router.push("/")}>
                Cancelar
              </button>

              <button className="primaryButton" onClick={crearIncidencia} disabled={loading}>
                {loading ? "Guardando..." : "Guardar incidencia"}
              </button>
            </div>
          </div>
        </section>

        <aside className="createIncidentAside">
          <div className="previewCard">
            <h3>Clasificación automática</h3>
            <p>Vista previa calculada a partir del texto introducido.</p>

            <div className="previewBlock">
              <span className="previewLabel">Categoría</span>
              <span className="previewValue">{clasificacionPreview.categoria}</span>
            </div>

            <div className="previewBlock">
              <span className="previewLabel">Severidad</span>
              <span className="previewValue">{clasificacionPreview.severidad}</span>
            </div>

            <div className="previewNote">
              La clasificación se apoya en palabras clave definidas en la lógica interna del sistema.
            </div>
          </div>

          <div className="previewCard">
            <h3>Recomendaciones</h3>
            <ul className="recommendationList">
              <li>Usa un título claro y corto.</li>
              <li>Describe qué ocurrió y cómo se detectó.</li>
              <li>Incluye términos clave si identificas el tipo de amenaza.</li>
            </ul>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
};

export default NuevaIncidenciaPage;