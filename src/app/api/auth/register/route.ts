import { NextResponse } from "next/server";
import { connectToMongoDB, getDB } from "@/lib/mongo";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    await connectToMongoDB();
    const db = getDB();

    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Ya existe un usuario con ese email" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({
      message: "Usuario registrado correctamente",
      userId: result.insertedId,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al registrar usuario" },
      { status: 500 }
    );
  }
}