import { LocationProvider, Router, Route } from "preact-iso";
import FinderApp, { AboutPage, ContactPage, DesktopPage, WorkPage } from "./components/finder-app";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const route = (page = "") => page ? `${base}/${page}/` : `${base}/`;

export function App({ url }: { url?: string }) {
  return (
    // @ts-expect-error preact-iso accepts the prerender URL at runtime.
    <LocationProvider url={url}>
      <FinderApp>
        <Router>
          <Route path={route()} component={DesktopPage} />
          <Route path={route("about")} component={AboutPage} />
          <Route path={route("work")} component={WorkPage} />
          <Route path={route("contact")} component={ContactPage} />
          <Route default component={DesktopPage} />
        </Router>
      </FinderApp>
    </LocationProvider>
  );
}
