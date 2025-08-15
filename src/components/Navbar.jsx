import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Settings, Sparkles, Menu, X, Bell, Search, LogIn, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import AuthModal from './AuthModal';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState(3);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  
  const { user, isAuthenticated, signOut, isLoading } = useAuthStore();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/dashboard', label: 'Dashboard', icon: User },
    { to: '/templates', label: 'Templates', icon: Sparkles },
    { to: '/ar-view', label: 'AR View', icon: Settings }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const handleLogout = async () => {
    await signOut();
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/95 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl group-hover:scale-105 transition-transform">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                ShineSpace
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.to}
                  to={link.to} 
                  label={link.label} 
                  icon={link.icon}
                  isActive={isActive(link.to)} 
                />
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Notifications - only show when authenticated */}
              {isAuthenticated && (
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative">
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
              )}

              {/* Authentication Section */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  {/* User Profile Dropdown */}
                  <div className="relative group">
                    <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <span className="hidden lg:inline font-medium">
                        {user?.user_metadata?.full_name || 'User'}
                      </span>
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                        <hr className="my-2" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors text-left"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Start Designing Button */}
                  <Link
                    to="/create"
                    className="px-6 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 font-medium transition-all transform hover:scale-105"
                  >
                    Start Designing
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => openAuthModal('signin')}
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 font-medium transition-all transform hover:scale-105"
                  disabled={isLoading}
                >
                  <LogIn className="h-5 w-5" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile Notifications */}
              {isAuthenticated && (
                <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative">
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 bg-white"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <form onSubmit={handleSearch} className="max-w-md mx-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search designs, templates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      autoFocus
                    />
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-4 py-4 space-y-3">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </form>

                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-lg font-medium transition-all ${
                      isActive(link.to)
                        ? 'text-primary-700 bg-primary-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <link.icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </Link>
                ))}
                
                <div className="pt-3 border-t border-gray-200 space-y-3">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-3 px-3 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                      >
                        <User className="h-5 w-5" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-3 px-3 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                      >
                        <Settings className="h-5 w-5" />
                        <span>Settings</span>
                      </Link>
                      <Link
                        to="/create"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full text-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 font-medium transition-all"
                      >
                        Start Designing
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 px-3 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg font-medium transition-colors w-full"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        openAuthModal('signin');
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 px-3 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors w-full"
                    >
                      <LogIn className="h-5 w-5" />
                      <span>Sign In</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onSwitchMode={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
};

const NavLink = ({ to, label, icon: Icon, isActive }) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all ${
      isActive
        ? 'text-primary-700 bg-primary-50'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
    }`}
  >
    <Icon className="h-4 w-4" />
    <span>{label}</span>
  </Link>
);

export default Navbar;