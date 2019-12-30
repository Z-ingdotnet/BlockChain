const Block=require('./block');
const {GENESIS_DATA}=require('./config');
const cryptoHash=require('./crypto-hash');

describe('Block', ()=> {
const timestamp = 'a-date';
const lastHash = 'foo-hash';
const hash = 'bar-hash';
const data = ['blockchain','data']
const block = new Block ({timestamp,lastHash,hash,data});

it('has a timestamp, lastHash,hash, and dadta property',() => 
{
expect(block.timestamp).toEqual(timestamp);
expect(block.lastHash).toEqual(lastHash);
expect(block.hash).toEqual(hash);
expect(block.data).toEqual(data);
});


describe('genesis()',() => {
const genesisBlock=Block.genesis();
console.log('genesisBlock',genesisBlock);

it ('returns a Block Instace',() => {
    expect(genesisBlock instanceof Block).toBe(true);
});


it('returns the the genesis data', () => {
    expect(genesisBlock).toEqual(GENESIS_DATA);
});
});

describe ('mineBlock()',() => {
    const lastBlock=Block.genesis();
    const data='mine data';
    const minedBlock=Block.mineBlock({lastBlock,data});
    console.log('mineBlock',lastBlock);
    console.log('mineBlock',data);
    console.log('mineBlock',minedBlock);

    it ('returns a Block Instace',() => {
        expect(minedBlock instanceof Block).toBe(true);
    });

    it ('sets the `lasthash` to be the `hash` of the lastBlock',() =>{
       expect(minedBlock.lasthash).toEqual(lastBlock.Hash);
   });

   it ('sets the `data`', () =>{
    expect(minedBlock.data).toEqual(data);
   });

   it ('sets a `timestamp`',() => {
    expect(minedBlock.timestamp).not.toEqual(undefined);
   });

   it('creates a SHA-256 `hash` based on the proper input',() =>{
    expect(minedBlock.hash).toEqual(cryptoHash(minedBlock.timestamp,lastBlock.hash,data))
   });
});
});