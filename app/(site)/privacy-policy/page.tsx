import React from 'react'

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 sm:px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
          <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your privacy is important to us. Learn how PureMyst protects and manages your personal information.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content - Takes 2/3 width */}
          <div className="lg:col-span-2 space-y-12">
            {/* Introduction */}
            <div className="border-l-4 border-blue-600 pl-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-sm font-medium">1</span>
                </div>
                <h2 className="text-2xl font-light text-gray-900">Introduction</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-lg">
                <p>
                  At PureMyst, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or purchase our products.
                </p>
                <p>
                  By using our website and services, you consent to the practices described in this policy. We may update this policy 
                  periodically, and we encourage you to review it regularly.
                </p>
              </div>
            </div>

            {/* Information We Collect */}
            <div className="border-l-4 border-blue-600 pl-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-sm font-medium">2</span>
                </div>
                <h2 className="text-2xl font-light text-gray-900">Information We Collect</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-6 text-lg">
                <p>We collect information to provide better services to our customers:</p>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-medium text-gray-900 mb-3">Personal Information</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                      <li>Name, email address, and phone number</li>
                      <li>Shipping and billing addresses</li>
                      <li>Payment information (processed securely through our payment partners)</li>
                      <li>Product preferences and purchase history</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-medium text-gray-900 mb-3">Technical Information</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                      <li>IP address and browser type</li>
                      <li>Device information and operating system</li>
                      <li>Website usage data through cookies and analytics</li>
                      <li>Location data (for delivery purposes)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="border-l-4 border-blue-600 pl-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-sm font-medium">3</span>
                </div>
                <h2 className="text-2xl font-light text-gray-900">How We Use Your Information</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-lg">
                <p>We use the collected information for the following purposes:</p>
                <ul className="list-disc list-inside space-y-3 text-gray-600 ml-4">
                  <li>Process and fulfill your orders for water purification systems</li>
                  <li>Schedule installation and service appointments</li>
                  <li>Provide customer support and technical assistance</li>
                  <li>Send important updates about your orders and services</li>
                  <li>Improve our products, services, and website experience</li>
                  <li>Send marketing communications (only with your consent)</li>
                  <li>Comply with legal obligations and prevent fraud</li>
                </ul>
              </div>
            </div>

            {/* Data Sharing & Disclosure */}
            <div className="border-l-4 border-blue-600 pl-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-sm font-medium">4</span>
                </div>
                <h2 className="text-2xl font-light text-gray-900">Data Sharing & Disclosure</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-lg">
                <p>
                  We do not sell your personal information to third parties. We may share your information with:
                </p>
                <ul className="list-disc list-inside space-y-3 text-gray-600 ml-4">
                  <li><strong>Service Providers:</strong> Logistics partners for delivery and installation</li>
                  <li><strong>Payment Processors:</strong> Secure payment gateways for transaction processing</li>
                  <li><strong>Technical Support:</strong> Authorized service technicians for maintenance</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                </ul>
                <p>
                  All third-party partners are contractually obligated to protect your information and use it only for the services they provide.
                </p>
              </div>
            </div>

            {/* Data Security */}
            <div className="border-l-4 border-blue-600 pl-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-sm font-medium">5</span>
                </div>
                <h2 className="text-2xl font-light text-gray-900">Data Security</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-lg">
                <p>
                  We implement appropriate security measures to protect your personal information, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure payment processing</li>
                  <li>Regular security assessments</li>
                  <li>Limited access to personal data</li>
                  <li>Employee privacy training</li>
                </ul>
              </div>
            </div>

            {/* Policy Updates */}
            <div className="border-l-4 border-blue-600 pl-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-sm font-medium">6</span>
                </div>
                <h2 className="text-2xl font-light text-gray-900">Policy Updates</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-lg">
                <p>
                  We may update this privacy policy to reflect changes in our practices or legal requirements. 
                  Significant changes will be notified via email or website notice.
                </p>
                <div className="text-sm text-gray-500 bg-yellow-50 p-3 rounded-lg">
                  <strong>Last Updated:</strong> October 2025
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Takes 1/3 width - Only Your Rights and Contact Us */}
          <div className="space-y-8">
            {/* Your Rights */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-xl font-light text-gray-900">Your Rights</h2>
              </div>
              <div className="text-gray-600 space-y-4 text-base">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to data processing</li>
                  <li>Data portability</li>
                  <li>Withdraw consent</li>
                </ul>
                <div className="text-sm text-blue-600 font-medium">
                  Contact us to exercise any of these rights.
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h2 className="text-lg font-light text-gray-900 mb-4">Contact Us</h2>
              <div className="text-gray-600 mb-4 space-y-3 text-base">
                <p>
                  For privacy-related questions or to exercise your rights:
                </p>
                <div className="flex items-center text-blue-600 font-medium mt-3">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  privacy@puremyst.in
                </div>
                <div className="flex items-center text-blue-600 font-medium">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91-XXXXXXXXXX
                </div>
              </div>
              <div className="text-sm text-gray-500">
                <strong>Response Time:</strong> We respond to privacy inquiries within 48 hours.
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <h3 className="text-lg font-light text-gray-900 mb-4">Additional Information</h3>
          <div className="text-gray-600 text-base space-y-3">
            <p>• We retain personal data only as long as necessary for the purposes collected</p>
            <p>• Cookies help us improve website functionality - you can manage preferences in your browser</p>
            <p>• We do not knowingly collect information from children under 16 without parental consent</p>
            <p>• International data transfers follow applicable privacy laws and safeguards</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} PureMyst. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            This privacy policy is compliant with applicable data protection regulations.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy