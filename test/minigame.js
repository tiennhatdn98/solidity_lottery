const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Minigame", function () {
  it("Should sign up successfully", async function () {
    const Minigame = await ethers.getContractFactory("Minigame");
    const minigame = await Minigame.deploy();
    await minigame.deployed();

    // expect(await minigame.greet()).to.equal("Hello, world!");

    const signUpTx = await minigame.signUp("123456");

    // wait until the transaction is mined
    await signUpTx.wait();

    expect(await minigame.students()[0]._id).to.equal("123456");
  });
});
