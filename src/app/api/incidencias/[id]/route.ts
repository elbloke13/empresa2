import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToMongoDB, getDB } from "@/lib/mongo";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Id inválido" },
        { status: 400 }
      );
    }

    await connectToMongoDB();
    const db = getDB();

    const incidencia = await db.collection("incidencias").findOne({
      _id: new ObjectId(id),
    });

    if (!incidencia) {
      return NextResponse.json(
        { message: "Incidencia no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: incidencia._id.toString(),
      titulo: incidencia.titulo,
      descripcion: incidencia.descripcion,
      categoria: incidencia.categoria,
      severidad: incidencia.severidad,
      estado: incidencia.estado,
      fecha: incidencia.fecha,
    });
  } catch (error) {
    console.log("Error en GET incidencia por id:", error);

    return NextResponse.json(
      { message: "Error al obtener la incidencia" },
      { status: 500 }
    );
  }
}