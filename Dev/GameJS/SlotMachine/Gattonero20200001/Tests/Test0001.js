/*
	ƒeƒXƒg-0001
*/

function* <generatorForTask> Test01()
{
	var m = {};

	for (var<int> c = 0; c < 1000000; c++)
	{
//		var a = [ 1, 2, 3, 4 ];
		var a = [ 1, 2, 3, 4, 5 ];
//		var a = [ 1, 2, 3, 4, 5, 6 ];

		Shuffle(a);

		var s = JoinString(a, "");

		if (m[s] == undefined)
		{
			m[s] = 0;
		}
		m[s]++;
	}

	for (var s in m)
	{
		console.log(s + " ==> " + m[s]);
	}
}

function* <generatorForTask> Test02()
{
	for (; ; )
	{
		if (GetMouseDown() == -1)
		{
			break;
		}

		SetColor("#00ffff");
		PrintRect(0, 0, Screen_W, Screen_H);

		SetPrint(10, 110);
		SetFSize(100);
		SetColor("#000000");
		PrintLine("CLICK SCREEN");

		yield 1;
	}

	// ----

	AddEffect(Effect_Atari_01());
	AddEffectDelay(30, () => AddEffect(Effect_Atari_02()));
	AddEffectDelay(60, () => AddEffect(Effect_Atari_03(1234567890)));

	for (; ; )
	{
		SetColor("#808080");
		PrintRect(0, 0, Screen_W, Screen_H);

		yield 1;
	}
}
