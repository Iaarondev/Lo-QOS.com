import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Activity, AlertCircle, Bug, LineChart, Lock, Network, Shield, Wand2 } from 'lucide-react';

const QgamingDebugTools = () => {
  const [selectedTool, setSelectedTool] = useState('circuit');
  const [debugData, setDebugData] = useState({
    circuitStates: [],
    transitions: [],
    performance: {},
    security: {}
  });

  // Simulated quantum circuit data
  const circuitData = {
    nodes: [
      { id: 'n1', type: 'qubit', state: 0.5 },
      { id: 'n2', type: 'hadamard', state: 0.7 },
      { id: 'n3', type: 'cnot', state: 0.8 },
      { id: 'n4', type: 'measure', state: 1 }
    ],
    edges: [
      { source: 'n1', target: 'n2' },
      { source: 'n2', target: 'n3' },
      { source: 'n3', target: 'n4' }
    ]
  };

  // Initialize performance data
  useEffect(() => {
    const performanceData = {
      fps: Array(60).fill(0).map(() => Math.floor(Math.random() * 60 + 40)),
      memoryUsage: Array(60).fill(0).map(() => Math.floor(Math.random() * 40 + 30)),
      coherence: Array(60).fill(0).map(() => Math.random() * 0.3 + 0.7),
      latency: Array(60).fill(0).map(() => Math.floor(Math.random() * 20 + 10))
    };

    setDebugData(prev => ({
      ...prev,
      performance: performanceData
    }));
  }, []);

  const QuantumCircuitVisualizer = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Quantum Circuit Visualization</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex space-x-8">
          {circuitData.nodes.map((node, index) => (
            <div key={node.id} className="relative">
              <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${
                node.type === 'qubit' ? 'bg-blue-100' :
                node.type === 'hadamard' ? 'bg-purple-100' :
                node.type === 'cnot' ? 'bg-green-100' : 'bg-orange-100'
              }`}>
                <Wand2 className="w-6 h-6" />
              </div>
              <div className="text-sm mt-2 text-center">{node.type}</div>
              <div className="text-xs text-gray-500 text-center">
                State: {node.state}
              </div>
              {index < circuitData.nodes.length - 1 && (
                <div className="absolute top-1/2 -right-6 w-4 h-0.5 bg-gray-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const StateTransitionDebugger = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">State Transition Debugger</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Transition History</h4>
          <div className="space-y-2">
            {[
              { from: 0, to: 0.25, status: 'success' },
              { from: 0.25, to: 0.35, status: 'success' },
              { from: 0.35, to: 0.5, status: 'warning' },
              { from: 0.5, to: 0.6, status: 'success' }
            ].map((transition, index) => (
              <div key={index} className="flex items-center space-x-2">
                <AlertCircle className={`w-4 h-4 ${
                  transition.status === 'success' ? 'text-green-500' : 'text-yellow-500'
                }`} />
                <span className="text-sm">
                  {transition.from} → {transition.to}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">State Verification</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Coherence:</span>
              <span className="text-sm font-medium text-green-500">98%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Entanglement:</span>
              <span className="text-sm font-medium text-green-500">100%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Error Rate:</span>
              <span className="text-sm font-medium text-yellow-500">2.3%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PerformanceProfiler = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Performance Profiler</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Real-time Metrics</h4>
          <div className="space-y-3">
            {Object.entries(debugData.performance).map(([metric, values]) => (
              <div key={metric}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{metric.toUpperCase()}</span>
                  <span className="text-sm font-medium">
                    {values[values.length - 1]}
                    {metric === 'fps' ? ' FPS' : 
                      metric === 'memoryUsage' ? ' MB' :
                      metric === 'coherence' ? ' QC' : ' ms'}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ 
                      width: `${(values[values.length - 1] / 
                        (metric === 'fps' ? 100 : 
                         metric === 'memoryUsage' ? 100 :
                         metric === 'coherence' ? 1 : 50)) * 100}%` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">System Load</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">CPU Usage:</span>
              <span className="text-sm font-medium">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">GPU Usage:</span>
              <span className="text-sm font-medium">78%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Memory:</span>
              <span className="text-sm font-medium">2.3 GB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SecurityAuditor = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Security Auditor</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">ZKP Verification</h4>
          <div className="space-y-2">
            {[
              { check: 'State Integrity', status: 'success' },
              { check: 'Quantum Signatures', status: 'success' },
              { check: 'Entanglement Verification', status: 'warning' },
              { check: 'Circuit Validation', status: 'success' }
            ].map((check, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{check.check}:</span>
                <span className={`text-sm font-medium ${
                  check.status === 'success' ? 'text-green-500' : 'text-yellow-500'
                }`}>
                  {check.status === 'success' ? 'Verified' : 'Warning'}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Security Metrics</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Encryption Strength:</span>
              <span className="text-sm font-medium text-green-500">256-bit</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Quantum Resistance:</span>
              <span className="text-sm font-medium text-green-500">High</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Attack Surface:</span>
              <span className="text-sm font-medium text-yellow-500">Medium</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">QgamingX Debug Tools</CardTitle>
              <CardDescription>
                Advanced debugging and testing tools for quantum gaming implementations
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setSelectedTool('circuit')}
              className={`flex items-center space-x-2 px-4 py-2 rounded ${
                selectedTool === 'circuit' ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}
            >
              <Network className="w-4 h-4" />
              <span>Circuit</span>
            </button>
            <button
              onClick={() => setSelectedTool('transitions')}
              className={`flex items-center space-x-2 px-4 py-2 rounded ${
                selectedTool === 'transitions' ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}
            >
              <Bug className="w-4 h-4" />
              <span>Transitions</span>
            </button>
            <button
              onClick={() => setSelectedTool('performance')}
              className={`flex items-center space-x-2 px-4 py-2 rounded ${
                selectedTool === 'performance' ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Performance</span>
            </button>
            <button
              onClick={() => setSelectedTool('security')}
              className={`flex items-center space-x-2 px-4 py-2 rounded ${
                selectedTool === 'security' ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Security</span>
            </button>
          </div>

          <div className="space-y-6">
            {selectedTool === 'circuit' && <QuantumCircuitVisualizer />}
            {selectedTool === 'transitions' && <StateTransitionDebugger />}
            {selectedTool === 'performance' && <PerformanceProfiler />}
            {selectedTool === 'security' && <SecurityAuditor />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QgamingDebugTools;