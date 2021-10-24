const DataProvider = require('./abi/MoolaProtocolDataProvider.json');
const DebtToken = require('./abi/DebtToken.json');
const MToken = require('./abi/MToken.json');
const { newKit } = require('@celo/contractkit');

const fs = require('fs')
const path = require('path')


const maxUint256 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
const filePath = path.join(__dirname, './.secret')


const pk = fs.readFileSync(filePath, {encoding:'utf8', flag:'r'});
console.log("Private key");
console.log(pk);
kit = newKit('https://alfajores-forno.celo-testnet.org');
const web3 = kit.web3;
const eth = web3.eth;

const user = "0x9AE3333A26511BABf437F38f7f5c879D7cE7bB92";

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
    const reserveTokensMCEUR = await dataProvider.methods.getReserveTokensAddresses(reserves.ceur).call();
    const reserveTokensMCELO = await dataProvider.methods.getReserveTokensAddresses(reserves.celo).call();
    // console.log(reserveTokensMCUSD);
    const debtTokenMCUSD = new eth.Contract(DebtToken, reserveTokensMCUSD.variableDebtTokenAddress);
    const debtTokenMCEUR = new eth.Contract(DebtToken, reserveTokensMCEUR.variableDebtTokenAddress);
    const debtTokenMCELO = new eth.Contract(DebtToken, reserveTokensMCELO.variableDebtTokenAddress);

    const debtStableTokenMCUSD = new eth.Contract(DebtToken, reserveTokensMCUSD.stableDebtTokenAddress);
    const debtStableTokenMCEUR = new eth.Contract(DebtToken, reserveTokensMCEUR.stableDebtTokenAddress);
    const debtStableTokenMCELO = new eth.Contract(DebtToken, reserveTokensMCELO.stableDebtTokenAddress);

    // deployedContractAddress => address of deployed contract calling the borrow function
    const  deployedContractAddress = "0xE6df18D52c18676df77C9c91Ca53Eae4EaE4b2e1"
    await debtTokenMCUSD.methods.approveDelegation(deployedContractAddress, maxUint256).send({from: user, gas: 2000000});
    await debtTokenMCEUR.methods.approveDelegation(deployedContractAddress, maxUint256).send({from: user, gas: 2000000});
    await debtTokenMCELO.methods.approveDelegation(deployedContractAddress, maxUint256).send({from: user, gas: 2000000});

    await debtStableTokenMCUSD.methods.approveDelegation(deployedContractAddress, maxUint256).send({from: user, gas: 2000000});
    await debtStableTokenMCEUR.methods.approveDelegation(deployedContractAddress, maxUint256).send({from: user, gas: 2000000});
    await debtStableTokenMCELO.methods.approveDelegation(deployedContractAddress, maxUint256).send({from: user, gas: 2000000});

}

approveDelegationForExternalContract();


