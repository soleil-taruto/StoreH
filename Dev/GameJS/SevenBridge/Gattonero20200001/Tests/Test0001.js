/*
	ƒeƒXƒg-0001
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
