export const PULL_ASSETS_TIME = 1000 * 60;
export const PULL_CATEGORIES_TIME = 1000 * 60;
export const AIRTABLE_ASSET_MODELS = [
  'Asset',
  'Category',
  'Funding Goal',
  'Image',
  'Partner Address',
  'Crypto Purchase',
  'Crypto Payout',
  'Model ID',
];

export const AIRTABLE_ASSET_LISTINGS = [
  'Asset ID',
  'Model ID',
  'Financials',
  'Risks',
  'About',
  'City',
  'Country',
  'Collateral Percentage',
  'Route',
  'Province',
  'Postal Code',
];

export const AIRTABLE_CATEGORIES_RULES = [
  'Category',
  'byte32',
  'Category Contract',
];

// make sure the data from airtable is correct
// and that every required field is filled
export const verifyDataAirtable = (rules, records) => {
  return records.filter(({ fields }) =>
    rules.every(field => {
      const valueOfField = fields[field];
      return Object.keys(fields).includes(field) && valueOfField !== undefined;
    }
  ))
}

export const DEFAULT_ASSET_INFO = {
  Financials: 'No financial information about this asset has been provided.',
  Risks: 'No risk information about this asset has been provided.',
  About: 'No information about this asset has been provided.',
  Fees: 'No fee information about this asset has been provided.',
}
