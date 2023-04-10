const natural = require('natural');
const wordnet = new natural.WordNet();

wordnet.lookup('programming photo', function(results) {
  results.forEach(function(result) {
    console.log(result.synsetOffset + "," + result.pos + "," + result.lemma + "," + result.synonyms);
  });
});
