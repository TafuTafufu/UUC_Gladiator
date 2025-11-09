# Email Reader Terminal for Tabletop RPGs

## Project Overview
This is a customizable terminal emulator designed for tabletop RPG campaigns. Players can interact with a command-line interface to read emails, access server files, and explore a sci-fi/cyberpunk themed communication system.

**Current Theme**: UUC Gladiator Tactical Network - A Chinese-language sci-fi RPG terminal

## Project Type
- **Frontend**: Static HTML/CSS/JavaScript application
- **Server**: http-server (static file serving)
- **Port**: 5000 (configured for Replit webview)
- **Cache**: Disabled (-c-1) for development

## Technology Stack
- Vanilla JavaScript
- jQuery 2.1.1
- p5.js 0.5.7 (for visual effects)
- http-server 14.1.1 (dev server)
- ESLint (code quality)

## Project Structure
```
/config/network/        - Server configurations (localhost, UUC_Gladiator, K2-PS187)
  /[server-name]/
    - manifest.json     - Server metadata and settings
    - userlist.json     - User accounts for login
    - mailserver.json   - Email database
    - software.json     - Custom terminal programs
    - software.js       - JavaScript-based custom programs
/src/                   - Core terminal source code
  - terminal.js         - Terminal UI and input handling
  - kernel.js           - Command routing and system logic
  - terminal.css        - Terminal styling
  /lib/                 - Third-party libraries
  /fonts/               - Custom terminal fonts (Inconsolata)
/docs/                  - Documentation images and GIFs
```

## Key Features
1. **Multi-server SSH simulation**: Connect to different servers with `ssh [server-name]`
2. **User authentication**: Login system with usernames and passwords
3. **Email system**: Read messages using `mail` and `read` commands
4. **Custom software**: Define custom terminal programs in JSON or JavaScript
5. **Visual effects**: Glitch effects, particle effects, text animations
6. **Command history**: Navigate previous commands with UP/DOWN arrows
7. **Customizable themes**: Change server names, icons, dates, terminal IDs

## Available Commands
- `help` - Show available commands
- `login [user]@[password]` - Authenticate as a user
- `mail` - List available emails
- `read [index]` - Read a specific email
- `ssh [server]` - Connect to another server
- `clear` - Clear the terminal
- `date` - Show server date/time
- Custom commands defined in software.json

## Configuration Files

### manifest.json
Defines server appearance and settings:
- Server name, address, terminal ID
- Custom icon and icon size
- Year/date settings
- Default user configuration
- Initial command history per user

### userlist.json
User accounts with:
- userId (login username)
- password
- userName (display name)

### mailserver.json
Email messages with:
- from (sender)
- to (array of recipient userIds)
- title (email subject)
- body (message content)

### software.json
Custom terminal programs with optional fields:
- message (output text/HTML)
- location (which servers have access)
- protection (which users can run it)
- help (description)
- clear (clear screen before output)
- delayed (typing effect speed in ms)
- secretCommand (hide from help/autocomplete)

## Development

### Start Development Server
```bash
npm start
```
This runs http-server on 0.0.0.0:5000 with caching disabled.

### Run Linting
```bash
npm test
```
Runs ESLint with auto-fix on source files.

## Deployment
Configured for Replit Autoscale deployment:
- Stateless static website
- Serves files on port 5000
- No build step required
- Cache disabled for immediate updates

## Recent Changes (Replit Setup)
- ✅ Configured http-server to bind to 0.0.0.0:5000 for Replit webview
- ✅ Set up dev workflow with webview output
- ✅ Configured deployment for autoscale
- ✅ Updated .gitignore for Node.js development
- ✅ Installed all dependencies

## K2-PS187 Server (Ghost Ship Mainframe)
**Server Address**: `ssh k2-ps187` (case-insensitive)

A fully custom horror-themed server featuring the corrupted AI of the abandoned Tatterdemalion research vessel.

### K2 Features
- **Three Role Types**:
  - `crew` - Limited access (exit only)
  - `maintenance` - Basic ship status
  - `core` - Full AI access with visual effects
  
- **Six Crew Members**:
  - `k2crew1` to `k2crew6` (all password: AWAKEN)
  - `k2maint` (password: REPAIR87)
  - `k2core` (password: AWAKEN)

### Custom K2 Commands
- `log` - Display 12-day ship log (days 387-418) with sequential chunk animation
- `status` - Ship systems status (animated typewriter effect for core users)
- `query [1-4]` - Ask questions to K2 AI (easter egg: question 4 unlocks after asking 1-3)
- `scan tatterdemalion` - Animated scan with progress bar (core users only)
- `exit` - Returns ALL users to UUC_Gladiator in not-logged-in state

### Technical Implementation
- **Server Isolation**: UUC-exclusive commands (crew, profile, mail, read, login, logout) properly blocked on K2
- **Auto-scroll**: All animated commands automatically scroll to show latest content
- **Typewriter Effects**: 15-20ms character delays for immersive text animations
- **Sequential Animation**: Ship log displays in chunks with 500ms intervals
- **Easter Egg System**: Query 4 only appears in help after asking questions 1-3
- **Progress Bar**: 25-block animated scan progress (8 second duration)

### Files Modified for K2
- `config/network/K2-PS187/software.js` - All K2 custom commands
- `config/network/K2-PS187/userlist.json` - User roles and credentials
- `config/network/K2-PS187/manifest.json` - Server configuration
- `config/network/UUC_Gladiator/override.js` - Server isolation checks
- `src/kernel.js` - Server switching and command routing

## Current State
The terminal is fully functional with TWO complete servers:
1. **UUC_Gladiator** - Main tactical network (Chinese-language sci-fi RPG)
2. **K2-PS187** - Ghost ship mainframe (horror-themed with corrupted AI)

Players can switch between servers using `ssh [server-name]` and experience completely different command sets and storylines.

## Customization Notes
This is a forked/customized version with:
- Custom crew profiles system (crewProfiles.js)
- Override.js for custom command behavior and server isolation
- Chinese + English bilingual interface
- Dual-themed servers (tactical military + horror)
- Advanced animation system with auto-scroll
- Role-based access control per server

## External Resources
- Original project: github.com/jacksonbenete/email_terminal
- Can be hosted on GitHub Pages
- Perfect for tabletop RPG campaigns (Cyberpunk, Sci-Fi, Hacking scenarios)
