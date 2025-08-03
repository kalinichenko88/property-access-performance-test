import * as fs from 'node:fs';
import { faker } from '@faker-js/faker';
import { DATA_COUNTS } from '../constants';
import type { Data } from '../models';

const generateData = (count: number): Data[] => {
  const data: Data[] = [];

  for (let i = 0; i < count; i++) {
    const now = new Date();

    data.push({
      id: i,
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      phone_number: faker.phone.number(),
      address_street: faker.location.streetAddress(),
      address_city: faker.location.city(),
      address_state: faker.location.state(),
      address_zip: faker.location.zipCode(),
      address_country: faker.location.country(),
      address_latitude: faker.location.latitude(),
      address_longitude: faker.location.longitude(),
      birth_date: faker.date.birthdate().toISOString(),
      birth_place: faker.location.city(),
      birth_country: faker.location.country(),
      company: faker.company.name(),
      job_title: faker.person.jobTitle(),
      registration_date: faker.date.past().toISOString(),
      registration_ip: faker.internet.ip(),
      registration_city: faker.location.city(),
      registration_state: faker.location.state(),
      registration_zip: faker.location.zipCode(),
      registration_country: faker.location.country(),
      registration_latitude: faker.location.latitude(),
      registration_longitude: faker.location.longitude(),
      account_balance: parseFloat(faker.finance.amount()),
      account_number: faker.finance.accountNumber(),
      account_type: faker.helpers.arrayElement(['checking', 'savings', 'credit', 'investment']),
      account_currency: faker.finance.currencyCode(),
      account_status: faker.helpers.arrayElement(['active', 'inactive', 'suspended', 'closed']),
      account_created_at: faker.date.past().toISOString(),
      account_updated_at: faker.date.recent().toISOString(),
      account_last_login: faker.date.recent().toISOString(),
      wishlist_items_count: faker.number.int({ min: 0, max: 50 }),
      wishlist_items: faker.helpers.arrayElements(
        Array.from({ length: 50 }, () => faker.commerce.productName()),
        { min: 0, max: 20 },
      ),
      cart_items_count: faker.number.int({ min: 0, max: 10 }),
      cart_items: faker.helpers.arrayElements(
        Array.from({ length: 50 }, () => faker.commerce.productName()),
        { min: 0, max: 10 },
      ),
      orders_count: faker.number.int({ min: 0, max: 100 }),
      orders: faker.helpers.arrayElements(
        Array.from({ length: 100 }, () => faker.commerce.productName()),
        { min: 0, max: 50 },
      ),
      reviews_count: faker.number.int({ min: 0, max: 50 }),
      reviews: faker.helpers.arrayElements(
        Array.from({ length: 50 }, () => faker.commerce.productName()),
        { min: 0, max: 25 },
      ),
      browser: faker.internet.userAgent(),
      os: faker.helpers.arrayElement(['Windows', 'macOS', 'Linux', 'iOS', 'Android']),
      device: faker.helpers.arrayElement(['desktop', 'mobile', 'tablet']),
      ip_address: faker.internet.ip(),
      user_agent: faker.internet.userAgent(),
      created_at: faker.date.past().toISOString(),
      updated_at: faker.date.recent().toISOString(),
      is_active: faker.datatype.boolean(),
      credit_card_last4: faker.finance.creditCardNumber().slice(-4),
      credit_card_brand: faker.finance.creditCardIssuer(),
      credit_card_exp_month: faker.number.int({ min: 1, max: 12 }),
      credit_card_exp_year: faker.number.int({ min: 2024, max: 2030 }),
      credit_card_type: faker.helpers.arrayElement(['visa', 'mastercard', 'amex', 'discover']),
      credit_card_issuer: faker.finance.creditCardIssuer(),
      credit_card_country: faker.location.country(),
      credit_card_city: faker.location.city(),
      gender: faker.person.gender(),
      age: faker.number.int({ min: 18, max: 100 }),
      height: faker.number.int({ min: 150, max: 200 }),
      weight: faker.number.int({ min: 50, max: 150 }),
      blood_type: faker.helpers.arrayElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      eye_color: faker.helpers.arrayElement(['brown', 'blue', 'green', 'hazel', 'gray']),
      hair_color: faker.helpers.arrayElement(['black', 'brown', 'blonde', 'red', 'gray', 'white']),
      hair_length: faker.helpers.arrayElement(['short', 'medium', 'long']),
      login_attempts: faker.number.int({ min: 0, max: 100 }),
      login_attempts_failed: faker.number.int({ min: 0, max: 50 }),
      login_attempts_success: faker.number.int({ min: 0, max: 100 }),
      login_attempts_total: faker.number.int({ min: 0, max: 150 }),
      login_attempts_last_attempt: faker.date.recent().toISOString(),
      login_attempts_last_attempt_success: faker.datatype.boolean(),
      login_attempts_last_attempt_failed: faker.datatype.boolean(),
      login_attempts_last_attempt_total: faker.number.int({ min: 0, max: 10 }),
      medical_conditions: faker.helpers.arrayElements(
        ['diabetes', 'hypertension', 'asthma', 'arthritis', 'depression', 'anxiety'],
        { min: 0, max: 3 },
      ),
      allergies: faker.helpers.arrayElements(['peanuts', 'shellfish', 'dairy', 'gluten', 'pollen', 'dust'], {
        min: 0,
        max: 3,
      }),
      medications: faker.helpers.arrayElements(['aspirin', 'ibuprofen', 'vitamin d', 'calcium', 'omega-3'], {
        min: 0,
        max: 5,
      }),
      medical_history: faker.helpers.arrayElements(
        ['appendectomy', 'tonsillectomy', 'broken arm', 'concussion', 'surgery'],
        { min: 0, max: 3 },
      ),
      medical_history_last_update: faker.date.recent().toISOString(),
      medical_history_last_update_by: faker.person.fullName(),
      medical_history_last_update_by_id: faker.number.int({ min: 1, max: 1000 }),
      medical_history_last_update_by_name: faker.person.fullName(),
      time_zone_offset: faker.number.int({ min: -12, max: 12 }),
      time_zone_name: faker.helpers.arrayElement(['UTC', 'EST', 'PST', 'CET', 'JST']),
      time_zone_abbreviation: faker.helpers.arrayElement(['UTC', 'EST', 'PST', 'CET', 'JST']),
      time_zone_current_time: now.toISOString(),
      time_zone_current_time_unix: Math.floor(now.getTime() / 1000),
      time_zone_current_time_unix_ms: now.getTime(),
      time_zone_current_time_unix_ns: now.getTime() * 1000000,
      time_zone_current_time_unix_us: now.getTime() * 1000,
      locale: faker.helpers.arrayElement(['en-US', 'en-GB', 'es-ES', 'fr-FR', 'de-DE']),
      currency: faker.helpers.arrayElement(['USD', 'EUR', 'GBP', 'JPY', 'CAD']),
      language: faker.helpers.arrayElement(['en', 'es', 'fr', 'de', 'ja']),
      timezone: faker.helpers.arrayElement(['America/New_York', 'Europe/London', 'Asia/Tokyo', 'Australia/Sydney']),
      last_address_change: faker.date.recent().toISOString(),
      last_address_change_ip: faker.internet.ip(),
      last_address_change_user_agent: faker.internet.userAgent(),
      last_address_change_created_at: faker.date.recent().toISOString(),
      last_address_change_updated_at: faker.date.recent().toISOString(),
      last_address_change_is_active: faker.datatype.boolean(),
      last_address_change_credit_card_last4: faker.finance.creditCardNumber().slice(-4),
      orer_list: [
        {
          id: faker.number.int({ min: 1, max: 10000 }),
          order_number: faker.string.alphanumeric(8).toUpperCase(),
          order_date: faker.date.recent().toISOString(),
          order_total: parseFloat(faker.finance.amount()),
          order_status: faker.helpers.arrayElement(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
        },
      ],
    });
  }
  return data;
};

const writeData = (data: Data[], count: number) => {
  const filename = `src/data/${count.toLocaleString().replace(',', '_')}/data.json`;
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  console.log(`Generated ${count.toLocaleString()} records in ${filename}`);
};

for (const count of DATA_COUNTS) {
  const dir = `src/data/${count.toLocaleString().replace(',', '_')}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const data = generateData(count);
  writeData(data, count);
}

console.log('Data generation completed!');
