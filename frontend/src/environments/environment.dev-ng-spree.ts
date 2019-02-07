import { DEFAULT_CONFIG } from '../config/default/default';

export const environment = {
  production: false,
  // apiEndpoint: DEFAULT_CONFIG.prodApiEndpoint,
  apiEndpoint: 'http://35.200.224.144:8081/',
  appName: DEFAULT_CONFIG.appName,
  config: DEFAULT_CONFIG
};
