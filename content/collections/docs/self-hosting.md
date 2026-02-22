---
meta:
  title: Self-Hosting
---

# Self-Hosting DecapBridge

You're looking to self-host a version of DecapBridge on your own infrastructure? Start here!

## Self-Hosting requirements:

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

First of all, if you are looking to self-host DecapBridge in a commercial setting, you need to acquire a License, which you can get by purchasing the ["Lifetime pro" plan](/#pricing) which comes with a self-hosting key. If this is for an open-source or a non-profit project, [get in touch](/contact) and I will provide you with a free self-hosting key.

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

To send out invite emails, you will need one of:

- a SMTP server
- (OR) a Mailgun key
- (OR) a AWS SES api key

This is optional, as you can also manually share the invite links by copying them in the UI and sharing them with your users.

#### SSO login

If you want to enable SSO logins via the PKCE flow in self-hosted mode, you will need to provide your own openid `CLIENT_ID` and `CLIENT_SECRET` fields from Google / Microsoft.

## Example configuration

See the [decapbridge/decapbridge-self-hosted-examples](https://github.com/decapbridge/decapbridge-self-hosted-examples) repository for more details.
