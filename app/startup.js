//app/startup.js

(function() {
	if (typeof(localStorage) == 'undefined' ) {
		alert('Your browser does not support HTML5 localStorage. Try upgrading.');
	} else {
		try {
//TODO need to restructure this for the new data model
//see AddRecipe.jsx
//recipeObj = {ingredients: [str1, str2, ...], steps: [str1, str2, ...]}
			let chocCookieObj = {
				ingredients: ['3/4 cup granulated sugar', '3/4 cup packed brown sugar', '1 cup butter or margarine, softened', '1 teaspoon vanilla', '1 egg', '2 1/4 cups Gold Medal™ all-purpose flour', '1 teaspoon baking soda', '1/2 teaspoon salt', '1 cup coarsely chopped nuts', '1 package (12 ounces) semisweet chocolate chips (2 cups)'],
				steps: ['Heat oven to 375ºF.', 'Mix sugars, butter, vanilla and egg in large bowl. Stir in flour, baking soda and salt (dough will be stiff). Stir in nuts and chocolate chips.', 'Drop dough by rounded tablespoonfuls about 2 inches apart onto ungreased cookie sheet.', 'Bake 8 to 10 minutes or until light brown (centers will be soft). Cool slightly; remove from cookie sheet. Cool on wire rack.'
				]
			};
			let tacoObj = {
				ingredients: ['1 1/2 pounds boneless beef top sirloin, cut into thin bite-size slices', '1/2 teaspoon salt', '1 teaspoon freshly ground black pepper', 'crushed red pepper to taste', '1 lime', '1 (28 ounce) can tomatillos', '2 fresh jalapeno peppers, seeded', '4 tablespoons canola oil, divided', '1 (10.5 ounce) can beef broth', '12 (6 inch) corn tortillas', '1/2 large onion, chopped', '2 tomatoes, chopped', 'Tomatoes Regular Grape', '1 avocado - peeled, pitted and sliced', '1 bunch fresh cilantro, chopped', '1 lemon'
				],
				steps: ['Place sliced meat into a shallow bowl, and season with salt, black pepper, and crushed red pepper. Squeeze the lime juice over the meat, and turn until evenly coated. Cover, and refrigerate for 30 minutes.', 'In a blender or food processor, combine tomatillo and jalapeno. Puree for 15 to 20 seconds, or until thick. Heat 1 tablespoon oil in a large skillet over medium high heat. Carefully pour in tomatillo mixture. Cook, stirring frequently, for 5 minutes. Stir in beef broth. Reduce heat, and simmer for 20 to 30 minutes, or until mixture coats a spoon. Transfer mixture to a serving dish.', 'Heat tablespoon oil in a large skillet over high heat. Stir in 1/3 of the beef, and saute for 1 minute. Transfer to serving dish. Repeat with remaining beef. Meanwhile, heat tortillas in the oven or microwave, according to package instructions.', 'To serve, place two tortillas on top of each other. Add desired amount of meat, spoon over some tomatillo mixture. Top with onions, tomatoes, avocado and cilantro. Garnish with a wedge of lemon, to be squeezed over taco before eating.'
				]
			};
			let caramIceCreamObj = {
				ingredients: ['1 cup milk', '2 tablespoons instant coffee granules', '1 cup white sugar', '1 pinch salt', '2 cups heavy cream', '3/4 cup caramel dessert sauce'],
				steps: ['Whisk together milk, instant coffee granules, sugar, and salt in a large bowl until sugar is dissolved. Stir in the heavy cream, then cover and refrigerate until chilled, at least 2 hours.', "Pour the chilled mixture into an ice cream maker and freeze according to manufacturer's directions until it reaches 'soft-serve' consistency. Transfer half of the ice cream to a one- or two-quart lidded plastic container. Pour half of the caramel sauce over the top, then repeat the layers with the remaining ice cream and caramel. Swirl the caramel into the ice cream using a chopstick or knife. Cover surface with plastic wrap and seal. For best results, ice cream should ripen in the freezer for at least 2 hours or overnight."]
			};
			localStorage.setItem('chocolate chip cookies', JSON.stringify(chocCookieObj)); //saves to the database, “key”, “value”''
			localStorage.setItem('tacos', JSON.stringify(tacoObj)); //saves to the database, “key”, “value”
			localStorage.setItem('caramel macchiato ice cream', JSON.stringify(caramIceCreamObj)); //saves to the database, “key”, “value”
		} catch (e) {
			if (e == QUOTA_EXCEEDED_ERR) {
				alert('Quota exceeded!'); //data wasn’t successfully saved due to quota exceed so throw an error
			}
		}
	}
}());