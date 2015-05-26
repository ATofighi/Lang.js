QUnit.test( "addResource", function( assert ) {
	Lang.addResource({
		'test': 'salam'
	});
	assert.equal( Lang.languages['lang.test'], 'salam', "Passed!" );
	Lang.addResource({
		'test': 'salam2',
		'object': {
			1: 'hi',
			2: 'hi',
			3: 'hi'
		}
	});
	assert.equal( Lang.languages['lang.test'], 'salam2', "Passed!" );
	assert.notOk( Lang.languages['lang.object'], "Passed!" );
	assert.equal( Lang.languages['lang.object.3'], 'hi', "Passed!" );
	assert.notOk( Lang.languages['lang.object.0'], "Passed!" );
	Lang.clear();
	assert.notOk( Lang.languages['lang.test'], "Passed!" );
});
QUnit.test( "Has", function( assert ) {
	Lang.clear();
	Lang.addResource({
		'test': 'salam'
	});
	assert.ok( Lang.has('test'), "Passed!");
	assert.notOk( Lang.has('lang.test'), "Passed!");
	Lang.addResource({
		'test': 'salam2',
		'object': {
			1: 'hi',
			2: 'hi',
			3: 'hi'
		}
	});
	assert.ok( Lang.has('test'), "Passed!" );
	assert.notOk( Lang.has('salam'), "Passed!" );
	assert.notOk( Lang.has('salam2'), "Passed!" );
});
QUnit.test( "Trans", function( assert ) {
	Lang.clear();
	assert.equal( Lang.trans("Hi"), "Hi", "Passed!");
	assert.equal( Lang.trans("Hi :man"), "Hi :man", "Passed!");
	assert.equal( Lang.trans("Hi :man", {m: ':m'}), "Hi :man", "Passed!");
	assert.equal( Lang.trans("Hi :man", {m: 'Mad'}), "Hi Madan", "Passed!");
	assert.equal( Lang.trans("Hi :man", {m: 'Mad', ma: 'Test', man: 'Ali'}), "Hi Ali", "Passed!");
	assert.equal( Lang.trans("Hi :man.name", {m: 'Mad', ma: 'Test', man: {name:'Ali'}}), "Hi Ali", "Passed!");
	assert.equal( Lang.trans("Hi :man.lastName", {m: 'Mad', ma: 'Test', man: {name:'Ali'}}), "Hi Testn.lastName", "Passed!");
	assert.equal( Lang.trans("Hi :1", {1: 'One', 2:'Two'}), "Hi One", "Passed!");
	assert.equal( Lang.trans("Hi :2", {1: 'One', 2:'Two'}), "Hi Two", "Passed!");
	
});
QUnit.test( "Get", function( assert ) {
	Lang.clear();
	assert.equal( Lang.get("Hi"), "Hi", "Passed!");
	assert.equal( Lang.get("Hi :man"), "Hi :man", "Passed!");
	assert.equal( Lang.get("Hi :man", {m: ':m'}), "Hi :man", "Passed!");
	assert.equal( Lang.get("Hi :man", {m: 'Mad'}), "Hi Madan", "Passed!");
	assert.equal( Lang.get("Hi :man", {m: 'Mad', ma: 'Test', man: 'Ali'}), "Hi Ali", "Passed!");
	assert.equal( Lang.get("Hi :man.name", {m: 'Mad', ma: 'Test', man: {name:'Ali'}}), "Hi Ali", "Passed!");
	assert.equal( Lang.get("Hi :man.lastName", {m: 'Mad', ma: 'Test', man: {name:'Ali'}}), "Hi Testn.lastName", "Passed!");
	assert.equal( Lang.get("Hi :1", {1: 'One', 2:'Two'}), "Hi One", "Passed!");
	assert.equal( Lang.get("Hi :2", {1: 'One', 2:'Two'}), "Hi Two", "Passed!");
	
	Lang.addResource({
		hi: "Hi",
		hiMan: "Hi :man",
		hiManName: "Hi :man.name",
		hiManLastName: "Hi :man.lastName",
		hiNumber: {
			One: "Hi :1",
			Two: "Hi :2"
		}
	});
	
	assert.equal( Lang.get("hi"), "Hi", "Passed!");
	assert.equal( Lang.get("hiMan"), "Hi :man", "Passed!");
	assert.equal( Lang.get("hiMan", {m: ':m'}), "Hi :man", "Passed!");
	assert.equal( Lang.get("hiMan", {m: 'Mad'}), "Hi Madan", "Passed!");
	assert.equal( Lang.get("hiMan", {m: 'Mad', ma: 'Test', man: 'Ali'}), "Hi Ali", "Passed!");
	assert.equal( Lang.get("hiManName", {m: 'Mad', ma: 'Test', man: {name:'Ali'}}), "Hi Ali", "Passed!");
	assert.equal( Lang.get("hiManLastName", {m: 'Mad', ma: 'Test', man: {name:'Ali'}}), "Hi Testn.lastName", "Passed!");
	assert.equal( Lang.get("hiNumber.One", {1: 'One', 2:'Two'}), "Hi One", "Passed!");
	assert.equal( Lang.get("hiNumber.Two", {1: 'One', 2:'Two'}), "Hi Two", "Passed!");
	assert.notOk( Lang.get("hiNumber.two", {1: 'One', 2:'Two'}) == "Hi Two", "Passed!");
});

