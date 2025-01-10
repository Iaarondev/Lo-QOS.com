import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Cpu, Database, Gamepad2, Waves, Zap } from 'lucide-react';

const QgamingX = () => {
  const [quantumState, setQuantumState] = useState(0);
  const [processingStates, setProcessingStates] = useState({
    mapping: false,
    graphics: false,
    ai: false,
    inputs: false,
    integration: false
  });

  // Quantum state descriptions
  const stateDescriptions = {
    0: {
      title: "Idle State",
      description: "System in standby, ready for quantum processing",
      icon: <Cpu className="w-8 h-8 text-blue-500" />
    },
    0.25: {
      title: "Initial Processing",
      description: "Loading map, audio, modules, animations, and storage optimization",
      icon: <Database className="w-8 h-8 text-indigo-500" />
    },
    0.35: {
      title: "Graphics & AI Initialization",
      description: "Processing graphics and initializing AI systems",
      icon: <Gamepad2 className="w-8 h-8 text-purple-500" />
    },
    0.5: {
      title: "Running State",
      description: "Core systems active and processing",
      icon: <Waves className="w-8 h-8 text-green-500" />
    },
    0.6: {
      title: "Dynamic Processing",
      description: "Processing inputs, dynamic functions, LLM AI, and graphics rendering",
      icon: <Zap className="w-8 h-8 text-yellow-500" />
    },
    0.8: {
      title: "Superposition State",
      description: "Running in complete superposition for maximum efficiency",
      icon: <Waves className="w-8 h-8 text-orange-500" />
    },
    1: {
      title: "Full Integration",
      description: "Fully integrated near-zero emulation achieved",
      icon: <Zap className="w-8 h-8 text-red-500" />
    }
  };

  // Simulate quantum state progression
  useEffect(() => {
    const interval = setInterval(() => {
      setQuantumState(prev => {
        const states = [0, 0.25, 0.35, 0.5, 0.6, 0.8, 1];
        const currentIndex = states.indexOf(prev);
        const nextIndex = (currentIndex + 1) % states.length;
        return states[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Update processing states based on quantum state
  useEffect(() => {
    setProcessingStates({
      mapping: quantumState >= 0.25,
      graphics: quantumState >= 0.35,
      ai: quantumState >= 0.5,
      inputs: quantumState >= 0.6,
      integration: quantumState >= 0.8
    });
  }, [quantumState]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">QgamingX / LoQX</CardTitle>
              <CardDescription>
                Quantum Gaming State Processing System
              </CardDescription>
            </div>
            {stateDescriptions[quantumState]?.icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">
              Current State: {stateDescriptions[quantumState]?.title}
            </h3>
            <div className="bg-gray-100 rounded-lg p-4">
              <p>{stateDescriptions[quantumState]?.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h4 className="font-medium">Active Processes</h4>
              <div className="space-y-2">
                {Object.entries(processingStates).map(([process, active]) => (
                  <div 
                    key={process}
                    className={`flex items-center p-2 rounded ${
                      active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      active ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                    {process.charAt(0).toUpperCase() + process.slice(1)}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Quantum Processing</h4>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-blue-200 text-blue-600">
                      Quantum State
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {(quantumState * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                  <div
                    style={{ width: `${quantumState * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QgamingX;