/*
	テスト-0001
*/

function* <generatorForTask> Test01()
{
	var<int[]> arr = [ 100, 200, 300 ];

	console.log(arr);

	var<string> str = JoinString(arr);

	console.log(str);
}

function* <generatorForTask> Test02()
{
	var<string[]> arr = [ "1", "2", "3", "4", "5" ];

	console.log(arr);

	arr = Select(arr, v => ParseInteger(v));

	console.log(arr);

	arr = Where(arr, v => v % 2 != 0);

	console.log(arr);
}

function* <generatorForTask> Test03()
{
	yield* GohoubiMain();
}

function* <generatorForTask> Test04()
{
	// -- Pong

	{
		var<Deck_t> deck = CreateDeck(0.0, 0.0);

		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 6, false));
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 7, false)); // Pong <- 除外される想定
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_HEART, 7, false)); // Pong
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_DIA,   7, false)); // Pong
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 8, false));

		console.log(GetPongIndexes(deck, CreateActor_Trump(0.0, 0.0, Suit_e_CLUB, 7, false))); // accept == [ 2, 3 ]
	}

	{
		var<Deck_t> deck = CreateDeck(0.0, 0.0);

		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 5, false));
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 9, false));
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 7, false)); // Pong
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_HEART, 7, false)); // Pong <- 除外される想定
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_DIA,   7, false)); // Pong
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_HEART, 8, false));
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_DIA,   9, false));

		console.log(GetPongIndexes(deck, CreateActor_Trump(0.0, 0.0, Suit_e_CLUB, 7, false))); // accept == [ 2, 4 ]
	}

	{
		var<Deck_t> deck = CreateDeck(0.0, 0.0);

		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 5, false));
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 9, false));
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_DIA,   6, false));
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 7, false)); // Pong
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_HEART, 7, false)); // Pong
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_DIA,   7, false)); // Pong <- 除外される想定
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_HEART, 9, false));

		console.log(GetPongIndexes(deck, CreateActor_Trump(0.0, 0.0, Suit_e_CLUB, 7, false))); // accept == [ 3, 4 ]
	}

	// -- Chow

	{
		var<Deck_t> deck = CreateDeck(0.0, 0.0);

		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 5, false)); // Chow <- 除外される想定
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 6, false)); // Chow
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 8, false)); // Chow
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 9, false)); // Chow <- 除外される想定
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_HEART, 5, false));
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_DIA,   9, false));
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 9, false));

		console.log(GetChowIndexes(deck, CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 7, false))); // accept == [ 1, 2 ]
	}

	{
		var<Deck_t> deck = CreateDeck(0.0, 0.0);

		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_HEART, 8, false));
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_DIA,   9, false));
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 9, false));
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 5, false)); // Chow
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 6, false)); // Chow
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 8, false)); // Chow <- 除外される想定
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 9, false)); // Chow <- 除外される想定

		console.log(GetChowIndexes(deck, CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 7, false))); // accept == [ 3, 4 ]
	}

	{
		var<Deck_t> deck = CreateDeck(0.0, 0.0);

		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_HEART, 5, false));
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_DIA,   6, false));
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 6, false));
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 5, false)); // Chow <- 除外される想定
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 6, false)); // Chow <- 除外される想定
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 8, false)); // Chow
		deck.Cards.push(CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 9, false)); // Chow

		console.log(GetChowIndexes(deck, CreateActor_Trump(0.0, 0.0, Suit_e_SPADE, 7, false))); // accept == [ 5, 6 ]
	}

	// --
}

function* <generatorForTask> Test05()
{
	// -- choose one --

//	yield* GameJs_Test05("W");
	yield* GameJs_Test05("L");

	// --
}
