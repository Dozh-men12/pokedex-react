import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { HomePage, PokemonPage, SearchPage } from "./pages";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<HomePage />} />
        <Route path="pokemon/:id" element={<PokemonPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRouter;
