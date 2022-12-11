import { ethers } from "ethers";
import { useState, useEffect  } from "react";
import { useNavigate } from 'react-router-dom';
import {FakeNefturiansABI} from "../../Contract/contract";

const FakeNefturians = () => {
    const [state, setState] = useState({});
    const navigate = useNavigate();
    const contractData = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const fakeNefturiansAddress="0x9bAADf70BD9369F54901CF3Ee1b3c63b60F4F0ED";
            const ct = new ethers.Contract(fakeNefturiansAddress, FakeNefturiansABI.abi, signer);
            const name = await ct.name();
            const symbol = await ct.symbol();
            let price = await ct.tokenPrice();
            price = ethers.utils.formatEther(price);
            setState({signer: signer, contractName: name, contractSymbol: symbol, contract: ct, price: price});
        } catch (error) {
            console.log(error);
        };
    }

    useEffect(()=>{
        contractData();
    },[]);

    const buyAToken = async () =>{
        if (await state.signer){
            let price = state.price + 1;
            await state.contract.buyAToken({value: ethers.utils.parseEther(price)});
        }else{
            contractData();
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        const target = e.currentTarget;
        const userAddress = target.userAddress.value === '' ? await state.signer.getAddress() : target.userAddress.value;
        navigate("/fakeNefturians/"+userAddress);
    };

    return (
        <>
            <h1>Fake Nefturians</h1>

            {state.contractName && <div>
                <div>
                    <h3>Contract name :</h3>
                    <p>{state.contractName || ""}</p>
                </div>
                <div>
                    <h3>Contract symbol</h3>
                    <p>{state.contractSymbol || ""}</p>
                </div>
                <div>
                    <h3>Token Price ($ETH):</h3>
                    <p>{state.price || ""}</p>
                </div>
            </div>}

            <div>
                {state.signer && <button onClick={buyAToken}>Buy your NFT</button>}
                <form onSubmit={submit}>
                    <h3>See wallet portfolio :</h3>
                    <input type="text" id="userAddress" name="userAddress" placeholder="Any address"/>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <button onClick={() => navigate("/")}>Return to main page here</button>
        </>
    );
};

export default FakeNefturians;