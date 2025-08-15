import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Puzzle, 
  Home, 
  FolderOpen, 
  Save,
  Play,
  Star,
  Users,
  Award,
  Zap,
  Shield,
  Smartphone,
  Monitor,
  Tablet,
  ChevronLeft,
  ChevronRight,
  Quote,
  Check,
  Globe,
  Palette,
  Camera,
  Share2,
  Download,
  Eye,
  Heart,
  MessageCircle,
  TrendingUp,
  Clock,
  Target,
  Layers
} from 'lucide-react';

const HomePage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Interior Designer",
      company: "Design Studio Pro",
      content: "ShineSpace has revolutionized how I present designs to clients. The AR feature is incredible and saves me hours of explanation!",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      rating: 5,
      project: "Modern Apartment Redesign"
    },
    {
      name: "Mike Chen",
      role: "Homeowner",
      company: "Tech Entrepreneur",
      content: "I redesigned my entire living room using ShineSpace. So easy and intuitive to use - even for someone with no design experience!",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      rating: 5,
      project: "Home Office Setup"
    },
    {
      name: "Emma Davis",
      role: "Architect",
      company: "Davis Architecture",
      content: "The template library saved me hours of work. Professional quality designs at my fingertips with endless customization options.",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      rating: 5,
      project: "Commercial Space Planning"
    },
    {
      name: "James Wilson",
      role: "Real Estate Agent",
      company: "Premium Properties",
      content: "My clients love seeing their future homes visualized. ShineSpace helps me close deals faster and with more confidence.",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      rating: 5,
      project: "Property Staging"
    }
  ];

  const stats = [
    { number: "50K+", label: "Designs Created", icon: Home, color: "from-blue-500 to-cyan-500" },
    { number: "15K+", label: "Happy Users", icon: Users, color: "from-green-500 to-emerald-500" },
    { number: "98%", label: "Satisfaction Rate", icon: Award, color: "from-purple-500 to-pink-500" },
    { number: "24/7", label: "Support", icon: Shield, color: "from-orange-500 to-red-500" }
  ];

  const features = [
    {
      icon: Puzzle,
      title: "Drag & Drop Builder",
      description: "Intuitive design tools that anyone can master in minutes",
      color: "from-blue-500 to-cyan-500",
      details: ["Visual element library", "Smart snap-to-grid", "Real-time preview", "Undo/Redo system"],
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: Camera,
      title: "3D & AR Preview",
      description: "See your designs come to life in real space with cutting-edge AR",
      color: "from-purple-500 to-pink-500",
      details: ["Mobile AR support", "Real-time rendering", "Scale accuracy", "Lighting simulation"],
      image: "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: FolderOpen,
      title: "Template Gallery",
      description: "Professional designs to jumpstart your creativity",
      color: "from-green-500 to-emerald-500",
      details: ["50+ templates", "Multiple categories", "Regular updates", "Customizable designs"],
      image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: Save,
      title: "Cloud Storage",
      description: "Access your designs anywhere, anytime with automatic sync",
      color: "from-orange-500 to-red-500",
      details: ["Auto-save feature", "Version history", "Cross-device sync", "Export options"],
      image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: Zap,
      title: "Real-time Collaboration",
      description: "Work together with family and designers seamlessly",
      color: "from-indigo-500 to-purple-500",
      details: ["Live editing", "Comment system", "Share permissions", "Team workspaces"],
      image: "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Design on any device, anywhere you go",
      color: "from-pink-500 to-rose-500",
      details: ["Touch controls", "Responsive design", "Offline mode", "Native feel"],
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  const showcaseSlides = [
    {
      title: "Living Room Designs",
      description: "Create stunning living spaces with our comprehensive furniture library",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: ["Sofa arrangements", "Coffee tables", "Entertainment centers", "Lighting options"]
    },
    {
      title: "Kitchen Planning",
      description: "Design functional and beautiful kitchens with professional tools",
      image: "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: ["Cabinet layouts", "Appliance placement", "Island designs", "Storage solutions"]
    },
    {
      title: "Bedroom Layouts",
      description: "Create peaceful and organized bedroom spaces",
      image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: ["Bed positioning", "Storage solutions", "Lighting design", "Color schemes"]
    },
    {
      title: "Office Spaces",
      description: "Design productive workspaces for home or commercial use",
      image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: ["Desk arrangements", "Storage systems", "Meeting areas", "Ergonomic layouts"]
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for personal projects",
      features: [
        "5 design projects",
        "Basic templates",
        "2D design tools",
        "Export to PNG",
        "Community support"
      ],
      popular: false,
      cta: "Get Started Free"
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "For serious designers and professionals",
      features: [
        "Unlimited projects",
        "Premium templates",
        "3D & AR preview",
        "HD exports",
        "Priority support",
        "Collaboration tools",
        "Advanced measurements"
      ],
      popular: true,
      cta: "Start Pro Trial"
    },
    {
      name: "Team",
      price: "$49",
      period: "per month",
      description: "For teams and agencies",
      features: [
        "Everything in Pro",
        "Team workspaces",
        "Admin controls",
        "Custom branding",
        "API access",
        "Dedicated support",
        "Training sessions"
      ],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length, isAutoPlaying]);

  // Auto-rotate showcase slides
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % showcaseSlides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [showcaseSlides.length, isAutoPlaying]);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % showcaseSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + showcaseSlides.length) % showcaseSlides.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content Panel */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Pricing Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center bg-gradient-to-r from-cream-100 to-beige-100 border border-primary-200 rounded-full px-4 py-2"
              >
                <Sparkles className="h-4 w-4 text-primary-600 mr-2" />
                <span className="text-sm font-semibold text-primary-800">
                  Start for Free — No Installation Required
                </span>
              </motion.div>

              {/* Main Heading */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Design Your Dream Home{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-700">
                    Virtually
                  </span>
                </h1>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 96 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="mt-4 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                ></motion.div>
              </div>

              {/* Subheading */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-700 leading-relaxed max-w-2xl"
              >
                — One Wall at a Time
              </motion.p>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-gray-600 leading-relaxed max-w-2xl"
              >
                Create, customize, and preview your perfect space with ShineSpace. 
                Explore drag-and-drop tools, smart templates, and immersive 3D & AR previews — all in one place.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-lg font-semibold rounded-2xl hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-primary-500/25"
                >
                  <span>Start Designing</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/templates"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 text-lg font-semibold rounded-2xl border-2 border-gray-200 hover:border-primary-300 hover:bg-cream-50 transition-all duration-300"
                >
                  Browse Templates
                </Link>
              </motion.div>

              {/* Social Proof */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center space-x-6 pt-4"
              >
                <div className="flex -space-x-2">
                  {testimonials.slice(0, 4).map((testimonial, i) => (
                    <img
                      key={i}
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-primary-400 text-primary-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Loved by 15,000+ users</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Visual Section - Interactive Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-2xl relative"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentSlide}
                      src={showcaseSlides[currentSlide].image}
                      alt={showcaseSlides[currentSlide].title}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                    />
                  </AnimatePresence>
                  
                  {/* Slide Controls */}
                  <div className="absolute inset-0 flex items-center justify-between p-4">
                    <button
                      onClick={prevSlide}
                      className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>
                  </div>

                  {/* Slide Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {showcaseSlides[currentSlide].title}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {showcaseSlides[currentSlide].description}
                    </p>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Play className="h-8 w-8 text-gray-800 ml-1" />
                    </button>
                  </div>
                </motion.div>
                
                {/* Slide Indicators */}
                <div className="flex justify-center space-x-2 mt-4">
                  {showcaseSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentSlide ? 'bg-amber-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Floating Feature Cards */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -bottom-8 -left-8 w-32 h-32 hidden lg:block"
                >
                  <div className="w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden transform rotate-12 hover:rotate-6 transition-transform duration-300">
                    <img
                      src="https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="Kitchen Design"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -top-8 -right-8 w-28 h-28 hidden lg:block"
                >
                  <div className="w-full h-full bg-white rounded-full shadow-xl overflow-hidden hover:scale-110 transition-transform duration-300">
                    <img
                      src="https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="Office Space"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute bottom-16 -right-12 w-24 h-36 hidden lg:block"
                >
                  <div className="w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                    <img
                      src="https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="Bedroom Design"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <motion.div 
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/4 left-1/4 w-3 h-3 bg-amber-400 rounded-full"
              ></motion.div>
              <motion.div 
                animate={{ 
                  y: [0, -15, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-red-400 rounded-full"
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Design
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful tools and features that make room design accessible to everyone
            </p>
          </motion.div>

          {/* Feature Tabs */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    activeFeature === index
                      ? 'bg-gradient-to-r from-amber-600 to-red-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <feature.icon className="h-5 w-5" />
                  <span className="hidden sm:inline">{feature.title}</span>
                </button>
              ))}
            </div>

            {/* Active Feature Display */}
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  {(() => {
                    const FeatureIcon = features[activeFeature].icon;
                    return (
                  <div className={`w-16 h-16 bg-gradient-to-br ${features[activeFeature].color} rounded-2xl flex items-center justify-center mb-6`}>
                    <FeatureIcon className="h-8 w-8 text-white" />
                  </div>
                    );
                  })()}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {features[activeFeature].title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    {features[activeFeature].description}
                  </p>
                  <ul className="space-y-3">
                    {features[activeFeature].details.map((detail, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-green-500" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                  <img
                    src={features[activeFeature].image}
                    alt={features[activeFeature].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                onClick={() => setActiveFeature(index)}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start free and upgrade as your design needs grow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
                  plan.popular 
                    ? 'border-purple-500 transform scale-105' 
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transform hover:scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Device Compatibility */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Design Anywhere, On Any Device
            </h2>
            <p className="text-xl text-purple-100">
              Seamless experience across desktop, tablet, and mobile
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Monitor, 
                title: "Desktop", 
                description: "Full-featured design studio with advanced tools",
                features: ["Drag & drop interface", "Keyboard shortcuts", "Multi-window support", "High-resolution exports"]
              },
              { 
                icon: Tablet, 
                title: "Tablet", 
                description: "Touch-optimized interface for creative work",
                features: ["Touch gestures", "Apple Pencil support", "Portable design", "Offline capabilities"]
              },
              { 
                icon: Smartphone, 
                title: "Mobile", 
                description: "Design on the go with mobile-first features",
                features: ["AR preview", "Quick edits", "Cloud sync", "Share instantly"]
              }
            ].map((device, index) => (
              <motion.div
                key={device.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <device.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{device.title}</h3>
                <p className="text-purple-100 mb-6">{device.description}</p>
                <ul className="space-y-2">
                  {device.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-purple-100 text-sm">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of satisfied designers and homeowners
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="text-center lg:text-left">
                  <img
                    src={testimonials[activeTestimonial].avatar}
                    alt={testimonials[activeTestimonial].name}
                    className="w-20 h-20 rounded-full mx-auto lg:mx-0 mb-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">
                      {testimonials[activeTestimonial].name}
                    </div>
                    <div className="text-gray-600">{testimonials[activeTestimonial].role}</div>
                    <div className="text-sm text-gray-500">{testimonials[activeTestimonial].company}</div>
                    <div className="flex items-center justify-center lg:justify-start space-x-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <Quote className="h-8 w-8 text-purple-500 mb-4" />
                  <blockquote className="text-lg text-gray-700 mb-6 italic leading-relaxed">
                    "{testimonials[activeTestimonial].content}"
                  </blockquote>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Target className="h-4 w-4" />
                      <span>Project: {testimonials[activeTestimonial].project}</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === activeTestimonial ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Auto-play control */}
            <div className="text-center mt-4">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                {isAutoPlaying ? 'Pause' : 'Play'} auto-rotation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-r from-amber-600 to-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-amber-100">
              Four simple steps to your dream space
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Choose Template or Start Blank",
                description: "Pick from our gallery or create from scratch",
                icon: FolderOpen
              },
              {
                step: "2",
                title: "Drag and Customize",
                description: "Add furniture and adjust layouts easily",
                icon: Puzzle
              },
              {
                step: "3",
                title: "Preview in 3D / AR",
                description: "See your design come to life",
                icon: Camera
              },
              {
                step: "4",
                title: "Save and Share",
                description: "Export and share your creations",
                icon: Share2
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-amber-100">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Start creating your perfect space — today.
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of homeowners and designers who trust ShineSpace
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-lg font-semibold rounded-2xl hover:from-primary-700 hover:to-primary-800 transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                <span>Start Designing Now</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/templates"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-white/10 text-white text-lg font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <span>View Templates</span>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Works Worldwide</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>24/7 Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;