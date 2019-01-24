import { DEFAULT_CONFIG } from '../config/default/default';

export const environment = {
  production: false,
  // apiEndpoint: DEFAULT_CONFIG.prodApiEndpoint,
  apiEndpoint: 'http://localhost:8080/',
  appName: DEFAULT_CONFIG.appName,
  config: DEFAULT_CONFIG
};
