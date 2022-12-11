import { useState } from "react";
import { ethers } from "ethers";
import WrongNetwork from "./error";
import {useNavigate} from "react-router-dom";


const ChainInfo = () => {
    const [state, setState] = useState({});
    const navigate = useNavigate();
    const connect = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const signerAddress = await signer.getAddress();
            const network = await provider.getNetwork();
            const lastBlock = await provider.getBlockNumber();
            const networkName = network.name;
            const chainId = network.chainId;
            setState({providerData: {networkName, lastBlock, chainId, signerAddress}, provider, signer});
        } catch (error) {
            console.log(error);
            setState({error: "It seems that you have an error"});
        };
    };

    return (
        <>
            <h1>Chain Info</h1>
            {!state.providerData &&
                <div>
                    <button onClick={connect}>Connect to Metamask</button>
                    <br></br>
                    <a href="/">
                        <button>Return to main page here</button>
                    </a>
                </div>}

            {state.providerData && state.providerData.networkName !== 'sepolia' && <WrongNetwork/>}
            {state.error && <div>
                <div >
                    <p>{state.error}</p>
                </div>
            </div>}
            {state.providerData &&
                <>
                    <div>
                        <div>
                            <h3>Network name :</h3>
                            <p>{state.providerData.networkName}</p>
                        </div>
                        <div>
                            <h3>Last block number :</h3>
                            <p>{state.providerData.lastBlock}</p>
                        </div>
                        <div>
                            <h3>Chain id :</h3>
                            <p>{state.providerData.chainId}</p>
                        </div>
                        <div>
                            <h3>User Address :</h3>
                            <p>{state.providerData.signerAddress}</p>
                        </div>

                        <br></br>
                        <button onClick={() => navigate("/")}>Return to main page here</button>
                    </div>
                </>
            }
        </>
    );

};

export default ChainInfo;