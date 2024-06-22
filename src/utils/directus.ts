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

const authKey = "auth";

const authenticationStorage: AuthenticationStorage = {
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
};

export interface Site {
  id: number;
  repo: string;
  access_token: string;
  cms_url: string;
  date_created: string;
  date_updated: string;
  user_created?: CustomSchema['directus_users'][number] | string;
  user_updated?: CustomSchema['directus_users'][number] | string;
  collaborators: Collaborator[]
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

export type CustomDirectusUser = CustomSchema["directus_users"][number];


const directus = createDirectus<CustomSchema>(
  getDirectusUrl()
)
  .with(rest())
  .with(
    authentication("json", {
      storage: authenticationStorage,
    })
  );

// const test = await directus.request(readItems('directus_operations'))

// test[0].

export default directus;
