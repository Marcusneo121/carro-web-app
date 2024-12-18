import React from "react";
import MainDiv from "@/components/MainDiv";

const PrivacyPolicy = () => {
  return (
    <MainDiv className="">
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>
        <p className="mb-4">Effective date: 10/25/2021</p>

        <section className="mb-6 space-y-2">
          <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
          <p>
            These Privacy Policy (“Privacy Policy”) apply to the use of the
            website and products provided by (hereinafter also referred as “we”
            or “us”).
          </p>
          <p>
            This Privacy Policy applies and has effect in respect of all
            services and other products, software, made available by us, as well
            as any other online features relating to the website and its content
            (the “Service(s)”).
          </p>
          <p>
            If you have any questions or comments about this Privacy Policy,
            please contact us at{" "}
            <a
              href="mailto:makerlabstudiomy@gmail.com"
              className="text-blue-600"
            >
              makerlabstudiomy@gmail.com
            </a>
            .
          </p>
          <p>
            We are committed to protecting and respecting your privacy. This
            Privacy Policy explains the basis on which personal information we
            collect from you will be processed by us or on our behalf.
          </p>
          <p>
            We encourage you to read this Privacy Policy carefully as it
            contains important information about:
          </p>
          <ul className="ml-8 list-disc">
            <li>What information we may collect about you;</li>
            <li>How we will use the information we collect about you;</li>
            <li>Whether we will disclose your details to anyone else; and</li>
            <li>
              Your choices and rights regarding the personal information you
              have provided to us.
            </li>
          </ul>
          <p>
            We may make changes to this Privacy Policy in the future. You should
            check this page from time to time to ensure you are aware of any
            changes. Where appropriate, we may notify you of such changes.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">
            2. Payment and Card Processing
          </h2>
          <p>
            We do not store any credit card information on our server. All
            payments are processed by world-leading payment gateways Stripe, and
            our site is secured by SSL encryption.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">
            3. Information We May Collect About You
          </h2>
          <p>
            We collect and process the following information, which may include
            your personal data: Your name, last name, and email address you
            supply to us and information provided by you when using the Service
            or website.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">
            4. Collecting, Processing, and Using Personal Data
          </h2>
          <p>
            We only store and process your personal data when you have
            voluntarily supplied us with it, such as by filling in a contact
            form or signing up for a product purchase.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">
            5. Why We Collect Information About You – Purpose of Processing
          </h2>
          <p>
            We will use information about you for delivering our Services to you
            under the terms of use agreed between us. The processing of
            information is necessary for us to provide you the Service properly
            and to ensure the features function properly.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">
            6. Cookies and Web Beacons
          </h2>
          <p>
            We use cookies to make the use of our website easier for you.
            Cookies store information such as visitors’ preferences and optimize
            users’ experiences. Cookies can be opted-out by you, but doing so
            may limit functionality.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">
            7. Children Personal Data
          </h2>
          <p>
            We do not collect personal information from anyone under the age of
            18. If you notice we collect and process such data, please contact
            us.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">8. Data Sharing</h2>
          <p>
            We will share your information (including personal data) with third
            parties only in the ways described in this Privacy Policy.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">9. Data Transmission</h2>
          <p>
            Your data is transmitted safely using encryption. We secure our
            systems against unauthorized access, changes, or dissemination of
            your data.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">
            10. Your Rights and Delete Your Data
          </h2>
          <p>
            You have the right to access and delete your data. Please contact us
            at{" "}
            <a
              href="mailto:makerlabstudiomy@gmail.com"
              className="text-blue-600"
            >
              makerlabstudiomy@gmail.com
            </a>
            .
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold">
            11. Changes to This Privacy Policy
          </h2>
          <p>
            This Privacy Policy may be updated from time to time. If there are
            any material changes, a notice will be posted on the website.
          </p>
        </section>
      </div>
    </MainDiv>
  );
};

export default PrivacyPolicy;
