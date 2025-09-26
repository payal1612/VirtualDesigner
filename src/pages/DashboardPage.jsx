import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SceneCanvas from '../threeD/SceneCanvas';
import { Sofa, Chair, Bed, Table } from '../threeD/Furniture';
import { Plus, FolderOpen, LayoutGrid as Layout, Camera, Settings, User, ArrowRight, Sparkles, TrendingUp, Clock, Star, BarChart3, Target, Zap, Heart, Share2, Download, CreditCard as Edit, Eye, Calendar, Award, Users, Palette, Grid3x3 as Grid3X3, Search, Filter, Bell, BookOpen, Lightbulb, Rocket, ChevronRight, Activity, PieChart, TrendingDown, CheckSquare, Layers, X } from 'lucide-react';
import { useDesignStore } from '../stores/designStore';
import { useAuthStore } from '../stores/authStore';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { savedDesigns, templates, getDesignStats } = useDesignStore();
  const { user, isAuthenticated } = useAuthStore();
  const [furnitureData, setFurnitureData] = useState([]);
  const [loading3D, setLoading3D] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [recentActivity, setRecentActivity] = useState([]);
  const [quickStats, setQuickStats] = useState({});
  const [showWelcome, setShowWelcome] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState([
    { id: 1, type: 'success', message: 'Design "Modern Living Room" saved successfully', time: '2 min ago' },
    { id: 2, type: 'info', message: 'New template "Cozy Bedroom" available', time: '1 hour ago' },
    { id: 3, type: 'update', message: 'AR feature updated with new capabilities', time: '3 hours ago' }
  ]);

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Fetch furniture data from API
  useEffect(() => {
    const fetchFurniture = async () => {
      try {
        const response = await fetch('/api/furniture?limit=4');
        const data = await response.json();
        setFurnitureData(data);
      } catch (error) {
        console.error('Error fetching furniture:', error);
        // Fallback to local data
        setFurnitureData([
          { id: 1, name: "Modern Sofa", modelUrl: "/models/furniture/sofa_modern.glb", category: "seating" },
          { id: 2, name: "Office Chair", modelUrl: "/models/furniture/chair_modern.glb", category: "seating" },
          { id: 3, name: "Queen Bed", modelUrl: "/models/furniture/bed_queen.glb", category: "bedroom" },
          { id: 4, name: "Dining Table", modelUrl: "/models/furniture/table_dining.glb", category: "tables" }
        ]);
      } finally {
        setLoading3D(false);
      }
    };

    fetchFurniture();
  }, []);

  const dashboardCards = [
    {
      id: 'create',
      title: 'Create New Design',
      description: 'Start with a blank canvas and bring your vision to life',
      icon: Plus,
      to: '/create',
      gradient: 'from-primary-500 to-primary-600',
      bgGradient: 'from-primary-50 to-primary-100',
      action: 'Create Now',
      stats: 'Unlimited projects'
    },
    {
      id: 'designs',
      title: 'My Designs',
      description: `Manage your ${savedDesigns.length} saved design${savedDesigns.length !== 1 ? 's' : ''}`,
      icon: FolderOpen,
      to: '/designs',
      gradient: 'from-cream-500 to-cream-600',
      bgGradient: 'from-cream-50 to-cream-100',
      action: 'View All',
      stats: `${savedDesigns.length} design${savedDesigns.length !== 1 ? 's' : ''}`
    },
    {
      id: 'templates',
      title: 'Templates',
      description: 'Browse professionally designed room layouts',
      icon: Layout,
      to: '/templates',
      gradient: 'from-beige-500 to-beige-600',
      bgGradient: 'from-beige-50 to-beige-100',
      action: 'Browse',
      stats: `${templates.length} templates`
    },
    {
      id: 'ar-view',
      title: 'AR View',
      description: 'Experience your designs in augmented reality',
      icon: Camera,
      to: '/ar-view',
      gradient: 'from-lightest-500 to-lightest-600',
      bgGradient: 'from-lightest-50 to-lightest-100',
      action: 'Try AR',
      stats: 'Mobile ready'
    }
  ];

  const quickActions = [
    { icon: Plus, label: 'New Design', to: '/create', color: 'bg-primary-500' },
    { icon: Layout, label: 'Templates', to: '/templates', color: 'bg-cream-500' },
    { icon: Camera, label: 'AR View', to: '/ar-view', color: 'bg-beige-500' },
    { icon: Settings, label: 'Settings', to: '/settings', color: 'bg-primary-600' }
  ];

  const learningResources = [
    {
      title: 'Getting Started Guide',
      description: 'Learn the basics of room design',
      icon: BookOpen,
      duration: '5 min read',
      difficulty: 'Beginner'
    },
    {
      title: 'Advanced AR Features',
      description: 'Master augmented reality tools',
      icon: Camera,
      duration: '10 min read',
      difficulty: 'Advanced'
    },
    {
      title: 'Design Tips & Tricks',
      description: 'Professional design techniques',
      icon: Lightbulb,
      duration: '7 min read',
      difficulty: 'Intermediate'
    }
  ];

  useEffect(() => {
    // Generate recent activity
    const activities = [
      { type: 'created', item: 'Modern Living Room', time: '2 hours ago', icon: Plus },
      { type: 'edited', item: 'Cozy Bedroom', time: '1 day ago', icon: Edit },
      { type: 'shared', item: 'Office Space', time: '2 days ago', icon: Share2 },
      { type: 'exported', item: 'Kitchen Design', time: '3 days ago', icon: Download }
    ];
    setRecentActivity(activities);

    // Calculate quick stats
    const stats = getDesignStats();
    setQuickStats(stats);
  }, [savedDesigns, getDesignStats]);

  const filteredDesigns = savedDesigns.filter(design =>
    design.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'designs', label: 'Recent Designs', icon: FolderOpen },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'learn', label: 'Learn', icon: BookOpen }
  ];

  const isRecent = (date) => {
    const now = new Date();
    const designDate = new Date(date);
    const diffTime = Math.abs(now - designDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lightest-50 to-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 lg:mb-0">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Welcome back, {user?.user_metadata?.full_name || 'Designer'}!
                </h1>
                <p className="text-lg text-gray-600">
                  Ready to create something amazing today?
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-3">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  to={action.to}
                  className={`p-3 ${action.color} text-white rounded-xl hover:scale-105 transition-transform shadow-lg group`}
                  title={action.label}
                >
                  <action.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Welcome Banner */}
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gradient-to-r from-primary-600 to-cream-600 rounded-2xl p-6 mb-8 text-white relative overflow-hidden"
            >
              <button
                onClick={() => setShowWelcome(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Rocket className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">🎉 Welcome to ShineSpace!</h3>
                  <p className="text-primary-100 mb-4">
                    Start designing your dream space with our powerful tools and templates.
                  </p>
                  <Link
                    to="/create"
                    className="inline-flex items-center space-x-2 bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    <span>Create Your First Design</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <StatCard
            title="Total Designs"
            value={quickStats.totalDesigns || 0}
            gradient="from-primary-500 to-primary-600"
            icon={FolderOpen}
            change="+12%"
            changeType="increase"
          />
          <StatCard
            title="Total Elements"
            value={quickStats.totalElements || 0}
            gradient="from-cream-500 to-cream-600"
            icon={Grid3X3}
            change="+8%"
            changeType="increase"
          />
          <StatCard
            title="Avg Elements"
            value={quickStats.averageElements || 0}
            gradient="from-beige-500 to-beige-600"
            icon={BarChart3}
            change="+5%"
            changeType="increase"
          />
          <StatCard
            title="Templates Used"
            value="4"
            gradient="from-lightest-500 to-lightest-600"
            icon={Layout}
            change="+2"
            changeType="increase"
          />
        </motion.div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary-600" />
                <span>Recent Notifications</span>
              </h3>
              <span className="text-sm text-gray-500">{notifications.length} new</span>
            </div>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notification.type === 'success' ? 'bg-green-500' :
                    notification.type === 'info' ? 'bg-blue-500' : 'bg-primary-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm">{notification.message}</p>
                    <p className="text-gray-500 text-xs mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Dashboard Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
                {dashboardCards.map((card, index) => (
                  <DashboardCard
                    key={card.id}
                    {...card}
                    delay={index * 0.1}
                  />
                ))}
              </div>

              {/* Recent Activity & Learning */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RecentActivityCard activities={recentActivity} />
                <Furniture3DPreviewCard furnitureData={furnitureData} loading={loading3D} />
              </div>
            </motion.div>
          )}

          {activeTab === 'designs' && (
            <motion.div
              key="designs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <RecentDesignsTab 
                designs={filteredDesigns} 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </motion.div>
          )}

          {activeTab === 'activity' && (
            <motion.div
              key="activity"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ActivityTab activities={recentActivity} />
            </motion.div>
          )}

          {activeTab === 'learn' && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <LearnTab resources={learningResources} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, gradient, icon: Icon, change, changeType }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className={`flex items-center space-x-1 text-sm ${
        changeType === 'increase' ? 'text-green-600' : 'text-red-600'
      }`}>
        {changeType === 'increase' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        <span>{change}</span>
      </div>
    </div>
    <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-sm text-gray-600">{title}</div>
  </div>
);

const DashboardCard = ({ 
  title, 
  description, 
  icon: Icon, 
  to, 
  gradient, 
  bgGradient,
  action,
  stats,
  delay 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -4 }}
    className="group"
  >
    <Link
      to={to}
      className={`block bg-gradient-to-br ${bgGradient} rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-all duration-300 h-full shadow-lg hover:shadow-2xl`}
    >
      <div className="flex items-start justify-between mb-6">
        <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <span className="text-sm text-gray-500 bg-white/80 px-3 py-1 rounded-full">
          {stats}
        </span>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 leading-relaxed">
        {description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
          <span>{action}</span>
          <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  </motion.div>
);

const RecentActivityCard = ({ activities }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
      <Activity className="h-5 w-5 text-primary-600" />
      <span>Recent Activity</span>
    </h3>
    {activities.length > 0 ? (
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <activity.icon className="h-5 w-5 text-primary-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-900 font-medium">
                {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} "{activity.item}"
              </p>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
        <Link
          to="/designs"
          className="block text-center text-primary-600 hover:text-primary-700 font-medium text-sm mt-4"
        >
          View all activity →
        </Link>
      </div>
    ) : (
      <div className="text-center py-8">
        <Activity className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600">No recent activity</p>
      </div>
    )}
  </div>
);

const Furniture3DPreviewCard = ({ furnitureData, loading }) => {
  const [selectedFurniture, setSelectedFurniture] = useState(0);

  const furnitureComponents = {
    seating: furnitureData.find(f => f.category === 'seating') ? Sofa : null,
    bedroom: furnitureData.find(f => f.category === 'bedroom') ? Bed : null,
    tables: furnitureData.find(f => f.category === 'tables') ? Table : null,
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
        <Package className="h-5 w-5 text-primary-600" />
        <span>3D Furniture Preview</span>
      </h3>
      
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading 3D Models...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="h-64 mb-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl overflow-hidden">
            <SceneCanvas
              cameraPosition={[5, 5, 5]}
              showGrid={false}
              showShadows={true}
              lightingMode="day"
              environmentPreset="apartment"
              enableControls={true}
            >
              {furnitureData.slice(0, 3).map((furniture, index) => {
                const FurnitureComponent = index === 0 ? Sofa : index === 1 ? Chair : Bed;
                return (
                  <FurnitureComponent
                    key={furniture.id}
                    position={[index * 2 - 2, 0, 0]}
                    scale={[0.8, 0.8, 0.8]}
                    rotation={[0, Math.PI / 4, 0]}
                    isSelected={selectedFurniture === index}
                    onSelect={() => setSelectedFurniture(index)}
                  />
                );
              })}
            </SceneCanvas>
          </div>
          
          <div className="space-y-2">
            {furnitureData.slice(0, 3).map((furniture, index) => (
              <button
                key={furniture.id}
                onClick={() => setSelectedFurniture(index)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedFurniture === index
                    ? 'bg-primary-50 text-primary-700 border border-primary-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="font-medium">{furniture.name}</div>
                <div className="text-sm text-gray-500 capitalize">{furniture.category}</div>
              </button>
            ))}
          </div>
          
          <Link
            to="/create"
            className="block text-center text-primary-600 hover:text-primary-700 font-medium text-sm mt-4"
          >
            Start designing with 3D furniture →
          </Link>
        </>
      )}
    </div>
  );
};

const LearningResourcesCard = ({ resources }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
      <BookOpen className="h-5 w-5 text-primary-600" />
      <span>Learning Resources</span>
    </h3>
    <div className="space-y-4">
      {resources.map((resource, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all cursor-pointer group">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
              <resource.icon className="h-5 w-5 text-primary-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">{resource.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
              <div className="flex items-center space-x-3 text-xs text-gray-500">
                <span>{resource.duration}</span>
                <span>•</span>
                <span className={`px-2 py-1 rounded-full ${
                  resource.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                  resource.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {resource.difficulty}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RecentDesignsTab = ({ designs, searchQuery, setSearchQuery }) => (
  <div className="space-y-6">
    {/* Search */}
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search designs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />
    </div>

    {/* Designs Grid */}
    {designs.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {designs.slice(0, 6).map((design, index) => (
          <motion.div
            key={design.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="aspect-video bg-gradient-to-br from-primary-50 to-cream-50 p-4 relative">
              {design.elements.length > 0 ? (
                <div className="relative h-full">
                  {design.elements.slice(0, 6).map((element, idx) => (
                    <div
                      key={element.id}
                      className="absolute rounded-lg shadow-sm"
                      style={{
                        left: `${Math.min(Math.max((element.x / 400) * 100, 0), 85)}%`,
                        top: `${Math.min(Math.max((element.y / 300) * 100, 0), 85)}%`,
                        width: `${Math.min((element.width / 400) * 100, 20)}%`,
                        height: `${Math.min((element.height / 300) * 100, 20)}%`,
                        backgroundColor: element.color,
                        opacity: 0.8
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Grid3X3 className="h-12 w-12 text-gray-300" />
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">{design.name}</h3>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Clock className="h-4 w-4 mr-1" />
                <span>Updated {design.updatedAt.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                  {design.elements.length} elements
                </span>
                <Link
                  to={`/create?design=${design.id}`}
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1"
                >
                  <span>Edit</span>
                  <Edit className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    ) : (
      <div className="text-center py-12">
        <FolderOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {searchQuery ? 'No designs found' : 'No designs yet'}
        </h3>
        <p className="text-gray-600 mb-6">
          {searchQuery ? 'Try adjusting your search' : 'Start creating your first design'}
        </p>
        <Link
          to="/create"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          <span>Create Design</span>
        </Link>
      </div>
    )}

    {designs.length > 6 && (
      <div className="text-center">
        <Link
          to="/designs"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <span>View All Designs</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )}
  </div>
);

const ActivityTab = ({ activities }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-6">Activity Timeline</h3>
    <div className="space-y-6">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <activity.icon className="h-5 w-5 text-primary-600" />
          </div>
          <div className="flex-1">
            <p className="text-gray-900 font-medium">
              {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} "{activity.item}"
            </p>
            <p className="text-sm text-gray-500">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const LearnTab = ({ resources }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {resources.map((resource, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow cursor-pointer group"
      >
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
          <resource.icon className="h-6 w-6 text-primary-600" />
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
        <p className="text-gray-600 mb-4">{resource.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{resource.duration}</span>
          <span className={`text-xs px-2 py-1 rounded-full ${
            resource.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
            resource.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {resource.difficulty}
          </span>
        </div>
      </motion.div>
    ))}
  </div>
);

export default DashboardPage;