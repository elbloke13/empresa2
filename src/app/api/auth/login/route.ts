import { NextResponse } from "next/server";
import { connectToMongoDB, getDB } from "@/lib/mongo";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email y contraseña obligatorios" },
        { status: 400 }
      );
    }

    await connectToMongoDB();
    const db = getDB();

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Credenciales incorrectas" },
        { status: 401 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Credenciales incorrectas" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      message: "Login correcto",
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });

    response.cookies.set("token", user._id.toString(), {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Error en el login" },
      { status: 500 }
    );
  }
}