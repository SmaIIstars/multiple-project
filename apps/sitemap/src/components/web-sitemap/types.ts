export enum SITE_TYPE {
  APP = "app",
  POST = "post",
  RESOURCE = "resource",
}

export interface SitemapResource {
  name: string;
  link: string;
  type?: SITE_TYPE;
  backupLinks?: string[];
}
