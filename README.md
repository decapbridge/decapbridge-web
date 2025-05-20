# DecapBridge web client

This is the web client for DecapBridge.

This is where:

- As a site admin, you can add your sites, configure them and send invitation emails to users.
- As a site collaborator, you can setup your account, access the CMS, reset your password, etc.

## Stack

- Mantine UI (React / TypeScript)
- Vike (Vite)
- DecapCMS + DecapBridge - duh

## Install

```sh
git clone git@github.com:decapbridge/decapbridge-web.git
cd decapbridge-web
npm i
npm run dev
```

## Directory structure

```
src
├── cms             # CMS schema & server-side data loaders
├── components      # React components and client-only code
│   ├── core        # App-wide code & framework configuration
│   ├── layouts     # Layout components
│   ├── misc        # Project-specific components that are used by layouts or pages
│   └── ui          # Non-project specific UI components
├── hooks           # React hooks
├── pages           # Site pages. Page paths represent pages internal URL
├── renderer        # Vike config
└── utils           # Utility typescript functions
```
