// create a router with react router dom v6
import { RouteObject, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/home";

const routes: RouteObject[] = [{ path: "/", element: <HomePage /> }];

export const router = createBrowserRouter(routes);
