/*
	アクター - BDummy2 ★サンプル
*/

var<int> ActorKind_BDummy2 = @(AUTO);

function <BDummy2OfActor_t> CreateActor_BDummy2(<double> x, <double> y)
{
	/// BDummy2OfActor_t : Actor_t
	var ret =
	{
		Kind: ActorKind_BDummy2,
		X: x,
		Y: y,
		Crash: null,
		Killed: false,

		// ここから固有

		<double> Dummy_01: 1.0,
		<double> Dummy_02: 2.0,
		<double> Dummy_03: 3.0,
	};

	ret.Draw = @@_Draw(ret);

	return ret;
}

function* <generatorForTask> @@_Draw(<BDummy2OfActor_t> actor)
{
	for (; ; )
	{
		actor.Y += 2.0;

		if (Screen_H < actor.Y - Camera.Y)
		{
			break;
		}

		Draw(P_Dummy, actor.X - Camera.X, actor.Y - Camera.Y, 1.0, 0.0, 1.0);

		yield 1;
	}
}
