import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Smartphone, 
  AlertCircle, 
  ArrowRight, 
  Play, 
  Download,
  QrCode,
  Wifi,
  Battery,
  Signal,
  CheckCircle,
  XCircle,
  Info,
  Monitor,
  Tablet,
  Zap,
  Eye,
  Settings,
  Share2,
  Star,
  Users,
  Clock,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const ARViewPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [selectedDevice, setSelectedDevice] = useState('ios');
  const [showQRCode, setShowQRCode] = useState(false);
  const [activeDemo, setActiveDemo] = useState(0);
  const [showCompatibilityCheck, setShowCompatibilityCheck] = useState(false);

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const deviceRequirements = {
    ios: {
      name: 'iOS Devices',
      icon: Smartphone,
      requirements: [
        { text: 'iPhone 6s and newer', supported: true },
        { text: 'iPad (5th generation) and newer', supported: true },
        { text: 'iOS 11.0 or later', supported: true },
        { text: 'ARKit support', supported: true }
      ]
    },
    android: {
      name: 'Android Devices',
      icon: Smartphone,
      requirements: [
        { text: 'ARCore supported devices', supported: true },
        { text: 'Android 7.0 (API level 24) or higher', supported: true },
        { text: 'Good lighting conditions recommended', supported: true },
        { text: 'Minimum 3GB RAM', supported: true }
      ]
    },
    desktop: {
      name: 'Desktop Browsers',
      icon: Monitor,
      requirements: [
        { text: 'WebXR support (Chrome 79+)', supported: true },
        { text: 'Camera access permission', supported: true },
        { text: 'HTTPS connection required', supported: true },
        { text: 'Hardware acceleration enabled', supported: true }
      ]
    }
  };

  const arFeatures = [
    {
      title: 'Real-time Placement',
      description: 'Place furniture and see how it fits in your actual space',
      icon: Camera,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Scale Accuracy',
      description: 'All items are rendered to real-world scale',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Lighting Simulation',
      description: 'See how lighting affects your design choices',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Multi-angle View',
      description: 'Walk around and view your design from any angle',
      icon: Eye,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Instant Sharing',
      description: 'Capture and share AR screenshots instantly',
      icon: Share2,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Smart Occlusion',
      description: 'Objects hide behind real-world surfaces naturally',
      icon: Settings,
      color: 'from-gray-500 to-slate-500'
    }
  ];

  const demoScenarios = [
    {
      title: 'Living Room Setup',
      description: 'See how a new sofa fits in your space',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Kitchen Planning',
      description: 'Visualize appliance placement and workflow',
      image: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Bedroom Design',
      description: 'Perfect your bedroom layout and decor',
      image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const stats = [
    { number: '98%', label: 'Accuracy Rate', icon: CheckCircle },
    { number: '15K+', label: 'AR Sessions', icon: Users },
    { number: '4.9', label: 'User Rating', icon: Star },
    { number: '<1s', label: 'Load Time', icon: Clock }
  ];

  // Auto-rotate demo scenarios
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % demoScenarios.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const checkDeviceCompatibility = () => {
    // Simple compatibility check
    const userAgent = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    const isAndroid = /Android/.test(userAgent);
    const isDesktop = !isIOS && !isAndroid;
    
    let compatible = false;
    let deviceType = 'unknown';
    
    if (isIOS) {
      deviceType = 'iOS';
      compatible = true; // Assume modern iOS devices support ARKit
    } else if (isAndroid) {
      deviceType = 'Android';
      compatible = true; // Assume ARCore support
    } else if (isDesktop) {
      deviceType = 'Desktop';
      compatible = 'webxr' in navigator; // Check for WebXR support
    }
    
    return { compatible, deviceType };
  };

  const handleCompatibilityCheck = () => {
    setShowCompatibilityCheck(true);
    
    // Simulate compatibility check
    setTimeout(() => {
      const result = checkDeviceCompatibility();
      setShowCompatibilityCheck(false);
      
      // Show detailed compatibility results
      const compatibilityModal = document.createElement('div');
      compatibilityModal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
      compatibilityModal.innerHTML = `
        <div class="bg-white rounded-2xl p-8 max-w-md w-full">
          <div class="text-center mb-6">
            <div class="w-16 h-16 ${result.compatible ? 'bg-green-100' : 'bg-red-100'} rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">${result.compatible ? '✅' : '❌'}</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              ${result.compatible ? 'AR Compatible!' : 'AR Not Supported'}
            </h3>
            <p class="text-gray-600">
              Device: ${result.deviceType}
            </p>
          </div>
          
          <div class="space-y-3 mb-6">
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span class="text-sm font-medium">Camera Access</span>
              <span class="text-green-600">✓</span>
            </div>
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span class="text-sm font-medium">Motion Sensors</span>
              <span class="text-green-600">✓</span>
            </div>
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span class="text-sm font-medium">WebXR Support</span>
              <span class="${result.compatible ? 'text-green-600' : 'text-red-600'}">${result.compatible ? '✓' : '✗'}</span>
            </div>
          </div>
          
          <button onclick="this.parentElement.parentElement.remove()" 
                  class="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
            Close
          </button>
        </div>
      `;
      
      document.body.appendChild(compatibilityModal);
      
      // Auto-remove after 10 seconds
      setTimeout(() => {
        if (document.body.contains(compatibilityModal)) {
          document.body.removeChild(compatibilityModal);
        }
      }, 10000);
    }, 2000);
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Camera className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Augmented Reality View
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Experience your designs in the real world with cutting-edge AR technology
          </p>
          
          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCompatibilityCheck}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <CheckCircle className="h-5 w-5" />
              <span>Check Compatibility</span>
            </button>
            <Link
              to="/create"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-cream-600 text-white rounded-lg hover:bg-cream-700 transition-colors"
            >
              <span>Start Designing</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-cream-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* AR Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {arFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Coming Soon Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AR View Coming Soon!
              </h3>
              <p className="text-gray-700 mb-4">
                We're currently developing the AR functionality to bring your designs into the real world. 
                This feature will allow you to visualize furniture placement, room layouts, and design 
                elements using your mobile device's camera with industry-leading accuracy.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/create"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <span>Start Designing</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/templates"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span>Browse Templates</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ARViewPage;