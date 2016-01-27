# Recipe Box

* Written with React, SASS, IndexedDB, ES6. Using Webpack.
* For Free Code Camp

## Limitations

* Limited support in IE, Safari and iOS Safari
  * http://caniuse.com/#feat=indexeddb

## Status

* TODO: implement edit logic
* FIX: want the main list to refresh (update state for RecipeList) whenever the modal is updated (save, edit, delete)
* STYLE: make everything look beautiful
* DONE: restructure recipe list into an accordion component
* DONE: implement view logic, create component for viewing recipes list and individual recipe details
* DONE: implement delete logic

* wondering if I need to clear memory for db ever
* could I have resolved the scope issue with import
  * import DB from './startup.js'
  * something of that ilk?? 

* fixed: fri 10:30p broke logic with edit of the MModal component
  * wanted to save state for each input field so I could pass the input value to indexeddb on click save button