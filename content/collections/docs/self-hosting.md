---
meta:
  title: Self-Hosting
---

# Self-Hosting DecapBridge

You're looking to self-host a version of DecapBridge on your own infrastructure? Start here!

## Example configuration

See the [decapbridge/decapbridge-self-hosted-examples](https://github.com/decapbridge/decapbridge-self-hosted-examples) repository for more details.

## Requirements:

Before delving into this, have a look at the requirements for hosting your own instance of DecapBridge:

In short:

| Requirement                                                         | Required           |
| ------------------------------------------------------------------- | ------------------ |
| [Self-Hosting key](#self-hosting-key) for commercial use-cases      | Yes for commercial |
| [Container hosting](#hosting-requirements) for running the services | Yes                |
| [Domain name](#domain-name) with ability to add subdomains          | Yes                |
| [SSL-enabled reverse-proxy](#ssl-reverse-proxy), as HTTPS is a must | Highly recommended |
| [Email](#email) setup for email invites                             | Optional           |
| [SSO login](#sso-login) credentials                                 | Optional           |

See below for details on each item:

#### Self-Hosting key

If you are looking to self-host DecapBridge in a commercial setting, you need to acquire a license, which you can get by purchasing the ["Lifetime pro" plan](/#pricing). If this is for an open-source or non-profit project, [get in touch](/contact) and I will provide you with a free key.

After purchasing, you will receive a license key by email. Set it as an environment variable in your API container:

```env
DECAPBRIDGE_LICENSE_KEY=key-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.xxxxxxxxxxxxxx
```

#### Hosting Requirements

To host the various DecapBridge services, you will need a container orchestration setup that can run multiple Docker containers:

- A PostgreSQL container
- An instance of the DecapBridge front-end, which can be customized to match your brand appearance
- An instance of the DecapBridge backend API
- An instance of the DecapBridge multi-tenant Gateway

#### Domain name

You will need 3 new subdomains, ex:

- auth-ui.mycompany.com
- auth-api.mycompany.com
- auth-gateway.mycompany.com

#### SSL reverse proxy

Without HTTPS, you risk exposing your passwords and git tokens when using the UI, so this is basically obligatory, unless you operate entirely within a secure network and the services are accessible only on that network or through a VPN.

#### Email

Invite links can be copied directly from the dashboard and shared manually. If you'd like collaborators to receive email notifications when invited, configure one of the following transports via the `EMAIL_TRANSPORT` environment variable in your API container.

**SMTP** (`EMAIL_TRANSPORT=smtp`)

Works with any SMTP-compatible provider (Postmark, SendGrid, Brevo, Resend, your own mail server, etc.):

```env
EMAIL_TRANSPORT=smtp
EMAIL_FROM=no-reply@mycompany.com
EMAIL_SMTP_HOST=smtp.example.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USER=your-smtp-user
EMAIL_SMTP_PASSWORD=your-smtp-password
EMAIL_SMTP_SECURE=false
```

**Mailgun** (`EMAIL_TRANSPORT=mailgun`)

```env
EMAIL_TRANSPORT=mailgun
EMAIL_FROM=no-reply@mycompany.com
EMAIL_MAILGUN_API_KEY=your-mailgun-api-key
EMAIL_MAILGUN_DOMAIN=mg.mycompany.com
```

**AWS SES** (`EMAIL_TRANSPORT=ses`)

```env
EMAIL_TRANSPORT=ses
EMAIL_FROM=no-reply@mycompany.com
EMAIL_SES_REGION=us-east-1
EMAIL_SES_CREDENTIALS__ACCESS_KEY_ID=your-access-key-id
EMAIL_SES_CREDENTIALS__SECRET_ACCESS_KEY=your-secret-access-key
```

**Sendmail** (`EMAIL_TRANSPORT=sendmail`)

Uses the system's sendmail binary. Only practical if your container has a local MTA configured:

```env
EMAIL_TRANSPORT=sendmail
EMAIL_FROM=no-reply@mycompany.com
```

See the [Directus email configuration docs](https://directus.io/docs/configuration/email) for the full reference.

#### SSO login

SSO is handled by Directus's built-in OpenID Connect support. To enable it, register an OAuth app with your provider, then pass the credentials as environment variables in your API container.

See the [Directus SSO configuration docs](https://directus.io/docs/configuration/auth-sso) for the full reference.

To enable both at the same time, set `AUTH_PROVIDERS=google,microsoft` in the api and include env vars for both. Then in the web container, set `VITE_DECAPBRIDGE_AUTH_PROVIDERS="google,microsoft"`.

**Google**

Create an OAuth 2.0 client in the [Google Cloud Console](https://console.cloud.google.com/) and set the authorized redirect URI to `https://auth.mycompany.com/auth/login/google/callback`.

```env
AUTH_PROVIDERS=google
AUTH_GOOGLE_DRIVER=openid
AUTH_GOOGLE_CLIENT_ID=your-google-client-id
AUTH_GOOGLE_CLIENT_SECRET=your-google-client-secret
AUTH_GOOGLE_ISSUER_URL=https://accounts.google.com
AUTH_GOOGLE_IDENTIFIER_KEY=email
```

**Microsoft**

Register an app in the [Azure Portal](https://portal.azure.com/) and set the redirect URI to `https://auth.mycompany.com/auth/login/microsoft/callback`.

```env
AUTH_PROVIDERS=microsoft
AUTH_MICROSOFT_DRIVER=openid
AUTH_MICROSOFT_CLIENT_ID=your-microsoft-client-id
AUTH_MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret
AUTH_MICROSOFT_ISSUER_URL=https://login.microsoftonline.com/your-tenant-id/v2.0/.well-known/openid-configuration
AUTH_MICROSOFT_IDENTIFIER_KEY=email
```

#### Customization

You can customize the look and branding of your self-hosted instance using environment variables.

**API container:**

| Variable        | Description                                                    | Example                          |
| --------------- | -------------------------------------------------------------- | -------------------------------- |
| `PROJECT_URL`   | Public URL of the web front-end, used for redirects and emails | `https://login.mycompany.com`    |
| `PROJECT_NAME`  | Display name used in emails and internal references            | `My Company`                     |
| `PROJECT_COLOR` | Brand accent color                                             | `#e64980`                        |
| `PROJECT_LOGO`  | URL to a logo image (imported on first boot)                   | `https://mycompany.com/logo.png` |

**Web container:**

| Variable                        | Description                                   | Example                         |
| ------------------------------- | --------------------------------------------- | ------------------------------- |
| `VITE_DECAPBRIDGE_SITE_URL`     | Public URL of the web front-end               | `https://login.mycompany.com`   |
| `VITE_DECAPBRIDGE_API_URL`      | URL of the API container                      | `https://auth.mycompany.com`    |
| `VITE_DECAPBRIDGE_GATEWAY_URL`  | URL of the Gateway container                  | `https://gateway.mycompany.com` |
| `VITE_DECAPBRIDGE_SITE_NAME`    | Site name shown in the header and page titles | `My Company sites login portal` |
| `VITE_DECAPBRIDGE_SITE_LOGO`    | Path or URL to a logo image                   | `/logo.svg`                     |
| `VITE_DECAPBRIDGE_THEME_COLOR`  | Primary accent color                          | `#e64980`                       |
| `VITE_DECAPBRIDGE_THEME_RADIUS` | Border radius for UI components               | `xl`                            |
