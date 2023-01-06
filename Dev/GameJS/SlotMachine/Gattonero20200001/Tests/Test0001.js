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

		var s = JoinString(a);

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
