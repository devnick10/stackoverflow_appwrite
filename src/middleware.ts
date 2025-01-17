import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 import getOrCreateStorage from './models/server/storageSetup';
 import getOrCreateDB from './models/server/dbSetup';


// This function can be marked `async` if using `await` inside

export async function middleware(request: NextRequest) {
     
    await Promise.all([
        getOrCreateStorage(),
        getOrCreateDB() 
    ])

  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  
};