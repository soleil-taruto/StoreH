/*
	判定系・評価ポイント算出
*/

/*
	どのカードを切るべきか判定する。

	ret: 切るべきカードのインデックス
*/
function <int> GetWasteIndex(<Deck_t> deck)
{
	var<double> bestPoint = -IMAX;
	var<int> bestRet = -1;

//	for (var<int> i = 0; i < deck.Cards.length; i++)
	for (var<int> i = deck.Cards.length - 1; 0 <= i; i--) // なるべくツモったカードを切らせたい。
	{
		var<double> point = @@_GetHyoukaPoint_CR(deck.Cards, [ i ]);

		if (bestPoint < point)
		{
			bestPoint = point;
			bestRet = i;
		}
	}
	return bestRet;
}

// ====
// ====
// ====

/*
	デッキを評価する。

	ret: 評価値
*/
function <double> GetHyoukaPoint(<Deck_t> deck)
{
	return @@_GetHyoukaPoint_CR(deck.Cards, []);
}

function <double> @@_GetHyoukaPoint_CR(<Trump_t[]> cards, <int[]> rmIdxs)
{
	@@_Point = 0.0;
	@@_Search(cards, rmIdxs);
	return @@_Point;
}

var<double> @@_Point;

function <void> @@_Search(<Trump_t[]> cards, <int[]> rmIdxs)
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
		return;
	}

	if (cards.length == 2)
	{
		if (cards[0].Number == cards[1].Number)
		{
			@@_Point += 1.0;
		}
		return;
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
			@@_Point += 1.0;
			@@_Search(cards, [ a, b, c ]);
		}

		if (
			cards[a].Number == cards[b].Number &&
			cards[a].Number == cards[c].Number
			)
		{
			@@_Point += 1.0;
			@@_Search(cards, [ a, b, c ]);
		}
	}

	for (var<int> a = 0; a < cards.length; a++)
	for (var<int> b = 0; b < cards.length; b++)
	if (a != b)
	{
		if (
			cards[a].Suit == cards[b].Suit &&
			cards[a].Number + 1 == cards[b].Number
			)
		{
			@@_Point += 0.01;
			@@_Search(cards, [ a, b ]);
		}

		if (
			cards[a].Number == cards[b].Number
			)
		{
			@@_Point += 0.01;
			@@_Search(cards, [ a, b ]);
		}
	}
}
