# Enable borrowing for Moola V2, from external smart contract

### Prerequisite
1. Install node js & npm
2. Have an alfjores account with pre filled balance from the faucet

### Instructions
1. Deploy the Test.sol file on the alfjores network and get the address the smart contract was deployed in
2. Run ``npm i`` to install the dependencies
3. Export your private key, then create ``.secret`` file in the root directory and paste the private key there
4. Go to index.js file and replace the value for  ``deployedContractAddress`` variable, with your deployed contract address (in step 1).
5. Run ``node index.js``