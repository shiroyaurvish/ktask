import { useState } from "react";
import Web3 from "web3";
import "./App.css";
import TransectionComponent from "./TransectionComponent";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState("");

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
    }
    return provider;
  };

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account);
        setEthBalance(ethBalance);
        setIsConnected(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  return (
    <div className="app">
      {/* Task 1 */}
      <div>
        <div className="app-header">
          <h1>Task Application</h1>
          <h2>Connect With Metamask</h2>
        </div>
        <div className="app-wrapper">
          {!isConnected && (
            <div>
              <button className="app-button__login" onClick={onConnect}>
                Login
              </button>
            </div>
          )}
        </div>
        {isConnected && (
          <div className="app-wrapper">
            <div className="app-details">
              <h2> You are connected to metamask.</h2>
              <div className="app-balance">
                <span>Balance: </span>
                {ethBalance}
              </div>
            </div>
            <div>
              <button className="app-buttons__logout" onClick={onDisconnect}>
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Task 2 */}
      <div>
        <TransectionComponent />
      </div>
    </div>
  );
}

export default App;
