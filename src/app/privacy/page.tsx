import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-valoriya-blue-600 hover:text-valoriya-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold gradient-text mb-2">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Privacy Matters</CardTitle>
            <CardDescription>
              This privacy policy describes how Valoriya Service collects, uses, and protects your information.
            </CardDescription>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
              <p className="mb-4">
                When you register for an account, we collect:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Email address</li>
                <li>Display name</li>
                <li>Roblox username (when linked)</li>
                <li>Payment information (processed securely by Stripe)</li>
              </ul>

              <h3 className="text-lg font-semibold mb-2">Service Usage Data</h3>
              <p className="mb-4">
                We automatically collect information about how you use our service:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>API requests and responses</li>
                <li>Ranking activities and statistics</li>
                <li>Login and session information</li>
                <li>Error logs and debugging information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide and maintain our ranking services</li>
                <li>Process payments and manage subscriptions</li>
                <li>Send important service updates and notifications</li>
                <li>Provide customer support</li>
                <li>Improve our service and develop new features</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
              <p className="mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Service Providers:</strong> We may share information with trusted third parties who assist us in operating our service (e.g., payment processing, hosting)</li>
                <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In the event of a merger or acquisition, user information may be transferred</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <p className="mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication using Firebase Auth</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and monitoring</li>
                <li>Secure payment processing through Stripe</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
              <p className="mb-4">
                We retain your information for as long as your account is active or as needed to provide you services. 
                You may request deletion of your account and associated data at any time through your account settings 
                or by contacting support.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your account and data</li>
                <li>Object to processing of your information</li>
                <li>Data portability (receive a copy of your data)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Cookies and Tracking</h2>
              <p className="mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Maintain your login session</li>
                <li>Remember your preferences</li>
                <li>Analyze service usage and performance</li>
                <li>Provide personalized experience</li>
              </ul>
              <p className="mb-4">
                You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Third-Party Services</h2>
              <p className="mb-4">
                Our service integrates with third-party platforms:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Roblox:</strong> For group management and user verification</li>
                <li><strong>Firebase:</strong> For authentication and data storage</li>
                <li><strong>Stripe:</strong> For payment processing</li>
                <li><strong>Discord:</strong> For community support and notifications</li>
              </ul>
              <p className="mb-4">
                These services have their own privacy policies that govern their use of your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
              <p className="mb-4">
                Our service is not intended for children under 13 years of age. We do not knowingly collect 
                personal information from children under 13. If you are a parent or guardian and believe 
                your child has provided us with personal information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. International Users</h2>
              <p className="mb-4">
                Our service is hosted in the United States. If you are accessing our service from outside 
                the United States, please be aware that your information may be transferred to, stored, 
                and processed in the United States.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Changes to Privacy Policy</h2>
              <p className="mb-4">
                We may update this privacy policy from time to time. We will notify you of any changes 
                by posting the new privacy policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this privacy policy or our data practices, please contact us:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Through our Discord server</li>
                <li>Via the contact form on our website</li>
                <li>By email at privacy@valoriya.service</li>
              </ul>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}