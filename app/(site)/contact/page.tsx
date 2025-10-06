import React from 'react'

function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 sm:px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
          <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get in touch with our water purification experts for personalized solutions and support
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form - Wider */}
          <div className="lg:col-span-2 space-y-8">
            <div className="border-l-4 border-blue-600 pl-8">
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Send us a Message
              </h2>
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-3">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-3">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-3">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                  >
                    <option value="">Select a topic</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="service-request">Service Request</option>
                    <option value="complaint">Complaint</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-3">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg resize-none"
                    placeholder="Tell us about your water purification needs, installation requirements, or any specific concerns you have..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 px-8 rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information - Sidebar */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="border-l-4 border-blue-600 pl-6">
              <h2 className="text-2xl font-light text-gray-900 mb-6">
                Get in Touch
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Call Us</h3>
                    <p className="text-gray-600 mt-2 text-base">+91-9876543210</p>
                    <p className="text-gray-600 text-base">+91-0123456789</p>
                    <p className="text-sm text-gray-500 mt-2">Mon-Sat, 9AM-6PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Email Us</h3>
                    <p className="text-gray-600 mt-2 text-base">support@puremyst.in</p>
                    <p className="text-gray-600 text-base">sales@puremyst.in</p>
                    <p className="text-sm text-gray-500 mt-2">We reply within 2 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">Visit Us</h3>
                    <p className="text-gray-600 mt-2 text-base leading-relaxed">
                      123 Business District<br />
                      Sector 45, Gurugram<br />
                      Haryana - 122001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Information */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Hours</h3>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex justify-between items-center py-2 border-b border-blue-100">
                  <span className="text-base">Monday - Saturday</span>
                  <span className="font-medium text-gray-900 text-base">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-100">
                  <span className="text-base">Sunday</span>
                  <span className="font-medium text-gray-900 text-base">Emergency Only</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-base">Technical Support</span>
                  <span className="font-medium text-gray-900 text-base">24/7 Available</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Emergency Service</h3>
              </div>
              <p className="text-gray-600 text-base mb-4 leading-relaxed">
                For urgent water purification issues outside business hours
              </p>
              <p className="text-red-600 font-semibold text-lg">+91-9876543210</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage