/*
	ゲーム・メイン
*/

// カメラ位置(整数)
var<D2Point_t> Camera = CreateD2Point(0.0, 0.0);

// ゲーム用タスク
var<TaskManager_t> GameTasks = CreateTaskManager();

var<int> @@_Credit = 1000;

function <void> AddGameCredit(<int> value)
{
	@@_Credit += value;
}

function* <generatorForTask> GameMain()
{
	FreezeInput();
	ClearAllActor();
	ClearAllTask(GameTasks);

	for (; ; )
	{
		yield* @@_TitleMain();
		yield* @@_RotateMain();
		yield* @@_ResultMain();
	}

	error(); // この関数は終了してはならない。
}

function* <generatorForTask> @@_TitleMain()
{
	FreezeInput();

	for (; ; )
	{
		SetColor("#008080");
		PrintRect(0, 0, Screen_W, Screen_H);

		SetColor("#ffffff");
		SetFSize(100);
		SetPrint(100, 200, 0);
		PrintLine("制作中...");

		// TODO
		// TODO
		// TODO

		yield 1;
	}

	FreezeInput();
}

function* <generatorForTask> @@_RotateMain()
{
	error(); // TODO
}

function* <generatorForTask> @@_ResultMain()
{
	error(); // TODO
}
