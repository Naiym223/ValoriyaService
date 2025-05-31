-- VALORIYA MAIN MODULE v2.0
-- Complete GUI System for Roblox Games
-- This module provides full GUI interfaces for ranking, activity tracking, and analytics

local ValoriyaModule = {}

-- Import sub-modules
local RankingGUI = require(script.ValoriyaRankingGUI)
local ActivityTracker = require(script.ValoriyaActivityTracker)

-- Configuration
ValoriyaModule.Config = {
    API_ENDPOINT = "https://valoriyaservice.netlify.app/api",
    GAME_KEY = "VLR_" .. game.PlaceId,
    VERSION = "2.0.0",
    THEME = {
        PRIMARY = Color3.fromRGB(59, 130, 246),
        SECONDARY = Color3.fromRGB(147, 197, 253),
        BACKGROUND = Color3.fromRGB(15, 23, 42),
        SURFACE = Color3.fromRGB(30, 41, 59),
        TEXT_PRIMARY = Color3.fromRGB(248, 250, 252),
        TEXT_SECONDARY = Color3.fromRGB(148, 163, 184),
        SUCCESS = Color3.fromRGB(34, 197, 94),
        ERROR = Color3.fromRGB(239, 68, 68),
        WARNING = Color3.fromRGB(245, 158, 11)
    }
}

-- Initialize all Valoriya systems
function ValoriyaModule.Initialize()
    print("🚀 Valoriya Service v" .. ValoriyaModule.Config.VERSION .. " - Initializing...")
    
    -- Initialize activity tracking
    ActivityTracker.Initialize()
    
    -- Create command system
    ValoriyaModule.CreateCommandSystem()
    
    print("✅ Valoriya Service initialized successfully!")
    print("📖 Commands:")
    print("   /valoriya-rank - Open ranking interface")
    print("   /valoriya-activity - Open activity tracker")
    print("   /valoriya-help - Show all commands")
    
    return true
end

-- Create command system for easy access
function ValoriyaModule.CreateCommandSystem()
    local Players = game:GetService("Players")
    local player = Players.LocalPlayer
    
    -- Listen for chat commands
    if player.Chatted then
        player.Chatted:Connect(function(message)
            local command = string.lower(message)
            
            if command == "/valoriya-rank" then
                RankingGUI.CreateRankingInterface()
            elseif command == "/valoriya-activity" then
                ActivityTracker.CreateActivityGUI()
            elseif command == "/valoriya-help" then
                ValoriyaModule.ShowHelpGUI()
            end
        end)
    end
end

-- Help GUI
function ValoriyaModule.ShowHelpGUI()
    local Players = game:GetService("Players")
    local player = Players.LocalPlayer
    local playerGui = player:WaitForChild("PlayerGui")
    
    -- Remove existing help GUI
    local existingGui = playerGui:FindFirstChild("ValoriyaHelpGUI")
    if existingGui then
        existingGui:Destroy()
    end
    
    -- Create help GUI
    local screenGui = Instance.new("ScreenGui")
    screenGui.Name = "ValoriyaHelpGUI"
    screenGui.ResetOnSpawn = false
    screenGui.Parent = playerGui
    
    local mainFrame = Instance.new("Frame")
    mainFrame.Size = UDim2.new(0, 500, 0, 400)
    mainFrame.Position = UDim2.new(0.5, -250, 0.5, -200)
    mainFrame.BackgroundColor3 = ValoriyaModule.Config.THEME.BACKGROUND
    mainFrame.BorderSizePixel = 0
    mainFrame.Parent = screenGui
    
    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0, 12)
    corner.Parent = mainFrame
    
    -- Header
    local header = Instance.new("Frame")
    header.Size = UDim2.new(1, 0, 0, 60)
    header.BackgroundColor3 = ValoriyaModule.Config.THEME.PRIMARY
    header.BorderSizePixel = 0
    header.Parent = mainFrame
    
    local headerCorner = Instance.new("UICorner")
    headerCorner.CornerRadius = UDim.new(0, 12)
    headerCorner.Parent = header
    
    local title = Instance.new("TextLabel")
    title.Size = UDim2.new(1, -20, 1, 0)
    title.Position = UDim2.new(0, 20, 0, 0)
    title.BackgroundTransparency = 1
    title.Text = "🚀 VALORIYA HELP CENTER"
    title.TextColor3 = Color3.fromRGB(255, 255, 255)
    title.TextScaled = true
    title.Font = Enum.Font.GothamBold
    title.Parent = header
    
    -- Close button
    local closeButton = Instance.new("TextButton")
    closeButton.Size = UDim2.new(0, 40, 0, 40)
    closeButton.Position = UDim2.new(1, -50, 0, 10)
    closeButton.BackgroundColor3 = ValoriyaModule.Config.THEME.ERROR
    closeButton.Text = "✕"
    closeButton.TextColor3 = Color3.fromRGB(255, 255, 255)
    closeButton.TextScaled = true
    closeButton.Font = Enum.Font.GothamBold
    closeButton.BorderSizePixel = 0
    closeButton.Parent = header
    
    -- Content
    local content = Instance.new("TextLabel")
    content.Size = UDim2.new(1, -40, 1, -100)
    content.Position = UDim2.new(0, 20, 0, 80)
    content.BackgroundTransparency = 1
    content.Text = [[

/valoriya-rank
   Opens the ranking interface for managing group ranks

/valoriya-activity  
   Opens the activity tracker for monitoring player actions

/valoriya-help
   Shows this help menu

 Real-time activity tracking
 Group ranking management  
 Analytics and statistics
 Beautiful modern UI
 API integration with Valoriya dashboard

1. Ensure HTTP requests are enabled
2. Configure your game key in the script
3. Set up proper group permissions
4. Connect to Valoriya dashboard

For support, visit: valoriyaservice.netlify.app
    ]]
    content.TextColor3 = ValoriyaModule.Config.THEME.TEXT_PRIMARY
    content.TextScaled = true
    content.Font = Enum.Font.Gotham
    content.TextXAlignment = Enum.TextXAlignment.Left
    content.TextYAlignment = Enum.TextYAlignment.Top
    content.Parent = mainFrame
    
    -- Close functionality
    closeButton.MouseButton1Click:Connect(function()
        screenGui:Destroy()
    end)
    
    return screenGui