QUnit.test( "Choice", function( assert ) {
	Lang.clear();
	Lang.addResource({
		number: 'One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Many',
		posts: '[Inf, 0]No Posts|{1} One Post|[2, 5] A few posts|[6, 10] :count posts|[11, Inf] A lot of posts',
		posts2: '[2, 5] A few posts|{1} One Post|[6, 10] :count posts|[11, Inf] A lot of posts|[Inf, 0]No Posts'
	})
	assert.equal( Lang.choice('number', -1000000000000), "One", "Passed!");
	assert.equal( Lang.choice('number', 0), "One", "Passed!");
	assert.equal( Lang.choice('number', 1), "One", "Passed!");
	assert.equal( Lang.choice('number', 2), "Two", "Passed!");
	assert.equal( Lang.choice('number', 3), "Three", "Passed!");
	assert.equal( Lang.choice('number', 4), "Four", "Passed!");
	assert.equal( Lang.choice('number', 5), "Five", "Passed!");
	assert.equal( Lang.choice('number', 6), "Six", "Passed!");
	assert.equal( Lang.choice('number', 7), "Seven", "Passed!");
	assert.equal( Lang.choice('number', 8), "Eight", "Passed!");
	assert.equal( Lang.choice('number', 9), "Nine", "Passed!");
	assert.equal( Lang.choice('number', 10), "Ten", "Passed!");
	assert.equal( Lang.choice('number', 11), "Many", "Passed!");
	assert.equal( Lang.choice('number', 12), "Many", "Passed!");
	assert.equal( Lang.choice('number', 13), "Many", "Passed!");
	assert.equal( Lang.choice('number', 1000000000000), "Many", "Passed!");
	assert.equal( Lang.choice('number', 1e100), "Many", "Passed!");
	
	assert.equal( Lang.choice('posts', -10), "No Posts", "Passed!");
	assert.equal( Lang.choice('posts', 0), "No Posts", "Passed!");
	assert.equal( Lang.choice('posts', 1), "One Post", "Passed!");
	assert.equal( Lang.choice('posts', 2), "A few posts", "Passed!");
	assert.equal( Lang.choice('posts', 3), "A few posts", "Passed!");
	assert.equal( Lang.choice('posts', 4), "A few posts", "Passed!");
	assert.equal( Lang.choice('posts', 5), "A few posts", "Passed!");
	assert.equal( Lang.choice('posts', 6), "6 posts", "Passed!");
	assert.equal( Lang.choice('posts', 7), "7 posts", "Passed!");
	assert.equal( Lang.choice('posts', 8), "8 posts", "Passed!");
	assert.equal( Lang.choice('posts', 9), "9 posts", "Passed!");
	assert.equal( Lang.choice('posts', 10), "10 posts", "Passed!");
	assert.equal( Lang.choice('posts', 11), "A lot of posts", "Passed!");
	assert.equal( Lang.choice('posts', 11000), "A lot of posts", "Passed!");

	assert.equal( Lang.choice('posts2', -10), "No Posts", "Passed!");
	assert.equal( Lang.choice('posts2', 0), "No Posts", "Passed!");
	assert.equal( Lang.choice('posts2', 1), "One Post", "Passed!");
	assert.equal( Lang.choice('posts2', 2), "A few posts", "Passed!");
	assert.equal( Lang.choice('posts2', 3), "A few posts", "Passed!");
	assert.equal( Lang.choice('posts2', 4), "A few posts", "Passed!");
	assert.equal( Lang.choice('posts2', 5), "A few posts", "Passed!");
	assert.equal( Lang.choice('posts2', 6), "6 posts", "Passed!");
	assert.equal( Lang.choice('posts2', 7), "7 posts", "Passed!");
	assert.equal( Lang.choice('posts2', 8), "8 posts", "Passed!");
	assert.equal( Lang.choice('posts2', 9), "9 posts", "Passed!");
	assert.equal( Lang.choice('posts2', 10), "10 posts", "Passed!");
	assert.equal( Lang.choice('posts2', 11), "A lot of posts", "Passed!");
	assert.equal( Lang.choice('posts2', 11000), "A lot of posts", "Passed!");
});