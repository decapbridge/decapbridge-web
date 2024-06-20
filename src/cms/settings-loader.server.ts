import { settings } from "./schema.server";

export type SettingsCmsSchema = Record<string, unknown>;

export type Settings = typeof settings;
export type SettingKeys = keyof Settings;

export const readItem = <K extends SettingKeys>(key: K): Settings[K] =>
  settings[key];

export const readAllSettings = () =>
  (Object.keys(settings) as SettingKeys[]).reduce(
    (acc, setting) => ({
      ...acc,
      [setting]: readItem(setting),
    }),
    {} as {
      [S in SettingKeys]: Settings[S];
    }
  );
