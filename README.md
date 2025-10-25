# 🎮 Monad Shootz

> The first real-time multiplayer shooter with Web3 integration on Monad testnet. Stake crypto, compete in skill-based combat, and earn rewards through blockchain-powered gameplay.

[![Monad](https://img.shields.io/badge/Monad-Testnet-purple)](https://testnet.monadexplorer.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-live-success)](https://your-demo-url.com)

[🎮 Play Now](#) | [📖 Documentation](#) | [💬 Discord](#) | [🐦 Twitter](#)

---

## 🌟 What is Monad Shootz?

Monad Shootz is a **real-time multiplayer top-down shooter** that seamlessly integrates blockchain technology with AAA gaming mechanics. Players stake cryptocurrency to enter matches, compete in fast-paced combat, and earn rewards based on skill—all powered by smart contracts on the Monad blockchain.

### 🎯 Key Features

- ⚡ **Lightning Fast Gameplay** - 60 FPS real-time action powered by Phaser 3
- 💰 **Stake-to-Play** - Put your crypto on the line and compete for rewards
- 🔗 **On-Chain Verification** - Every kill recorded on Monad blockchain
- 🏆 **Skill-Based Rewards** - Better players earn more
- 🎨 **Strategic Gameplay** - Cover system, tactical positioning, smart shooting
- 🌐 **True Multiplayer** - Real-time synchronization with Firebase
- 🔒 **Transparent & Fair** - Smart contract-powered prize distribution

---

## 🚀 Quick Start

### Prerequisites

- MetaMask wallet installed
- Monad testnet configured in MetaMask
- Test MON tokens (get from [Monad Faucet](https://faucet.monad.xyz/))

### Play the Game

1. **Visit the Game** → [Play Monad Shootz](#)

2. **Connect Your Wallet**
   - Click "Connect Wallet"
   - Approve MetaMask connection

3. **Set Contract Address**
   ```
   Contract: 0x3c23...6f63 (Full address from Monad Testnet)
   ```

4. **Join Game**
   - Set your stake amount (min: 0.01 MON)
   - Click "Join Contract & Start Game"
   - Approve transaction in MetaMask

5. **Enter Your Name**
   - Choose your player name
   - Click "Join Game"

6. **Play & Earn!**
   - **Move**: WASD keys
   - **Aim**: Mouse
   - **Shoot**: Left Click
   - **Goal**: First to 20 kills wins!

---

## 🎮 Gameplay Mechanics

### Controls
- **W/A/S/D** - Move your character
- **Mouse** - Aim weapon
- **Left Click** - Fire weapon
- **Hide in Cover** - Walk behind green cover blocks (you become semi-transparent)

### Game Rules
1. Join with a minimum stake (0.01 MON)
2. Eliminate other players to increase your score
3. Each elimination is recorded on-chain
4. First player to reach 20 kills wins
5. Winner takes the prize pool
6. Players respawn after being eliminated

### Strategic Elements
- **Cover System** - Hide behind green blocks to reduce visibility
- **Wall Obstacles** - Gray walls block movement and bullets
- **Health System** - 100 HP, 25 damage per shot
- **Cooldown** - 300ms between shots
- **Map Awareness** - 1600x1200 world with strategic positioning

---

## 🔗 Smart Contract Integration

### Deployed on Monad Testnet

**Contract Address**: `0x3c23...6f63` (Full address on Monad Testnet)

**View Transaction**: [Monad Explorer](https://testnet.monadexplorer.com/tx/0xd4bc9d777fd1432700253f4203e347629c3935961c43a3eca5f2bdbb35afa0c7)

### Contract Functions

```solidity
// Player joins game with stake
function joinGame() external payable

// Record player elimination on-chain
function playerShot(address shooter, address victim, uint256 points) external

// Start the game (game manager only)
function startGame() external

// End game and distribute rewards
function endGame() external

// Get all active players
function getPlayers() external view returns (address[] memory)

// Check game status
function gameStarted() external view returns (bool)
```

### Key Contract Features

- **Stake Management** - Securely holds player stakes in escrow
- **Kill Verification** - On-chain record of every elimination
- **Automated Payouts** - Smart contract distributes rewards to winner
- **Emergency Functions** - Safety mechanisms for edge cases
- **Transparent State** - All game data publicly verifiable

---

## 🛠️ Technical Architecture

### Tech Stack

#### Frontend
- **Phaser 3** - Game engine for smooth 60 FPS gameplay
- **JavaScript (ES6+)** - Modern web development
- **Tailwind CSS** - Responsive UI styling
- **Tone.js** - Audio effects and sound design

#### Real-Time Backend
- **Firebase Realtime Database** - Instant state synchronization
- **Firestore** - Player data and game state
- **Firebase Authentication** - Secure anonymous auth

#### Blockchain Layer
- **Monad Testnet** - High-performance EVM-compatible blockchain
- **Ethers.js v6** - Web3 integration and contract interaction
- **Solidity** - Smart contract development
- **MetaMask** - Wallet connection and transaction signing

### Architecture Diagram

```
┌─────────────────────────────────────┐
│         Player Browser              │
│  ┌─────────────┐   ┌─────────────┐ │
│  │ Phaser Game │   │   MetaMask  │ │
│  │   Engine    │   │    Wallet   │ │
│  └──────┬──────┘   └──────┬──────┘ │
└─────────┼─────────────────┼─────────┘
          │                 │
          │                 │
    ┌─────▼─────┐     ┌─────▼──────────┐
    │  Firebase │     │ Monad Testnet  │
    │  Realtime │     │ Smart Contract │
    │  Database │     │                │
    └───────────┘     └────────────────┘
         │                    │
         │                    │
    ┌────▼────────────────────▼────┐
    │     Hybrid Game State        │
    │  (Off-chain + On-chain)      │
    └──────────────────────────────┘
```

### Why Hybrid Architecture?

**Off-Chain (Firebase)**
- Real-time player positions (60 FPS updates)
- Instant bullet trajectories
- Smooth interpolation
- Low latency gameplay

**On-Chain (Monad)**
- Player stakes and entry
- Kill verification
- Score tracking
- Prize distribution
- Permanent records

This hybrid approach delivers **AAA gaming performance** with **blockchain trustlessness**.

---

## 💡 Why Monad?

### Perfect Blockchain for Gaming

1. **10,000+ TPS** - Ultra-fast transaction throughput
2. **Sub-second Finality** - Near-instant confirmations
3. **Low Gas Fees** - Affordable for high-frequency gaming transactions
4. **EVM Compatible** - Easy integration with existing tools
5. **Optimized for dApps** - Purpose-built for interactive applications

### Monad vs Other Chains

| Feature | Monad | Ethereum L1 | Polygon |
|---------|-------|-------------|---------|
| TPS | 10,000+ | ~15 | ~65 |
| Block Time | <1s | ~12s | ~2s |
| Gas Fees | Very Low | High | Low |
| Gaming Ready | ✅ Yes | ❌ No | ⚠️ Partial |

**Monad Shootz leverages Monad's speed to enable real-time blockchain gaming.**

---

## 🎯 Game Economics

### Stake Pool Mechanics

```
Entry Stake: 0.01 - 1.0 MON (configurable)

Prize Pool = Total Stakes × 95%
Platform Fee = Total Stakes × 5%

Example with 10 Players (0.1 MON each):
├─ Total Pool: 1.0 MON
├─ Prize Pool: 0.95 MON → Winner
└─ Platform Fee: 0.05 MON → Development
```

### Reward Distribution

- **Winner** (First to 20 kills): 95% of prize pool
- **Kill Rewards**: Stake redistribution on each elimination
- **Participation**: No loss if you eliminate at least one player

### Future Economics (Roadmap)

- Tournament entry fees
- NFT weapon skins marketplace
- Seasonal battle passes
- Clan vs. Clan wagers

---

## 🎨 Game Features

### Current Features ✅

- [x] Real-time multiplayer (up to 20 players)
- [x] Top-down shooter mechanics
- [x] Cover system for tactical gameplay
- [x] Wall obstacles and map variety
- [x] Health and damage system
- [x] Respawn mechanics
- [x] Live scoreboard
- [x] Wallet integration (MetaMask)
- [x] Smart contract stake management
- [x] On-chain kill verification
- [x] Automated prize distribution
- [x] Game state synchronization

### Coming Soon 🚧

- [ ] Multiple game modes (Team Deathmatch, Battle Royale)
- [ ] Power-ups and weapon variety
- [ ] Larger maps with more strategic elements
- [ ] Tournament system with brackets
- [ ] Leaderboard and player rankings
- [ ] NFT weapon skins
- [ ] Spectator mode
- [ ] Replay system
- [ ] Mobile responsive version
- [ ] Voice chat integration

---

## 📊 Smart Contract Details

### Contract Parameters

```solidity
uint256 public minStake;           // Minimum entry stake
uint256 public maxPlayers;         // Maximum players per game
uint16 public killRewardBps;       // Kill reward in basis points
address public gameManager;        // Game manager address
bool public gameStarted;           // Game state
bool public gameEnded;             // Game completion state
```

### Events

```solidity
event PlayerJoined(address indexed player, uint256 stake);
event PlayerShot(address indexed shooter, address indexed victim, uint256 stakeTransferred, uint256 shooterNewScore);
event PlayerEliminated(address indexed player, address indexed eliminator, uint256 remainingStake);
event GameStarted(uint256 timestamp);
event GameEnded(uint256 timestamp);
```

### Security Features

- **Reentrancy Protection** - No recursive calls
- **Access Control** - Game manager role
- **Emergency Withdrawal** - Safety mechanism
- **Stake Validation** - Minimum stake enforcement
- **Player Limits** - Max players per game

---

## 🔐 Security & Auditing

### Smart Contract Security

- ✅ Reentrancy guards on all state-changing functions
- ✅ Access control modifiers
- ✅ Integer overflow protection (Solidity 0.8+)
- ✅ Emergency pause mechanism
- ⏳ **Pending**: Full security audit (planned)

### Best Practices

- All player funds held in escrow
- Automated distribution (no manual intervention)
- Transparent on-chain records
- Open-source contract code

### Audit Status

- **Self-Audited**: ✅ Complete
- **Community Review**: 🔄 In Progress
- **Professional Audit**: 📋 Planned for mainnet

---

## 🚀 Roadmap

### Phase 1: MVP ✅ (Current)
- [x] Core gameplay mechanics
- [x] Smart contract deployment on Monad testnet
- [x] Real-time multiplayer
- [x] Wallet integration
- [x] Basic UI/UX

### Phase 2: Enhancement (Q1 2026)
- [ ] Multiple game modes
- [ ] Tournament system
- [ ] Enhanced graphics and animations
- [ ] Sound effects and music
- [ ] Mobile responsive design
- [ ] Player profiles and stats

### Phase 3: NFT Integration (Q2 2026)
- [ ] Weapon skin NFTs
- [ ] Character customization NFTs
- [ ] Exclusive collectibles
- [ ] NFT marketplace
- [ ] Staking mechanisms

### Phase 4: Mainnet Launch (Q3 2026)
- [ ] Security audit completion
- [ ] Monad mainnet deployment
- [ ] Marketing campaign
- [ ] Partnership announcements
- [ ] Community tournaments
- [ ] DAO governance launch

### Phase 5: Expansion (Q4 2026)
- [ ] Cross-chain support
- [ ] Clan/guild system
- [ ] Ranked competitive mode
- [ ] Spectator esports features
- [ ] Streaming integration
- [ ] Mobile app release

---

## 👥 Team & Community

### Core Team Needed

- **Game Developers** - Phaser/Unity expertise
- **Smart Contract Engineers** - Solidity security
- **Backend Engineers** - Firebase/scaling
- **UI/UX Designers** - Gaming interface
- **Community Managers** - Discord/social
- **Marketing Lead** - Growth and partnerships

### Join Our Community

- 🐦 **Twitter**: [@MonadShootz](#)
- 💬 **Discord**: [discord.gg/monadshootz](#)
- 📺 **YouTube**: [Gameplay & Tutorials](#)
- 📰 **Medium**: [Development Blog](#)
- 🎮 **Twitch**: [Live Tournaments](#)

### Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

```bash
# Clone the repository
git clone https://github.com/lokesh-katari/monad-blitz-shooting-arena


```
![Gameplay](/demo.webm)
![Contract](/TEST.png)
---

## 📈 Metrics & Traction

### Current Stats (Testnet)

- 🎮 **Games Played**: TBD
- 👥 **Unique Players**: TBD
- 💰 **Total Volume**: TBD MON
- ⚡ **Avg Game Duration**: ~10 minutes
- 🏆 **Total Eliminations**: TBD

### Goals (6 Months)

- 1,000+ daily active users
- 10,000+ games played
- 100+ MON daily volume
- 50+ community tournament participants

---


---

## ⚠️ Disclaimer

**Testnet Notice**: Monad Shootz is currently deployed on Monad testnet. All tokens used are test tokens with no real value.

**Risk Warning**: Cryptocurrency gaming involves risk. Only stake what you can afford to lose. This is experimental technology.

**Regulatory**: Gaming regulations vary by jurisdiction. Players are responsible for compliance with local laws.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Monad Foundation** - For building an incredible blockchain
- **Phaser Community** - For the amazing game engine
- **Firebase** - For real-time infrastructure
- **MetaMask** - For seamless wallet integration
- **Our Players** - For testing and feedback

---

