---
meta:
  title: Architecture
---

# How does DecapBridge work?

In short, DecapBridge is 3 repositories running as services in docker containers, which interact with your own DecapCMS instance, your Git host, SSO providers email services.

| Name              | Github repository                                                               | Host                                                        | Description                                                                |
| ----------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------- |
| Web&nbsp;UI       | [decapbridge&#8209;web](https://github.com/decapbridge/decapbridge-web)         | [decapbridge.com](https://decapbridge.com/)                 | This website, where you can login, manage your sites and invite users      |
| Auth&nbsp;backend | [decapbridge&#8209;api](https://github.com/decapbridge/decapbridge-api)         | [auth.decapbridge.com](https://auth.decapbridge.com/)       | The Auth API and Sites backend. Manages users, sites and site access       |
| Git&nbsp;Gateway  | [decapbridge&#8209;gateway](https://github.com/decapbridge/decapbridge-gateway) | [gateway.decapbridge.com](https://gateway.decapbridge.com/) | The Universal git-gateway, which lets you interface with Github and Gitlab |

## System overview

![architecture](/docs/architecture.svg)
