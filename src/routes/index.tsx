import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProjectsList from "../pages/ProjectsList";

function routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProjectsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default routes;
