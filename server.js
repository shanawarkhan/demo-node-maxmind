var maxmind = require('maxmind');

maxmind.open('GeoLite2-City.mmdb', (err, cityLookup) => {
  var city = cityLookup.get('66.6.44.4');
  console.log(city);
});


// maxmind.open('/path/to/GeoOrg.mmdb', (err, orgLookup) => {
//   var city = orgLookup.get('66.6.44.4');
// });

// Be careful with sync version! Since mmdb files
// are quite large (city database is about 100Mb)
// `fs.readFileSync` blocks whole process while it
// reads file into buffer.

// var cityLookup = maxmind.openSync('GeoLite2-City.mmdb');
// var city = cityLookup.get('66.6.44.4');

// var orgLookup = maxmind.openSync('/path/to/GeoOrg.mmdb');
// var organization = orgLookup.get('66.6.44.4');


// V6 Support

// Module is fully campatible with IPv6. There are no differences in API between IPv4 and IPv6.

// var lookup = maxmind.openSync('GeoLite2-City.mmdb');
// var location = lookup.get('2001:4860:0:1001::3004:ef68');

// Options
// cache
// Module uses lru-cache. You can configure its settings by doing following:

var lookup = maxmind.openSync('GeoLite2-City.mmdb', {
  cache: {
    max: 1000, // max items in cache
    maxAge: 1000 * 60 * 60 // life time in milliseconds
  }
});

lookup.get('1.1.1.1');

// watchForUpdates
// Supports reloading the reader when changes occur to the database 
// that is loaded. (default false). Only supported by Node v0.5.10+.

// var lookup = maxmind.openSync('GeoLite2-City.mmdb', { watchForUpdates: true });
// lookup.get('1.1.1.1');



// IP addresses validation
// Module supports validation for both IPv4 and IPv6:

maxmind.validate('66.6.44.4'); // returns true
maxmind.validate('66.6.44.boom!'); // returns false

maxmind.validate('2001:4860:0:1001::3004:ef68'); // returns true
maxmind.validate('2001:4860:0:1001::3004:boom!'); // returns false