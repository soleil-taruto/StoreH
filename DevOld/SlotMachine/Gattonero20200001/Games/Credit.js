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
		SE(S_ChargeCoin);

		AddGameCredit(@@_CREDIT_ADD);
		@@_RemFrame = @@_PERIDO_FRAME;
	}
}

function <int> GetAddGameCreditRemFrame()
{
	return @@_RemFrame;
}

function <int> GetAddGameCreditRemSec()
{
	return ToFix(GetAddGameCreditRemFrame() / 60);
}

function <int> GetAddGameCreditRem_IntMM()
{
	return ToFix(GetAddGameCreditRemSec() / 60);
}

function <int> GetAddGameCreditRem_IntSS()
{
	return GetAddGameCreditRemSec() % 60;
}

function <string> GetAddGameCreditRem_MM()
{
	return ZPad(GetAddGameCreditRem_IntMM(), 2, "0");
}

function <string> GetAddGameCreditRem_SS()
{
	return ZPad(GetAddGameCreditRem_IntSS(), 2, "0");
}
