---
meta:
  title: Source Available
---

## DecapBridge is Source-Available

DecapBridge started as a closed source project for my own websites and clients back in 2023. It was not initially meant for public use. After a while, with Netlify slowly detaching itself from the project, and now decided to [deprecate Netlify Identity](https://www.netlify.com/changelog/deprecation-netlify-identity/), it only made sense to scale up the service and open it to the public.

Between 2024 and early 2025, it had already gathered hundreds of early adopter websites and Netlify refugees. We're now counting over a thousand!

A big concern for more serious projects was the handling of the Github/Gitlab access tokens. DecapBridge uses `aes-256-gcm` encryption on the access tokens which is highly secure, however users had concerns about wether or not and how this actually happened. My word could not cut it anymore - I had to Open Source.

This pushed me to clean up the code and release the DecapBridge codebase on Github. Have a look and give the repos a star! ❤️

DecapBridge on Github: [https://github.com/decapbridge/](https://github.com/decapbridge/)

The code is not MIT licensed however, it is under a BSL license with custom terms. In short:

- You can view the source code and contribute to the project
- You can fork, but cannot change the name or brand
- You can self host the project using your own configuration, however **if it's for commercial use, you need to acquire a license for self-hosting**.

To acquire a commercial license, please [get in touch](/contact) and it will be my pleasure to help get you set up.
