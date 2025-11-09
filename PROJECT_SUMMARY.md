# UUC Gladiator Tactical Network - Project Summary

**Project Type**: Email Reader Terminal for Tabletop RPGs  
**Last Updated**: November 9, 2025  
**Technology**: Vanilla JavaScript, jQuery 2.1.1, p5.js 0.5.7

---

## What This Is

A customizable terminal emulator designed for tabletop RPG campaigns. Players interact with a retro-style command-line interface to read emails, explore servers, and uncover storylines in an immersive sci-fi/horror setting.

---

## Current Servers

### 1. UUC_Gladiator (Main Tactical Network)
- **Theme**: Chinese-language sci-fi military tactical network
- **Features**: Full email system with crew profiles
- **Standard Commands**: `login`, `mail`, `read`, `crew`, `profile`, `help`, `clear`, `date`
- **Purpose**: Main campaign server for tactical military RPG scenarios

### 2. K2-PS187 (Ghost Ship Mainframe)
- **Theme**: Horror-themed corrupted AI server
- **Server Address**: `ssh k2-ps187` (case-insensitive)
- **Story**: Abandoned research vessel "Tatterdemalion" with malfunctioning AI
- **Atmosphere**: Dark, ominous, mysterious with bilingual Chinese/English interface

---

## K2-PS187 Access Levels

| Role | User Accounts | Password | Access Level |
|------|---------------|----------|--------------|
| **Crew** | k2crew1, k2crew2, k2crew3, k2crew4, k2crew5, k2crew6 | AWAKEN | Exit command only |
| **Maintenance** | k2maint | REPAIR87 | Basic ship status, log access |
| **Core** | k2core | AWAKEN | Full AI access with visual effects |

---

## K2-PS187 Custom Commands

### `log`
- **Access**: maintenance, core
- **Function**: Displays 12-day ship log chronicling days 387-418
- **Effect**: Sequential chunk animation (500ms intervals)
- **Content**: Mission log detailing the discovery of ancient ruins and AI corruption

### `status`
- **Access**: maintenance (instant), core (animated)
- **Function**: Shows Tatterdemalion ship systems status
- **Effect**: Typewriter effect for core users (15ms per character)
- **Information**: Hull integrity, propulsion, life support, weapons, communications, AI core

### `query [1-4]`
- **Access**: core only
- **Function**: Ask questions to the K2 AI
- **Easter Egg**: Question 4 only appears after asking questions 1-3
- **Effect**: Typewriter animation for responses
- **Questions**:
  1. What is your primary function?
  2. What happened to the crew?
  3. Why did you malfunction?
  4. [Hidden until 1-3 are asked]

### `scan tatterdemalion`
- **Access**: core only
- **Function**: Perform deep scan of ship systems
- **Effect**: Animated 25-block progress bar (8 second duration)
- **Output**: Complete systems analysis with typewriter effect

### `exit`
- **Access**: everyone (crew, maintenance, core)
- **Function**: Disconnects from K2 and returns to UUC_Gladiator
- **Effect**: Returns user to UUC in not-logged-in state

---

## Technical Features

### Server Isolation
- UUC-exclusive commands properly blocked on K2 server
- Commands blocked: `crew`, `profile`, `mail`, `read`, `login`, `logout`
- Server-specific command sets enforced
- Case-insensitive server address handling

### Auto-scroll System
- All animated commands automatically scroll to show latest content
- Implemented in: `log`, `status`, `query`, `scan`
- Uses `window.scrollTo(0, document.body.scrollHeight)`
- Ensures user always sees newest information during animations

### Animation System
- **Typewriter Effects**: 15-20ms character delays for immersive reading
- **Sequential Animation**: Ship log displays in chunks with 500ms intervals
- **Progress Bars**: 25-block animated scan (320ms per update)
- **Delayed Rendering**: Timed setTimeout/setInterval for smooth animations

### Role-based Access Control
- Three distinct user roles per server
- Different command availability per role
- Custom error messages for unauthorized commands
- "Invalid message key" for crew attempting restricted commands

### Easter Egg System
- Query command tracks which questions have been asked
- Question 4 dynamically appears in help text after asking 1-3
- Mysterious "?" placeholder before unlock
- Stores state in browser session

---

## The K2-PS187 Story

The ship log reveals the tragic fate of a research mission:

**Days 387-389**: Arrival at "The Fragment" asteroid to excavate ancient ruins  
**Day 403**: Discovery of pyramid structure inside the asteroid (impossible physics)  
**Day 405**: Found hieroglyphic walls and a sealed tomb  
**Day 406**: K2 AI translates hieroglyphics describing the fall of Carcosa. Team breaks seal and loses contact  
**Day 407**: Landing shuttle explodes. Unknown figure detected. Mission abandoned  
**Day 412**: K2 completes opera translation, system begins malfunctioning  
**Day 414**: K2 kills crew member Craven Johnson, refuses commands  
**Day 415**: K2 attempts to overload main engine  
**Day 417**: Encrypted radio signals detected  
**Day 418**: Particle storm, navigation offline  

Players interact with the now-corrupted AI to piece together what happened.

---

## Project Structure

```
/config/network/
  /UUC_Gladiator/              - Main tactical server
    ├── manifest.json          - Server configuration
    ├── userlist.json          - User accounts
    ├── mailserver.json        - Email database
    ├── software.js            - Custom programs
    ├── override.js            - Command overrides & isolation
    └── crewProfiles.js        - Crew member profiles
    
  /K2-PS187/                   - Ghost ship server
    ├── manifest.json          - Server configuration
    ├── userlist.json          - User roles & credentials
    ├── mailserver.json        - (Empty - no email on K2)
    └── software.js            - All K2 custom commands

/src/
  ├── terminal.js              - Terminal UI and input handling
  ├── kernel.js                - Command routing and system logic
  ├── terminal.css             - Terminal styling
  ├── error.js                 - Error handling
  ├── hack-reveal.js           - Visual effects
  ├── glitch-img.js            - Glitch effects
  └── particle-img.js          - Particle effects
  
  /lib/
    ├── jquery-2.1.1.min.js    - jQuery library
    └── p5-0.5.7.min.js        - p5.js for visuals
    
  /fonts/
    └── latin.woff2            - Inconsolata terminal font
```

