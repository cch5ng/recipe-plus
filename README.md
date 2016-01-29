# Recipe Box

* Written with React, SASS, IndexedDB, ES6. Using Webpack.
* For Free Code Camp

## Limitations

* Limited support in IE, Safari and iOS Safari
  * http://caniuse.com/#feat=indexeddb

## Status

* FIX: delete button, how to affect the parent, RecipeList state
	maybe I can merge up Recipe into RecipeList?
* FIX: all buttons are updating the localStorage appropriately but they are not updating the state of the respective component appropriate
  * Delete button (not sure how to go from recipe to recipeList)
  * (DONE) Add button
  * (DONE) Edit button
  * DONE: want the main list to refresh (update state for RecipeList) whenever the modal is updated (save, edit, delete)
* STYLE: make everything look beautiful
* DONE: when user tries to save new recipe, there should be validation to check that name is a unique key in localStorage, otherwise suggest a different one (otherwise the old value would get overwritten even if the user doesn't intend)
* DONE: accordion should keep state (isOpen) dependent on click handler
* DONE: unique keys for ingredients list items
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