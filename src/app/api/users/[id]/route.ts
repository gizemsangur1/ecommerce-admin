import { NextRequest, NextResponse } from "next/server";


export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const token = req.headers.get("authorization"); 

    if (!token) {
      return NextResponse.json({ message: "Yetki gerekli" }, { status: 401 });
    }

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, 
        },
      }
    );

    if (!backendRes.ok) {
      const errorData = await backendRes.json();
      return NextResponse.json(
        { message: "Backend hatası", error: errorData },
        { status: backendRes.status }
      );
    }

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Sunucu hatası", error: error.message },
      { status: 500 }
    );
  }
}