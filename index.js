const DataProvider = require('./abi/MoolaProtocolDataProvider.json');
const DebtToken = require('./abi/DebtToken.json');
const MToken = require('./abi/MToken.json');
const { newKit } = require('@celo/contractkit');

const fs = require('fs')
const path = require('path')


const maxUint256 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
const filePath = path.join(__dirname, './.secret')

kit = newKit('https://alfajores-forno.celo-testnet.org');
const web3 = kit.web3;
const eth = web3.eth;

const user = "0x9AE3333A26511BABf437F38f7f5c879D7cE7bB92";

const pk = "b1746c0133b5e1d696fda2d98d3c240fcf96ddaeeddd688b86baab2e53111a12";
// if (!pk) {
//         console.error('Missing private key');
//         return;
// }
kit.addAccount(pk);

dataProvider = new kit.web3.eth.Contract(DataProvider, '0x31ccB9dC068058672D96E92BAf96B1607855822E');

cEUR = new kit.web3.eth.Contract(MToken, '0x10c892a6ec43a53e45d0b916b4b7d383b1b78c0f');
cUSD = new kit.web3.eth.Contract(MToken, '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1');
CELO = new kit.web3.eth.Contract(MToken, '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9');

const reserves = {
    celo: CELO.options.address,
    cusd: cUSD.options.address,
    ceur: cEUR.options.address,
};

async function approveDelegationForExternalContract(){
    const reserveTokensMCUSD = await dataProvider.methods.getReserveTokensAddresses(reserves.cusd).call();
    const debtTokenMCUSD = new eth.Contract(DebtToken, reserveTokensMCUSD.variableDebtTokenAddress);
    const txHash = await debtTokenMCUSD.methods.approveDelegation("0xE6df18D52c18676df77C9c91Ca53Eae4EaE4b2e1", maxUint256).send({from: user, gas: 2000000}).transactionHash;
    console.log(txHash);
}

approveDelegationForExternalContract();


