import { auth } from './auth';

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

const apiAuthPrefix = '/api/auth';
const publicRoutes = ['/checkin', '/login'];
const authRoutes = ['/login'];
const artistRoutes = ['/dashboard'];
const livehouseRoutes = ['/gift', '/scanner'];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isArtistRoutes = artistRoutes.includes(nextUrl.pathname);
  const isLivehouseRoutes = livehouseRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    //return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      if (req.auth?.user.role.includes('listener')) {
        return Response.redirect(new URL('/event', nextUrl));
      }
      return Response.redirect(new URL('/dashboard', nextUrl));
    }
  }

  if (isLoggedIn) {
    if (isArtistRoutes) {
      if (req.auth?.user.role.includes('listener')) {
        return Response.redirect(new URL('/event', nextUrl));
      }
    }
    if (isLivehouseRoutes) {
      if (req.auth?.user.role.includes('livehouse') === false) {
        return Response.redirect(new URL('/mypage', nextUrl));
      }
    }
  }
  if ((isLoggedIn && isPublicRoute) || nextUrl.pathname === '/') {
    if (req.auth?.user.role.includes('listener')) {
      return Response.redirect(new URL('/event', nextUrl));
    }
    return Response.redirect(new URL('/dashboard', nextUrl));
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }
});
