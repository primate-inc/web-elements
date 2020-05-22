import 'style.scss'
import './components/accordion/index.js'
import './components/tabs/index.js'


// const x = require('raw-loader!style.scss')
// console.log('css :>> ', x);

const marked = require('marked');

// grab the element where we'll output the HTML to
const output = document.querySelector('#content');

// create a 'cache' where we can store our built up HTML from our fragments
let htmlFragmentCache = {};
let mdFragmentCache = {};
let cssFragmentCache = {};


// here, we're creating an anonymous function that loads up our HTML fragments
// then it adds them to our cache object
const importAll = (output, requireContext) => {
  requireContext.keys().forEach(key => {
    const splitKey = key.split('/')
    const simplifiedKey = splitKey[1]
    output[simplifiedKey] = requireContext(key)
  })
}

// next, we call our importAll() function to load the files
// notice how this is where we call the require.context() function
// it uses our file path, whether to load subdirectories and what file type to get
importAll(htmlFragmentCache, require.context('./components', true, /.html$/));
importAll(mdFragmentCache, require.context('./components', true, /.md$/));
// importAll(cssFragmentCache, require.context('./components', true, /.scss$/));

console.log('cssFragmentCache :>> ', require('raw-loader!./components/accordion/accordion.scss'));

const element = (klass, type = 'div') => {
  const el = document.createElement(type);
  if (!!klass) el.classList.add(klass)

  return el
}

const wrapComponent = (component, md, css) => {
  const wrapper = element('component')

  const preview = element('component__preview')
  const description = element('component__description')
  const codeHTML = element('component__code')
  const codeCSS = element('component__code')

  preview.innerHTML = component
  wrapper.appendChild(preview)

  if (!!md) {
    description.innerHTML = md
    wrapper.appendChild(description)
  }

  // if (!!css) {
    // console.log('css :>> ', css);
    // codeCSS.innerHTML = marked("```" + css + "```")

    // wrapper.appendChild(codeCSS)
  // }

//  console.log('object :>> ',  marked("```" + component + "```"));
//  codeHTML.innerHTML = marked("```" + component + "```")
//  wrapper.appendChild(codeHTML)

  return wrapper
}

// finally, we can loop over our cache's keys and add the HTML to our output element
Object.keys(htmlFragmentCache).forEach(key => output
  .appendChild(wrapComponent(
    htmlFragmentCache[key], 
    mdFragmentCache[key],
    cssFragmentCache[key] 
  )));

