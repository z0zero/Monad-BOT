const { ethers } = require("ethers");
const path = require("path");
const config = require(path.join(__dirname, "../config/config.json"));
const Utils = require("./utils");

class Provider {
  constructor() {
    try {
      this.provider = new ethers.JsonRpcProvider(config.network.rpc);

      const privateKey = Utils.getPrivateKey();
      if (!privateKey) {
        throw new Error("Private key not found");
      }

      this.wallet = new ethers.Wallet(privateKey, this.provider);
    } catch (error) {
      console.error("Failed to initialize provider:", error);
      throw error;
    }
  }

  getProvider() {
    if (!this.provider) {
      throw new Error("Provider not initialized");
    }
    return this.provider;
  }

  getWallet() {
    if (!this.wallet) {
      throw new Error("Wallet not initialized");
    }
    return this.wallet;
  }

  async ensureConnection() {
    try {
      const network = await this.provider.getNetwork();
      return true;
    } catch (error) {
      console.error("Network connection failed:", error);
      return false;
    }
  }
}

module.exports = Provider;
