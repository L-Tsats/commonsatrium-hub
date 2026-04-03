export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="page-card mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-lg md:p-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-black">Legal</p>
        <h1 className="mt-2 text-3xl font-semibold">Privacy Policy — YT.IG.TT Focus</h1>
        <p className="mt-2 text-sm text-black">Last updated: April 2026</p>

        <p className="mt-6 leading-7 text-black">
          This privacy policy describes how the YT.IG.TT Focus browser extension
          (&quot;the Extension&quot;) handles user data. The Extension is published by
          Commons Atrium and connects to hub.commonsatrium.com for membership
          verification only.
        </p>

        {/* Data stored locally */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold">Data stored locally on your device</h2>
          <p className="mt-3 leading-7 text-black">
            All of the following data is stored locally on your device using
            chrome.storage.local. None of it is transmitted to any server unless
            explicitly stated below.
          </p>
          <ul className="mt-4 space-y-2 text-black">
            <li className="rounded-xl bg-gray-50 px-4 py-3">User settings (session length, cooldown duration, daily session limits)</li>
            <li className="rounded-xl bg-gray-50 px-4 py-3">Session state (active session timers, watch time budgets, cooldown timestamps)</li>
            <li className="rounded-xl bg-gray-50 px-4 py-3">Video queue data (YouTube queue items, next-session queue)</li>
            <li className="rounded-xl bg-gray-50 px-4 py-3">Local analytics (rolling window of last 50 sessions — watch time, continuation rate, regret responses)</li>
            <li className="rounded-xl bg-gray-50 px-4 py-3">Password hash and recovery code hash for the settings page</li>
            <li className="rounded-xl bg-gray-50 px-4 py-3">Membership access key (a UUID string)</li>
          </ul>
        </div>

        {/* Data sent to a remote server */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold">Data sent to a remote server</h2>
          <p className="mt-3 leading-7 text-black">
            The only data transmitted externally is your membership access key (a UUID
            string). It is sent to two endpoints on hub.commonsatrium.com:
          </p>
          <ul className="mt-4 space-y-2 text-black">
            <li className="rounded-xl bg-gray-50 px-4 py-3">
              <span className="font-medium">Activation</span> — sent once to
              hub.commonsatrium.com/api/access-key/activate when you first enter your
              access key in the extension
            </li>
            <li className="rounded-xl bg-gray-50 px-4 py-3">
              <span className="font-medium">Verification</span> — sent to
              hub.commonsatrium.com/api/access-key/verify approximately every 6 hours
              to confirm your membership is still active
            </li>
          </ul>
          <p className="mt-4 leading-7 text-black">
            No other data is transmitted. No browsing history, no personal information,
            no usage analytics, no video titles, and no watch history are ever sent
            anywhere.
          </p>
        </div>

        {/* Data NOT collected */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold">Data not collected</h2>
          <p className="mt-3 leading-7 text-black">The Extension does not collect:</p>
          <ul className="mt-4 space-y-2 text-black">
            <li className="rounded-xl bg-gray-50 px-4 py-3">Personally identifiable information beyond the email returned by the activation API (displayed once, not stored by the extension)</li>
            <li className="rounded-xl bg-gray-50 px-4 py-3">Browsing activity or history</li>
            <li className="rounded-xl bg-gray-50 px-4 py-3">Video watch history or titles</li>
            <li className="rounded-xl bg-gray-50 px-4 py-3">Cookies or authentication tokens from YouTube, Instagram, or TikTok</li>
          </ul>
          <p className="mt-4 leading-7 text-black">
            No data is sold, shared with, or disclosed to any third party.
          </p>
        </div>

        {/* Website access */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold">Website access</h2>
          <p className="mt-3 leading-7 text-black">
            The Extension injects content scripts on youtube.com, instagram.com, and
            tiktok.com solely to display session management UI (timers, panels,
            overlays) and enforce time limits. It does not read, collect, or transmit
            any content from these sites.
          </p>
        </div>

        {/* Third-party services */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold">Third-party services</h2>
          <p className="mt-3 leading-7 text-black">
            The only external service contacted by the Extension is
            hub.commonsatrium.com, operated by Commons Atrium, for membership key
            activation and verification. No other third-party services are used.
          </p>
        </div>

        {/* Contact */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold">Contact</h2>
          <p className="mt-3 leading-7 text-black">
            For privacy-related inquiries, contact us at{" "}
            <a href="mailto:support@commonsatrium.com" className="font-medium underline underline-offset-4">
              support@commonsatrium.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
