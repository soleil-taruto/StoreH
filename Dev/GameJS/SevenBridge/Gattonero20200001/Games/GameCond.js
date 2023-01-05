/*
	判定系
*/

/*
	「チー」可能であるか判定する。

	ret: できない場合 null
		できる場合、対応するデッキのカードのインデックス配列を返す。長さ=2
*/
function <int[]> GetChowIndexes(<Deck_t> deck, <Trump_t> lastWastedCard)
{
	// HACK: 複数マッチする場合を考慮していない。

	var<int> i = IndexOf(deck.Cards, card => card.Suit == lastWastedCard.Suit && card.Number == lastWastedCard.Number + 1);
	var<int> j = IndexOf(deck.Cards, card => card.Suit == lastWastedCard.Suit && card.Number == lastWastedCard.Number + 2);

	if (i != -1 && j != -1)
	{
		return [ i, j ];
	}

	i = IndexOf(deck.Cards, card => card.Suit == lastWastedCard.Suit && card.Number == lastWastedCard.Number - 1);
	j = IndexOf(deck.Cards, card => card.Suit == lastWastedCard.Suit && card.Number == lastWastedCard.Number + 1);

	if (i != -1 && j != -1)
	{
		return [ i, j ];
	}

	i = IndexOf(deck.Cards, card => card.Suit == lastWastedCard.Suit && card.Number == lastWastedCard.Number - 2);
	j = IndexOf(deck.Cards, card => card.Suit == lastWastedCard.Suit && card.Number == lastWastedCard.Number - 1);

	if (i != -1 && j != -1)
	{
		return [ i, j ];
	}

	return null;
}

/*
	「ポン」可能であるか判定する。

	ret:
		できない場合 null
		できる場合、対応するデッキのカードのインデックス配列を返す。長さ=2
*/
function <int[]> GetPongIndexes(<Deck_t> deck, <Trump_t> lastWastedCard)
{
	// HACK: 複数マッチする場合を考慮していない。

	var<int[]> ret = [];

	for (var<int> i = 0; i < deck.Cards.length; i++)
	{
		var<Trump_t> card = deck.Cards[i];

		if (card.Number == lastWastedCard.Number)
		{
			ret.push(i);
		}
	}
	if (ret.length == 3)
	{

console.log("GPI ret1: " + ret); // test

		var<double> p1 = @@_GPI_GetChowHyoukaPoint(deck, ret[0]);
		var<double> p2 = @@_GPI_GetChowHyoukaPoint(deck, ret[1]);
		var<double> p3 = @@_GPI_GetChowHyoukaPoint(deck, ret[2]);

console.log("GPI p1: " + p1); // test
console.log("GPI p2: " + p2); // test
console.log("GPI p3: " + p3); // test

		if (Math.max(p1, p2) < p3)
		{
			DesertElement(ret, 2);
		}
		else if (p1 < p2)
		{
			DesertElement(ret, 1);
		}
		else
		{
			DesertElement(ret, 0);
		}

console.log("GPI ret2: " + ret); // test

		if (ret.length != 2) // 2bs
		{
			error();
		}

		return ret;
	}
	if (ret.length == 2)
	{
		return ret;
	}
	return null;
}

function <double> @@_GPI_GetChowHyoukaPoint(<Deck_t> deck, <int> cardIdx)
{
	var<double> ret = 0.0;

	for (var<int> i = 0; i < deck.Cards.length; i++)
	{
		if (i == cardIdx)
		{
			// noop
		}
		else if (
			deck.Cards[i].Suit == deck.Cards[cardIdx].Suit &&
			Math.abs(deck.Cards[i].Number - deck.Cards[cardIdx].Number) == 1
			)
		{
			ret += 1.0;
		}
		else if (
			deck.Cards[i].Suit == deck.Cards[cardIdx].Suit &&
			Math.abs(deck.Cards[i].Number - deck.Cards[cardIdx].Number) == 2
			)
		{
			ret += 0.01;
		}
	}
	return ret;
}

/*
	「ロン」可能であるか判定する。

	ret: ロン可能であるか
*/
function <boolean> IsCanRon(<Deck_t> deck, <Trump_t> lastWastedCard)
{
	var<Trump_t> cards = [];

	AddElements(cards, deck.Cards);
	AddElement(cards, lastWastedCard);

	return @@_IsCanAgari_Cards(cards);
}

/*
	「カン」可能であるか判定する。

	ret:
		できない場合 null
		できる場合、対応するデッキのカードのインデックス配列を返す。長さ=4
*/
function <int[]> GetKongIndexes(<Deck_t> deck)
{
	// HACK: 複数マッチする場合を考慮していない。

	for (var<int> n = 1; n <= 13; n++)
	{
		var<int[]> ret = [];

		for (var<int> i = 0; i < deck.Cards.length; i++)
		{
			var<Trump_t> card = deck.Cards[i];

			if (card.Number == n)
			{
				ret.push(i);

				if (ret.length == 4)
				{
					return ret;
				}
			}
		}
	}
	return null;
}

/*
	ツモ上がり可能であるか判定する。

	ret: ツモ上がり可能であるか
*/
function <boolean> IsCanAgari(<Deck_t> deck)
{
	return @@_IsCanAgari_Cards(deck.Cards);
}

function <boolean> @@_IsCanAgari_Cards(<Trump_t[]> cards)
{
	return @@_IsCanAgari_Nest(cards, []);
}

function <boolean> @@_IsCanAgari_Nest(<Trump_t[]> cards, <int[]> rmIdxs)
{
	cards = CloneArray(cards);

	for (var<int> rmIdx of rmIdxs)
	{
		cards[rmIdx] = null;
	}
	RemoveFalse(cards);

	// ----

	if (cards.length < 2) // 2bs
	{
		return false;
	}

	if (cards.length == 2)
	{
		return cards[0].Number == cards[1].Number;
	}

	for (var<int> a = 0; a < cards.length; a++)
	for (var<int> b = 0; b < cards.length; b++)
	for (var<int> c = 0; c < cards.length; c++)
	if (a != b && b != c && c != a)
	{
		if (
			cards[a].Suit == cards[b].Suit &&
			cards[a].Suit == cards[c].Suit &&
			cards[a].Number + 1 == cards[b].Number &&
			cards[a].Number + 2 == cards[c].Number
			)
		{
			if (@@_IsCanAgari_Nest(cards, [ a, b, c ]))
			{
				return true;
			}
		}

		if (
			cards[a].Number == cards[b].Number &&
			cards[a].Number == cards[c].Number
			)
		{
			if (@@_IsCanAgari_Nest(cards, [ a, b, c ]))
			{
				return true;
			}
		}
	}
}
