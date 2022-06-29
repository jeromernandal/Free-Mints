import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "../constants/abi.json"
import address from "../constants/address.json"

const Showcase = (props) => {

  const [counter, setCounter] = useState(1);
  const [freeCounter, setFreeCounter] = useState(1);

  const [account, setAccount] = useState("")
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)

  const [contract, setContract] = useState(null)

  useEffect(() => {
    connectWallet()
  }, [])

  const connectWallet = async () => {
    if (window.ethereum) {
      if (!(window.ethereum.networkVersion === "1")) {
        alert("Switch your network to Mainnet")
        return
      }

      window.ethereum.request({ method: 'eth_requestAccounts' }).then((res) => {
        if (res.length > 0) {
          accountChanged(res[0])
        } else {
          alert("No accounts found in your MetaMask")
        }
      })

    } else {
      alert("Please install MetaMask before connecting your wallet.")
    }
  }

  const accountChanged = (newAcc) => {
    setAccount(newAcc)
    loadEthersProperties()
  }

  const loadEthersProperties = () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(tempProvider)

    let tempSigner = tempProvider.getSigner()
    setSigner(tempSigner)

    let tempContract = new ethers.Contract(address.address, abi, tempSigner)
    setContract(tempContract)
  }

  const mint = async () => {
    try {
      await contract.mint(counter, { value: ethers.utils.parseEther((counter * 0.005).toString()) })
      alert("Mint successful!")
    } catch (err) {
      alert(`A problem happened during mint.\n${err.reason === undefined ? err.message : err.reason}`)
    }
  }

  const mintFree = async () => {
    try {
      await contract.mintFree(freeCounter)
      alert("Mint successful!")
    } catch (err) {
      alert(`A problem happened during mint.\n${err.reason === undefined ? err.message : err.reason}`)
    }
  }

  return (
    <section className="showcase">
      <div className="showcase-row">
        <div className="showcase-col">
          <img src="./images/nft.png" alt="nft" />
        </div>
        <div className="showcase-col">
          <p className="showcase-col-desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            minus omnis inventore ullam, enim
          </p>
          <h2 className="showcase-col-sub-title">
            <span className="bold-text">{account ? "Connected" : "Connect Wallet To Mint"}</span><br />
            <span className="bold-text">1 FREE</span> per wallet, next{" "}
            <span className="bold-text">0.005</span>
          </h2>
          <div className="mint-container">
            <div className="mint mint-1">
              <div className="mint-input">
                <button
                  onClick={() => {
                    setCounter(counter - 1);
                    if (counter <= 1) {
                      setCounter(1);
                    }
                  }}
                >
                  -
                </button>
                <span> {counter} </span>
                <button onClick={() => setCounter(counter + 1)}> + </button>
              </div>
              <button className="mint-button" onClick={mint}>Mint</button>
            </div>
            <div className="mint mint-2">
              <div className="mint-input">
                <button
                  onClick={() => {
                    setFreeCounter(counter - 1);
                    if (freeCounter <= 1) {
                      setFreeCounter(1);
                    }
                  }}
                >
                  -
                </button>
                <span> {freeCounter} </span>{" "}
                <button onClick={() => setFreeCounter(freeCounter + 1)}>
                  +
                </button>
              </div>
              <button className="mint-button" onClick={mintFree}>Free ({freeCounter})</button>
            </div>
          </div>
          <h4>No Discord . No Utility . No Roadmap . Instant Reveal</h4>
        </div>
      </div>

      <div id="background"></div>
    </section>
  );
};

export default Showcase;
