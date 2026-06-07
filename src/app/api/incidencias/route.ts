import { NextResponse } from "next/server";
import { connectToMongoDB, getDB } from "@/lib/mongo";
import { clasificarIncidencia } from "@/lib/clasificarIncidencia";

export async function POST(req: Request) {

  try {
    const { titulo, descripcion } = await req.json();

    if (!titulo || !descripcion) {
      return NextResponse.json(
        { message: "Título y descripción son obligatorios" },
        { status: 400 }
      );
    }

    const textoCompleto = `${titulo} ${descripcion}`;
    const clasificacion = clasificarIncidencia(textoCompleto);

    await connectToMongoDB();
    const db = getDB();

    const nuevaIncidencia = {
      titulo,
      descripcion,
      categoria: clasificacion.categoria,
      severidad: clasificacion.severidad,
      estado: "Abierta",
      fecha: new Date().toISOString().split("T")[0],
    };

    const result = await db.collection("incidencias").insertOne(nuevaIncidencia);

    return NextResponse.json({
      message: "Incidencia creada correctamente",
      incidencia: {
        ...nuevaIncidencia,
        id: result.insertedId.toString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al crear la incidencia" },
      { status: 500 }
    );
  }
};

export async function GET() {
  try {
    await connectToMongoDB();
    const db = getDB();

    const incidencias = await db
      .collection("incidencias")
      .find({})
      .sort({ _id: -1 })
      .toArray();

    const incidenciasFormateadas = incidencias.map((inc) => ({
      id: inc._id.toString(),
      titulo: inc.titulo,
      descripcion: inc.descripcion,
      categoria: inc.categoria,
      severidad: inc.severidad,
      estado: inc.estado,
      fecha: inc.fecha,
    }));

    return NextResponse.json(incidenciasFormateadas);
  } catch (error) {
    return NextResponse.json(
      { message: "Error al obtener incidencias" },
      { status: 500 }
    );
  }
}