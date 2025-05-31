'use client'

import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface StatsChartProps {
  data: {
    successfulRanks: number;
    invalidRequests: number;
    failedRequests: number;
    todayRequests: number;
    totalRequests: number;
    recentActivity: any[];
  }
}

export default function StatsChart({ data }: StatsChartProps) {
  // Sample data for area chart (would normally come from API)
  const weeklyData = [
    { day: 'Mon', successful: 45, failed: 2, invalid: 1 },
    { day: 'Tue', successful: 52, failed: 1, invalid: 0 },
    { day: 'Wed', successful: 38, failed: 3, invalid: 2 },
    { day: 'Thu', successful: 61, failed: 0, invalid: 1 },
    { day: 'Fri', successful: 55, failed: 2, invalid: 0 },
    { day: 'Sat', successful: 67, failed: 1, invalid: 1 },
    { day: 'Sun', successful: 43, failed: 2, invalid: 0 }
  ];

  // Pie chart data
  const pieData = [
    { name: 'Successful', value: data.successfulRanks || 0, color: '#10b981' },
    { name: 'Invalid', value: data.invalidRequests || 0, color: '#f59e0b' },
    { name: 'Failed', value: data.failedRequests || 0, color: '#ef4444' }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.dataKey}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Weekly Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Activity</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={weeklyData}>
            <defs>
              <linearGradient id="successfulGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="failedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="day" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="successful"
              stackId="1"
              stroke="#38bdf8"
              fill="url(#successfulGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="failed"
              stackId="1"
              stroke="#ef4444"
              fill="url(#failedGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Success Rate Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Request Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name) => [value, name]}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Legend */}
        <div className="flex justify-center space-x-6 mt-4">
          {pieData.map((entry, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-sm text-gray-600">{entry.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
EOF  
cd /home/project && cd ValoriyaService && cat > src/components/dashboard/StatsChart.tsx << 'EOF'
'use client'

import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface StatsChartProps {
  data: {
    successfulRanks: number;
    invalidRequests: number;
    failedRequests: number;
    todayRequests: number;
    totalRequests: number;
    recentActivity: any[];
  }
}

export default function StatsChart({ data }: StatsChartProps) {
  // Sample data for area chart (would normally come from API)
  const weeklyData = [
    { day: 'Mon', successful: 45, failed: 2, invalid: 1 },
    { day: 'Tue', successful: 52, failed: 1, invalid: 0 },
    { day: 'Wed', successful: 38, failed: 3, invalid: 2 },
    { day: 'Thu', successful: 61, failed: 0, invalid: 1 },
    { day: 'Fri', successful: 55, failed: 2, invalid: 0 },
    { day: 'Sat', successful: 67, failed: 1, invalid: 1 },
    { day: 'Sun', successful: 43, failed: 2, invalid: 0 }
  ];

  // Pie chart data
  const pieData = [
    { name: 'Successful', value: data.successfulRanks || 0, color: '#10b981' },
    { name: 'Invalid', value: data.invalidRequests || 0, color: '#f59e0b' },
    { name: 'Failed', value: data.failedRequests || 0, color: '#ef4444' }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.dataKey}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Weekly Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Activity</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={weeklyData}>
            <defs>
              <linearGradient id="successfulGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="failedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="day" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="successful"
              stackId="1"
              stroke="#38bdf8"
              fill="url(#successfulGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="failed"
              stackId="1"
              stroke="#ef4444"
              fill="url(#failedGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Success Rate Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Request Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name) => [value, name]}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Legend */}
        <div className="flex justify-center space-x-6 mt-4">
          {pieData.map((entry, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-sm text-gray-600">{entry.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
