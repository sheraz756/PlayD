import '../styles/globals.css';
import '../styles/adduser.css';
import '../styles/addmovie.css';
import { destroyCookie, parseCookies } from 'nookies';
import baseUrl from '../utils/baseUrl';
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import Layout from '../components/layout/Layout';
import { redirectUser } from '../utils/authUser';
import axios from 'axios';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'react-toastify/dist/ReactToastify.css';
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above


function MyApp({ Component, pageProps }) {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  )
}


MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { token } = parseCookies(ctx);
  let pageProps = {};
  const adminRoutes = ctx.pathname === '/users' ||  ctx.pathname === '/currentuser' || ctx.pathname === '/bdo' || ctx.pathname === '/freetrailuser'  || ctx.pathname === '/bdo/addbdo' || ctx.pathname === '/users/adduser' || ctx.pathname === '/staff' || ctx.pathname === '/staff/addstaff' || ctx.pathname === '/staff/[staffname]' || ctx.pathname === '/voucher/goldvoucher' || ctx.pathname === '/feedback' || ctx.pathname === '/request' || ctx.pathname === '/fundingpanel/donation' || ctx.pathname === '/fundingpanel/[id]' || ctx.pathname === '/advertisment/createAd' || ctx.pathname === '/giveaway';


  const protectedRoutes = ctx.pathname === '/' || ctx.pathname === '/currentuser' || ctx.pathname === 'bdo/addbdo'  || ctx.pathname === '/freetrailuser'  || ctx.pathname === '/movies' || ctx.pathname === '/movies/addmovie' || ctx.pathname === '/movies/[id]' || ctx.pathname === '/fundingpanel' || ctx.pathname === '/advertisment' || ctx.pathname === '/voucher' || ctx.pathname === '/voucher/[id]' || ctx.pathname === '/giveaway/giveawaywinners' || ctx.pathname === '/giveaway/[id]' || ctx.pathname === '/series' || ctx.pathname === '/series/addSeries' || ctx.pathname === '/series/[id]' || ctx.pathname === '/feedback/[id]' || ctx.pathname === '/request/[id]' || ctx.pathname === '/[username]' || ctx.pathname === '/explore' || ctx.pathname === '/explore/addExplore';

  if (!token) {
    (protectedRoutes || adminRoutes) && redirectUser(ctx, '/login');
  } else {
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    try {
      const res = await axios.get(`${baseUrl}/auth/isAdmin`, { headers: { Authorization: token } });
      const { user } = res.data;
      if (user.role === 'admin') {
        (!protectedRoutes && !adminRoutes) && redirectUser(ctx, '/');
      }
      if (user.role === 'complain responder') {
        (!protectedRoutes || adminRoutes) && redirectUser(ctx, '/');
      }
      if (user.role === 'request responder') {
        (!protectedRoutes || adminRoutes) && redirectUser(ctx, '/');
      }
      pageProps.user = user;
    } catch (error) {
      destroyCookie(ctx, 'token');
      redirectUser(ctx, '/login');
    }
  }

  return { pageProps };
}

export default MyApp
