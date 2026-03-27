import { Layout } from "@/components/Layout";
import { About } from "@/pages/About";
import { Admin } from "@/pages/Admin";
import { Contact } from "@/pages/Contact";
import { Home } from "@/pages/Home";
import { Videos } from "@/pages/Videos";
import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const videosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/videos",
  component: Videos,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: Admin,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  videosRoute,
  aboutRoute,
  contactRoute,
  adminRoute,
]);

export const router = createRouter({ routeTree });
