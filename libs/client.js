import {createClient} from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'webdock',
  apiKey: process.env.API_KEY,
})