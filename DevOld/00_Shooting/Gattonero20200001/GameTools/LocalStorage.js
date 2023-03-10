/*
	ローカルストレージ (ゲームのセーブデータ取り扱い)
*/

function <void> LoadLocalStorage()
{
	try
	{
		var data = GetLocalStorageValue("@(APID)_SaveData", null);

		if (data == null)
		{
			throw null;
		}
		data = Tokenize(data, ";", false, false);
		var<int> c = 0;

		// SaveData >

		MusicVolume = StrToInt(data[c++]) / 100.0;
		SEVolume    = StrToInt(data[c++]) / 100.0;

		PadInputIndex_A = StrToInt(data[c++]);
		PadInputIndex_B = StrToInt(data[c++]);
		PadInputIndex_Pause = StrToInt(data[c++]);

		HiScore = StrToInt(data[c++]);

		// < SaveData
	}
	catch // ロードに失敗したらデフォルト値をセットする。
	{
		// SaveData >

		MusicVolume = DEFAULT_MUSIC_VOLUME;
		SEVolume    = DEFAULT_SE_VOLUME;

		PadInputIndex_A = 0;
		PadInputIndex_B = 3;
		PadInputIndex_Pause = 9;

		HiScore = 0;

		// < SaveData
	}
}

function <void> SaveLocalStorage()
{
	var<string[]> data = [];

	// SaveData >

	data.push("" + ToInt(MusicVolume * 100.0));
	data.push("" + ToInt(SEVolume * 100.0));

	data.push("" + PadInputIndex_A);
	data.push("" + PadInputIndex_B);
	data.push("" + PadInputIndex_Pause);

	data.push("" + HiScore);

	// < SaveData

	SetLocalStorageValue("@(APID)_SaveData", data.join(";"));
}
