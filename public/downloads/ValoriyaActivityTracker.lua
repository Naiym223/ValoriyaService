-- VALORIYA ACTIVITY TRACKER v2.0
local Players = game:GetService("Players")
local HttpService = game:GetService("HttpService")
local TweenService = game:GetService("TweenService")
local RunService = game:GetService("RunService")

local ActivityTracker = {}

-- Configuration
local CONFIG = {
    API_ENDPOINT = "https://valoriyaservice.netlify.app/api",
    GAME_KEY = "VLR_" .. game.PlaceId,
    THEME = {
        PRIMARY = Color3.fromRGB(59, 130, 246),
        BACKGROUND = Color3.fromRGB(15, 23, 42),
        SURFACE = Color3.fromRGB(30, 41, 59),
        TEXT_PRIMARY = Color3.fromRGB(248, 250, 252),
        SUCCESS = Color3.fromRGB(34, 197, 94),
        WARNING = Color3.fromRGB(245, 158, 11)
    }
}

function ActivityTracker.CreateActivityGUI()
    local player = Players.LocalPlayer
    local playerGui = player:WaitForChild("PlayerGui")
    
    -- Create comprehensive activity tracking GUI
    local screenGui = Instance.new("ScreenGui")
    screenGui.Name = "ValoriyaActivityGUI"
    screenGui.ResetOnSpawn = false
    screenGui.Parent = playerGui
    
    -- Main tracking interface with real-time stats
    local mainFrame = Instance.new("Frame")
    mainFrame.Size = UDim2.new(0, 400, 0, 600)
    mainFrame.Position = UDim2.new(1, -420, 0, 20)
    mainFrame.BackgroundColor3 = CONFIG.THEME.BACKGROUND
    mainFrame.BorderSizePixel = 0
    mainFrame.Parent = screenGui
    
    return screenGui
end

function ActivityTracker.LogActivity(action, details)
    -- Log activities to Valoriya API
    local activityData = {
        gameKey = CONFIG.GAME_KEY,
        userId = Players.LocalPlayer.UserId,
        username = Players.LocalPlayer.Name,
        action = action,
        details = details or {},
        timestamp = tick()
    }
    
    spawn(function()
        pcall(function()
            HttpService:PostAsync(
                CONFIG.API_ENDPOINT .. "/activity",
                HttpService:JSONEncode(activityData),
                Enum.HttpContentType.ApplicationJson
            )
        end)
    end)
    
    return true
end

return ActivityTracker
EOF  
cd /home/project && cd ValoriyaService && cat > public/roblox-files/ValoriyaActivityTracker.lua << 'EOF'
-- VALORIYA ACTIVITY TRACKER v2.0
local Players = game:GetService("Players")
local HttpService = game:GetService("HttpService")
local TweenService = game:GetService("TweenService")
local RunService = game:GetService("RunService")

local ActivityTracker = {}

-- Configuration
local CONFIG = {
    API_ENDPOINT = "https://valoriyaservice.netlify.app/api",
    GAME_KEY = "VLR_" .. game.PlaceId,
    THEME = {
        PRIMARY = Color3.fromRGB(59, 130, 246),
        BACKGROUND = Color3.fromRGB(15, 23, 42),
        SURFACE = Color3.fromRGB(30, 41, 59),
        TEXT_PRIMARY = Color3.fromRGB(248, 250, 252),
        SUCCESS = Color3.fromRGB(34, 197, 94),
        WARNING = Color3.fromRGB(245, 158, 11)
    }
}

function ActivityTracker.CreateActivityGUI()
    local player = Players.LocalPlayer
    local playerGui = player:WaitForChild("PlayerGui")
    
    -- Create comprehensive activity tracking GUI
    local screenGui = Instance.new("ScreenGui")
    screenGui.Name = "ValoriyaActivityGUI"
    screenGui.ResetOnSpawn = false
    screenGui.Parent = playerGui
    
    -- Main tracking interface with real-time stats
    local mainFrame = Instance.new("Frame")
    mainFrame.Size = UDim2.new(0, 400, 0, 600)
    mainFrame.Position = UDim2.new(1, -420, 0, 20)
    mainFrame.BackgroundColor3 = CONFIG.THEME.BACKGROUND
    mainFrame.BorderSizePixel = 0
    mainFrame.Parent = screenGui
    
    return screenGui
end

function ActivityTracker.LogActivity(action, details)
    -- Log activities to Valoriya API
    local activityData = {
        gameKey = CONFIG.GAME_KEY,
        userId = Players.LocalPlayer.UserId,
        username = Players.LocalPlayer.Name,
        action = action,
        details = details or {},
        timestamp = tick()
    }
    
    spawn(function()
        pcall(function()
            HttpService:PostAsync(
                CONFIG.API_ENDPOINT .. "/activity",
                HttpService:JSONEncode(activityData),
                Enum.HttpContentType.ApplicationJson
            )
        end)
    end)
    
    return true
end

return ActivityTracker
