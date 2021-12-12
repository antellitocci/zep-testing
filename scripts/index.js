//scripts/index.js

module.exports = async function main (callback){
    try{
        //set up a Truffle contract, representing out deployed Box instance
        const Box = artifacts.require('Box');
        const box = await Box.deployed();

        //send a transaction to store() a new value in the Box
        await box.store(23);

        //call the retrieve() function of the deployed Box contract
        const value = await box.retrieve();
        console.log('Box value is', value.toString());

        callback(0);
    } catch (error){
        console.error(error);
        callback(1);
    }
};