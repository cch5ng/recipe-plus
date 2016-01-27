//app/startup.js

(function() {
	if (typeof(localStorage) == 'undefined' ) {
		alert('Your browser does not support HTML5 localStorage. Try upgrading.');
	} else {
		try {
			localStorage.setItem('chocolate chip cookies', 'butter, sugar, eggs, vanilla, flour, baking soda, hot water, salt, chocolate chips, walnuts'); //saves to the database, “key”, “value”
			localStorage.setItem('tacos', 'sirloin steak, salt, black pepper, veg oil, corn tortillas, onion, jalapeno, cilantro, lime'); //saves to the database, “key”, “value”
			localStorage.setItem('caramel macchiato ice cream', 'milk, instant coffee, sugar, salt, heavy cream, caramel sauce'); //saves to the database, “key”, “value”
		} catch (e) {
			if (e == QUOTA_EXCEEDED_ERR) {
				alert('Quota exceeded!'); //data wasn’t successfully saved due to quota exceed so throw an error
			}
		}
	}
}());