end

-- Quick access functions
ValoriyaModule.OpenRankingGUI = function()
    return RankingGUI.CreateRankingInterface()
end

ValoriyaModule.OpenActivityTracker = function()
    return ActivityTracker.CreateActivityGUI()
end

ValoriyaModule.LogActivity = function(action, details)
    return ActivityTracker.LogActivity(action, details)
end

return ValoriyaModule
EOF  
cd /home/project && cd ValoriyaService && cat > public/roblox-files/ValoriyaMainModule.lua << 'EOF'
-- VALORIYA MAIN MODULE v2.0
-- Complete GUI System for Roblox Games
-- This module provides full GUI interfaces for ranking, activity tracking, and analytics

local ValoriyaModule = {}

-- Import sub-modules
local RankingGUI = require(script.ValoriyaRankingGUI)
local ActivityTracker = require(script.ValoriyaActivityTracker)

-- Configuration
ValoriyaModule.Config = {
    API_ENDPOINT = "https://valoriyaservice.netlify.app/api",
    GAME_KEY = "VLR_" .. game.PlaceId,
    VERSION = "2.0.0",
    THEME = {
        PRIMARY = Color3.fromRGB(59, 130, 246),
        SECONDARY = Color3.fromRGB(147, 197, 253),
        BACKGROUND = Color3.fromRGB(15, 23, 42),
        SURFACE = Color3.fromRGB(30, 41, 59),
        TEXT_PRIMARY = Color3.fromRGB(248, 250, 252),
        TEXT_SECONDARY = Color3.fromRGB(148, 163, 184),
        SUCCESS = Color3.fromRGB(34, 197, 94),
        ERROR = Color3.fromRGB(239, 68, 68),
        WARNING = Color3.fromRGB(245, 158, 11)
    }
}

-- Initialize all Valoriya systems
function ValoriyaModule.Initialize()
    print("🚀 Valoriya Service v" .. ValoriyaModule.Config.VERSION .. " - Initializing...")
    
    -- Initialize activity tracking
    ActivityTracker.Initialize()
    
    -- Create command system
    ValoriyaModule.CreateCommandSystem()
    
    print("✅ Valoriya Service initialized successfully!")
    print("📖 Commands:")
    print("   /valoriya-rank - Open ranking interface")
    print("   /valoriya-activity - Open activity tracker")
    print("   /valoriya-help - Show all commands")
    
    return true
end

