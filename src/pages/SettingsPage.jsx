import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Monitor, 
  Grid3X3, 
  Magnet, 
  Ruler, 
  Save, 
  RotateCcw,
  Moon,
  Sun,
  Bell,
  Shield,
  Palette,
  Zap,
  Globe,
  Smartphone,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Database,
  HardDrive,
  Cloud,
  Settings as SettingsIcon,
  User,
  Mail,
  Key,
  CreditCard,
  FileText,
  HelpCircle,
  ExternalLink,
  Check,
  X,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useSettingsStore } from '../stores/settingsStore';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const {
    theme,
    gridEnabled,
    snapToGrid,
    unit,
    autoSave,
    setTheme,
    toggleGrid,
    toggleSnapToGrid,
    setUnit,
    toggleAutoSave,
    resetSettings
  } = useSettingsStore();

  const [activeTab, setActiveTab] = useState('appearance');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'canvas', label: 'Canvas', icon: Grid3X3 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'account', label: 'Account', icon: User }
  ];

  const handleReset = () => {
    resetSettings();
    setShowResetConfirm(false);
    showNotification('Settings reset to default values', 'success');
  };

  const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      info: 'bg-blue-500',
      warning: 'bg-yellow-500'
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Customize your ShineSpace experience</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sticky top-8">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all text-left ${
                      activeTab === tab.id
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeTab === 'appearance' && (
                <AppearanceTab 
                  theme={theme}
                  setTheme={setTheme}
                />
              )}
              
              {activeTab === 'canvas' && (
                <CanvasTab 
                  gridEnabled={gridEnabled}
                  snapToGrid={snapToGrid}
                  unit={unit}
                  autoSave={autoSave}
                  toggleGrid={toggleGrid}
                  toggleSnapToGrid={toggleSnapToGrid}
                  setUnit={setUnit}
                  toggleAutoSave={toggleAutoSave}
                />
              )}
              
              {activeTab === 'notifications' && (
                <NotificationsTab />
              )}
              
              {activeTab === 'privacy' && (
                <PrivacyTab />
              )}
              
              {activeTab === 'account' && (
                <AccountTab />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Reset Settings Modal */}
        <AnimatePresence>
          {showResetConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowResetConfirm(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                  <h3 className="text-xl font-bold text-gray-900">Reset Settings</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  This will restore all settings to their default values. This action cannot be undone.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={handleReset}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reset Settings
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reset Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reset Settings</h3>
              <p className="text-gray-600">Restore all settings to their default values</p>
            </div>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 border border-red-200 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset All</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Tab Components
const AppearanceTab = ({ theme, setTheme }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-6"
  >
    <SettingsSection
      title="Theme"
      description="Choose your preferred color scheme"
      icon={Palette}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { id: 'light', label: 'Light', icon: Sun, preview: 'bg-white border-gray-200' },
          { id: 'dark', label: 'Dark', icon: Moon, preview: 'bg-gray-900 border-gray-700' },
          { id: 'auto', label: 'Auto', icon: Monitor, preview: 'bg-gradient-to-r from-white to-gray-900 border-gray-400' }
        ].map((option) => (
          <button
            key={option.id}
            onClick={() => setTheme(option.id)}
            className={`p-4 rounded-xl border-2 transition-all ${
              theme === option.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className={`w-full h-16 rounded-lg mb-3 ${option.preview} border`}></div>
            <div className="flex items-center justify-center space-x-2">
              <option.icon className="h-4 w-4" />
              <span className="font-medium">{option.label}</span>
            </div>
          </button>
        ))}
      </div>
    </SettingsSection>
  </motion.div>
);

const CanvasTab = ({ gridEnabled, snapToGrid, unit, autoSave, toggleGrid, toggleSnapToGrid, setUnit, toggleAutoSave }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-6"
  >
    <SettingsSection
      title="Grid & Alignment"
      description="Configure grid and snapping behavior"
      icon={Grid3X3}
    >
      <div className="space-y-4">
        <SettingItem
          label="Show Grid"
          description="Display grid lines to help with alignment"
        >
          <ToggleSwitch enabled={gridEnabled} onChange={toggleGrid} />
        </SettingItem>

        <SettingItem
          label="Snap to Grid"
          description="Automatically align elements to grid points"
        >
          <ToggleSwitch enabled={snapToGrid} onChange={toggleSnapToGrid} />
        </SettingItem>
      </div>
    </SettingsSection>

    <SettingsSection
      title="Measurements"
      description="Set your preferred units"
      icon={Ruler}
    >
      <SettingItem
        label="Unit System"
        description="Choose your preferred measurement unit"
      >
        <div className="flex space-x-3">
          <button
            onClick={() => setUnit('feet')}
            className={`px-4 py-2 rounded-lg border-2 transition-all ${
              unit === 'feet'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            Feet
          </button>
          <button
            onClick={() => setUnit('meters')}
            className={`px-4 py-2 rounded-lg border-2 transition-all ${
              unit === 'meters'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            Meters
          </button>
        </div>
      </SettingItem>
    </SettingsSection>

    <SettingsSection
      title="Workflow"
      description="Optimize your design workflow"
      icon={Save}
    >
      <SettingItem
        label="Auto-save"
        description="Automatically save your work as you design"
      >
        <ToggleSwitch enabled={autoSave} onChange={toggleAutoSave} />
      </SettingItem>
    </SettingsSection>
  </motion.div>
);

const NotificationsTab = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-6"
  >
    <SettingsSection
      title="Notification Preferences"
      description="Choose how you want to be notified"
      icon={Bell}
    >
      <div className="space-y-4">
        {[
          { key: 'sound', label: 'Sound notifications', description: 'Play sounds for notifications', icon: Volume2 },
          { key: 'desktop', label: 'Desktop notifications', description: 'Show desktop notifications', icon: Monitor },
          { key: 'email', label: 'Email notifications', description: 'Receive notifications via email', icon: Mail },
          { key: 'push', label: 'Push notifications', description: 'Browser push notifications', icon: Smartphone }
        ].map((setting) => (
          <SettingItem
            key={setting.key}
            label={setting.label}
            description={setting.description}
            icon={setting.icon}
          >
            <ToggleSwitch
              enabled={true}
              onChange={() => {}}
            />
          </SettingItem>
        ))}
      </div>
    </SettingsSection>
  </motion.div>
);

const PrivacyTab = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-6"
  >
    <SettingsSection
      title="Privacy & Data"
      description="Control your data and privacy settings"
      icon={Shield}
    >
      <div className="space-y-4">
        {[
          { key: 'analytics', label: 'Analytics', description: 'Help improve ShineSpace with usage analytics', icon: Database },
          { key: 'crashReports', label: 'Crash reports', description: 'Send crash reports to help fix bugs', icon: AlertTriangle },
          { key: 'publicProfile', label: 'Public profile', description: 'Make your profile visible to others', icon: User }
        ].map((setting) => (
          <SettingItem
            key={setting.key}
            label={setting.label}
            description={setting.description}
            icon={setting.icon}
          >
            <ToggleSwitch
              enabled={true}
              onChange={() => {}}
            />
          </SettingItem>
        ))}
      </div>
    </SettingsSection>
  </motion.div>
);

const AccountTab = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-6"
  >
    <SettingsSection
      title="Account Information"
      description="Manage your account details"
      icon={User}
    >
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">User Account</h4>
              <p className="text-sm text-gray-600">Manage your account settings</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Key className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-900">Change Password</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Mail className="h-5 w-5 text-gray-600" />
            <span className="font-medium text-gray-900">Update Email</span>
          </button>
        </div>
      </div>
    </SettingsSection>
  </motion.div>
);

// Helper Components
const SettingsSection = ({ title, description, icon: Icon, children }) => (
  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
    <div className="flex items-center space-x-3 mb-6">
      <div className="p-2 bg-primary-100 rounded-lg">
        <Icon className="h-5 w-5 text-primary-600" />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
    {children}
  </div>
);

const SettingItem = ({ label, description, icon: Icon, children }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
    <div className="flex items-start space-x-3 flex-1">
      {Icon && <Icon className="h-5 w-5 text-gray-600 mt-0.5" />}
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{label}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
    <div className="ml-6">
      {children}
    </div>
  </div>
);

const ToggleSwitch = ({ enabled, onChange }) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      enabled ? 'bg-primary-600' : 'bg-gray-200'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

export default SettingsPage;