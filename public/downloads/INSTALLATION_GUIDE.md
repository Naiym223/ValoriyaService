# 🚀 VALORIYA ROBLOX GUI SYSTEM - INSTALLATION GUIDE

## Overview
This package contains a complete GUI system for integrating Valoriya services into your Roblox game. It includes ranking management, activity tracking, and real-time analytics.

## Files Included
- `ValoriyaMainModule.lua` - Main module controller
- `ValoriyaRankingGUI.lua` - Ranking interface system  
- `ValoriyaActivityTracker.lua` - Activity tracking GUI
- `ValoriyaGUISystem.rbxl` - Complete place file with GUI setup

## Quick Setup (Recommended)

### Option 1: Use the RBXL File
1. Download `ValoriyaGUISystem.rbxl`
2. Open in Roblox Studio
3. Publish to your game
4. Configure game key in ServerScriptService

### Option 2: Manual Installation
1. Create a ModuleScript in ServerScriptService named "ValoriyaModule"
2. Copy contents of `ValoriyaMainModule.lua` into the ModuleScript
3. Create child ModuleScripts for ranking and activity systems
4. Copy respective Lua files into child modules

## Configuration

### 1. Enable HTTP Requests
In your game settings:
- Go to Security tab
- Enable "Allow HTTP Requests"

### 2. Configure Game Key
In the main module, update:
```lua
GAME_KEY = "VLR_YOUR_ACTUAL_GAME_ID"
```

### 3. Set Group Permissions
Ensure your game has proper group ranking permissions.

## Usage

### Chat Commands
Players can use these commands in chat:
- `/valoriya-rank` - Open ranking interface
- `/valoriya-activity` - Open activity tracker  
- `/valoriya-help` - Show help menu

### Script Usage
```lua
local ValoriyaModule = require(game.ServerScriptService.ValoriyaModule)

-- Initialize the system
ValoriyaModule.Initialize()

-- Open GUIs programmatically
ValoriyaModule.OpenRankingGUI()
ValoriyaModule.OpenActivityTracker()

-- Log custom activities
ValoriyaModule.LogActivity("custom_event", {
    description = "Player completed quest",
    quest_id = 123
})
```

## Features

### 🎖️ Ranking System
- Modern UI with Valoriya branding
- Group rank management
- Real-time rank updates
- Activity logging for all rank changes
- Permission validation

### 📊 Activity Tracking  
- Real-time player activity monitoring
- Session time tracking
- Custom event logging
- Automatic join/leave tracking
- Integration with Valoriya dashboard

### 🎨 UI Features
- Light blue Valoriya theme
- Smooth animations and transitions
- Responsive design
- Mobile-friendly layouts
- Professional styling

### 🔌 API Integration
- Real-time data sync with Valoriya dashboard
- Automatic activity logging
- Ranking request processing
- Analytics data collection

## Troubleshooting

### HTTP Requests Not Working
1. Verify HTTP requests are enabled in game settings
2. Check if your game has the correct permissions
3. Ensure API endpoint is accessible

### Ranking Not Working
1. Verify your group has ranking permissions
2. Check that the game key is correctly configured
3. Ensure the player has ranking permissions in the group

### GUI Not Appearing
1. Make sure the module is in ServerScriptService
2. Verify the script is running (check output)
3. Try reinitializing the module

## Support
For additional support:
- Visit: https://valoriyaservice.netlify.app
- Documentation: Available in dashboard
- Discord: Contact server administrators

## Version Information
- Version: 2.0.0
- Compatible with: All Roblox games
- Requirements: HTTP requests enabled
- Last updated: 2025

---
 2025 Valoriya Service - Professional Roblox Integration
EOF  
cd /home/project && cd ValoriyaService && cat > public/roblox-files/INSTALLATION_GUIDE.md << 'EOF'
# 🚀 VALORIYA ROBLOX GUI SYSTEM - INSTALLATION GUIDE

## Overview
This package contains a complete GUI system for integrating Valoriya services into your Roblox game. It includes ranking management, activity tracking, and real-time analytics.

## Files Included
- `ValoriyaMainModule.lua` - Main module controller
- `ValoriyaRankingGUI.lua` - Ranking interface system  
- `ValoriyaActivityTracker.lua` - Activity tracking GUI
- `ValoriyaGUISystem.rbxl` - Complete place file with GUI setup

## Quick Setup (Recommended)

### Option 1: Use the RBXL File
1. Download `ValoriyaGUISystem.rbxl`
2. Open in Roblox Studio
3. Publish to your game
4. Configure game key in ServerScriptService

### Option 2: Manual Installation
1. Create a ModuleScript in ServerScriptService named "ValoriyaModule"
2. Copy contents of `ValoriyaMainModule.lua` into the ModuleScript
3. Create child ModuleScripts for ranking and activity systems
4. Copy respective Lua files into child modules

## Configuration

### 1. Enable HTTP Requests
In your game settings:
- Go to Security tab
- Enable "Allow HTTP Requests"

### 2. Configure Game Key
In the main module, update:
```lua
GAME_KEY = "VLR_YOUR_ACTUAL_GAME_ID"
```

### 3. Set Group Permissions
Ensure your game has proper group ranking permissions.

## Usage

### Chat Commands
Players can use these commands in chat:
- `/valoriya-rank` - Open ranking interface
- `/valoriya-activity` - Open activity tracker  
- `/valoriya-help` - Show help menu

### Script Usage
```lua
local ValoriyaModule = require(game.ServerScriptService.ValoriyaModule)

-- Initialize the system
ValoriyaModule.Initialize()

-- Open GUIs programmatically
ValoriyaModule.OpenRankingGUI()
ValoriyaModule.OpenActivityTracker()

-- Log custom activities
ValoriyaModule.LogActivity("custom_event", {
    description = "Player completed quest",
    quest_id = 123
})
```

## Features

### 🎖️ Ranking System
- Modern UI with Valoriya branding
- Group rank management
- Real-time rank updates
- Activity logging for all rank changes
- Permission validation

### 📊 Activity Tracking  
- Real-time player activity monitoring
- Session time tracking
- Custom event logging
- Automatic join/leave tracking
- Integration with Valoriya dashboard

### 🎨 UI Features
- Light blue Valoriya theme
- Smooth animations and transitions
- Responsive design
- Mobile-friendly layouts
- Professional styling

### 🔌 API Integration
- Real-time data sync with Valoriya dashboard
- Automatic activity logging
- Ranking request processing
- Analytics data collection

## Troubleshooting

### HTTP Requests Not Working
1. Verify HTTP requests are enabled in game settings
2. Check if your game has the correct permissions
3. Ensure API endpoint is accessible

### Ranking Not Working
1. Verify your group has ranking permissions
2. Check that the game key is correctly configured
3. Ensure the player has ranking permissions in the group

### GUI Not Appearing
1. Make sure the module is in ServerScriptService
2. Verify the script is running (check output)
3. Try reinitializing the module

## Support
For additional support:
- Visit: https://valoriyaservice.netlify.app
- Documentation: Available in dashboard
- Discord: Contact server administrators

## Version Information
- Version: 2.0.0
- Compatible with: All Roblox games
- Requirements: HTTP requests enabled
- Last updated: 2025

---
 2025 Valoriya Service - Professional Roblox Integration
