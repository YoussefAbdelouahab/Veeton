import { Route, Routes } from "react-router-dom";

import Home from "./views/Home/Home";
import Chat from "./views/Chat/Chat";


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );

}