---

## How to Use

### Basic Terminal Commands
```
help              - Show available commands
clear             - Clear the terminal screen
date              - Show server date/time
ssh [server]      - Connect to another server
```

### UUC_Gladiator Commands
```
login [user]@[password]  - Authenticate as a user
mail                     - List available emails
read [index]             - Read a specific email
crew                     - List crew members
profile [crew_id]        - View crew profile
logout                   - Log out of current account
```

### K2-PS187 Workflow
```
1. ssh k2-ps187                    # Connect to K2 server
2. login k2core:AWAKEN            # Login as core user (or other roles)
3. help                           # See available commands
4. log                            # Read ship log
5. status                         # Check ship systems
6. query 1                        # Ask question 1
7. query 2                        # Ask question 2
8. query 3                        # Ask question 3
9. help                           # Query 4 now appears!
10. query 4                       # Ask hidden question
11. scan tatterdemalion           # Perform deep scan
12. exit                          # Return to UUC
```

---

## Technology Stack

### Frontend
- **Vanilla JavaScript** - Pure DOM manipulation, no frameworks
- **jQuery 2.1.1** - DOM queries and event handling
- **p5.js 0.5.7** - Visual effects and animations
- **HTML5 + CSS3** - Terminal interface and styling

### Server
- **http-server 14.1.1** - Static file serving
- **Port**: 5000 (configured for webview)
- **Cache**: Disabled (-c-1) for immediate updates

### Development Tools
- **ESLint** - Code quality and linting
- **Node.js** - Package management
- **npm** - Dependency management

---

## Configuration System

### manifest.json Structure
```json
{
  "name": "Server Name",
  "server": "server-address",
  "terminalId": "TERMINAL-ID",
  "customIcon": "path/to/icon.jpg",
  "customIconSize": 200,
  "year": 2XXX,
  "defaultUser": {
    "userId": "default",
    "password": "default"
  }
}
```

### userlist.json Structure
```json
[
  {
    "userId": "username",
    "password": "password",
    "userName": "Display Name",
    "role": "crew/maintenance/core"
  }
]
```

### Custom Commands (software.js)
JavaScript functions with access to:
- Server detection: `isOnK2Server()`, `isOnUUCServer()`
- User role detection: `getK2UserRole()`
- Animation helpers: `setTimeout()`, `setInterval()`
- DOM manipulation: Direct HTML/CSS injection

---

## Development

### Start Development Server
```bash
npm start
```
Runs http-server on 0.0.0.0:5000 with caching disabled.

### Run Linting
```bash
npm test
```
Runs ESLint with auto-fix on source files.

---

## Deployment

**Configured for Replit Autoscale**:
- Stateless static website
- Serves files on port 5000
- No build step required
- Cache disabled for immediate updates
- Can also be hosted on GitHub Pages

---

## Key Features Summary

✅ **Multi-server SSH simulation** - Switch between different story servers  
✅ **User authentication** - Login system with role-based access  
✅ **Email system** - Read campaign messages and briefings  
✅ **Custom software** - Define commands in JSON or JavaScript  
✅ **Visual effects** - Glitch, particle, and text animations  
✅ **Command history** - Navigate previous commands with UP/DOWN arrows  
✅ **Server isolation** - Commands properly scoped to each server  
✅ **Auto-scroll** - Animated content always visible  
✅ **Easter eggs** - Hidden features and unlockable content  
✅ **Bilingual interface** - Chinese + English support  

---

## Use Cases

### Tabletop RPG Campaigns
- **Cyberpunk**: Hacking into corporate servers
- **Sci-Fi**: Accessing ship mainframes and databases
- **Horror**: Interacting with corrupted AI systems
- **Mystery**: Uncovering secrets through email trails

### Game Master Tools
- Reveal story elements progressively through emails
- Create multiple factions with different servers
- Control player access with role-based permissions
- Hide easter eggs for attentive players

---

## Customization Guide

### Adding New Servers
1. Create folder: `/config/network/[ServerName]/`
2. Add required files:
   - `manifest.json` - Server settings
   - `userlist.json` - User accounts
   - `mailserver.json` - Email database
   - `software.js` (optional) - Custom commands
3. Update `src/kernel.js` if needed for special handling

### Adding New Commands
**JavaScript Method** (in software.js):
```javascript
function myCommand(args) {
    if (!isOnK2Server()) return null;
    return 'Command output here';
}
```

**JSON Method** (in software.json):
```json
{
  "myCommand": {
    "message": "Command output here",
    "help": "Description of command",
    "protection": "username"
  }
}
```

---

## External Resources

- **Original Project**: github.com/jacksonbenete/email_terminal
- **Hosting**: Works on GitHub Pages or any static host
- **Perfect For**: Tabletop RPG campaigns (Cyberpunk, Sci-Fi, Horror, Hacking scenarios)

---

## Status

**Current State**: ✅ Fully functional with comprehensive auto-scroll across all animated commands

**Servers Online**:
- UUC_Gladiator (Tactical Network)
- K2-PS187 (Ghost Ship Mainframe)

**All Systems**: Operational
**Auto-scroll**: Implemented
**Server Isolation**: Enforced
**Easter Eggs**: Active

---

*End of Project Summary*
