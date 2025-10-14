import { baseCollectionSchema } from "/src/utils/types";
import { SettingsCmsSchema } from "./settings-loader.server";
import { PagesCmsSchema } from "./page-loader.server";
import { CollectionsCmsSchema } from "./collection-loader.server";

import site from "/content/settings/site.json";
import misc from "/content/settings/misc.json";

import index from "/content/pages/index.json";
import contact from "/content/pages/contact.json";
import login from "/content/pages/auth/login.json";
import signup from "/content/pages/auth/signup.json";
import forgot from "/content/pages/auth/password/forgot.json";
import reset from "/content/pages/auth/password/reset.json";
import sites from "/content/pages/dashboard/sites.json";
import newSite from "/content/pages/dashboard/new-site.json";
import edit from "/content/pages/dashboard/edit-site.json";
import profile from "/content/pages/dashboard/profile.json";
import activity from "/content/pages/dashboard/activity.json";
import userSettings from "/content/pages/dashboard/settings.json";

// Settings
// ===========================
export const settings = {
  site,
  misc,
} satisfies SettingsCmsSchema;

// Pages
// ===========================
export const pages = {
  index,
  contact,
  "auth/login": login,
  "auth/signup": signup,
  "auth/password/forgot": forgot,
  "auth/password/reset": reset,
  "dashboard/sites": sites,
  "dashboard/sites/new": newSite,
  "dashboard/sites/edit": edit,
  "dashboard/profile": profile,
  "dashboard/activity": activity,
  "dashboard/settings": userSettings,
} satisfies PagesCmsSchema;

// Collections
// ===========================
export const collections = {
  "legal": baseCollectionSchema,
} satisfies CollectionsCmsSchema;
