const getRandomId = (context, events, done) => {
  context.vars['id'] = Math.floor(Math.random() * (100 - 1)) + 1;
  return done();
};

// function setupSomeData(context, events, done) {
//   context.vars['query'] = 'foo'; // set the "query" variable for the virtual user
//   return done();
// }

module.exports = getRandomId;
