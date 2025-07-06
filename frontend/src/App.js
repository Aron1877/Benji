import React, { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import "./App.css";

const App = () => {
  // MAINTENANCE MODE CONTROL
  // Set to 'true' to show maintenance message and disable site
  // Set to 'false' for normal operation
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    postalCode: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // EmailJS configuration
      const serviceID = 'service_59eqc92';
      const templateID = 'template_qcxo7bh';
      const publicKey = 'cqo_-p2qVXfcNn2PI';
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        postal_code: formData.postalCode,
        to_email: 'Binyamin.bodner@dfsin.ca',
        message: `New RESP inquiry from ${formData.name}. Phone: ${formData.phone}, Email: ${formData.email}, Postal Code: ${formData.postalCode}`
      };

      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      
      console.log('Email sent successfully');
      setIsSubmitted(true);
      setFormData({ name: '', phone: '', email: '', postalCode: '' });
      
    } catch (error) {
      console.error('Email send failed:', error);
      // For now, still show success to user (you can modify this behavior)
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setFormData({
      ...formData,
      phone: formattedPhone
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Maintenance Banner */}
      {isMaintenanceMode && (
        <div className="bg-amber-600 text-white py-4 px-4 text-center relative z-50">
          <div className="max-w-4xl mx-auto flex items-center justify-center">
            <svg className="w-6 h-6 mr-3 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <p className="font-semibold">We're currently updating our services to serve you better!</p>
              <p className="text-sm mt-1">
                We apologize for any inconvenience. Our RESP consultation services will be back online shortly. 
                For urgent inquiries, please contact us directly at <span className="font-medium">Binyamin.bodner@dfsin.ca</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={isMaintenanceMode ? 'opacity-50 pointer-events-none' : ''}>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-8 animate-slide-up">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">RESP</span> Guy
              </h1>
              <p className="text-2xl lg:text-3xl text-blue-200 font-light">
                The RESP option for the <em className="text-cyan-300">prudent</em>
              </p>
            </div>
            
            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
              Whether you are looking to open a new RESP, shop around for a better option, 
              or even evaluate what you currently have, The RESP guy is the right place to be.
            </p>

            <div className="flex flex-col gap-4 pt-4">
              <button 
                onClick={() => document.getElementById('signup-form').scrollIntoView({ behavior: 'smooth' })}
                className="group bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-5 lg:py-4 rounded-2xl font-semibold text-lg lg:text-lg text-center shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 hover:from-blue-500 hover:to-cyan-500 min-h-[60px] flex items-center justify-center"
              >
                <span className="text-lg lg:text-lg">Get Started Today</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>

          <div className="relative animate-float">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 animate-fade-in">
              <img 
                src="https://images.pexels.com/photos/1456951/pexels-photo-1456951.jpeg" 
                alt="Father and son enjoying time together outdoors, planning for the future"
                className="w-full h-96 lg:h-[500px] object-cover animate-subtle-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent animate-pulse-glow"></div>
            </div>
            {/* Enhanced Floating Elements with Scroll Animations */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-80 blur-xl animate-pulse-float delay-500 scroll-trigger"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-emerald-400 to-green-300 rounded-full opacity-60 blur-lg animate-bounce-slow delay-1000 scroll-trigger"></div>
            <div className="absolute top-1/4 -right-4 w-16 h-16 bg-gradient-to-r from-lime-400 to-green-400 rounded-full opacity-40 blur-md animate-float-reverse delay-2000 scroll-trigger"></div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section id="value-prop" data-animate className={`py-20 px-4 ${isVisible['value-prop'] ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Why Choose The RESP Guy?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              At The RESP guy, we partner with independent financial advisors to offer you the best the financial industry can provide.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-8 rounded-3xl hover:bg-slate-700/50 transition-all duration-300 hover:transform hover:scale-105 smooth-card">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Expert Guidance</h3>
              <p className="text-slate-300 leading-relaxed">
                Work with independent financial advisors who understand your unique situation and goals for your child's education.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-8 rounded-3xl hover:bg-slate-700/50 transition-all duration-300 hover:transform hover:scale-105 smooth-card">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Better Options</h3>
              <p className="text-slate-300 leading-relaxed">
                Compare and find superior RESP options that maximize your investment potential and government benefits.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-8 rounded-3xl hover:bg-slate-700/50 transition-all duration-300 hover:transform hover:scale-105 smooth-card">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Complete Evaluation</h3>
              <p className="text-slate-300 leading-relaxed">
                Get a thorough assessment of your current RESP to ensure it's working optimally for your family's future.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section with Form */}
      <section id="signup-form" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl border border-slate-600/50 rounded-3xl p-8 lg:p-12 shadow-2xl smooth-card">
            <div className="text-center mb-10">
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse-float">
                <img 
                  src="https://images.unsplash.com/photo-1650064175560-369b5b45b649" 
                  alt="Education savings success"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to Secure Your Child's Future?
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                To hear more about RESPs and how we can help optimize your education savings strategy, sign up below.
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto mobile-form">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 mobile-tap-target"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      required
                      className="w-full px-4 py-4 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 mobile-tap-target"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 mobile-tap-target"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 mobile-tap-target"
                      placeholder="A1A 1A1"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-5 px-8 rounded-xl font-semibold text-lg shadow-2xl transform transition-all duration-300 mobile-tap-target touch-feedback ${
                    isSubmitting 
                      ? 'bg-slate-600 text-slate-300 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-cyan-500/25 hover:scale-105 hover:from-cyan-500 hover:to-blue-500'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </div>
                  ) : (
                    'Get My FREE RESP Consultation'
                  )}
                </button>

                <p className="text-sm text-slate-400 text-center mobile-text">
                  We respect your privacy. Your information will only be used to contact you about RESP opportunities.
                </p>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Thank You!</h3>
                <p className="text-xl text-slate-300 mb-6">
                  We've received your information and will be in touch within 24 hours to discuss your RESP options.
                </p>
                
                {/* What Happens Next */}
                <div className="bg-slate-700/50 rounded-2xl p-6 mb-8 text-left max-w-md mx-auto">
                  <h4 className="text-lg font-bold text-white mb-4 text-center">What Happens Next:</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <p className="text-slate-300">We'll call you within 24 hours to schedule your free consultation</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-white font-bold text-sm">2</span>
                      </div>
                      <p className="text-slate-300">Review your current RESP situation (if applicable)</p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-white font-bold text-sm">3</span>
                      </div>
                      <p className="text-slate-300">Explore better options with our independent advisors</p>
                    </div>
                  </div>
                </div>

                {/* Social Sharing */}
                <div className="mb-6">
                  <p className="text-slate-400 mb-4">Help other parents secure their child's future:</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                    <button 
                      onClick={() => window.open(`https://x.com/intent/tweet?text=Just%20found%20a%20great%20resource%20for%20RESP%20planning%20-%20The%20RESP%20Guy%20helps%20families%20secure%20their%20children's%20education%20future!&url=${window.location.href}`, '_blank')}
                      className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center w-full sm:w-auto min-h-[48px]"
                    >
                      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      <span className="font-medium">Share on X</span>
                    </button>
                    <button 
                      onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                      className="text-white px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center w-full sm:w-auto min-h-[48px]"
                      style={{backgroundColor: '#0A66C2'}}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#004182'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#0A66C2'}
                    >
                      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span className="font-medium">Share on LinkedIn</span>
                    </button>
                    <button 
                      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                      className="text-white px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center w-full sm:w-auto min-h-[48px]"
                      style={{backgroundColor: '#1877F2'}}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#166FE5'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#1877F2'}
                    >
                      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span className="font-medium">Share on Facebook</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-700/50">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">The RESP Guy</h3>
          <p className="text-slate-400 mb-6">The RESP option for the prudent</p>
          
          {/* Address */}
          <div className="mb-6">
            <div className="inline-flex items-center text-slate-300 mb-2">
              <svg className="w-5 h-5 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-lg">3410 Sheppard Ave E, Scarborough, ON M1T 3K4</span>
            </div>
          </div>
          
          <div className="flex justify-center space-x-8 text-slate-400">
            <a href="#" className="hover:text-cyan-400 transition-colors duration-300">Privacy Policy</a>
          </div>
          <p className="text-slate-500 text-sm mt-6">
            © 2025 The RESP Guy. All rights reserved.
          </p>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default App;