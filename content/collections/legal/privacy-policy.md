---
meta:
  title: Privacy policy
tags:
  - legal
---

## Introduction

DecapBridge ("we", "us", "our") is operated by Millisecond Studio. This privacy policy explains what personal data we collect, how we use it, and your rights regarding that data.

By using DecapBridge, you agree to the practices described in this policy.

## Data We Collect

**Account information**: When you create an account, we collect your email address. First name, last name, and profile picture are optional and used within the CMS interface and optionally in Git commit metadata.

**Git access tokens**: To connect your Git repository, you must provide a personal access token from your Git provider (GitHub or GitLab). This token is stored encrypted using AES-256-GCM encryption and is never exposed in plain text.

**Collaborator emails**: When you invite collaborators to your site, we store their email addresses to manage access.

**Contact form**: When you contact us, we collect your name, email address, and message content.

**Analytics**: We use a self-hosted instance of [Umami](https://umami.is/), a privacy-friendly analytics tool. It collects anonymous data such as pages visited and session duration. No personal data is collected, no cookies are used, and data never leaves our own servers.

## Third-Party Services

Depending on your plan and configuration, we interact with the following third parties:

- **GitHub or GitLab**: Required to connect your site's repository. Your access token is used to proxy Git operations on behalf of your collaborators through our gateway service.
- **Stripe**: Used for payment processing on paid plans. If you subscribe to a paid plan, your billing information is handled directly by Stripe. We store only your Stripe customer ID. Stripe's privacy policy applies: [stripe.com/privacy](https://stripe.com/privacy).
- **Google / Microsoft**: If you configure SSO login (PKCE flow) for your site, your collaborators may authenticate via Google or Microsoft. Their respective privacy policies apply.
- **Mailgun**: We use Mailgun to send transactional emails, including account setup, password reset, and collaborator invitation emails. Your email address is transmitted to Mailgun for this purpose. Mailgun's privacy policy applies: [mailgun.com/privacy-policy](https://www.mailgun.com/privacy-policy/).

We do not sell, rent, or trade your personal information with any third parties beyond what is described above.

## Data Retention and Deletion

We retain your data for as long as your account is active. When you delete your account, all associated personal data (including your profile information, stored access tokens, and collaborator records) is permanently deleted from our systems.

You may request deletion of your data at any time by contacting us, even if you do not delete your account.

## Your Rights

Depending on where you are located, you may have the right to:

- Access the personal data we hold about you
- Correct inaccurate data
- Request deletion of your data
- Request a copy of your data in a portable format
- Withdraw consent where processing is based on consent

To exercise any of these rights, contact us at the address below.

## Data Security

We use industry-standard security practices to protect your data, including encrypted storage of sensitive credentials and HTTPS for all data in transit. No method of transmission or storage is 100% secure, and we cannot guarantee absolute security.

## Changes to This Policy

We may update this policy from time to time. When we do, we will update the effective date below. We encourage you to review this page periodically.

## Contact

For any privacy-related questions or requests: hello@decapbridge.com

Effective Date: 2026-01-01
