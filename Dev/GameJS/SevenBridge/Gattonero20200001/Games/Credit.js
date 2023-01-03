/*
	クレジット
*/

// 追加クレジット
var<int> @@_CREDIT_ADD = 100;

// クレジット追加周期
var<int> @@_PERIDO_FRAME = 180 * 60;

// クレジット追加まで
var<int> @@_RemFrame = @@_PERIDO_FRAME;

function <void> @(UNQN)_EACH()
{
	@@_RemFrame--;

	if (@@_RemFrame <= 0)
	{
		AddGameCredit(@@_CREDIT_ADD);
		@@_RemFrame = @@_PERIDO_FRAME;
	}
}

function <int> GetAddGameCreditRemFrame()
{
	return @@_RemFrame;
}
