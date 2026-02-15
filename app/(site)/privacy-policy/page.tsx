import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy | PureMyst",
  description: "Read PureMyst's privacy policy to understand how we collect, use, and protect your personal information.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-white text-gray-900 font-sans pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-medium tracking-tight text-gray-900 sm:text-5xl mb-6">
            Privacy Policy
          </h1>
          <div className="text-gray-600 space-y-1">
            <p>Effective Date: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>Website: www.puremyst.in</p>
          </div>
        </div>

        {/* Introduction */}
        <div className="mb-12 text-lg text-gray-600 leading-relaxed">
          <p className="mb-4">
            At PureMyst, we respect your privacy and are committed to protecting any personal information you share with us. This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website or interact with our services.
          </p>
          <p>
            By using our website, you agree to the terms of this Privacy Policy.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">

          {/* 1. Information We Collect */}
          <section>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 mb-4">We may collect the following types of information:</p>

            <div className="ml-4 mb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">a) Personal Information</h3>
              <p className="text-gray-600 mb-2">When you fill out forms, contact us, or place inquiries, we may collect:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                <li>Name</li>
                <li>Phone number</li>
                <li>Email address</li>
                <li>City, state, or address</li>
                <li>Any other details you voluntarily provide</li>
              </ul>
            </div>

            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">b) Non-Personal Information</h3>
              <p className="text-gray-600 mb-2">Automatically collected data such as:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                <li>Browser type</li>
                <li>Device information</li>
                <li>IP address</li>
                <li>Pages visited</li>
                <li>Time spent on the site</li>
                <li>Referring website</li>
              </ul>
              <p className="text-gray-600 mt-2">This information is used only to improve website performance and user experience.</p>
            </div>
          </section>

          {/* 2. How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use the collected information to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
              <li>Respond to inquiries and customer support requests</li>
              <li>Process orders or service requests</li>
              <li>Improve our products, services, and website experience</li>
              <li>Send updates, offers, or product information (only if you choose to receive them)</li>
              <li>Maintain internal records and analytics</li>
              <li>Ensure website security and prevent fraud</li>
            </ul>
            <p className="text-gray-600 mt-4">We do not sell, rent, or trade your personal information to third parties.</p>
          </section>

          {/* 3. Cookies and Tracking Technologies */}
          <section>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">3. Cookies and Tracking Technologies</h2>
            <p className="text-gray-600 mb-4">Our website may use cookies and similar technologies to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
              <li>Understand user behavior</li>
              <li>Remember preferences</li>
              <li>Improve website functionality</li>
              <li>Analyze traffic and performance</li>
            </ul>
            <p className="text-gray-600 mt-4">You can choose to disable cookies in your browser settings, but some website features may not function properly.</p>
          </section>

          {/* 4. Sharing of Information */}
          <section>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">4. Sharing of Information</h2>
            <p className="text-gray-600 mb-4">We may share limited information only with:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
              <li>Service providers (website hosting, analytics tools, customer communication platforms)</li>
              <li>Logistics or fulfillment partners (if applicable)</li>
              <li>Legal or government authorities if required by law</li>
            </ul>
            <p className="text-gray-600 mt-4">All partners are required to keep your information confidential and secure.</p>
          </section>

          {/* 5. Data Security */}
          <section>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">5. Data Security</h2>
            <p className="text-gray-600 mb-4">PureMyst takes reasonable technical and organizational measures to protect your personal information against:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
              <li>Unauthorized access</li>
              <li>Alteration</li>
              <li>Disclosure</li>
              <li>Destruction</li>
            </ul>
            <p className="text-gray-600 mt-4">However, no online transmission or storage system is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          {/* 6. Third-Party Links */}
          <section>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">6. Third-Party Links</h2>
            <p className="text-gray-600">
              Our website may contain links to third-party platforms such as Amazon, Flipkart, or other external websites. Once you leave puremyst.in, we are not responsible for the privacy practices of those websites. Please review their respective privacy policies.
            </p>
          </section>

          {/* 7. Your Rights */}
          <section>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">7. Your Rights</h2>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-2">
              <li>Request access to your personal data</li>
              <li>Ask for correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Withdraw consent for marketing communications</li>
            </ul>
            <p className="text-gray-600 mt-4">To make such requests, contact us using the details below.</p>
          </section>

          {/* 8. Children’s Privacy */}
          <section>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">8. Children’s Privacy</h2>
            <p className="text-gray-600">
              Our website is not intended for children under the age of 13. We do not knowingly collect personal data from children.
            </p>
          </section>

          {/* 9. Changes to This Policy */}
          <section>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">9. Changes to This Policy</h2>
            <p className="text-gray-600 mb-4">
              PureMyst may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised effective date.
            </p>
            <p className="text-gray-600">
              We encourage you to review this policy periodically.
            </p>
          </section>

          {/* 10. Contact Us */}
          <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <h2 className="text-2xl font-medium text-gray-900 mb-6">10. Contact Us</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about this Privacy Policy or how your data is handled, please contact us:
            </p>
            <div className="space-y-3 text-gray-700">
              <p className="font-medium">PureMyst</p>
              <p className="flex items-center">
                <span className="w-24 text-gray-500">Email:</span>
                <a href="mailto:support@puremyst.in" className="text-blue-600 hover:text-blue-700">support@puremyst.in</a>
              </p>
              <p className="flex items-center">
                <span className="w-24 text-gray-500">Phone:</span>
                <span>[Your support number]</span>
              </p>
              <p className="flex items-center">
                <span className="w-24 text-gray-500">Website:</span>
                <a href="https://www.puremyst.in" className="text-blue-600 hover:text-blue-700">www.puremyst.in</a>
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}