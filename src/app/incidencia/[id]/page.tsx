"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/app/api/api";
import { Incidencia } from "@/app/types/incidencia";
import AppLayout from "@/app/components/AppLayout";
import StatusBadge from "@/app/components/StatusBadge";

const DetalleIncidenciaPage = () => {
  const router = useRouter();
  const params = useParams();

  const [incidencia, setIncidencia] = useState<Incidencia | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getIncidencia = async () => {
      try {
        const id = Array.isArray(params.id) ? params.id[0] : params.id;
        const res = await api.get(`/api/incidencias/${id}`);
        setIncidencia(res.data);
      } catch (error) {
        console.log("Error cargando incidencia", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      getIncidencia();
    }
  }, [params.id]);

  return (
    <AppLayout>
      {loading ? (
        <div className="detailCard">
          <p>Cargando incidencia...</p>
        </div>
      ) : !incidencia ? (
        <div className="detailCard">
          <h1>Incidencia no encontrada</h1>
          <button className="secondaryButton" onClick={() => router.push("/")}>
            Volver al panel
          </button>
        </div>
      ) : (
        <>
          <div className="pageIntro">
            <span className="pageEyebrow">Detalle de incidencia</span>
            <h1 className="pageTitle">{incidencia.titulo}</h1>
            <p className="pageSubtitle">
              Consulta la información principal y la clasificación registrada.
            </p>
          </div>

          <div className="detailPageGrid">
            <section className="detailMainCard">
              <div className="detailSectionHeader">
                <h2>Resumen</h2>
                <button className="secondaryButton" onClick={() => router.push("/")}>
                  Volver
                </button>
              </div>

              <div className="detailInfoGrid">
                <div className="detailInfoBox">
                  <span className="detailLabel">Categoría</span>
                  <p className="detailValue">{incidencia.categoria}</p>
                </div>

                <div className="detailInfoBox">
                  <span className="detailLabel">Severidad</span>
                  <div>
                    <StatusBadge value={incidencia.severidad} type="severidad" />
                  </div>
                </div>

                <div className="detailInfoBox">
                  <span className="detailLabel">Estado</span>
                  <div>
                    <StatusBadge value={incidencia.estado} type="estado" />
                  </div>
                </div>

                <div className="detailInfoBox">
                  <span className="detailLabel">Fecha</span>
                  <p className="detailValue">{incidencia.fecha}</p>
                </div>
              </div>

              <div className="detailTextBlock">
                <span className="detailLabel">Descripción</span>
                <p>{incidencia.descripcion}</p>
              </div>
            </section>

            <aside className="detailAside">
              <div className="previewCard">
                <h3>Clasificación actual</h3>
                <p>Resultado asignado en el momento de crear la incidencia.</p>

                <div className="previewBlock">
                  <span className="previewLabel">Categoría</span>
                  <span className="previewValue">{incidencia.categoria}</span>
                </div>

                <div className="previewBlock">
                  <span className="previewLabel">Severidad</span>
                  <span className="previewValue">{incidencia.severidad}</span>
                </div>

                <div className="previewBlock">
                  <span className="previewLabel">Estado</span>
                  <span className="previewValue">{incidencia.estado}</span>
                </div>
              </div>
            </aside>
          </div>
        </>
      )}
    </AppLayout>
  );
};

export default DetalleIncidenciaPage;