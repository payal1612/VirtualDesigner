import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Home, 
  Layout, 
  Camera, 
  Settings,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  Heart,
  Star,
  Users,
  Award,
  Zap
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: Layout },
    { name: 'Templates', href: '/templates', icon: Layout },
    { name: 'AR View', href: '/ar-view', icon: Camera },
    { name: 'My Designs', href: '/designs', icon: Layout },
    { name: 'Settings', href: '/settings', icon: Settings }
  ];

  const templateCategories = [
    { name: 'Living Room', count: '15+' },
    { name: 'Bedroom', count: '12+' },
    { name: 'Kitchen', count: '10+' },
    { name: 'Office', count: '8+' },
    { name: 'Bathroom', count: '6+' },
    { name: 'Outdoor', count: '5+' }
  ];

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Blog', href: '/blog' },
    { name: 'Help Center', href: '/help' },
    { name: 'Contact', href: '/contact' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' }
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook, color: 'hover:text-blue-600' },
    { name: 'Twitter', href: '#', icon: Twitter, color: 'hover:text-blue-400' },
    { name: 'Instagram', href: '#', icon: Instagram, color: 'hover:text-pink-600' },
    { name: 'LinkedIn', href: '#', icon: Linkedin, color: 'hover:text-blue-700' },
    { name: 'YouTube', href: '#', icon: Youtube, color: 'hover:text-red-600' }
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Active Users' },
    { icon: Layout, value: '100K+', label: 'Designs Created' },
    { icon: Star, value: '4.9', label: 'Average Rating' },
    { icon: Award, value: '25+', label: 'Awards Won' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">ShineSpace</h3>
                <p className="text-sm text-gray-400">Design Your Dreams</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transform your living spaces with our powerful 3D design tools. 
              Create, visualize, and bring your interior design dreams to life.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-4 w-4 text-primary-400" />
                <span className="text-sm">hello@shinespace.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-4 w-4 text-primary-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="h-4 w-4 text-primary-400" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Navigation</h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="flex items-center space-x-2 text-gray-300 hover:text-primary-400 transition-colors group"
                  >
                    <link.icon className="h-4 w-4 group-hover:text-primary-400" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Templates & Categories */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Templates</h4>
            <ul className="space-y-3">
              {templateCategories.map((category) => (
                <li key={category.name}>
                  <Link
                    to="/templates"
                    className="flex items-center justify-between text-gray-300 hover:text-primary-400 transition-colors group"
                  >
                    <span>{category.name}</span>
                    <span className="text-xs bg-primary-500/20 text-primary-400 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            
            <Link
              to="/templates"
              className="inline-flex items-center space-x-2 mt-4 text-primary-400 hover:text-primary-300 transition-colors group"
            >
              <span className="text-sm font-medium">View All Templates</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-3 mb-8">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter Signup */}
            <div className="bg-gray-800/50 rounded-xl p-4">
              <h5 className="text-white font-medium mb-2">Stay Updated</h5>
              <p className="text-gray-400 text-sm mb-3">Get design tips and updates</p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="flex items-center space-x-4">
              <p className="text-gray-400 text-sm">
                © {currentYear} ShineSpace. All rights reserved.
              </p>
              <div className="flex items-center space-x-1 text-gray-400">
                <span className="text-sm">Made with</span>
                <Heart className="h-4 w-4 text-red-500 fill-current" />
                <span className="text-sm">for designers</span>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`p-2 text-gray-400 ${social.color} transition-colors rounded-lg hover:bg-gray-800`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          to="/create"
          className="group flex items-center space-x-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-primary-500/25 transition-all transform hover:scale-105"
        >
          <Zap className="h-5 w-5" />
          <span className="font-medium">Start Designing</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;