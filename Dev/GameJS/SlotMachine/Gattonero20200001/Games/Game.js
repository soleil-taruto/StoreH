/*
	ゲーム・メイン
*/

// カメラ位置(整数)
var<D2Point_t> Camera = CreateD2Point(0.0, 0.0);

// ゲーム用タスク
var<TaskManager_t> GameTasks = CreateTaskManager();

var<int> @@_Credit = 1000;
var<int> @@_CreditDisp = @@_Credit;

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
		// 背景
		{
			var<double> x = 600.0 + Math.sin(ProcFrame / 1333.0) * 300.0;
			var<double> y = 600.0;

			Draw(P_Background, x, y, 1.0, 0.0, 1.0);

			SetColor("#00004080");
			PrintRect(0, 0, Screen_W, Screen_H);
		}

		SetColor("#ffffff");
		SetFSize(100);
		SetPrint(100, 200, 0);
		PrintLine("どのレーンへ行く？？");

		{
			var<double> x = 600.0;
			var<double> y = 400.0;
			var<double> yStep = 180.0;

			Draw(P_Lane01Button, x, y, 1.0, 0.0, 1.0);
			y += yStep;
			Draw(P_Lane02Button, x, y, 1.0, 0.0, 1.0);
			y += yStep;
			Draw(P_Lane03Button, x, y, 1.0, 0.0, 1.0);
			y += yStep;
			Draw(P_LaneXXButton, x, y, 1.0, 0.0, 1.0);
		}

		yield 1;
	}

	FreezeInput();
}

function <void> @@_DrawSlotWall()
{
	error(); // TODO
}

function <void> @@_DrawSlotFront()
{
	error(); // TODO
}

function* <generatorForTask> @@_RotateMain()
{
	error(); // TODO
}

function* <generatorForTask> @@_ResultMain()
{
	error(); // TODO
}
