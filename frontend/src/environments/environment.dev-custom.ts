import { CUSTOM_CONFIG } from '../config/custom/custom';

export const environment = {
  production: false,
  apiEndpoint: CUSTOM_CONFIG.prodApiEndpoint || 'http://35.200.224.144:8081/',
  appName: CUSTOM_CONFIG.appName,
  config: CUSTOM_CONFIG
};
