import { DEFAULT_APP_DATA } from './app-data';

export const DEFAULT_CONFIG = {
  prodApiEndpoint: 'http://35.200.224.144:8081/',
  // prodApiEndpoint: 'http://localhost:3000/',
  frontEndUrl: 'https://demo.aviacommerce.com/',
  appName: 'Kaufen Online',
  fevicon: '/assets/default/favicon.ico',
  header: {
    brand: {
      logo: 'https://opensource.org/files/osi_symbol.png',
      logoPng: 'https://opensource.org/files/osi_symbol.png',
      name: 'Kaufen Online',
      height: '60',
      width: '60'
    },
    searchPlaceholder: 'Search for products',
    showGithubRibon: false
  },
  showDummyCardInfo: true,
  // Following are the test crediantials for payubiz payment gateway.
  payuBizSalt: 'eCwWELxi',
  payuBizKey: 'gtKFFx',
  freeShippingAmount: 50,
  currency_symbol: '$', // USD $
  PaymentMethodCod: 'COD',
  PaymentMethodPayubiz: 'Payubiz',
  defaultPaymentMethod: 'Payubiz',
  reviewsDisplayLimit: 5,

  ...DEFAULT_APP_DATA,
};
