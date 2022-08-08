import React from "react";
import { BrowserRouter as Router, Routes, Route, HashRouter} from "react-router-dom";
import TrelloBoard from "../components/trelloBoard";
import Layout from "../components/layouts/Layout";
import Home from "../components/Home";
import NotFound from "../components/NotFound";

const AppRouter = () => {
    return (
        <HashRouter basename='/'>
          <Routes element={<Layout/>}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/b">
                <Route path=":boardId" element={<TrelloBoard />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </HashRouter>
    );
  }

export default AppRouter