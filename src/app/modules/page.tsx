'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  Code, 
  Users, 
  ShoppingCart, 
  Activity, 
  Copy, 
  Eye,
  FileCode,
  Zap,
  Shield,
  Settings
} from 'lucide-react';

export default function ModulesPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, moduleType: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(moduleType);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const downloadModule = (code: string, moduleName: string) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${moduleName.replace(/\s+/g, '')}.lua`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const applicationCenterCode = `-- Valoriya Service Application Center Module
-- Place this script in ServerScriptService

local ValoriyaService = {}
local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")

-- Configuration
local GAME_KEY = "YOUR_GAME_KEY_HERE" -- Replace with your actual game key
local API_BASE = "https://valoriya-service.vercel.app/api"

-- Function to rank a player
function ValoriyaService:RankPlayer(player, targetRank, reason)
    local success, result = pcall(function()
        local data = {
            gameKey = GAME_KEY,
            targetUserId = player.UserId,
            targetUsername = player.Name,
            toRank = targetRank,
            groupId = 0, -- Replace with your group ID
            reason = reason or "Application Accepted"
        }
        
        local response = HttpService:PostAsync(
            API_BASE .. "/ranking",
            HttpService:JSONEncode(data),
            Enum.HttpContentType.ApplicationJson
        )
        
        return HttpService:JSONDecode(response)
    end)
    
    if success and result.success then
        print("Successfully ranked " .. player.Name .. " to rank " .. targetRank)
        return true
    else
        warn("Failed to rank " .. player.Name .. ": " .. (result.error or "Unknown error"))
        return false
    end
end

-- Function to handle application
function ValoriyaService:HandleApplication(player, applicationData)
    -- Validate application data
    if not applicationData.targetRank or applicationData.targetRank < 1 then
        return false, "Invalid rank specified"
    end
    
    -- Process the ranking
    local success = self:RankPlayer(player, applicationData.targetRank, "Application System")
    
    if success then
        -- Send confirmation to player
        local leaderstats = player:FindFirstChild("leaderstats")
        if leaderstats then
            local rankValue = leaderstats:FindFirstChild("Rank")
            if rankValue then
                rankValue.Value = applicationData.targetRank
            end
        end
        
        return true, "Application approved and rank assigned!"
    else
        return false, "Failed to process application"
    end
end

-- Event connections
Players.PlayerAdded:Connect(function(player)
    -- Create leaderstats
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player
    
    local rank = Instance.new("IntValue")
    rank.Name = "Rank"
    rank.Value = 1 -- Default rank
    rank.Parent = leaderstats
end)

return ValoriyaService`;

  const rankingCenterCode = `-- Valoriya Service Ranking Center Module
-- Place this script in ServerScriptService

local ValoriyaRanking = {}
local HttpService = game:GetService("HttpService")
local MarketplaceService = game:GetService("MarketplaceService")
local Players = game:GetService("Players")

-- Configuration
local GAME_KEY = "YOUR_GAME_KEY_HERE" -- Replace with your actual game key
local API_BASE = "https://valoriya-service.vercel.app/api"

-- Gamepass to rank mappings
local GAMEPASS_RANKS = {
    [123456] = 50,  -- Replace with actual gamepass ID and target rank
    [789012] = 100, -- Replace with actual gamepass ID and target rank
    [345678] = 150  -- Replace with actual gamepass ID and target rank
}

-- Function to check if player owns gamepass
function ValoriyaRanking:PlayerOwnsGamepass(player, gamepassId)
    local success, ownsGamepass = pcall(function()
        return MarketplaceService:UserOwnsGamePassAsync(player.UserId, gamepassId)
    end)
    
    return success and ownsGamepass
end

-- Function to rank player via API
function ValoriyaRanking:RankPlayer(player, targetRank, reason)
    local success, result = pcall(function()
        local data = {
            gameKey = GAME_KEY,
            targetUserId = player.UserId,
            targetUsername = player.Name,
            toRank = targetRank,
            groupId = 0, -- Replace with your group ID
            reason = reason or "Gamepass Purchase"
        }
        
        local response = HttpService:PostAsync(
            API_BASE .. "/ranking",
            HttpService:JSONEncode(data),
            Enum.HttpContentType.ApplicationJson
        )
        
        return HttpService:JSONDecode(response)
    end)
    
    if success and result.success then
        print("Successfully ranked " .. player.Name .. " to rank " .. targetRank)
        return true
    else
        warn("Failed to rank " .. player.Name .. ": " .. (result.error or "Unknown error"))
        return false
    end
end

-- Function to check and process rankings for a player
function ValoriyaRanking:ProcessPlayerRankings(player)
    for gamepassId, targetRank in pairs(GAMEPASS_RANKS) do
        if self:PlayerOwnsGamepass(player, gamepassId) then
            local success = self:RankPlayer(player, targetRank, "Gamepass " .. gamepassId)
            if success then
                -- Update player's rank in game
                local leaderstats = player:FindFirstChild("leaderstats")
                if leaderstats then
                    local rankValue = leaderstats:FindFirstChild("Rank")
                    if rankValue and rankValue.Value < targetRank then
                        rankValue.Value = targetRank
                    end
                end
                
                -- Notify player
                player:FindFirstChild("PlayerGui"):FindFirstChild("ScreenGui"):FindFirstChild("RankNotification").Text = 
                    "You have been ranked to " .. targetRank .. "!"
            end
        end
    end
end

-- Event connections
Players.PlayerAdded:Connect(function(player)
    -- Create leaderstats
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player
    
    local rank = Instance.new("IntValue")
    rank.Name = "Rank"
    rank.Value = 1
    rank.Parent = leaderstats
    
    -- Wait a moment for player data to load, then check rankings
    wait(3)
    ValoriyaRanking:ProcessPlayerRankings(player)
end)

-- Listen for gamepass purchases
MarketplaceService.PromptGamePassPurchaseFinished:Connect(function(player, gamepassId, wasPurchased)
    if wasPurchased and GAMEPASS_RANKS[gamepassId] then
        local targetRank = GAMEPASS_RANKS[gamepassId]
        ValoriyaRanking:RankPlayer(player, targetRank, "Gamepass Purchase: " .. gamepassId)
    end
end)

return ValoriyaRanking`;

  const activityTrackerCode = `-- Valoriya Service Activity Tracker Module
-- Place this script in ServerScriptService

local ActivityTracker = {}
local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

-- Configuration
local GAME_KEY = "YOUR_GAME_KEY_HERE" -- Replace with your actual game key
local API_BASE = "https://valoriya-service.vercel.app/api"
local TRACK_INTERVAL = 300 -- Track activity every 5 minutes

-- Player activity data
local playerActivity = {}

-- Function to log activity
function ActivityTracker:LogActivity(player, action, details)
    local success, result = pcall(function()
        local data = {
            gameKey = GAME_KEY,
            userId = player.UserId,
            username = player.Name,
            action = action,
            details = details or {},
            timestamp = os.time()
        }
        
        local response = HttpService:PostAsync(
            API_BASE .. "/activity",
            HttpService:JSONEncode(data),
            Enum.HttpContentType.ApplicationJson
        )
        
        return HttpService:JSONDecode(response)
    end)
    
    if success and result.success then
        print("Logged activity for " .. player.Name .. ": " .. action)
    else
        warn("Failed to log activity: " .. (result.error or "Unknown error"))
    end
end

-- Function to track player position
function ActivityTracker:TrackPlayerActivity(player)
    if not playerActivity[player] then
        playerActivity[player] = {
            lastPosition = player.Character and player.Character.PrimaryPart and player.Character.PrimaryPart.Position,
            totalTime = 0,
            isActive = true,
            lastUpdate = tick()
        }
    end
    
    local data = playerActivity[player]
    local currentTime = tick()
    local deltaTime = currentTime - data.lastUpdate
    
    if player.Character and player.Character.PrimaryPart then
        local currentPosition = player.Character.PrimaryPart.Position
        
        if data.lastPosition then
            local distance = (currentPosition - data.lastPosition).Magnitude
            
            -- Consider player active if they moved more than 5 studs
            if distance > 5 then
                data.isActive = true
                data.totalTime = data.totalTime + deltaTime
            else
                data.isActive = false
            end
        end
        
        data.lastPosition = currentPosition
    end
    
    data.lastUpdate = currentTime
end

-- Function to send activity report
function ActivityTracker:SendActivityReport()
    for player, data in pairs(playerActivity) do
        if player.Parent then -- Check if player is still in game
            self:LogActivity(player, "activity_report", {
                totalActiveTime = data.totalTime,
                isCurrentlyActive = data.isActive,
                position = data.lastPosition and {
                    x = data.lastPosition.X,
                    y = data.lastPosition.Y,
                    z = data.lastPosition.Z
                } or nil
            })
            
            -- Reset for next interval
            data.totalTime = 0
        end
    end
end

-- Event connections
Players.PlayerAdded:Connect(function(player)
    self:LogActivity(player, "player_joined", {
        joinTime = os.time()
    })
    
    player.CharacterAdded:Connect(function(character)
        wait(1) -- Wait for character to fully load
        playerActivity[player] = nil -- Reset activity tracking
    end)
end)

Players.PlayerRemoving:Connect(function(player)
    local data = playerActivity[player]
    self:LogActivity(player, "player_left", {
        leaveTime = os.time(),
        totalSessionTime = data and data.totalTime or 0
    })
    
    playerActivity[player] = nil
end)

-- Track activity every second
RunService.Heartbeat:Connect(function()
    for player in pairs(Players:GetPlayers()) do
        if player.Character then
            ActivityTracker:TrackPlayerActivity(player)
        end
    end
end)

-- Send reports every TRACK_INTERVAL seconds
spawn(function()
    while true do
        wait(TRACK_INTERVAL)
        ActivityTracker:SendActivityReport()
    end
end)

