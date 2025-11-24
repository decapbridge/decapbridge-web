---
meta:
  title: Getting started
---

# Getting started

Here's an overview of what getting setup with DecapBridge looks like.

At this stage, we assume you already have a website under development and are either planning to use _Decap CMS_, or are already using _Decap CMS_ to manage some site content. This also implies you are hosting your code on Github, or Gitlab, which are the 2 git providers we support at the moment.

First time using _Decap CMS_? Keep in mind you should also have a look at the [official docs](https://decapcms.org/docs/basic-steps/), which will be helpful along your journey, but we can get to that later.

## Signing up

If you haven't already, as a site owner, [create an account](/auth/signup) to get started. The profile picture, first and last names are all optional. They will be used in the CMS and if you configure it so, when you commit changes to your repository.

In the dashboard, you will be able to add and manage many different Decap CMS sites under the same account.

## Adding your first site

When in the Dashboard, you will be invited to add your first site. The form should be self-explanatory, but here are some more details. Keep in mind you can change any of these options later on, at any time.

### Git provider

Pick the appropriate option between Github and Gitlab. More options might be added later on, depending on the user requests.

### Git repository

Add the partial path to your repository on your git provider, following a `org/repository` pattern.

### Git access token

Here you need to provide an access token that will let non-git users read/write to the repository using the CMS.

**For Github users**:

For Github, the token needs read and write access the repository's _Contents_, and if using the [Editorial Workflow](https://decapcms.org/docs/editorial-workflows/), _Pull requests_ as well.

You can create such a token in your account settings, here: [https://github.com/settings/tokens](https://github.com/settings/tokens).

Both fine-grained and classic tokens work. We suggest doing a fine-grained token with only access to the relevant repository.

**For Gitlab users**:

For Gitlab, the token needs access to the following scopes: `api`, `read_api`, `read_repository` and `write_repository`.

You can create such a token in the "Access tokens" tab of your repository, here: `https://gitlab.com/<your-org>/<your-repo>/-/settings/access_tokens`.

### Your Decap CMS login URL

Here, insert the full URL of your Decap CMS's instance admin page. Users will be redirected there for CMS login. It should look something like this: `https://your-site.com/admin/index.html`.

Don't know what I'm talking about? Now is when I would reach for the official docs, install step: [https://decapcms.org/docs/install-decap-cms/](https://decapcms.org/docs/install-decap-cms/).

For most people, you would create a `admin` folder at the root of your public assets file in your website's code directory, then add a `index.html` in it with something like this:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>My-website Admin page</title>
  </head>
  <body>
    <script src="https://unpkg.com/decap-cms@3.9.0/dist/decap-cms.js"></script>
  </body>
</html>
```

Use a version higher than `v3.8.3` to support "Login with Google" and "Login with Microsoft".

We will start working on the `config.yml` file in just a moment.

### Auth type

Here, decide how you want your users to login into the CMS.

**Classic**: Choose this if you want your users to have a direct "login with password" UI in the Decap CMS dashboard

**PKCE**: Choose this if you want to enable SSO options like "Login with Google" or "Login with Microsoft". The Login button will take them to the DecapBridge login page for a PKCE callback once authenticated.

## Enable your CMS login

Click on the "Create site" button and that's done! The site is now registered in DecapBridge, and you should see a generated `config.yml` template you can start from.

Use the provided configuration to get started on your CMS configuration. Do this by copying the provided `.yml` code, and pasting it in a file called `config.yml` that lives in that same `admin` folder you created earlier, next to the `index.html` file.

Your CMS might not be fully configured at this point, but if you push these changes to your website online, you should already be able to login! Once the changes are live, click on the "Go to CMS" to try it out!

## Finalize your CMS configuration

For this part, refer to the official docs [configuration options](https://decapcms.org/docs/configuration-options/) to tailor your CMS to your website's content (define the collections, the fields etc.).

## Invite collaborators

In the dashboard, on your site's page, there should be a "Manage collaborators" tab. In this tab, you can send email invitations to whoever you wish, so that they can log into your site's CMS.

Simply enter their email and hit send. They will receive an inviation email with a link to setup their account. They will then be able to choose their prefered login method or password. If they click the link again after they configured their account, it will send them straight to the CMS.

If they can't see the email, check the spam folder. If still nothing, please let me know!

## Have fun 🎉

If you've got all these steps going smoothly, enjoy DecapBridge!

If you encounter any hiccups, do not hesitate to let me know via the [contact form](/contact).

You can also reach out on the millisecond.studio discord channel by clicking [here](https://discord.gg/Q97rYTGVk3).
