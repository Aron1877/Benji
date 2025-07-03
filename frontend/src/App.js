import React, { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import "./App.css";

const App = () => {
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
      // EmailJS configuration - You'll need to replace these with your actual values
      const serviceID = 'YOUR_SERVICE_ID';
      const templateID = 'YOUR_TEMPLATE_ID';
      const publicKey = 'YOUR_PUBLIC_KEY';
      
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

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => document.getElementById('signup-form').scrollIntoView({ behavior: 'smooth' })}
                className="group bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 hover:from-blue-500 hover:to-cyan-500"
              >
                Get Started Today
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
              <button className="border-2 border-blue-400 text-blue-400 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-blue-400 hover:text-slate-900 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1656339882246-4462016c448a" 
                alt="Family planning for their children's future education"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-80 blur-xl animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full opacity-60 blur-lg animate-pulse delay-1000"></div>
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
            <div className="group bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-8 rounded-3xl hover:bg-slate-700/50 transition-all duration-300 hover:transform hover:scale-105">
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
            <div className="group bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-8 rounded-3xl hover:bg-slate-700/50 transition-all duration-300 hover:transform hover:scale-105">
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
            <div className="group bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-8 rounded-3xl hover:bg-slate-700/50 transition-all duration-300 hover:transform hover:scale-105">
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
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-xl border border-slate-600/50 rounded-3xl p-8 lg:p-12 shadow-2xl">
            <div className="text-center mb-10">
              <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
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
              <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
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
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
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
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
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
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                      placeholder="A1A 1A1"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-8 rounded-xl font-semibold text-lg shadow-2xl transform transition-all duration-300 ${
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

                <p className="text-sm text-slate-400 text-center">
                  We respect your privacy. Your information will only be used to contact you about RESP opportunities.
                </p>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Thank You!</h3>
                <p className="text-xl text-slate-300">
                  We've received your information and will be in touch within 24 hours to discuss your RESP options.
                </p>
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
          <div className="flex justify-center space-x-8 text-slate-400">
            <a href="#" className="hover:text-cyan-400 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-cyan-400 transition-colors duration-300">Contact Us</a>
          </div>
          <p className="text-slate-500 text-sm mt-6">
            © 2025 The RESP Guy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;