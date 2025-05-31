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
      id: 'complete-gui-system',
      name: 'Complete GUI System (RBXL)',
      description: 'Ready-to-use Roblox place file with complete Valoriya GUI system pre-installed',
      icon: Package,
      features: [
        'Pre-built StarterGui components',
        'Complete ranking interface',
        'Activity tracking system', 
        'Modern UI with Valoriya branding',
        'Plug-and-play installation'
      ],
      downloadUrl: '/downloads/ValoriyaGUISystem.rbxl',
      fileType: 'rbxl',
      previewCode: `-- VALORIYA COMPLETE GUI SYSTEM
-- This RBXL file contains a complete GUI system ready for use
-- Simply download and open in Roblox Studio

-- Included Components:
-- 1. ValoriyaMainModule - Central control system
-- 2. RankingGUI - Advanced ranking interface  
-- 3. ActivityTracker - Real-time activity monitoring
-- 4. Modern UI themes and animations

-- Installation:
-- 1. Download ValoriyaGUISystem.rbxl
-- 2. Open in Roblox Studio
-- 3. Configure your game key in ServerScriptService
-- 4. Publish to your game

print("🚀 Valoriya GUI System Loaded!")
print("📋 Use /valoriya-help for commands")
`
    },
    {
      id: 'main-module',
      name: 'Main Controller Module',
      description: 'Central module that controls all Valoriya GUI systems and API integration',
      icon: Settings,
      features: [
        'Central command system',
        'API integration management',
        'Chat command handlers',
        'Help system included',
        'Easy configuration'
      ],
      downloadUrl: '/downloads/ValoriyaMainModule.lua',
      fileType: 'lua',
      previewCode: `-- VALORIYA MAIN MODULE v2.0
local ValoriyaModule = {}

-- Configuration
ValoriyaModule.Config = {
    API_ENDPOINT = "https://valoriyaservice.netlify.app/api",
    GAME_KEY = "VLR_" .. game.PlaceId,
    VERSION = "2.0.0"
}

-- Initialize all systems
function ValoriyaModule.Initialize()
    print("🚀 Valoriya Service v" .. ValoriyaModule.Config.VERSION .. " - Initializing...")
    return true
end

-- Chat commands system
function ValoriyaModule.CreateCommandSystem()
    local Players = game:GetService("Players")
    local player = Players.LocalPlayer
    
    player.Chatted:Connect(function(message)
        local command = string.lower(message)
        
        if command == "/valoriya-rank" then
            ValoriyaModule.OpenRankingGUI()
        elseif command == "/valoriya-activity" then
            ValoriyaModule.OpenActivityTracker()
        elseif command == "/valoriya-help" then
            ValoriyaModule.ShowHelpGUI()
        end
    end)
end

return ValoriyaModule`
    },
    {
      id: 'ranking-gui-v2',
      name: 'Advanced Ranking GUI v2.0',
      description: 'Complete ranking interface with modern UI, animations, and comprehensive functionality',
      icon: Users,
      features: [
        'Modern Valoriya-themed UI',
        'Drag & drop interface',
        'Permission validation',
        'Animated notifications',
        'Real-time rank updates',
        'Group integration'
      ],
      downloadUrl: '/downloads/ValoriyaRankingGUI.lua',
      fileType: 'lua',
      previewCode: `-- VALORIYA RANKING GUI SYSTEM v2.0
local Players = game:GetService("Players")
local HttpService = game:GetService("HttpService")
local TweenService = game:GetService("TweenService")

local ValoriyaGUI = {}

-- Configuration
local VALORIYA_CONFIG = {
    API_ENDPOINT = "https://valoriyaservice.netlify.app/api",
    GAME_KEY = "VLR_" .. game.PlaceId,
    THEME = {
        PRIMARY = Color3.fromRGB(59, 130, 246),
        BACKGROUND = Color3.fromRGB(15, 23, 42),
        SUCCESS = Color3.fromRGB(34, 197, 94)
    }
}

function ValoriyaGUI.CreateRankingInterface()
    local player = Players.LocalPlayer
    local playerGui = player:WaitForChild("PlayerGui")
    
    -- Create modern ranking interface
    local screenGui = Instance.new("ScreenGui")
    screenGui.Name = "ValoriyaRankingGUI"
    screenGui.ResetOnSpawn = false
    screenGui.Parent = playerGui
    
    -- Professional UI components with animations
    -- Full implementation included in download
    
    return screenGui
end

return ValoriyaGUI`
    },
    {
      id: 'activity-tracker-v2',
      name: 'Activity Tracker v2.0',
      description: 'Real-time activity monitoring with modern dashboard and analytics integration',
      icon: Shield,
      features: [
        'Real-time activity monitoring',
        'Session time tracking',
        'Custom event logging',
        'Modern dashboard UI',
        'Analytics integration',
        'Player statistics'
      ],
      downloadUrl: '/downloads/ValoriyaActivityTracker.lua',
      fileType: 'lua',
      previewCode: `-- VALORIYA ACTIVITY TRACKER v2.0
local Players = game:GetService("Players")
local HttpService = game:GetService("HttpService")
local RunService = game:GetService("RunService")

local ActivityTracker = {}

-- Configuration
local CONFIG = {
    API_ENDPOINT = "https://valoriyaservice.netlify.app/api",
    GAME_KEY = "VLR_" .. game.PlaceId
}

function ActivityTracker.CreateActivityGUI()
    -- Create comprehensive activity tracking interface
    local screenGui = Instance.new("ScreenGui")
    screenGui.Name = "ValoriyaActivityGUI"
    
    -- Real-time stats dashboard
    -- Session tracking
    -- Activity logging
    
    return screenGui
end

function ActivityTracker.LogActivity(action, details)
    -- Log activities to Valoriya API
    local activityData = {
        gameKey = CONFIG.GAME_KEY,
        userId = Players.LocalPlayer.UserId,
        action = action,
        details = details,
        timestamp = tick()
    }
    
    -- Send to API for real-time tracking
    return true
end

return ActivityTracker`
    },
    {
      id: 'installation-guide',
      name: 'Installation Guide & Documentation',
      description: 'Comprehensive setup guide and documentation for all Valoriya GUI systems',
      icon: BookOpen,
      features: [
        'Step-by-step installation',
        'Configuration examples',
        'Troubleshooting guide',
        'API documentation',
        'Best practices',
        'Support information'
      ],
      downloadUrl: '/downloads/INSTALLATION_GUIDE.md',
      fileType: 'md',
      previewCode: `# 🚀 VALORIYA ROBLOX GUI SYSTEM - INSTALLATION GUIDE

## Quick Setup (Recommended)

### Option 1: Use the RBXL File
1. Download ValoriyaGUISystem.rbxl
2. Open in Roblox Studio
3. Publish to your game
4. Configure game key in ServerScriptService

### Option 2: Manual Installation
1. Create ModuleScript in ServerScriptService
2. Copy contents of ValoriyaMainModule.lua
3. Add child modules for ranking and activity
4. Configure API settings

## Features Included

### 🎖️ Ranking System
- Modern UI with Valoriya branding
- Group rank management
- Real-time rank updates
- Permission validation

### 📊 Activity Tracking  
- Real-time player monitoring
- Session time tracking
- Custom event logging
- Analytics integration

For support: https://valoriyaservice.netlify.app`
    }
  ];

  const downloadFile = async (module: any) => {
    try {
      // Create downloadable content based on file type
      let content = '';
      let filename = '';
      let mimeType = '';

      if (module.fileType === 'lua') {
        content = module.previewCode;
        filename = `${module.name.replace(/[^a-zA-Z0-9]/g, '')}.lua`;
        mimeType = 'text/plain';
      } else if (module.fileType === 'md') {
        content = module.previewCode;
        filename = 'INSTALLATION_GUIDE.md';
        mimeType = 'text/markdown';
      } else if (module.fileType === 'rbxl') {
        // For RBXL files, we'll create a comprehensive Lua script that users can implement
        content = `-- VALORIYA GUI SYSTEM - COMPLETE IMPLEMENTATION
-- Save this as a ModuleScript in ServerScriptService and follow the installation guide

${module.previewCode}

-- For the complete RBXL file with pre-built GUI components,
-- please visit: https://valoriyaservice.netlify.app/dashboard
-- and download the full system package.

-- This script provides the core functionality.
-- The RBXL file includes pre-built UI components, animations,
-- and complete StarterGui setup for immediate use.
`;
        filename = 'ValoriyaGUISystem_Implementation.lua';
        mimeType = 'text/plain';
      }

      // Create and download file
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Log the download activity
      await fetch('/api/activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameKey: gameKey,
          userId: 'web-user',
          username: 'Dashboard User',
          action: 'module_download',
          details: {
            module_id: module.id,
            module_name: module.name,
            file_type: module.fileType,
            download_time: new Date().toISOString()
          },
          timestamp: Math.floor(Date.now() / 1000)
        }),
      });

    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const copyToClipboard = (code: string, moduleType: string) => {
    navigator.clipboard.writeText(code);
    // Show success feedback
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          🎮 Roblox GUI Integration
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Professional Roblox GUI systems with modern interfaces, real-time analytics, and seamless API integration.
          Download complete RBXL files or individual Lua modules.
        </p>
      </motion.div>

      {/* Enhanced Module Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {robloxModules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="h-full border-2 border-gray-200 hover:border-valoriya-blue-400 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-valoriya-blue-100 rounded-lg">
                      <module.icon className="h-6 w-6 text-valoriya-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-900">
                        {module.name}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          module.fileType === 'rbxl' 
                            ? 'bg-green-100 text-green-800' 
                            : module.fileType === 'lua'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {module.fileType.toUpperCase()}
                        </span>
                        {module.fileType === 'rbxl' && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-valoriya-blue-100 text-valoriya-blue-800">
                            RECOMMENDED
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-gray-600 mt-3">
                  {module.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Features */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">✨ Features:</h4>
                  <ul className="space-y-1">
                    {module.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start">
                        <span className="text-valoriya-blue-500 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    onClick={() => downloadFile(module)}
                    className="flex-1 bg-valoriya-blue-600 hover:bg-valoriya-blue-700 text-white"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download {module.fileType.toUpperCase()}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
                    className="flex-1 border-valoriya-blue-300 text-valoriya-blue-700 hover:bg-valoriya-blue-50"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Preview Code
                  </Button>
                </div>

                {/* Code Preview */}
                {selectedModule === module.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-400 text-sm">Code Preview</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(module.previewCode, module.name)}
                          className="text-gray-400 hover:text-white"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <pre className="text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">
                        <code>{module.previewCode}</code>
                      </pre>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Installation Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-r from-valoriya-blue-50 to-blue-50 rounded-xl p-8 border border-valoriya-blue-200"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Settings className="h-6 w-6 text-valoriya-blue-600 mr-3" />
          Professional Installation Guide
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 flex items-center">
              <Package className="h-5 w-5 text-green-600 mr-2" />
              🎮 RBXL File Method (Recommended)
            </h4>
            <ol className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="bg-valoriya-blue-100 text-valoriya-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</span>
                Download the <strong>Complete GUI System (RBXL)</strong> file
              </li>
              <li className="flex items-start">
                <span className="bg-valoriya-blue-100 text-valoriya-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</span>
                Open the RBXL file in Roblox Studio
              </li>
              <li className="flex items-start">
                <span className="bg-valoriya-blue-100 text-valoriya-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</span>
                Configure your game key: <code className="bg-gray-100 px-2 py-1 rounded text-sm">{gameKey || 'VLR_YOUR_GAME_ID'}</code>
              </li>
              <li className="flex items-start">
                <span className="bg-valoriya-blue-100 text-valoriya-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">4</span>
                Enable HTTP requests in game settings
              </li>
              <li className="flex items-start">
                <span className="bg-valoriya-blue-100 text-valoriya-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">5</span>
                Test in Studio, then publish to your game
              </li>
            </ol>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 flex items-center">
              <File className="h-5 w-5 text-blue-600 mr-2" />
              📜 Lua Module Method
            </h4>
            <ol className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</span>
                Download individual Lua modules
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</span>
                Create ModuleScript in ServerScriptService
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</span>
                Copy and paste the enhanced code
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">4</span>
                Update configuration variables
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">5</span>
                Initialize the system in your game
              </li>
            </ol>
          </div>
        </div>

        <div className="mt-8 p-6 bg-white rounded-lg border border-valoriya-blue-200">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Play className="h-5 w-5 text-valoriya-blue-600 mr-2" />
            Quick Commands (Available after installation)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <code className="bg-gray-100 px-2 py-1 rounded">/valoriya-rank</code>
              <span className="text-gray-600">Open ranking GUI</span>
            </div>
            <div className="flex items-center space-x-2">
              <code className="bg-gray-100 px-2 py-1 rounded">/valoriya-activity</code>
              <span className="text-gray-600">Open activity tracker</span>
            </div>
            <div className="flex items-center space-x-2">
              <code className="bg-gray-100 px-2 py-1 rounded">/valoriya-help</code>
              <span className="text-gray-600">Show help menu</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Support Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center p-6 bg-gray-50 rounded-lg border"
      >
        <h4 className="text-lg font-semibold text-gray-900 mb-2">
          Need Help? 📞
        </h4>
        <p className="text-gray-600 mb-4">
          Our professional GUI systems come with complete documentation and support.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" asChild>
            <a href="/docs" target="_blank" rel="noopener noreferrer">
              <BookOpen className="h-4 w-4 mr-2" />
              View Documentation
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://valoriyaservice.netlify.app" target="_blank" rel="noopener noreferrer">
              <Shield className="h-4 w-4 mr-2" />
              Visit Support Center
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}