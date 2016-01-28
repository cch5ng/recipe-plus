# Recipe Box

* Written with React, SASS, IndexedDB, ES6. Using Webpack.
* For Free Code Camp

## Limitations

* Limited support in IE, Safari and iOS Safari
  * http://caniuse.com/#feat=indexeddb

## Status

* FIX: unique keys for ingredients list items
* FIX: accordion should keep state (isOpen) dependent on click handler
* FIX: all buttons are updating the localStorage appropriately but they are not updating the state of the respective component appropriate
  * Delete button
  * Edit button
  * (DONE) Add button
* FIX: want the main list to refresh (update state for RecipeList) whenever the modal is updated (save, edit, delete)
* STYLE: make everything look beautiful
* DONE: implement edit logic
* DONE: restructure recipe list into an accordion component
* DONE: implement view logic, create component for viewing recipes list and individual recipe details
* DONE: implement delete logic

* wondering if I need to clear memory for db ever
* could I have resolved the scope issue with import
  * import DB from './startup.js'
  * something of that ilk?? 

* fixed: fri 10:30p broke logic with edit of the MModal component
  * wanted to save state for each input field so I could pass the input value to indexeddb on click save button