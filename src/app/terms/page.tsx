import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-valoriya-blue-600 hover:text-valoriya-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold gradient-text mb-2">Terms of Service</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome to Valoriya Service</CardTitle>
            <CardDescription>
              These terms and conditions outline the rules and regulations for the use of Valoriya Service.
            </CardDescription>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using Valoriya Service, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
              <p className="mb-4">
                Valoriya Service provides automated ranking tools for Roblox groups, including but not limited to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Automatic player ranking based on applications</li>
                <li>Gamepass-based ranking systems</li>
                <li>Activity tracking and analytics</li>
                <li>Discord integration tools</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
              <p className="mb-4">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
                You are responsible for safeguarding the password and all activities that occur under your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Subscription and Payment</h2>
              <p className="mb-4">
                Our service operates on a subscription basis. By subscribing, you agree to pay the applicable fees as described 
                on our pricing page. Subscriptions automatically renew unless cancelled.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Prohibited Uses</h2>
              <p className="mb-4">You may not use our service:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>For any unlawful purpose or to solicit others to perform illegal acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material</li>
                <li>To impersonate or attempt to impersonate the company, employees, other users, or any other person or entity</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Privacy Policy</h2>
              <p className="mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, 
                to understand our practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
              <p className="mb-4">
                We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, 
                under our sole discretion, for any reason whatsoever including but not limited to a breach of the Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Disclaimer</h2>
              <p className="mb-4">
                The information on this service is provided on an "as is" basis. To the fullest extent permitted by law, this Company:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Excludes all representations and warranties relating to this service and its contents</li>
                <li>Does not guarantee the service will be available at all times</li>
                <li>Excludes all liability for damages arising out of or in connection with your use of this service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to update these terms at any time. When we do, we will revise the updated date at the top of this page. 
                We encourage users to frequently check this page for any changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms of Service, please contact us through our Discord server or support email.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}