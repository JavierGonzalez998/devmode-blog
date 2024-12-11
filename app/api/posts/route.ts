import { NextResponse } from 'next/server';

interface RequestBody {
    nombre: string;
    edad: number;
  }
  
  export async function POST(request: Request): Promise<NextResponse> {
    try {
      // Leer y parsear los datos del cuerpo de la solicitud
      const body: RequestBody = await request.json();
  
      // Validar los datos (opcional)
      if (!body.nombre || typeof body.edad !== 'number') {
        return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
      }
  
      // Procesar la solicitud
      const resultado = {
        mensaje: 'Datos recibidos correctamente',
        data: body,
      };
  
      // Devolver la respuesta con un status 200
      return NextResponse.json(resultado, { status: 200 });
    } catch (error) {
      // Manejar errores inesperados
      return NextResponse.json(
        { error: 'Error procesando la solicitud'},
        { status: 500 }
      );
    }
  }