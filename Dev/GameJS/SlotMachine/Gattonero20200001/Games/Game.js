/*
	�Q�[���E���C��
*/

// �J�����ʒu(����)
var<D2Point_t> Camera = CreateD2Point(0.0, 0.0);

// �Q�[���p�^�X�N
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
	}

	error(); // ���̊֐��͏I�����Ă͂Ȃ�Ȃ��B
}

function* <generatorForTask> @@_TitleMain()
{
	FreezeInput();

	for (; ; )
	{
		if (GetMouseDown() == -1)
		{
			if (HoveredPicture == P_Lane01Button)
			{
				yield* @@_SlotMain(1);
			}
			else if (HoveredPicture == P_Lane02Button)
			{
				yield* @@_SlotMain(2);
			}
			else if (HoveredPicture == P_Lane03Button)
			{
				yield* @@_SlotMain(3);
			}
			else if (HoveredPicture == P_LaneXXButton)
			{
				yield* @@_SlotMain(4);
			}
		}

		// �w�i
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
		PrintLine("�ǂ̃��[���֍s���H�H");

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

/*
	laneNo: 1 - 4
*/
function* <generatorForTask> @@_SlotMain(<int> laneNo)
{
	var<int[]> LANE_01_PIC_CNTS = [ 2, 3, 5, 7, 11, 13, 17, 19, 23 ];
	var<int[]> LANE_02_PIC_CNTS = [ 1, 2, 4, 8, 16, 24, 36, 54, 81 ];
	var<int[]> LANE_03_PIC_CNTS = [ 3, 4, 5, 6, 12, 13, 14, 15, 21 ];

	var<int[][]> picCntsLst;

	switch (laneNo)
	{
	case 1:
		picCntsLst = [ LANE_01_PIC_CNTS, LANE_01_PIC_CNTS, LANE_01_PIC_CNTS ];
		break;

	case 2:
		picCntsLst = [ LANE_02_PIC_CNTS, LANE_02_PIC_CNTS, LANE_02_PIC_CNTS ];
		break;

	case 3:
		picCntsLst = [ LANE_03_PIC_CNTS, LANE_03_PIC_CNTS, LANE_03_PIC_CNTS ];
		break;

	case 4:
		picCntsLst =
		[
			ChooseOne([ LANE_01_PIC_CNTS, LANE_02_PIC_CNTS, LANE_03_PIC_CNTS ]),
			ChooseOne([ LANE_01_PIC_CNTS, LANE_02_PIC_CNTS, LANE_03_PIC_CNTS ]),
			ChooseOne([ LANE_01_PIC_CNTS, LANE_02_PIC_CNTS, LANE_03_PIC_CNTS ]),
		];
		break;

	default:
		error();
	}

	if (
		picCntsLst.length != 3 ||
		picCntsLst[0].length != SLOT_PIC_NUM ||
		picCntsLst[1].length != SLOT_PIC_NUM ||
		picCntsLst[2].length != SLOT_PIC_NUM
		)
	{
		error();
	}

	var<int[][]> drums = [];

	for (var<int> c = 0; c < 3; c++)
	{
		var<int[]> drum = [];

		for (var<int> i = 0; i < SLOT_PIC_NUM; i++)
		{
			AddElements(drum, Repeat(i, picCntsLst[c][i]));
		}
		Shuffle(drum);
		drums.push(drum);
	}

	@@_Drums = drums;
	@@_DrumRots = [ 0.0, 0.0, 0.0 ];

	FreezeInput();

	for (; ; )
	{
		@@_DrawSlot();



		yield 1;
	}

	FreezeInput();
}

/*
	��]�h����
	�����F[3][�G���̐�] -- �e�h�����ŊG���̐����Ⴄ���Ƃ�����B
	�l�F�G����index (0 �` (SLOT_PIC_NUM - 1))
*/
var<int[][]> @@_Drums;

/*
	��]�h�����̈ʒu
	�����F[3]
	�l�F����G�����玟�̊G���܂ł� 1.0 �Ƃ���B�v���X�����ŊG���͏�ֈړ�
*/
var<double[]> @@_DrumRots;

function <void> @@_DrawSlot()
{
	SetColor("#ffffff");
	PrintRect(0, 0, Screen_W, Screen_H);

	for (var<int> c = 0; c < 3; c++)
	for (var<int> d = 0; d < 3; d++) // test test test
	{
		Draw(P_SlotPics[@@_Drums[c][d]], 500 + c * 250, 400 + d * 200, 1.0, 0.0, 1.0);
	}

	for (var<int> c = 0; c < 3; c++)
	{
		Draw(P_DrumShadow, 500 + c * 250, 600, 1.0, 0.0, 1.0);
	}

	Draw(P_SlotBackground, Screen_W / 2, Screen_H / 2, 1.0, 0.0, 1.0);
}
