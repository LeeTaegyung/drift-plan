import { COUNTRIES } from '@/shared/config/countries';

export type CountryListType = typeof COUNTRIES;
export type CountryItemType = CountryListType[number];
