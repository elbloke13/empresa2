"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import api from "./api/api";
import { Incidencia } from "@/app/types/incidencia";
import AppLayout from "./components/AppLayout";
import StatCard from "./components/StatCard";
import StatusBadge from "./components/StatusBadge";

const DashboardPage = () => {
  const router = useRouter();

  const [incidencias, setIncidencias] = useState<Incidencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getIncidencias = async () => {
      try {
        const res = await api.get("/api/incidencias");
        setIncidencias(res.data);
      } catch (error) {
        console.log("Error cargando incidencias", error);
      } finally {
        setLoading(false);
      }
    };

    getIncidencias();
  }, []);

  const filteredIncidencias = useMemo(() => {
    const normalizedSearch = searchTerm.toLowerCase().trim();

    if (!normalizedSearch) return incidencias;

    return incidencias.filter((inc) => {
      return (
        inc.titulo.toLowerCase().includes(normalizedSearch) ||
        inc.categoria.toLowerCase().includes(normalizedSearch) ||
        inc.descripcion.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [incidencias, searchTerm]);

  const totalIncidencias = incidencias.length;

  const incidenciasCriticas = useMemo(() => {
    return incidencias.filter((inc) => inc.severidad === "Crítica").length;
  }, [incidencias]);

  const porcentajeResueltas = useMemo(() => {
    const resueltas = incidencias.filter((inc) => inc.estado === "Resuelta").length;

    if (incidencias.length === 0) return 0;

    return Math.round((resueltas / incidencias.length) * 100);
  }, [incidencias]);

  const goToNuevaIncidencia = () => {
    router.push("/nueva-incidencia");
  };

  const goToDetalle = (id?: string) => {
    if (!id) return;
    router.push(`/incidencia/${id}`);
  };

  return (
    <AppLayout searchTerm={searchTerm} onSearchChange={setSearchTerm}>
      <div className="pageIntro">
        <span className="pageEyebrow">Panel principal</span>
        <h1 className="pageTitle">Incidencias de seguridad</h1>
        <p className="pageSubtitle">
          Supervisa el estado de las incidencias registradas y consulta su criticidad.
        </p>
      </div>

      <section className="cardsContainer">
        <StatCard
          title="Críticas"
          value={incidenciasCriticas}
          description="Requieren atención inmediata"
          icon="!"
        />

        <StatCard
          title="Total"
          value={totalIncidencias}
          description="Incidencias registradas"
          icon="#"
        />

        <StatCard
          title="Resueltas"
          value={`${porcentajeResueltas}%`}
          description="Porcentaje completado"
          icon="%"
        />
      </section>

      <section className="tableSection">
        <div className="tableHeader">
          <div>
            <h2>Incidencias recientes</h2>
            <p>Consulta y accede al detalle de cada incidencia</p>
          </div>

          <button className="primaryButton" onClick={goToNuevaIncidencia}>
            + Nueva incidencia
          </button>
        </div>

        {loading ? (
          <p>Cargando incidencias...</p>
        ) : filteredIncidencias.length === 0 ? (
          <p>No hay incidencias que coincidan con la búsqueda.</p>
        ) : (
          <table className="incidenciasTable">
            <thead>
              <tr>
                <th>Título</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>Criticidad</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncidencias.map((incidencia) => (
                <tr
                  key={incidencia.id}
                  onClick={() => goToDetalle(incidencia.id)}
                  className="clickableRow"
                >
                  <td>{incidencia.titulo}</td>
                  <td>{incidencia.categoria}</td>
                  <td>
                    <StatusBadge value={incidencia.estado} type="estado" />
                  </td>
                  <td>
                    <StatusBadge value={incidencia.severidad} type="severidad" />
                  </td>
                  <td>{incidencia.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </AppLayout>
  );
};

export default DashboardPage;