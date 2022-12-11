import React from "react";
import { Route, Routes } from "react-router-dom";
import ChainInfo from "./chain-info";
import WrongNetwork from "./error";
import Menu from "./menu";
import FakeBayc from "./fakeBayc";
import FakeBaycToken from "./fakeBaycToken";
import FakeNefturians from "./fakeNefturians";
import FakeNefturiansWallet from "./fakeNefturiansWallet";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/chain-info" element={<ChainInfo />} />
            <Route path="/wrongNetwork" element={<WrongNetwork />} />
            <Route path="/fakeBayc" element={<FakeBayc />} />
            <Route path="/fakeBayc/:tokenId" element={<FakeBaycToken />} />
            <Route path="/fakeNefturians" element={<FakeNefturians  />} />
            <Route path="/fakeNefturians/:address" element={<FakeNefturiansWallet  />} />
        </Routes>
    );
}

export default AppRoutes;