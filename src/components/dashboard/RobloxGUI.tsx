'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Code, Play, Settings, Users, Shield } from 'lucide-react';

interface RobloxGUIProps {
  gameKey: string;
}

export default function RobloxGUI({ gameKey }: RobloxGUIProps) {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const robloxModules = [
    {
      id: 'ranking-gui',
      name: 'Ranking GUI',
      description: 'Complete ranking interface for group management',
      icon: Users,
      features: ['Player search', 'Rank selection', 'Reason input', 'Mass ranking'],
      previewCode: `-- Valoriya Ranking GUI
local Players = game:GetService("Players")
local StarterGui = game:GetService("StarterGui")
local HttpService = game:GetService("HttpService")

-- Create main GUI
local ScreenGui = Instance.new("ScreenGui")
local MainFrame = Instance.new("Frame")
local SearchBox = Instance.new("TextBox")
local RankButton = Instance.new("TextButton")

ScreenGui.Name = "ValoriyaRankingGUI"
ScreenGui.Parent = Players.LocalPlayer:WaitForChild("PlayerGui")

-- Main frame styling
MainFrame.Name = "MainFrame"
MainFrame.Parent = ScreenGui
MainFrame.BackgroundColor3 = Color3.fromRGB(45, 45, 45)
MainFrame.BorderSizePixel = 0
MainFrame.Position = UDim2.new(0.5, -200, 0.5, -150)
MainFrame.Size = UDim2.new(0, 400, 0, 300)

-- Add corner radius
local Corner = Instance.new("UICorner")
Corner.CornerRadius = UDim.new(0, 12)
Corner.Parent = MainFrame`
    },
    {
      id: 'admin-panel',
      name: 'Admin Panel',
      description: 'Administrative controls for group owners',
      icon: Shield,
      features: ['User management', 'Permission settings', 'Activity logs', 'Statistics'],
      previewCode: `-- Valoriya Admin Panel
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Admin Panel Configuration
local ADMIN_RANKS = {255, 254, 253} -- Add your admin ranks here
local API_KEY = "${gameKey}"

-- Create admin panel
local function createAdminPanel(player)
    if not isAdmin(player) then return end
    
    local screenGui = Instance.new("ScreenGui")
    local mainFrame = Instance.new("Frame")
    local titleLabel = Instance.new("TextLabel")
    
    screenGui.Name = "ValoriyaAdminPanel"
    screenGui.Parent = player:WaitForChild("PlayerGui")
    
    -- Panel styling with modern design
    mainFrame.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
    mainFrame.Size = UDim2.new(0, 500, 0, 400)
    mainFrame.Position = UDim2.new(0.5, -250, 0.5, -200)
    mainFrame.Parent = screenGui
end`
    },
    {
      id: 'application-center',
      name: 'Application Center',
      description: 'Automated application processing system',
      icon: Play,
      features: ['Application forms', 'Auto-ranking', 'Review system', 'Notifications'],
      previewCode: `-- Valoriya Application Center
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- Application Center GUI
local function createApplicationGUI(player)
    local screenGui = Instance.new("ScreenGui")
    local applicationFrame = Instance.new("Frame")
    local questionsFrame = Instance.new("ScrollingFrame")
    
    screenGui.Name = "ValoriyaApplications"
    screenGui.Parent = player:WaitForChild("PlayerGui")
    
    -- Modern application form styling
    applicationFrame.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
    applicationFrame.Size = UDim2.new(0, 600, 0, 500)
    applicationFrame.Position = UDim2.new(0.5, -300, 0.5, -250)
    applicationFrame.Parent = screenGui
    
    -- Add drop shadow effect
    local shadow = Instance.new("ImageLabel")
    shadow.Image = "rbxasset://textures/ui/dropshadow.png"
    shadow.Position = UDim2.new(0, -10, 0, -10)
    shadow.Size = UDim2.new(1, 20, 1, 20)
    shadow.ZIndex = -1
    shadow.Parent = applicationFrame
end`
    }
  ];

  const downloadRBXL = (moduleId: string) => {
    // Create RBXL file content (simplified XML structure)
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

  const generateRBXLContent = (moduleId: string) => {
    const module = robloxModules.find(m => m.id === moduleId);
    return `<?xml version="1.0" encoding="UTF-8"?>
<roblox xmlns:xmime="http://www.w3.org/2005/05/xmlmime" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.roblox.com/roblox.xsd" version="4">
  <Item class="Workspace" referent="workspace">
    <Properties>
      <string name="Name">Workspace</string>
    </Properties>
    <Item class="Model" referent="model">
      <Properties>
        <string name="Name">${module?.name || 'ValoriyaModule'}</string>
      </Properties>
      <Item class="ServerScriptService" referent="serverscriptservice">
        <Properties>
          <string name="Name">ServerScriptService</string>
        </Properties>
        <Item class="Script" referent="valoriyascript">
          <Properties>
            <string name="Name">ValoriyaService</string>
            <string name="Source">${module?.previewCode || '-- Valoriya Service Module'}</string>
          </Properties>
        </Item>
      </Item>
    </Item>
  </Item>
</roblox>`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-4">Roblox Integration</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Download complete GUI modules and RBXL files for seamless Roblox integration. 
          Each module includes modern UI design and full functionality.
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
                    <Button
                      onClick={() => downloadRBXL(module.id)}
                      variant="valoriya"
                      className="w-full group-hover:scale-105 transition-transform duration-200"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download RBXL
                    </Button>
                    
                    <Button
                      onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
                      variant="outline"
                      className="w-full"
                    >
                      <Code className="h-4 w-4 mr-2" />
                      {selectedModule === module.id ? 'Hide Code' : 'View Code'}
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
                      <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
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

      {/* Installation Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-r from-valoriya-blue-50 to-blue-50 rounded-xl p-6 border border-valoriya-blue-200"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Settings className="h-5 w-5 text-valoriya-blue-600 mr-2" />
          Installation Instructions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <h4 className="font-semibold mb-2">For RBXL Files:</h4>
            <ol className="space-y-1 list-decimal list-inside">
              <li>Download the RBXL file</li>
              <li>Open in Roblox Studio</li>
              <li>Configure your game key in the script</li>
              <li>Test in Studio, then publish</li>
            </ol>
          </div>
          <div>
            <h4 className="font-semibold mb-2">For Script Modules:</h4>
            <ol className="space-y-1 list-decimal list-inside">
              <li>Copy the script code</li>
              <li>Create new Script in ServerScriptService</li>
              <li>Paste code and update configuration</li>
              <li>Save and run your game</li>
            </ol>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
EOF  
cd /home/project && cd ValoriyaService && cat > src/components/dashboard/RobloxGUI.tsx << 'EOF'
'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Code, Play, Settings, Users, Shield } from 'lucide-react';

interface RobloxGUIProps {
  gameKey: string;
}

export default function RobloxGUI({ gameKey }: RobloxGUIProps) {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const robloxModules = [
    {
      id: 'ranking-gui',
      name: 'Ranking GUI',
      description: 'Complete ranking interface for group management',
      icon: Users,
      features: ['Player search', 'Rank selection', 'Reason input', 'Mass ranking'],
      previewCode: `-- Valoriya Ranking GUI
local Players = game:GetService("Players")
local StarterGui = game:GetService("StarterGui")
local HttpService = game:GetService("HttpService")

-- Create main GUI
local ScreenGui = Instance.new("ScreenGui")
local MainFrame = Instance.new("Frame")
local SearchBox = Instance.new("TextBox")
local RankButton = Instance.new("TextButton")

ScreenGui.Name = "ValoriyaRankingGUI"
ScreenGui.Parent = Players.LocalPlayer:WaitForChild("PlayerGui")

-- Main frame styling
MainFrame.Name = "MainFrame"
MainFrame.Parent = ScreenGui
MainFrame.BackgroundColor3 = Color3.fromRGB(45, 45, 45)
MainFrame.BorderSizePixel = 0
MainFrame.Position = UDim2.new(0.5, -200, 0.5, -150)
MainFrame.Size = UDim2.new(0, 400, 0, 300)

-- Add corner radius
local Corner = Instance.new("UICorner")
Corner.CornerRadius = UDim.new(0, 12)
Corner.Parent = MainFrame`
    },
    {
      id: 'admin-panel',
      name: 'Admin Panel',
      description: 'Administrative controls for group owners',
      icon: Shield,
      features: ['User management', 'Permission settings', 'Activity logs', 'Statistics'],
      previewCode: `-- Valoriya Admin Panel
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Admin Panel Configuration
local ADMIN_RANKS = {255, 254, 253} -- Add your admin ranks here
local API_KEY = "${gameKey}"

-- Create admin panel
local function createAdminPanel(player)
    if not isAdmin(player) then return end
    
    local screenGui = Instance.new("ScreenGui")
    local mainFrame = Instance.new("Frame")
    local titleLabel = Instance.new("TextLabel")
    
    screenGui.Name = "ValoriyaAdminPanel"
    screenGui.Parent = player:WaitForChild("PlayerGui")
    
    -- Panel styling with modern design
    mainFrame.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
    mainFrame.Size = UDim2.new(0, 500, 0, 400)
    mainFrame.Position = UDim2.new(0.5, -250, 0.5, -200)
    mainFrame.Parent = screenGui
end`
    },
    {
      id: 'application-center',
      name: 'Application Center',
      description: 'Automated application processing system',
      icon: Play,
      features: ['Application forms', 'Auto-ranking', 'Review system', 'Notifications'],
      previewCode: `-- Valoriya Application Center
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

-- Application Center GUI
local function createApplicationGUI(player)
    local screenGui = Instance.new("ScreenGui")
    local applicationFrame = Instance.new("Frame")
    local questionsFrame = Instance.new("ScrollingFrame")
    
    screenGui.Name = "ValoriyaApplications"
    screenGui.Parent = player:WaitForChild("PlayerGui")
    
    -- Modern application form styling
    applicationFrame.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
    applicationFrame.Size = UDim2.new(0, 600, 0, 500)
    applicationFrame.Position = UDim2.new(0.5, -300, 0.5, -250)
    applicationFrame.Parent = screenGui
    
    -- Add drop shadow effect
    local shadow = Instance.new("ImageLabel")
    shadow.Image = "rbxasset://textures/ui/dropshadow.png"
    shadow.Position = UDim2.new(0, -10, 0, -10)
    shadow.Size = UDim2.new(1, 20, 1, 20)
    shadow.ZIndex = -1
    shadow.Parent = applicationFrame
end`
    }
  ];

  const downloadRBXL = (moduleId: string) => {
    // Create RBXL file content (simplified XML structure)
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

  const generateRBXLContent = (moduleId: string) => {
    const module = robloxModules.find(m => m.id === moduleId);
    return `<?xml version="1.0" encoding="UTF-8"?>
<roblox xmlns:xmime="http://www.w3.org/2005/05/xmlmime" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.roblox.com/roblox.xsd" version="4">
  <Item class="Workspace" referent="workspace">
    <Properties>
      <string name="Name">Workspace</string>
    </Properties>
    <Item class="Model" referent="model">
      <Properties>
        <string name="Name">${module?.name || 'ValoriyaModule'}</string>
      </Properties>
      <Item class="ServerScriptService" referent="serverscriptservice">
        <Properties>
          <string name="Name">ServerScriptService</string>
        </Properties>
        <Item class="Script" referent="valoriyascript">
          <Properties>
            <string name="Name">ValoriyaService</string>
            <string name="Source">${module?.previewCode || '-- Valoriya Service Module'}</string>
          </Properties>
        </Item>
      </Item>
    </Item>
  </Item>
</roblox>`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-4">Roblox Integration</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Download complete GUI modules and RBXL files for seamless Roblox integration. 
          Each module includes modern UI design and full functionality.
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
                    <Button
                      onClick={() => downloadRBXL(module.id)}
                      variant="valoriya"
                      className="w-full group-hover:scale-105 transition-transform duration-200"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download RBXL
                    </Button>
                    
                    <Button
                      onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
                      variant="outline"
                      className="w-full"
                    >
                      <Code className="h-4 w-4 mr-2" />
                      {selectedModule === module.id ? 'Hide Code' : 'View Code'}
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
                      <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
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

      {/* Installation Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-r from-valoriya-blue-50 to-blue-50 rounded-xl p-6 border border-valoriya-blue-200"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Settings className="h-5 w-5 text-valoriya-blue-600 mr-2" />
          Installation Instructions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <h4 className="font-semibold mb-2">For RBXL Files:</h4>
            <ol className="space-y-1 list-decimal list-inside">
              <li>Download the RBXL file</li>
              <li>Open in Roblox Studio</li>
              <li>Configure your game key in the script</li>
              <li>Test in Studio, then publish</li>
            </ol>
          </div>
          <div>
            <h4 className="font-semibold mb-2">For Script Modules:</h4>
            <ol className="space-y-1 list-decimal list-inside">
              <li>Copy the script code</li>
              <li>Create new Script in ServerScriptService</li>
              <li>Paste code and update configuration</li>
              <li>Save and run your game</li>
            </ol>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
