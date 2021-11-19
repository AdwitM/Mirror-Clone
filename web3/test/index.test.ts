import {expect} from 'chai';
import {ethers} from 'hardhat';

describe('MirrorClone', function () {
  let contract, ownerAccount, user1Account;

  beforeEach(async () => {
    const MirrorClone = await ethers.getContractFactory('MirrorClone');
    contract = await MirrorClone.deploy('MIRROR', 'MRM');
    await contract.deployed();

    const [acc1, acc2] = await ethers.getSigners();

    ownerAccount = acc1;
    user1Account = acc2;
  });

  describe('methods', function () {
    describe('createToken', () => {
      it('revers when empty tokenURI passed', async () => {
        await expect(contract.createToken('')).to.be.revertedWith(
          'Empty tokenURI',
        );
      });

      it('mints new token', async () => {
        await contract.connect(user1Account).createToken('ar://testhash');

        expect(await contract.balanceOf(user1Account.address)).to.eq(1);
        expect(await contract.tokenURI(1)).to.eq('ar://testhash');
        expect(await contract.ownerOf(1)).to.eq(user1Account.address);
        expect(await contract.tokenURIToTokenId('ar://testhash')).to.eq(1);
      });

      it('emits TokenMinted event', async () => {
        await expect(
          contract.connect(user1Account).createToken('ar://testhash'),
        ).to.emit(contract, 'TokenMinted');
      });
    });

    describe('tokenURIToTokenId', () => {
      it('returns 0 if tokenURI does not exists', async () => {
        expect(await contract.tokenURIToTokenId('ar://does-not-exists')).to.eq(
          0,
        );
      });
    });
  });
});
