export const config = {
  matcher: [], // Empty matcher means no routes will trigger the middleware
};

export async function middleware(request) {
  // Optional: log that middleware is disabled
  console.log('Middleware is currently disabled');
  return NextResponse.next();
}
