require('@nomiclabs/hardhat-waffle');
require("dotenv").config();


module.exports = {
  solidity: '0.8.0',
  networks: {
    Rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/zeoHPRVVBwb9M8z2ZURkpIGOk4Ol22c9',
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  }
}
