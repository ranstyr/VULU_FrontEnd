// use the the context method on require that webpack created in order to tell webpack
// what files we actually want to require or import.Below, context will be an function/object with file names as keys.
// using that regex we are saying look in src and find any file that ends with test.js and get its path. By passing in true
// we say do this recursively
let context = require.context('./src', true, /\.test\.js/);
// get all the files, for each file, call the context function
// that will require the file and load it up here. Context will
// loop and require those spec files here
// console.log('unit tests:' + context.keys());
//instaed of required every spec file
context.keys().forEach(context);
