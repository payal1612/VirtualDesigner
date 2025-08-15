import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Calendar, 
  BarChart3, 
  Settings, 
  Edit, 
  Save, 
  Camera,
  Award,
  Target,
  TrendingUp,
  Clock,
  Star,
  Heart,
  Share2,
  Download,
  Eye,
  Palette,
  Check,
  X,
  Plus,
  Trash2,
  Upload,
  Link as LinkIcon,
  Github,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useDesignStore } from '../stores/designStore';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { savedDesigns } = useDesignStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: user?.user_metadata?.full_name || 'User',
    email: user?.email || '',
    bio: 'Passionate interior designer creating beautiful spaces.',
    location: 'San Francisco, CA',
    website: 'https://example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    createdAt: new Date('2023-01-15'),
    socialLinks: {
      twitter: '@username',
      instagram: '@username',
      linkedin: 'username'
    }
  });

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const [achievements] = useState([
    { id: 1, title: 'First Design', description: 'Created your first design', icon: Target, earned: true, date: '2023-01-20' },
    { id: 2, title: 'Template Master', description: 'Used 5 different templates', icon: Star, earned: true, date: '2023-02-15' },
    { id: 3, title: 'AR Explorer', description: 'Tried AR view for the first time', icon: Eye, earned: true, date: '2023-03-01' },
    { id: 4, title: 'Sharing Expert', description: 'Shared 10 designs', icon: Share2, earned: false },
    { id: 5, title: 'Design Guru', description: 'Created 50 designs', icon: Award, earned: false },
    { id: 6, title: 'Community Helper', description: 'Helped 5 other users', icon: Heart, earned: false }
  ]);

  const stats = [
    {
      label: 'Designs Created',
      value: savedDesigns.length,
      icon: BarChart3,
      color: 'from-primary-500 to-primary-600',
      change: '+12%',
      changeType: 'increase'
    },
    {
      label: 'Templates Used',
      value: '8',
      icon: Palette,
      color: 'from-cream-500 to-cream-600',
      change: '+3',
      changeType: 'increase'
    },
    {
      label: 'Days Active',
      value: Math.ceil((new Date().getTime() - userInfo.createdAt.getTime()) / (1000 * 60 * 60 * 24)),
      icon: Calendar,
      color: 'from-beige-500 to-beige-600',
      change: 'Streak: 7',
      changeType: 'neutral'
    },
    {
      label: 'Achievements',
      value: achievements.filter(a => a.earned).length,
      icon: Award,
      color: 'from-lightest-500 to-lightest-600',
      change: `${achievements.length - achievements.filter(a => a.earned).length} left`,
      changeType: 'neutral'
    }
  ];

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'activity', label: 'Activity', icon: BarChart3 },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleSave = () => {
    localStorage.setItem('shinespace_user', JSON.stringify(userInfo));
    setIsEditing(false);
    showNotification('Profile updated successfully!', 'success');
  };

  const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      info: 'bg-blue-500'
    };
    notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 3000);
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your account and view your design journey</p>
        </motion.div>

        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-r from-primary-600 to-cream-600 rounded-2xl p-8 mb-8 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <img
                src={userInfo.avatar}
                alt={userInfo.name}
                className="w-32 h-32 rounded-2xl object-cover border-4 border-white/20"
              />
              {isEditing && (
                <label className="absolute -bottom-2 -right-2 p-2 bg-white text-primary-600 rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
                  <Camera className="h-4 w-4" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">{userInfo.name}</h2>
              <p className="text-primary-100 mb-4">{userInfo.bio}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>{userInfo.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {userInfo.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-6 py-3 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center space-x-2 px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors font-medium"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} delay={index * 0.1} />
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-sm border border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
          {activeTab === 'profile' && (
            <ProfileTab 
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              isEditing={isEditing}
            />
          )}
          
          {activeTab === 'activity' && (
            <ActivityTab designs={savedDesigns} />
          )}
          
          {activeTab === 'achievements' && (
            <AchievementsTab achievements={achievements} />
          )}
          
          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h3>
              <p className="text-gray-600">Additional profile settings will be available here.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color, change, changeType, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className={`text-sm ${
        changeType === 'increase' ? 'text-green-600' : 
        changeType === 'decrease' ? 'text-red-600' : 'text-gray-500'
      }`}>
        {change}
      </div>
    </div>
    <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </motion.div>
);

const ProfileTab = ({ userInfo, setUserInfo, isEditing }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
  >
    {/* Personal Information */}
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          {isEditing ? (
            <input
              type="text"
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          ) : (
            <p className="text-gray-900 py-3">{userInfo.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <p className="text-gray-900 py-3">{userInfo.email}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          {isEditing ? (
            <textarea
              value={userInfo.bio}
              onChange={(e) => setUserInfo({ ...userInfo, bio: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          ) : (
            <p className="text-gray-900 py-3">{userInfo.bio}</p>
          )}
        </div>
      </div>
    </div>

    {/* Social Links */}
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Social Links</h3>
      
      <div className="space-y-6">
        {[
          { key: 'twitter', label: 'Twitter', icon: Twitter, placeholder: '@username' },
          { key: 'instagram', label: 'Instagram', icon: Instagram, placeholder: '@username' },
          { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'username' }
        ].map((social) => (
          <div key={social.key}>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
              <social.icon className="h-4 w-4" />
              <span>{social.label}</span>
            </label>
            {isEditing ? (
              <input
                type="text"
                value={userInfo.socialLinks[social.key] || ''}
                onChange={(e) => setUserInfo({
                  ...userInfo,
                  socialLinks: { ...userInfo.socialLinks, [social.key]: e.target.value }
                })}
                placeholder={social.placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            ) : (
              <p className="text-gray-900 py-3">{userInfo.socialLinks[social.key] || 'Not set'}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const ActivityTab = ({ designs }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
  >
    <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Designs</h3>
    
    {designs.length > 0 ? (
      <div className="space-y-4">
        {designs.slice(0, 5).map((design, index) => (
          <div
            key={design.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-cream-100 rounded-lg flex items-center justify-center">
                <Palette className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{design.name}</h4>
                <p className="text-sm text-gray-600">
                  Last modified {design.updatedAt.toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {design.elements.length} elements
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-8">
        <Palette className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No designs created yet</p>
      </div>
    )}
  </motion.div>
);

const AchievementsTab = ({ achievements }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
  >
    <h3 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {achievements.map((achievement) => (
        <div
          key={achievement.id}
          className={`p-6 rounded-xl border-2 transition-all ${
            achievement.earned
              ? 'bg-primary-50 border-primary-200 text-primary-900'
              : 'border-gray-200 bg-gray-50 opacity-60'
          }`}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              achievement.earned
                ? 'bg-primary-600 text-white'
                : 'bg-gray-300 text-gray-500'
            }`}>
              <achievement.icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{achievement.title}</h4>
              {achievement.earned && achievement.date && (
                <p className="text-sm opacity-75">Earned {achievement.date}</p>
              )}
            </div>
            {achievement.earned && (
              <Check className="h-5 w-5 text-green-500" />
            )}
          </div>
          <p className="text-sm opacity-75">{achievement.description}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

export default ProfilePage;