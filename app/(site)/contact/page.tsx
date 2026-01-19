import React from 'react';

export default function ContactPage() {
  return (
    <div className="bg-white text-gray-900 font-sans pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl font-medium tracking-tight text-gray-900 sm:text-5xl mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We’re here to help. Whether you have a question about our products, need support, or want to partner with PureMyst, feel free to get in touch with us.
          </p>
          <p className="text-lg text-gray-600 mt-4">
            Our team is always happy to assist you.
          </p>
        </div>

        {/* Contact Details Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

          {/* Email */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300 group">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
              <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600 mb-4 text-sm">For product inquiries, support, or partnerships:</p>
            <a href="mailto:support@puremyst.in" className="text-blue-600 font-medium hover:text-blue-700 text-lg">
              support@puremyst.in
            </a>
          </div>

          {/* Phone / WhatsApp */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300 group">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
              <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Phone / WhatsApp Support</h3>
            <p className="text-gray-600 mb-1 font-medium">Customer Care:</p>
            <p className="text-gray-900 text-lg font-medium mb-2">+91-XXXXXXXXXX</p>
            <p className="text-gray-500 text-sm">
              (Monday to Saturday | 10:00 AM – 6:00 PM)
            </p>
          </div>

          {/* Office Address */}
          <div className="md:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300 group flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors duration-300">
              <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Office Address</h3>
              <div className="text-gray-600 leading-relaxed">
                <p className="font-medium text-gray-900">PureMyst</p>
                <p>[Your office address]</p>
                <p>[City, State, PIN Code]</p>
                <p>India</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}