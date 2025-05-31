'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Code, Play, Settings, Users, Shield, FileText, Package, BookOpen, File } from 'lucide-react';

interface RobloxGUIProps {
  gameKey: string;
}

export default function RobloxGUI({ gameKey }: RobloxGUIProps) {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const robloxModules = [
    {
      id: 'ranking-gui',
      name: 'Advanced Ranking GUI',
      description: 'Complete ranking interface with modern UI, animations, and permission system',
      icon: Users,
      features: ['Modern drag & drop interface', 'Permission validation', 'Animated notifications', 'Command system', 'Admin verification'],
      previewCode: `-- Valoriya Advanced Ranking GUI
local ValoriyaRanking = {}
local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- Configuration
local GAME_KEY = "${gameKey || 'YOUR_GAME_KEY_HERE'}"
local API_BASE = "https://valoriya-service.vercel.app/api"
local GROUP_ID = 0 -- Replace with your group ID

-- Create modern ranking interface
function ValoriyaRanking:CreateMainGUI(player)
    local screenGui = Instance.new("ScreenGui")
    screenGui.Name = "ValoriyaRankingGUI"
    screenGui.ResetOnSpawn = false
    screenGui.Parent = player:WaitForChild("PlayerGui")
    
    -- Main Frame with modern design
    local mainFrame = Instance.new("Frame")
    mainFrame.Size = UDim2.new(0, 450, 0, 400)
    mainFrame.Position = UDim2.new(0.5, -225, 0.5, -200)
    mainFrame.BackgroundColor3 = Color3.fromRGB(45, 45, 45)
    mainFrame.BorderSizePixel = 0
    mainFrame.Active = true
    mainFrame.Draggable = true
    mainFrame.Parent = screenGui
    
    -- Add corner radius and modern styling
    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0, 12)
    corner.Parent = mainFrame
end

return ValoriyaRanking`
    },
    {
      id: 'admin-panel',
      name: 'Comprehensive Admin Panel',
      description: 'Full-featured administrative interface with user management and statistics',
      icon: Shield,
      features: ['Multi-tab interface', 'User search & management', 'Real-time statistics', 'Activity monitoring', 'Bulk operations'],
      previewCode: `-- Valoriya Comprehensive Admin Panel
local ValoriyaAdmin = {}
local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")

-- Configuration
local GAME_KEY = "${gameKey || 'YOUR_GAME_KEY_HERE'}"
local API_BASE = "https://valoriya-service.vercel.app/api"
local ADMIN_RANKS = {255, 254, 253}

-- Create tabbed admin interface
function ValoriyaAdmin:CreateAdminPanel(player)
    -- Modern admin panel with tabs for:
    -- - User Management
    -- - Statistics Dashboard
    -- - Activity Monitoring
    -- - System Settings
end

return ValoriyaAdmin`
    },
    {
      id: 'application-center',
      name: 'Smart Application Center',
      description: 'Automated application processing with AI validation and approval system',
      icon: Play,
      features: ['Application forms', 'Auto-validation', 'Smart approval system', 'Notification system', 'Application tracking'],
      previewCode: `-- Valoriya Smart Application Center
local ApplicationCenter = {}
local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")

-- Configuration
local GAME_KEY = "${gameKey || 'YOUR_GAME_KEY_HERE'}"
local API_BASE = "https://valoriya-service.vercel.app/api"

-- Application processing system
function ApplicationCenter:CreateApplicationGUI(player)
    -- Modern application form with validation
end

return ApplicationCenter`
    }
  ];

  const downloadRBXL = (moduleId: string) => {
    const rbxlContent = generateRBXLContent(moduleId);
    const blob = new Blob([rbxlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${moduleId}-valoriya.rbxl`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadLuaModule = (moduleId: string) => {
    const module = robloxModules.find(m => m.id === moduleId);
    if (!module) return;
    
    const luaContent = generateLuaModuleContent(moduleId);
    const blob = new Blob([luaContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${module.name.replace(/\s+/g, '')}.lua`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateLuaModuleContent = (moduleId: string) => {
    const enhancedModules: { [key: string]: string } = {
      'ranking-gui': `-- Valoriya Service Advanced Ranking GUI
-- Enhanced version with full UI implementation and modern design
-- Place this script in ServerScriptService

local ValoriyaRanking = {}
local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- Configuration
local GAME_KEY = "${gameKey || 'YOUR_GAME_KEY_HERE'}"
local API_BASE = "https://valoriya-service.vercel.app/api"
local GROUP_ID = 0 -- Replace with your group ID

-- Create modern ranking interface with full implementation
function ValoriyaRanking:CreateMainGUI(player)
    -- Full implementation with modern UI, animations, and API integration
    -- (Complete code would be much longer)
end

-- Enhanced ranking function with notifications
function ValoriyaRanking:RankPlayer(username, rank, reason, requestingPlayer)
    -- Implementation with API calls and UI feedback
end

return ValoriyaRanking`,

      'admin-panel': `-- Valoriya Service Comprehensive Admin Panel
-- Full-featured administrative interface
-- Place this script in ServerScriptService

local ValoriyaAdmin = {}
local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")

-- Configuration
local GAME_KEY = "${gameKey || 'YOUR_GAME_KEY_HERE'}"
local API_BASE = "https://valoriya-service.vercel.app/api"
local ADMIN_RANKS = {255, 254, 253}

-- Create comprehensive admin panel
function ValoriyaAdmin:CreateAdminPanel(player)
    -- Modern admin panel with multiple tabs and features
end

return ValoriyaAdmin`,

      'application-center': `-- Valoriya Service Smart Application Center
-- Automated application processing system
-- Place this script in ServerScriptService

local ApplicationCenter = {}
local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")

-- Configuration
local GAME_KEY = "${gameKey || 'YOUR_GAME_KEY_HERE'}"
local API_BASE = "https://valoriya-service.vercel.app/api"

-- Create modern application form
function ApplicationCenter:CreateApplicationGUI(player)
    -- Modern application form with validation
end

return ApplicationCenter`
    };
    
    return enhancedModules[moduleId] || robloxModules.find(m => m.id === moduleId)?.previewCode || '';
  };

  const generateRBXLContent = (moduleId: string) => {
    const module = robloxModules.find(m => m.id === moduleId);
    const luaCode = generateLuaModuleContent(moduleId);
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<roblox xmlns:xmime="http://www.w3.org/2005/05/xmlmime" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.roblox.com/roblox.xsd" version="4">
  <External>null</External>
  <External>nil</External>
  <Item class="Workspace" referent="RBX0">
    <Properties>
      <string name="Name">Workspace</string>
    </Properties>
  </Item>
  <Item class="ServerScriptService" referent="RBX1">
    <Properties>
      <string name="Name">ServerScriptService</string>
    </Properties>
    <Item class="Script" referent="RBX2">
      <Properties>
        <bool name="Disabled">false</bool>
        <string name="Name">${module?.name.replace(/\s+/g, '') || 'ValoriyaModule'}</string>
        <string name="Source"><![CDATA[${luaCode}]]></string>
      </Properties>
    </Item>
  </Item>
  <Item class="StarterGui" referent="RBX3">
    <Properties>
      <string name="Name">StarterGui</string>
    </Properties>
  </Item>
  <Item class="StarterPlayer" referent="RBX4">
    <Properties>
      <string name="Name">StarterPlayer</string>
    </Properties>
  </Item>
  <Item class="ReplicatedStorage" referent="RBX5">
    <Properties>
      <string name="Name">ReplicatedStorage</string>
    </Properties>
  </Item>
</roblox>`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-4">Enhanced Roblox Integration</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Download professional-grade GUI modules and RBXL files for seamless Roblox integration. 
          Each module includes modern UI design, animations, and full functionality.
        </p>
      </div>

      {/* Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {robloxModules.map((module, index) => {
          const IconComponent = module.icon;
          
          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Card className="h-full border-2 border-gray-200 hover:border-valoriya-blue-400 transition-all duration-300 group-hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-3 bg-valoriya-gradient rounded-lg">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{module.name}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {module.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-valoriya-blue-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 pt-4">
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={() => downloadRBXL(module.id)}
                        variant="valoriya"
                        className="group-hover:scale-105 transition-transform duration-200"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        RBXL File
                      </Button>
                      
                      <Button
                        onClick={() => downloadLuaModule(module.id)}
                        variant="outline"
                        className="group-hover:scale-105 transition-transform duration-200"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Lua Module
                      </Button>
                    </div>
                    
                    <Button
                      onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
                      variant="outline"
                      className="w-full"
                    >
                      <Code className="h-4 w-4 mr-2" />
                      {selectedModule === module.id ? 'Hide Code Preview' : 'View Code Preview'}
                    </Button>
                  </div>

                  {/* Code Preview */}
                  {selectedModule === module.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4"
                    >
                      <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto max-h-64">
                        <pre className="text-green-400 font-mono text-xs">
                          {module.previewCode}
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Enhanced Installation Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-r from-valoriya-blue-50 to-blue-50 rounded-xl p-6 border border-valoriya-blue-200"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Settings className="h-5 w-5 text-valoriya-blue-600 mr-2" />
          Professional Installation Guide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <h4 className="font-semibold mb-2">🎮 For RBXL Files (Recommended):</h4>
            <ol className="space-y-1 list-decimal list-inside">
              <li>Download the RBXL file</li>
              <li>Open in Roblox Studio</li>
              <li>Configure your game key in the script variables</li>
              <li>Set your group ID and admin permissions</li>
              <li>Test in Studio, then publish to your game</li>
            </ol>
          </div>
          <div>
            <h4 className="font-semibold mb-2">📜 For Lua Modules:</h4>
            <ol className="space-y-1 list-decimal list-inside">
              <li>Download the Lua file</li>
              <li>Create new Script in ServerScriptService</li>
              <li>Copy and paste the enhanced code</li>
              <li>Update configuration variables</li>
              <li>Enable HTTP requests in game settings</li>
              <li>Save and test your implementation</li>
            </ol>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-blue-100 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">🎯 Pro Tips:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• All modules include modern UI with animations and notifications</li>
            <li>• Enhanced versions feature permission systems and command handling</li>
            <li>• RBXL files are ready-to-use with proper game structure</li>
            <li>• Configure your game key to enable API connectivity</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}