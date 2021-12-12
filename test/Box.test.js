//test/Box.test.js
//load dependencies
const { expect } = require('chai');

//import utilities from Test helpers
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');


//load compiled artifacts
const Box = artifacts.require('Box');

//Start test block
contract('Box', function([ owner, other ]) {

    //use larger integers ('big numbers')
    const value = new BN('42');

    beforeEach(async function() {
        //Deploy a new Box contract for each test
        this.box = await Box.new({ from: owner });
    });

    //test case
    it('retrieve returns a value previously stored', async function() {
        //store a value
        await this.box.store(value, { from: owner });

        //test if the returned value is the same one
        //Note that we need to use strings to compare the 256 bit integers
        // expect((await this.box.retrieve()).toString()).to.equal('42');

        //user large integer comparisons
        expect(await this.box.retrieve()).to.be.bignumber.equal(value);
    });

    //test for event emission
    it('store emits an event', async function() {
        const receipt = await this.box.store(value, { from: owner });

        //test that a ValueChanged event was emitted with the new value
        expectEvent(receipt, 'ValueChanged', { value: value });
    });

    //test that a non-contract owner cannot store a value
    it('non owner cannot store a value', async function() {
        //test the transaction reverts
        await expectRevert(
            this.box.store(value, { from: other }),
            'Ownable: caller is not the owner',
        );
    });
});