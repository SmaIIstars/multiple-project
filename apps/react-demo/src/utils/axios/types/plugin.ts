export type PluginFlag<e extends string> = Record<`${e}Flag`, boolean>;

export type PluginAction = {
  name: string;
  version?: string | number;
};

export interface PluginRequestConfig {
  actions?: PluginAction[];
  flags?: PluginFlag<string>;

  sessionId?: number;
  requestIndex?: number;
  requestId?: string;
}
