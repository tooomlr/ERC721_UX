import React from "react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
        const navigate = useNavigate();
    return (
        <>
            <nav>
                <h1>TD ERC721-UX TOM LERO</h1>
            </nav>
            <h1>Menu</h1>
            <div>
                <button className="button" onClick={() => navigate("/chain-info")}>Chain Info</button>
                <button className="button" onClick={() => navigate("/fakeBayc")}>Fake Bayc</button>
                <button className="button" onClick={() => navigate("/fakeNefturians")}>Fake Nefturians</button>
            </div>

        </>

    )
};

export default Menu;