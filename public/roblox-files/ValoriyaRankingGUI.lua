-- VALORIYA RANKING GUI SYSTEM v2.0
local Players = game:GetService("Players")
local StarterGui = game:GetService("StarterGui")
local HttpService = game:GetService("HttpService")
local UserInputService = game:GetService("UserInputService")
local TweenService = game:GetService("TweenService")

local ValoriyaGUI = {}

-- Configuration
local VALORIYA_CONFIG = {
    API_ENDPOINT = "https://valoriyaservice.netlify.app/api",
    GAME_KEY = "VLR_" .. game.PlaceId,
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

function ValoriyaGUI.CreateRankingInterface()
    local player = Players.LocalPlayer
    local playerGui = player:WaitForChild("PlayerGui")
    
    -- Remove existing GUI if it exists
    local existingGui = playerGui:FindFirstChild("ValoriyaRankingGUI")
    if existingGui then
        existingGui:Destroy()
    end
    
    -- Create main ScreenGui
    local screenGui = Instance.new("ScreenGui")
    screenGui.Name = "ValoriyaRankingGUI"
    screenGui.ResetOnSpawn = false
    screenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
    screenGui.Parent = playerGui
    
    -- Create main frame with proper styling
    local mainFrame = Instance.new("Frame")
    mainFrame.Name = "MainFrame"
    mainFrame.Size = UDim2.new(0, 600, 0, 500)
    mainFrame.Position = UDim2.new(0.5, -300, 0.5, -250)
    mainFrame.BackgroundColor3 = VALORIYA_CONFIG.THEME.BACKGROUND
    mainFrame.BorderSizePixel = 0
    mainFrame.Parent = screenGui
    
    -- Add UI components with proper styling
    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0, 12)
    corner.Parent = mainFrame
    
    -- Header section
    local header = Instance.new("Frame")
    header.Name = "Header"
    header.Size = UDim2.new(1, 0, 0, 60)
    header.BackgroundColor3 = VALORIYA_CONFIG.THEME.PRIMARY
    header.BorderSizePixel = 0
    header.Parent = mainFrame
    
    local headerCorner = Instance.new("UICorner")
    headerCorner.CornerRadius = UDim.new(0, 12)
    headerCorner.Parent = header
    
    local title = Instance.new("TextLabel")
    title.Size = UDim2.new(1, -20, 1, 0)
    title.Position = UDim2.new(0, 20, 0, 0)
    title.BackgroundTransparency = 1
    title.Text = "VALORIYA RANKING SYSTEM"
    title.TextColor3 = Color3.fromRGB(255, 255, 255)
    title.TextScaled = true
    title.Font = Enum.Font.GothamBold
    title.Parent = header
    
    -- Close button
    local closeButton = Instance.new("TextButton")
    closeButton.Size = UDim2.new(0, 40, 0, 40)
    closeButton.Position = UDim2.new(1, -50, 0, 10)
    closeButton.BackgroundColor3 = VALORIYA_CONFIG.THEME.ERROR
    closeButton.Text = "X"
    closeButton.TextColor3 = Color3.fromRGB(255, 255, 255)
    closeButton.TextScaled = true
    closeButton.Font = Enum.Font.GothamBold
    closeButton.BorderSizePixel = 0
    closeButton.Parent = header
    
    -- Content area with search and ranking functionality
    local contentFrame = Instance.new("ScrollingFrame")
    contentFrame.Size = UDim2.new(1, -40, 1, -100)
    contentFrame.Position = UDim2.new(0, 20, 0, 80)
    contentFrame.BackgroundTransparency = 1
    contentFrame.ScrollBarThickness = 6
    contentFrame.CanvasSize = UDim2.new(0, 0, 0, 800)
    contentFrame.Parent = mainFrame
    
    -- Player search section
    local searchSection = Instance.new("Frame")
    searchSection.Size = UDim2.new(1, 0, 0, 80)
    searchSection.BackgroundColor3 = VALORIYA_CONFIG.THEME.SURFACE
    searchSection.BorderSizePixel = 0
    searchSection.Parent = contentFrame
    
    local searchLabel = Instance.new("TextLabel")
    searchLabel.Size = UDim2.new(1, -20, 0, 30)
    searchLabel.Position = UDim2.new(0, 10, 0, 5)
    searchLabel.BackgroundTransparency = 1
    searchLabel.Text = "Target Player Username/ID:"
    searchLabel.TextColor3 = VALORIYA_CONFIG.THEME.TEXT_PRIMARY
    searchLabel.TextScaled = true
    searchLabel.Font = Enum.Font.Gotham
    searchLabel.TextXAlignment = Enum.TextXAlignment.Left
    searchLabel.Parent = searchSection
    
    local searchBox = Instance.new("TextBox")
    searchBox.Size = UDim2.new(1, -20, 0, 35)
    searchBox.Position = UDim2.new(0, 10, 0, 35)
    searchBox.BackgroundColor3 = VALORIYA_CONFIG.THEME.BACKGROUND
    searchBox.Text = ""
    searchBox.PlaceholderText = "Enter username or user ID..."
    searchBox.TextColor3 = VALORIYA_CONFIG.THEME.TEXT_PRIMARY
    searchBox.PlaceholderColor3 = VALORIYA_CONFIG.THEME.TEXT_SECONDARY
    searchBox.TextScaled = true
    searchBox.Font = Enum.Font.Gotham
    searchBox.BorderSizePixel = 0
    searchBox.Parent = searchSection
    
    -- Rank selection buttons
    local rankSection = Instance.new("Frame")
    rankSection.Size = UDim2.new(1, 0, 0, 120)
    rankSection.Position = UDim2.new(0, 0, 0, 100)
    rankSection.BackgroundColor3 = VALORIYA_CONFIG.THEME.SURFACE
    rankSection.BorderSizePixel = 0
    rankSection.Parent = contentFrame
    
    local selectedRank = nil
    local ranks = {
        {id = 1, name = "Guest"},
        {id = 100, name = "Member"},
        {id = 150, name = "VIP"},
        {id = 200, name = "Admin"}
    }
    
    for i, rank in ipairs(ranks) do
        local rankButton = Instance.new("TextButton")
        rankButton.Size = UDim2.new(0, 120, 0, 35)
        rankButton.Position = UDim2.new(0, (i-1) * 130 + 10, 0, 40)
        rankButton.BackgroundColor3 = VALORIYA_CONFIG.THEME.PRIMARY
        rankButton.Text = rank.name
        rankButton.TextColor3 = Color3.fromRGB(255, 255, 255)
        rankButton.TextScaled = true
        rankButton.Font = Enum.Font.GothamBold
        rankButton.BorderSizePixel = 0
        rankButton.Parent = rankSection
        
        rankButton.MouseButton1Click:Connect(function()
            selectedRank = rank.id
        end)
    end
    
    -- Execute button
    local executeButton = Instance.new("TextButton")
    executeButton.Size = UDim2.new(0, 200, 0, 50)
    executeButton.Position = UDim2.new(0.5, -100, 0, 250)
    executeButton.BackgroundColor3 = VALORIYA_CONFIG.THEME.SUCCESS
    executeButton.Text = "Execute Ranking"
    executeButton.TextColor3 = Color3.fromRGB(255, 255, 255)
    executeButton.TextScaled = true
    executeButton.Font = Enum.Font.GothamBold
    executeButton.BorderSizePixel = 0
    executeButton.Parent = contentFrame
    
    -- Event connections
    executeButton.MouseButton1Click:Connect(function()
        local targetUser = searchBox.Text
        if targetUser ~= "" and selectedRank then
            -- Make API call to ranking endpoint
            local success, result = pcall(function()
                return HttpService:PostAsync(
                    VALORIYA_CONFIG.API_ENDPOINT .. "/ranking",
                    HttpService:JSONEncode({
                        gameKey = VALORIYA_CONFIG.GAME_KEY,
                        targetUserId = targetUser,
                        targetUsername = targetUser,
                        toRank = selectedRank,
                        groupId = game.CreatorId,
                        reason = "Ranked via Valoriya GUI"
                    }),
                    Enum.HttpContentType.ApplicationJson
                )
            end)
        end
    end)
    
    closeButton.MouseButton1Click:Connect(function()
        screenGui:Destroy()
    end)
    
    return screenGui
end

return ValoriyaGUI