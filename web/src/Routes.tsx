import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { App } from "./App";
import { PrivateRoute } from "./components/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute";
import { Login } from "./features/auth/Login";
import { SignUp } from "./features/auth/SignUp";
import { ListPage } from "./features/lists/ListPage";
import ProjectPage from "./features/projects/ProjectPage";
import { Welcome } from "./pages/Welcome";

export const NeptuneRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        {/* Public routes */}
        <Route path="" element={<PublicRoute />}>
          <Route path="" element={<Welcome />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        {/* Private routes */}
        <Route path="app" element={<PrivateRoute />}>
          <Route path="inbox" element={<ListPage />} />
          <Route path="list/:listId" element={<ListPage />} />
          <Route path="project/:projectId" element={<ProjectPage />} />
        </Route>
      </Route>
    </Routes>
  </Router>
);
