/*
	エフェクト
*/

var <generatorForTask[]> @@_Effects = [];

/*
	エフェクトを追加する。

	effect: ジェネレータであること。
		ジェネレータが偽を返すと終了と見なす。
*/
function <void> AddEffect(<generatorForTask> effect)
{
	@@_Effects.push(effect);
}

function <void> @(UNQN)_EACH()
{
	for (var<int> index = 0; index < @@_Effects.length; index++)
	{
		var<generatorForTask> effect = @@_Effects[index];

		if (NextVal(effect)) // ? true -> エフェクト継続
		{
			// noop
		}
		else // ? false -> エフェクト終了
		{
			@@_Effects[index] = null;
		}
	}
	RemoveFalse(@@_Effects);
}

// 未使用
/*
function <generatorForTask[]> GetEffects()
{
	return @@_Effects;
}
*/

function <void> ClearAllEffect()
{
	@@_Effects = [];
}

// ====
// ここから便利機能
// ====

function <void> AddEffectDelay(<int> delayFrame, <Action> routine)
{
	AddEffect(function* <generatorForTask> ()
	{
		yield* Repeat(1, delayFrame);
		routine();
	}());
}

function <void> AddEffectKeep(<int> keepFrame, <Action> routine)
{
	AddEffect(function* <generatorForTask> ()
	{
		for (var<int> frame = 0; frame < keepFrame; frame++)
		{
			routine();
			yield 1;
		}
	}());
}
