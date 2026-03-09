import {
  rest,
  authentication,
  createDirectus,
  CoreSchema,
  DirectusActivity,
  DirectusRevision,
  DirectusUser,
  AuthenticationData,
  AuthenticationStorage,
} from "@directus/sdk";
import { getDirectusUrl } from "./constants";
import { StripePriceKey } from "./stripe";

const authKey = "auth";

export const authenticationStorage: AuthenticationStorage = {
  get() {
    const authJson = localStorage.getItem(authKey);
    if (!authJson) {
      return null;
    }
    const authData = JSON.parse(authJson) as AuthenticationData;

    return authData;
  },
  set(value: AuthenticationData | null) {
    if (value) {
      const authJson = JSON.stringify(value);
      localStorage.setItem(authKey, authJson);
    } else {
      localStorage.removeItem(authKey);
    }
  },
};

export interface Collaborator {
  id: number;
  sites_id: Site | string;
  directus_users_id: CustomSchema['directus_users'][number] | string;
  invite_token?: string | null;
};

export interface Site {
  id: string;
  git_provider: 'github' | 'gitlab';
  repo: string;
  access_token: string;
  cms_url: string;
  auth_type: 'classic' | 'pkce';
  date_created: string;
  date_updated: string;
  user_created?: CustomSchema['directus_users'][number] | string;
  user_updated?: CustomSchema['directus_users'][number] | string;
  collaborators: Collaborator[];
  name?: string | null;
  logo?: string | null;
  color?: string | null;
}

export interface CustomCollections {
  sites: Site[];
  sites_directus_users: Collaborator[];
}

export type CustomSchema = CoreSchema &
  CustomCollections & {
    directus_activity: (DirectusActivity<CoreSchema & CustomCollections> & {
      collection: CustomSchemaEnum;
    })[];
    directus_users: (DirectusUser<CoreSchema & CustomCollections> & {
    })[];
    directus_revisions: DirectusRevision<CoreSchema & CustomCollections>[];
  };

export type CustomSchemaEnum = Exclude<keyof CustomSchema, "directus_settings">;

export type StripeSubscriptionStatus =
  | 'incomplete'
  | 'incomplete_expired'
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'canceled'
  | 'unpaid'
  | 'paused';

export type CustomDirectusUser = CustomSchema["directus_users"][number] & {
  stripe_customer_id?: string;
  stripe_price_key?: StripePriceKey;
  stripe_subscription_status?: StripeSubscriptionStatus;
};


const directus = createDirectus<CustomSchema>(
  getDirectusUrl()
)
  .with(rest())
  .with(
    authentication("json", {
      storage: authenticationStorage,
    })
  );


export default directus;
