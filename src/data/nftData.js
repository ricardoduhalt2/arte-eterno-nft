// Data source for NFT collections, structured for the Thirdweb v5 SDK components.
const DROPS = [
  {
    name: 'Tides of the Eternal Mind',
    contract: '0xfb31Aa293a6974C44F1F283A2d2e1e656b08fc1E',
    tokenId: 0,
    tokenURI: 'ipfs://QmWKkx4b8QVz7Vo3Ncjy3as5gW5c4JffNmAohZD3Zyu9Ax/0',
    claimPrice: 1.231,
    supply: 2,
    supplyClaimed: 0
  },
  {
    name: 'Galactic Clean-Up Crew',
    contract: '0x82319a7FeDf4E3ba6F8Ee5C07d88191E9c7d1FC4',
    tokenId: 0,
    tokenURI: 'ipfs://QmUz8psaEAB4MzoM4x9uMW7KsZegtrsbjQa3uamN53PsTG/0',
    claimPrice: 0.138,
    supply: 1,
    supplyClaimed: 0
  },
  {
    name: 'C0mMzoVeRLoAD',
    contract: '0x1A59A9e2AaD38229789689D01615Cc50DcfAAc94',
    tokenId: 0,
    tokenURI: 'ipfs://QmfG95HGV782dYZbKfrgsLtVSaehE3s5FopPGA1fwkMCvE/0',
    claimPrice: 0.492,
    supply: 1,
    supplyClaimed: 0
  },
  {
    name: 'Entre la Vida y el Plástico',
    contract: '0xD71e518BeA282eA53259A06d3529813A1BC20FcF',
    tokenId: 0,
    tokenURI: 'ipfs://QmX2u3SngrPeQHHhUVDomyn68q6HYZrsKaqaxNEV2wYzB1/0',
    claimPrice: 0.138,
    supply: 1,
    supplyClaimed: 0
  },
  {
    name: 'Bit-Beats Bliss',
    contract: '0x36fcAa369FC94ab630A6034860d0307a55073FF3',
    tokenId: 0,
    tokenURI: 'ipfs://QmTByARGCMw7HKnqbDiDp44aUs48wf9HmAfEC92NJpb5qk/0',
    claimPrice: 0.055,
    supply: 1,
    supplyClaimed: 0
  },
  {
    name: 'I vow to take care of you',
    contract: '0xFAd250Cb1A4928aa48183DC18F8F5278161E56e7',
    tokenId: 0,
    tokenURI: 'ipfs://QmXwLjqSs924dNRCqcC2MUYgzgeyu5Sd9w6QYAGCHqTD6E/0',
    claimPrice: 0.492,
    supply: 1,
    supplyClaimed: 0
  },
  {
    name: 'Yo Soy Libertad',
    contract: '0x38e0b194108a4598Baa174EfAE19827924A72E6C',
    tokenId: 0,
    tokenURI: 'ipfs://QmULgWid9nBdCQqhU4oVRnBdvypvY6LPJGtwcvn7jxdJjS/0',
    claimPrice: 4.875,
    supply: 1,
    supplyClaimed: 0
  },
  {
    name: 'Pirolisaurio: Born from the Fossil Age',
    contract: '0x98b2a0BcE4892139D13f1545931Be9EC9C7EC962',
    tokenId: 0,
    tokenURI: 'ipfs://QmUP9bz9UXec1kLc7HHNE6h241Vj4h5tQf3wFtiAspzEVY/0',
    claimPrice: 1.662,
    supply: 1,
    supplyClaimed: 0
  },
  {
    name: 'Petgaserito Laser Luca',
    contract: '0xb473416dF4b7f24eE5DB710fE9265aAc190EaEe3',
    tokenId: 0,
    tokenURI: 'ipfs://QmS8CaNrP16URtfXVT5FmABhXKiXXEB54FUmWagbRjHZz9/0',
    claimPrice: 0.554,
    supply: 1,
    supplyClaimed: 0
  },
  {
    name: 'MOON LANDING',
    contract: '0x25817f14c788adbFE5366d0B5b765B1028FAE4db',
    tokenId: 0,
    tokenURI: 'ipfs://QmaQjSPR41fc9HAX39evKCBoihcfiy44xqgmgPdXsu84gR/0',
    claimPrice: 0.246,
    supply: 1,
    supplyClaimed: 0
  },
  {
    name: 'Hydrothermal Camouflage',
    contract: '0x9542a461c587b6D840f1b217c2C37731FeC4A6BD',
    tokenId: 0,
    tokenURI: 'ipfs://QmP3B6j32Y6PMyFfZYZhMtBa7NoAofMCsPSxy6xapouWt7/0',
    claimPrice: 0.0, // Was "—", using 0.0 as per previous logic
    supply: 0,      // Was "—", using 0
    supplyClaimed: 0// Was "—", using 0
  },
  {
    name: 'Floral Coral',
    contract: '0x0F7d59440a2D30559f2570F82583C394229D18e1',
    tokenId: 0,
    tokenURI: 'ipfs://QmNrqTkfnbXc3AxmV4vkc7aXgp2Qe5xURtTDQpEYCE81hD/0',
    claimPrice: 0.0,
    supply: 0,
    supplyClaimed: 0
  },
  {
    name: 'Snail Whale',
    contract: '0xE8f91499D385Ab800555ADcf6c6B3110137B4dBB',
    tokenId: 0,
    tokenURI: 'ipfs://QmUtBMz4KrtfL6j7FR8Qzx37yDCKVjMBrz6b11ucG6kY9P/0',
    claimPrice: 0.0,
    supply: 0,
    supplyClaimed: 0
  },
  {
    name: 'regenAIssance (i.)',
    contract: '0x36dB4CaB8d3C5935334c8f7220e512C2E6188863',
    tokenId: 0,
    tokenURI: 'ipfs://QmdW2DvG3rfZVQL58pvp1W1buLNBep1WqCiWTVLktsgCvW/0',
    claimPrice: 0.0,
    supply: 0,
    supplyClaimed: 0
  },
  {
    name: 'Treegeneration',
    contract: '0x70Eb14A48a994f68C6eae0eA4bA4E3264f2a9A88',
    tokenId: 0,
    tokenURI: 'ipfs://QmbbV6LPgY2U4K15BoqFx4udioNNRb8r9spPE93SfJUj19/0',
    claimPrice: 0.0,
    supply: 0,
    supplyClaimed: 0
  },
  {
    name: 'C.H.I.D.O.',
    contract: '0xF9a1a2A374F8D517f08C37ED08743f18dEd33682',
    tokenId: 0,
    tokenURI: 'ipfs://QmVuDHnSdURagBEFWkYjmVYMEsCgkDVDhAAKTXZLTGUNBD/0',
    claimPrice: 0.0,
    supply: 1,
    supplyClaimed: 1
  }
];

export default DROPS;
