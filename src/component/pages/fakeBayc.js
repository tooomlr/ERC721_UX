import { ethers } from "ethers";
import { FakeBAYCABI } from '../../Contract/contract';
import { useState, useEffect  } from "react";
import { useNavigate } from 'react-router-dom';

const FakeBayc = () => {
    const [state, setState] = useState({});
    const navigate = useNavigate();


    const contractData = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const fakeBaycAddress="0x1dA89342716B14602664626CD3482b47D5C2005E";
            const ct = new ethers.Contract(fakeBaycAddress, FakeBAYCABI.abi, signer);
            const name = await ct.name();
            const symbol = await ct.symbol();
            const totalSupplyBn = await ct.totalSupply();
            const totalSupply = ethers.utils.formatEther(totalSupplyBn);
            setState({signer: signer, contractName: name, contractSymbol: symbol, contract: ct, totalSupply});
        } catch (error) {
            console.log(error);
        };
    }

    useEffect(()=>{
        contractData();
    },[]);

    const ClaimAToken = async () =>{
        if (await state.signer){
            await state.contract.claimAToken();
        }else{
            contractData();
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        const target = e.currentTarget;
        const tokenID = target.tokenID.value;
        navigate("/fakeBayc/"+tokenID);
    };

    return (
        <>
            <h1>Fake Bayc</h1>

            {state.contractName && <div>
                <div>
                    <h3>Contract name :</h3>
                    <p>{state.contractName || ""}</p>
                </div>
                <div>
                    <h3>Contract symbol :</h3>
                    <p>{state.contractSymbol || ""}</p>
                </div>
                <div>
                    <h3>Total supply :</h3>
                    <p>{state.totalSupply || ""}</p>
                </div>
            </div>}

            <div>
                {state.signer && <button onClick={ClaimAToken}>Claim your NFT</button>}
                <form onSubmit={submit}>
                    <h3>ID NFT :</h3>
                    <input type="number" id="tokenID" name="tokenID" placeholder="NFT ID*"/>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <button onClick={() => navigate("/")}>Return to main page here</button>
        </>
    );
};

export default FakeBayc;