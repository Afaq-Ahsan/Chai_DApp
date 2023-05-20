require("@nomicfoundation/hardhat-toolbox");

const SEPOLIA_URL = ""; //sepolia network achemy API key paste here
const PRIVATE_KEY = ""; //private key from your metamask wallet paste here
module.exports = {
  solidity: "0.8.18",

  networks: {
    Sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
