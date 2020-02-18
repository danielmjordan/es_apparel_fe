const { performance } = require('perf_hooks');
const fs = require('fs');
const faker = require('faker');
const moment = require('moment');

const generateRecord = () => {
  const productId = faker.random.number({ min: 1, max: 1000000 });
  const rating = faker.random.number({ min: 1, max: 5 });
  const summary = faker.fake('{{commerce.productName}} so {{commerce.productAdjective}}!');
  const body = faker.lorem.paragraph(5);
  const recommend = faker.random.boolean();
  const reported = faker.random.boolean();
  const name = faker.internet.userName();
  const email = faker.internet.email();
  const response = faker.random.arrayElement([null, null, null, null, faker.lorem.words(10)]);
  const date = moment(faker.date.between('2015-01-01', '2020-2-14')).format('YYYY-MM-DD');
  const helpfulness = faker.random.number({ min: 0, max: 30 });

  return `${productId},${rating},${summary},${body},${recommend},${reported},${name},${email},${response},${date},${helpfulness}\n`;
};

const writeFiles = (string) => {
  try {
    fs.appendFileSync('./data/tenthousandreviews.csv', string);
  } catch (err) {
    return err;
  }
};

const getFiveMillionRecords = () => {
  const t1 = performance.now();
  for (let i = 9999999; i < 10010001; i += 1) {
    const record = generateRecord();
    writeFiles(`${i},${record}`);
  }
  const t2 = performance.now();
  console.log(((t2 - t1) / 1000), 'seconds');
};

getFiveMillionRecords();
