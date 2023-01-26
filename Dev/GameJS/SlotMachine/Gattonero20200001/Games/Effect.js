/*
	エフェクト
*/

function* <generatorForTask> Effect_Atari_01()
{
	for (var<Picture_t> picture of P_AtariEffects_01)
	for (var<int> c = 0; c < 5; c++)
	{
		Draw(picture, Screen_W / 2, Screen_H / 2, 1.0, 0.0, 1200.0 / 192.0);

		yield 1;
	}
}

function* <generatorForTask> Effect_Atari_02()
{
	for (var<Picture_t> picture of P_AtariEffects_02)
	for (var<int> c = 0; c < 5; c++)
	{
		Draw(picture, Screen_W / 2, Screen_H / 2, 1.0, 0.0, 1200.0 / 240.0);

		yield 1;
	}
}
