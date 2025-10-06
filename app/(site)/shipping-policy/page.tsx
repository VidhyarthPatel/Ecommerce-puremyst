export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 sm:px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
          <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-4">
            Shipping Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive delivery information for your PureMyst water purification systems
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content - Takes 2/3 width */}
          <div className="lg:col-span-2 space-y-10">
            {/* Order Processing */}
            <div className="border-l-4 border-blue-600 pl-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-sm font-medium">1</span>
                </div>
                <h2 className="text-2xl font-light text-gray-900">Order Processing</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-lg">
                <p>
                  All orders are processed within <span className="font-medium text-gray-900">1–2 business days</span> from the time of order confirmation. 
                  Our team carefully verifies each order to ensure accuracy and completeness before dispatch.
                </p>
                <p>
                  During peak seasons or promotional periods, processing may take up to 3 business days. 
                  You'll receive an order confirmation email immediately after purchase, followed by a shipping confirmation with tracking details once your water purifier has been dispatched from our warehouse.
                </p>
                <div className="text-base text-gray-500 bg-blue-50 p-4 rounded-xl">
                  <strong>Note:</strong> Orders placed after 2 PM IST or on weekends/public holidays will be processed on the next business day.
                </div>
              </div>
            </div>

            {/* Shipping Duration */}
            <div className="border-l-4 border-blue-600 pl-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-sm font-medium">2</span>
                </div>
                <h2 className="text-2xl font-light text-gray-900">Delivery Timeline</h2>
              </div>
              <div className="text-gray-600 space-y-6 text-lg">
                <p>
                  Delivery times are calculated from the date of dispatch and vary based on your location and product availability. 
                  Our logistics partners ensure safe and timely delivery of your water purification system.
                </p>
                <div className="space-y-4 bg-gray-50 p-6 rounded-xl">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-medium text-base">Metro Cities</span>
                    <span className="font-semibold text-blue-600 text-base">3-5 business days</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-medium text-base">Tier 2 & 3 Cities</span>
                    <span className="font-semibold text-blue-600 text-base">5-7 business days</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-medium text-base">Remote & Rural Areas</span>
                    <span className="font-semibold text-blue-600 text-base">7-10 business days</span>
                  </div>
                </div>
                <div className="text-base text-gray-500">
                  <strong>Important:</strong> These timelines are estimates and may vary due to unforeseen circumstances. 
                  Installation scheduling for complex systems may require additional coordination.
                </div>
              </div>
            </div>

            {/* Order Tracking */}
            <div className="border-l-4 border-blue-600 pl-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-sm font-medium">3</span>
                </div>
                <h2 className="text-2xl font-light text-gray-900">Order Tracking</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-lg">
                <p>
                  Once your order is dispatched, you'll receive a tracking number via email and SMS. 
                  Use this to monitor your water purifier's journey in real-time through our partner courier's platform.
                </p>
                <p>
                  Our tracking system provides detailed updates including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Package picked up from warehouse</li>
                  <li>In-transit updates with location</li>
                  <li>Out for delivery notification</li>
                  <li>Successful delivery confirmation</li>
                </ul>
                <div className="text-base text-gray-500">
                  If you don't receive tracking information within 3 business days, please check your spam folder or contact our support team.
                </div>
              </div>
            </div>

            {/* Delivery Issues */}
            <div className="border-l-4 border-blue-600 pl-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-sm font-medium">4</span>
                </div>
                <h2 className="text-2xl font-light text-gray-900">Delivery Issues</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-lg">
                <p>
                  While we work with trusted logistics partners, occasional delays may occur due to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Weather conditions or natural disasters</li>
                  <li>Transportation strikes or road closures</li>
                  <li>Customs clearance (for international shipments)</li>
                  <li>Incorrect address provided</li>
                  <li>Recipient unavailable during delivery attempts</li>
                </ul>
                <p>
                  For failed delivery attempts, our courier partner will typically make 2 additional attempts. 
                  After 3 failed attempts, the package will be returned to our facility, and restocking fees may apply.
                </p>
              </div>
            </div>

            {/* Installation Services */}
            <div className="border-l-4 border-blue-600 pl-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-sm font-medium">5</span>
                </div>
                <h2 className="text-2xl font-light text-gray-900">Installation Services</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-lg">
                <p>
                  Most PureMyst water purifiers include professional installation service. 
                  Our certified technicians will contact you within 24 hours of delivery to schedule the installation at your convenience.
                </p>
                <p>
                  Installation typically takes 1-2 hours and includes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Complete system setup and testing</li>
                  <li>Water quality check and system calibration</li>
                  <li>Operation guidance and maintenance tips</li>
                  <li>Warranty registration assistance</li>
                </ul>
                <div className="text-base text-gray-500">
                  Please ensure an adult (18+) is present during both delivery and installation.
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Takes 1/3 width - Only Cards */}
          <div className="space-y-10">
            {/* Shipping Charges */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-light text-gray-900">Shipping Charges</h2>
              </div>
              <div className="text-gray-600 space-y-4 text-base">
                <p>
                  We offer <span className="font-medium text-blue-600">free standard shipping</span> on all orders above ₹999. 
                  This includes delivery to your doorstep and basic handling.
                </p>
                <p>
                  For orders below ₹999, a nominal delivery fee of ₹99 applies. 
                  Additional charges may apply for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Express delivery (next-day service)</li>
                  <li>Special handling for large commercial systems</li>
                  <li>Delivery to difficult-to-access locations</li>
                </ul>
                <div className="text-sm text-blue-600 font-medium">
                  All applicable charges are clearly displayed during checkout before payment.
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h2 className="text-lg font-light text-gray-900 mb-4">Customer Support</h2>
              <div className="text-gray-600 mb-4 space-y-3 text-base">
                <p>
                  Our dedicated support team is available to assist with any shipping-related queries:
                </p>
                <div className="flex items-center text-blue-600 font-medium mt-3">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  support@puremyst.in
                </div>
                <div className="flex items-center text-blue-600 font-medium">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91-XXXXXXXXXX
                </div>
              </div>
              <div className="text-sm text-gray-500">
                <strong>Response Time:</strong> We typically respond to all queries within 2-4 business hours during our operating hours (9 AM - 6 PM, Monday to Saturday).
              </div>
            </div>
          </div>
        </div>

        {/* Additional Important Notes */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <h3 className="text-lg font-light text-yellow-800 mb-4">Important Notes</h3>
          <div className="text-yellow-700 text-base space-y-3">
            <p>• Please inspect your water purifier upon delivery and report any visible damage within 24 hours</p>
            <p>• Keep your order number handy for all customer service communications</p>
            <p>• Delivery timelines may be extended during festival seasons and national holidays</p>
            <p>• Some remote locations may require additional delivery time and coordination</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Last updated: October 2025 • © {new Date().getFullYear()} PureMyst. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            PureMyst reserves the right to modify this shipping policy at any time without prior notice.
          </p>
        </div>
      </div>
    </div>
  );
}