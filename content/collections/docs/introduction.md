---
meta:
  title: Introduction
---

# Introduction

## What is DecapBridge

**DecapBridge** is an authentication and user management service designed specifically for _[Decap CMS](https://decapcms.org/)_, aiming to make it as easy as possible for non-technical users to login and start editing content on your website.

As a site owner, you can simply invite collaborators by email, then getting started is a familiar self-service from their end. They can chose to login with Google, Microsoft or set a password. If they forget their password, they can reset it as well, without any intervention from your part. You can then view who has access to edit your sites and then remove their access if needed.

This project is not to be confused with _Decap CMS_ which is a distinct open source project that does include a user management and authentication service.

## Why is DecapBridge a thing?

On it's own, _Decap CMS_ has very flexible and open-ended auth mechanisms that let you integrate the CMS into all kinds of systems and login configurations.

This is great for enterprise or technical users that have the resources to configure an authentication setup tailored to their needs, or that want to handle user management in an existing external system, however, in a lot of cases, users just want something that works out of the gate.

Historically, Netlify filled this gap (_Decap CMS_ used to be [Netlify CMS](https://www.netlify.com/blog/netlify-cms-to-become-decap-cms/)), however after it stopped its involvement with the project and then [deprecated their Identity service](https://www.netlify.com/changelog/deprecation-netlify-identity/), this left a "git-gateway"-shaped void in the _Decap CMS_ community.

This is how **DecapBridge** became a popular alternative, offering a ready-to-go authentication option for _Decap CMS_, with **no depencency on Netlify**.
