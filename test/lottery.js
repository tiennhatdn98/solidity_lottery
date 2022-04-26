const { ethers, waffle } = require("hardhat");
const { expect } = require("chai");
const web3 = require("web3");

describe("Lottery", async () => {
  let Token;
  let hardhatLottery;
  let manager, addr1, addr2, addr3;
  const provider = waffle.provider;

  before(async () => {
    [manager, addr1, addr2, addr3] = await ethers.getSigners();
    Lottery = await ethers.getContractFactory("Lottery");
    hardhatLottery = await Lottery.deploy();
    await hardhatLottery.deployed();
  });

  describe("Set manager", async () => {
    it("Should set the right manager", async () => {
      await hardhatLottery.lottery();
      expect(await hardhatLottery.manager()).to.equal(manager.address);
    });

    // it("Should assign supply the total of token to the owner", async () => {
    //   const ownerBalance = await hardhatLottery.balanceOf(owner.address);
    //   expect(await hardhatLottery.totalSupply()).to.equal(ownerBalance);
    // });
  });

  describe("Enter", async () => {
    it("Should enter successfully when a player pay more than 0.01 ether", async () => {
      await hardhatLottery
        .connect(addr1)
        .enter({ value: ethers.utils.parseEther("1") });
      expect(await hardhatLottery.players(0)).to.equal(addr1.address);
    });

    it("Should enter fail when a player pay less than 0.01 ether", async () => {
      expect(
        await hardhatLottery.connect(addr2).enter({ value: 1000000000000000 })
      ).to.be.revertedWith("Fee must be more than 0.01 ether");
      // expect(await hardhatLottery.players(0)).to.equal(addr1.address);
    });
  });

  describe("Pick Winner", async () => {
    it("Should pick winner successfully", async () => {
      const addr1BalanceBefore = await provider.getBalance(addr1.address);
      const addr3BalanceBefore = await provider.getBalance(addr2.address);
      const addr2BalanceBefore = await provider.getBalance(addr3.address);

      // let denom = addr1BalanceBefore.pow(16);
      // let ans = addr1BalanceBefore.dividedBy(denom).toNumber();
      // console.log("Ans: ", ans);

      console.log(BigNumber.from(addr1BalanceBefore));
      console.log(addr2BalanceBefore.value);
      console.log(addr3BalanceBefore.value);

      await hardhatLottery
        .connect(addr1)
        .enter({ value: ethers.utils.parseEther("1") });
      await hardhatLottery
        .connect(addr2)
        .enter({ value: ethers.utils.parseEther("2") });
      await hardhatLottery
        .connect(addr3)
        .enter({ value: ethers.utils.parseEther("3") });
      await hardhatLottery.connect(manager).pickWinner();
      const winner = await hardhatLottery.winner();

      let winnerBalanceBefore;
      const winnerBalanceAfter = await provider.getBalance(winner);

      if (winner === addr1.address) {
        winnerBalanceBefore = addr1BalanceBefore;
      }
      if (winner === addr2.address) {
        winnerBalanceBefore = addr2BalanceBefore;
      }
      if (winner === addr3.address) {
        winnerBalanceBefore = addr3BalanceBefore;
      }

      expect(winnerBalanceAfter.to.gt(winnerBalanceBefore));
    });
  });

  // describe("Transaction", async () => {
  //   it("Should transfer tokens between accounts", async () => {
  //     // Transfer 50 tokens from owner to addr1
  //     await hardhatToken.transfer(addr1.address, 50);
  //     const addr1Balance = await hardhatToken.balanceOf(addr1.address);
  //     expect(addr1Balance).to.equal(50);

  //     // Transfer 50 tokens from addr1 to addr2
  //     await hardhatToken.connect(addr1).transfer(addr2.address, 50);
  //     const addr2Balance = await hardhatToken.balanceOf(addr2.address);
  //     expect(addr2Balance).to.equal(50);
  //   });

  //   it("Should fail if sender doesn't have enough tokens", async () => {
  //     const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

  //     // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
  //     // `require` will evaluate false and revert the transaction.
  //     await expect(
  //       hardhatToken.connect(addr1).transfer(owner.address, 1)
  //     ).to.be.revertedWith("Not enough tokens");

  //     // Owner balance shouldn't have changed.
  //     expect(await hardhatToken.balanceOf(owner.address)).to.equal(
  //       initialOwnerBalance
  //     );
  //   });

  //   it("Should update balances after transfers", async () => {
  //     const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

  //     // Transfer 100 tokens from owner to addr1.
  //     await hardhatToken.transfer(addr1.address, 100);

  //     // Transfer another 50 tokens from owner to addr2.
  //     await hardhatToken.transfer(addr2.address, 50);

  //     // Check balances.
  //     const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
  //     expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

  //     const addr1Balance = await hardhatToken.balanceOf(addr1.address);
  //     expect(addr1Balance).to.equal(100);

  //     const addr2Balance = await hardhatToken.balanceOf(addr2.address);
  //     expect(addr2Balance).to.equal(50);
  //   });
  // });
});
