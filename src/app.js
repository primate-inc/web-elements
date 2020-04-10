import 'style.scss'
import './components/accordion/index.js'
import './components/tabs/index.js'

console.log('hellou :)')


// grab the element where we'll output the HTML to
const output = document.querySelector('#app');

// create a 'cache' where we can store our built up HTML from our fragments
let htmlFragmentCache = {};

// here, we're creating an anonymous function that loads up our HTML fragments
// then it adds them to our cache object
const importAll = requireContext => {
  console.log(requireContext)
  requireContext.keys().forEach(key => {
    console.log(key, requireContext(key));
    htmlFragmentCache[key] = requireContext(key)
  })
}

// next, we call our importAll() function to load the files
// notice how this is where we call the require.context() function
// it uses our file path, whether to load subdirectories and what file type to get
importAll(require.context('./components', true, /.html$/));

// finally, we can loop over our cache's keys and add the HTML to our output element
Object.keys(htmlFragmentCache).forEach(key => output.innerHTML += htmlFragmentCache[key]);