-- Create command system for easy access
function ValoriyaModule.CreateCommandSystem()
    local Players = game:GetService("Players")
    local player = Players.LocalPlayer
    
    -- Listen for chat commands
    if player.Chatted then
        player.Chatted:Connect(function(message)
            local command = string.lower(message)
            
            if command == "/valoriya-rank" then
                RankingGUI.CreateRankingInterface()
            elseif command == "/valoriya-activity" then
                ActivityTracker.CreateActivityGUI()
            elseif command == "/valoriya-help" then
                ValoriyaModule.ShowHelpGUI()
            end
        end)
    end
end

-- Help GUI
function ValoriyaModule.ShowHelpGUI()
    local Players = game:GetService("Players")
    local player = Players.LocalPlayer
    local playerGui = player:WaitForChild("PlayerGui")
    
    -- Remove existing help GUI
    local existingGui = playerGui:FindFirstChild("ValoriyaHelpGUI")
    if existingGui then
        existingGui:Destroy()
    end
    
    -- Create help GUI
    local screenGui = Instance.new("ScreenGui")
    screenGui.Name = "ValoriyaHelpGUI"
    screenGui.ResetOnSpawn = false
    screenGui.Parent = playerGui
    
    local mainFrame = Instance.new("Frame")
    mainFrame.Size = UDim2.new(0, 500, 0, 400)
    mainFrame.Position = UDim2.new(0.5, -250, 0.5, -200)
    mainFrame.BackgroundColor3 = ValoriyaModule.Config.THEME.BACKGROUND
    mainFrame.BorderSizePixel = 0
    mainFrame.Parent = screenGui
    
    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0, 12)
    corner.Parent = mainFrame
    
    -- Header
    local header = Instance.new("Frame")
    header.Size = UDim2.new(1, 0, 0, 60)
    header.BackgroundColor3 = ValoriyaModule.Config.THEME.PRIMARY
    header.BorderSizePixel = 0
    header.Parent = mainFrame
    
    local headerCorner = Instance.new("UICorner")
    headerCorner.CornerRadius = UDim.new(0, 12)
    headerCorner.Parent = header
    
    local title = Instance.new("TextLabel")
    title.Size = UDim2.new(1, -20, 1, 0)
    title.Position = UDim2.new(0, 20, 0, 0)
    title.BackgroundTransparency = 1
    title.Text = "🚀 VALORIYA HELP CENTER"
    title.TextColor3 = Color3.fromRGB(255, 255, 255)
    title.TextScaled = true
    title.Font = Enum.Font.GothamBold
    title.Parent = header
    
    -- Close button
    local closeButton = Instance.new("TextButton")
    closeButton.Size = UDim2.new(0, 40, 0, 40)
    closeButton.Position = UDim2.new(1, -50, 0, 10)
    closeButton.BackgroundColor3 = ValoriyaModule.Config.THEME.ERROR
    closeButton.Text = "✕"
    closeButton.TextColor3 = Color3.fromRGB(255, 255, 255)
    closeButton.TextScaled = true
    closeButton.Font = Enum.Font.GothamBold
    closeButton.BorderSizePixel = 0
    closeButton.Parent = header
    
    -- Content
    local content = Instance.new("TextLabel")
    content.Size = UDim2.new(1, -40, 1, -100)
    content.Position = UDim2.new(0, 20, 0, 80)
    content.BackgroundTransparency = 1
    content.Text = [[

/valoriya-rank
   Opens the ranking interface for managing group ranks

/valoriya-activity  
   Opens the activity tracker for monitoring player actions

/valoriya-help
   Shows this help menu

 Real-time activity tracking
 Group ranking management  
 Analytics and statistics
 Beautiful modern UI
 API integration with Valoriya dashboard

1. Ensure HTTP requests are enabled
2. Configure your game key in the script
3. Set up proper group permissions
4. Connect to Valoriya dashboard

For support, visit: valoriyaservice.netlify.app
    ]]
    content.TextColor3 = ValoriyaModule.Config.THEME.TEXT_PRIMARY
    content.TextScaled = true
    content.Font = Enum.Font.Gotham
    content.TextXAlignment = Enum.TextXAlignment.Left
    content.TextYAlignment = Enum.TextYAlignment.Top
    content.Parent = mainFrame
    
    -- Close functionality
    closeButton.MouseButton1Click:Connect(function()
        screenGui:Destroy()
    end)
    
    return screenGui
end

-- Quick access functions
ValoriyaModule.OpenRankingGUI = function()
    return RankingGUI.CreateRankingInterface()
end

ValoriyaModule.OpenActivityTracker = function()
    return ActivityTracker.CreateActivityGUI()
end

ValoriyaModule.LogActivity = function(action, details)
    return ActivityTracker.LogActivity(action, details)
end

return ValoriyaModule
