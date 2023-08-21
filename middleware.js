import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// This function can be marked `async` if using `await` inside
export async function middleware(request) {

    const token = request.cookies.get('MyTokenName')
    console.log(token);
    console.log(token === undefined);

        if (token === undefined) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        try {
            console.log("ejecutando middleware");
            const { payload } = await jwtVerify(token.value, new TextEncoder().encode(process.env.NEXT_PUBLIC_secrettoken))
            console.log("lo que sigue ps");
            console.log("middleware");
            console.log(payload);
            return NextResponse.next()
        } catch (error) {
            console.error(error);
            return NextResponse.redirect(new URL('/login', request.url))
        }

    return NextResponse.next();
}

export const config = {
    //matcher: ['/dashboard/:path*','/review','/schedule','/register','/']
    matcher: ['/setting']
}