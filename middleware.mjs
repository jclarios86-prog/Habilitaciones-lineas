import { NextResponse } from 'next/server';

export function middleware(req) {
  const authHeader = req.headers.get('authorization');

  // CONFIGURACIÓN DE ACCESO
  const USER = 'Mpruebas'; 
  const PASS = 'Sta_Als_Caf';

  if (authHeader) {
    const auth = authHeader.split(' ')[1];
    const [user, password] = atob(auth).split(':');

    if (user === USER && password === PASS) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Acceso restringido', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Acceso Protegido"',
    },
  });
}