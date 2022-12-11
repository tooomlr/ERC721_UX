import { ethers } from "ethers";
import { useState, useEffect  } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import {FakeBAYCABI} from "../../Contract/contract";

const FakeBaycToken = () => {
    const [state, setState] = useState({});
    const {token_id} = useParams();
    const navigate = useNavigate();

    const contractData = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const fakeBaycAddress="0x1dA89342716B14602664626CD3482b47D5C2005E";
            const ct = new ethers.Contract(fakeBaycAddress, FakeBAYCABI.abi, signer);
            const tokenURI = await ct.tokenURI(parseInt(token_id));
            let imageURI, imageName, imageDescription;
            fetch(tokenURI)
                .then(response => response.json())
                .then(data => {
                    imageURI = (data.image).replace('ipfs://', 'https://ipfs.io/ipfs/');
                    imageName = data.name;
                    imageDescription = data.description;
                    setState({signer: signer, imageURI: imageURI, name: imageName, description: imageDescription,  contract: ct});
                })
                .catch(error => {
                    setState({error: true});
                });

        } catch (error) {
            console.log(error);
            setState({error: true});
        };
    }

    useEffect(()=>{
        contractData();
    },[]);

    return (
        <>
            <h1>Fake Bayc</h1>

            {state.contract && <div>
                <div>
                    <h3>Token Name :</h3>
                    <p>{state.imageName || ""}</p>
                </div>
                <div>
                    <h3>Description :</h3>
                    <p>{state.description || ""}</p>
                </div>
                <div>
                    <h3>NFT :</h3>
                    <img src={state.imageURI} alt="" className="ipfsImage" />
                </div>
            </div>}

            {state.error && <div>
                <div >
                    <p>ID not exist</p>
                </div>
                <button onClick={() => navigate("/")}>Return to main page here</button>
            </div>}
        </>
    )
}
export default FakeBaycToken;