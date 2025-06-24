import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Coin from "./pages/Coin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/coin" element={<Coin />} />
            {/* <Route path="/watchlist" element={<Watchlist />} /> */}
            {/* <Route index element={<Home />}></Route>
            
            <Route path="/coin" element={<Coin />} /> */}
            {/* <Route path="*" element={<NoPage />}></Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
