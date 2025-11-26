---
meta:
  title: Architecture
---

# How does DecapBridge work?

DecapBridge is a project with 3 main components which take the form of 3 web services that interact with your _Decap CMS_ instance, your Git provider, optional SSO providers and email services.

| Name              | Github repository                                                               | Host                                                        | Description                                                                   |
| ----------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Web&nbsp;UI       | [decapbridge&#8209;web](https://github.com/decapbridge/decapbridge-web)         | [decapbridge.com](https://decapbridge.com/)                 | This website, where you can login, manage your sites and invite users         |
| Auth&nbsp;backend | [decapbridge&#8209;api](https://github.com/decapbridge/decapbridge-api)         | [auth.decapbridge.com](https://auth.decapbridge.com/)       | The Auth API and Sites backend. Manages users, sites and site access          |
| Git&nbsp;Gateway  | [decapbridge&#8209;gateway](https://github.com/decapbridge/decapbridge-gateway) | [gateway.decapbridge.com](https://gateway.decapbridge.com/) | The multi-tenant git-gateway, which lets you interface with Github and Gitlab |

## System overview

![architecture](/docs/architecture.svg)