return ActivityTracker`;

  const modules = [
    {
      id: 'application-center',
      name: 'Application Center',
      description: 'Handle player applications and automatically rank users when they apply through your game',
      icon: Users,
      code: applicationCenterCode,
      features: [
        'Automatic ranking on application approval',
        'Customizable application validation',
        'Real-time rank updates',
        'Integration with leaderstats'
      ]
    },
    {
      id: 'ranking-center',
      name: 'Ranking Center',
      description: 'Automatically rank players when they purchase specific gamepasses',
      icon: ShoppingCart,
      code: rankingCenterCode,
      features: [
        'Gamepass-based ranking',
        'Multiple gamepass support',
        'Purchase detection',
        'Automatic rank assignment'
      ]
    },
    {
      id: 'activity-tracker',
      name: 'Activity Tracker',
      description: 'Monitor and log player activity for staff management and analytics',
      icon: Activity,
      code: activityTrackerCode,
      features: [
        'Real-time activity monitoring',
        'Movement tracking',
        'Session analytics',
        'Staff activity reports'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold gradient-text">Roblox Modules</h1>
          <p className="text-gray-600 mt-2">Download and integrate these modules into your Roblox games</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Overview */}
        <div className="mb-8 bg-valoriya-gradient text-white rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Download className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">1. Download</h3>
                <p className="text-sm opacity-90">Choose and download the module you need</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Settings className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">2. Configure</h3>
                <p className="text-sm opacity-90">Replace YOUR_GAME_KEY_HERE with your actual game key</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">3. Deploy</h3>
                <p className="text-sm opacity-90">Place in ServerScriptService and test</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid gap-6 mb-8">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="card-hover">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-valoriya-gradient-light p-3 rounded-lg">
                        <module.icon className="h-6 w-6 text-valoriya-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{module.name}</CardTitle>
                        <CardDescription>{module.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => copyToClipboard(module.code, module.id)}
                      >
                        {copiedCode === module.id ? (
                          <>
                            <Eye className="h-4 w-4 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Code
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="valoriya"
                        onClick={() => downloadModule(module.code, module.name)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Features</h4>
                      <ul className="space-y-2">
                        {module.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <div className="w-2 h-2 bg-valoriya-blue-500 rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Code Preview</h4>
                      <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs font-mono overflow-x-auto max-h-32">
                        <pre>{module.code.split('\n').slice(0, 6).join('\n')}...</pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Integration Guide */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileCode className="h-5 w-5 mr-2 text-valoriya-blue-600" />
              Integration Guide
            </CardTitle>
            <CardDescription>Step-by-step guide to integrate Valoriya modules</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="setup" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="setup">Setup</TabsTrigger>
                <TabsTrigger value="config">Configuration</TabsTrigger>
                <TabsTrigger value="testing">Testing</TabsTrigger>
              </TabsList>
              
              <TabsContent value="setup" className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Prerequisites</h3>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li>• Active Valoriya Service subscription</li>
                    <li>• Valid game key from your dashboard</li>
                    <li>• Roblox Studio access</li>
                    <li>• HTTP requests enabled in your game</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold">Installation Steps</h3>
                  <ol className="space-y-2 text-sm">
                    <li>1. Open Roblox Studio and your game project</li>
                    <li>2. Navigate to ServerScriptService in the Explorer</li>
                    <li>3. Create a new Script (not LocalScript)</li>
                    <li>4. Copy and paste the module code</li>
                    <li>5. Replace YOUR_GAME_KEY_HERE with your actual game key</li>
                    <li>6. Save and test the script</li>
                  </ol>
                </div>
              </TabsContent>
              
              <TabsContent value="config" className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-800 mb-2">Important Configuration</h3>
                  <p className="text-sm text-yellow-700 mb-3">
                    Make sure to configure these settings for each module:
                  </p>
                  <ul className="space-y-1 text-sm text-yellow-700">
                    <li>• Replace GAME_KEY with your actual key from the dashboard</li>
                    <li>• Set your Roblox group ID in the groupId field</li>
                    <li>• Configure gamepass IDs and target ranks (for Ranking Center)</li>
                    <li>• Enable HTTP requests in Game Settings</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Example Configuration</h4>
                  <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
{`local GAME_KEY = "VLR_ABC123DEF456" -- Your actual game key
local GROUP_ID = 1234567 -- Your Roblox group ID

-- For Ranking Center module
local GAMEPASS_RANKS = {
    [123456] = 50,  -- Gamepass ID → Target Rank
    [789012] = 100,
    [345678] = 150
}`}
                  </pre>
                </div>
              </TabsContent>
              
              <TabsContent value="testing" className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">Testing Your Integration</h3>
                  <p className="text-sm text-green-700 mb-3">
                    Follow these steps to ensure your modules are working correctly:
                  </p>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li>• Check the Output window for any error messages</li>
                    <li>• Test with a test account in your group</li>
                    <li>• Monitor the dashboard for ranking activity</li>
                    <li>• Verify API calls are being made successfully</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold">Common Issues</h3>
                  <div className="space-y-2 text-sm">
                    <div className="border-l-4 border-red-500 pl-4">
                      <strong>HTTP 403 Error:</strong> Check if HTTP requests are enabled in Game Settings
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-4">
                      <strong>Invalid Game Key:</strong> Verify your game key is correct and active
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                      <strong>Ranking Fails:</strong> Ensure the bot has proper permissions in your group
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}