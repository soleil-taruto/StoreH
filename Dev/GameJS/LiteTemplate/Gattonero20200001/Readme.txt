============
LiteTemplate
============


JSゲームの軽量テンプレート


----
■環境構築手順

1. プロジェクトの展開

	本プロジェクト LiteTemplate を任意の場所に展開する。

	★以降、展開先パスを <LiteTemplate> と表記します。


2. JSJoin をインストールする。

	以下のリンクから JSJoin.zip をダウンロードする。
	http://ornithopter.ccsp.mydns.jp/HPStore/Program/JSJoin.zip

	JSJoin.zip を任意の場所に展開する。

	<LiteTemplate>\Debug.bat と <LiteTemplate>\Release.bat の JSJoin.exe へのパスを今し方展開した場所へ振り直す。


----
■ビルド手順

デバッグ用にビルドする場合：

	<LiteTemplate>\Debug.bat を実行する。

	ビルドに成功すると <LiteTemplate>\out\index.html が作成されます。


リリース用にビルドする場合：

	<LiteTemplate>\Release.bat を実行する。

	ビルドに成功すると <LiteTemplate>\out\index.html が作成されます。


- - -

デバッグ・リリースの違い：

                                   デバッグ用　           リリース用
--------------------------------------------------------------------
難読化                             しない                 する
リソースを出力先に含める           含めない               含める
広域変数 DEBUG の値                真                     偽
広域変数 RELEASE の値              偽                     真
使用する index.html テンプレート   _index_Debug.html.js   _index_Release.html.js


----
■フォルダ・ファイル構成

<LiteTemplate>
│
│  Clean.bat           出力先フォルダをクリアするバッチ
│  Debug.bat           デバッグ用にビルドするバッチ
│  Release.bat         リリース用にビルドするバッチ
│
├─Gattonero20200001   ソースフォルダ
│  │
│  └─ ...
│
├─out                 出力先フォルダ
│
└─res                 リソースフォルダ
    │
    └─ ...


----
■ソースフォルダ・ファイル構成

<LiteTemplate>\Gattonero20200001
│
│  00_Consts.js                      画面サイズに関する定数
│  Entrance.js                       ゲームの入り口画面
│  Loading.js                        ロード中画面
│  Program.js                        エントリーポイント
│  Readme.txt                        このファイル
│  tags                              秀丸用タグファイル
│  _index_Debug.html.js              デバッグ用 index.html のテンプレート
│  _index_Release.html.js            リリース用 index.html のテンプレート
│
├─GameCommons                       ゲーム用共通機能
│      Draw.js                       描画
│      Engine.js                     コアな部分
│      Mouse.js                      マウス・タッチ操作
│      Music.js                      音楽
│      Resource.js                   リソース用
│      Resource_LoadPicture.js       リソース・画像
│      Resource_LoadSound.js         リソース・音楽
│      Resource_LoadSoundEffect.js   リソース・効果音
│      SoundEffect.js                効果音
│
├─GameCommons_Resource              リソースを変数として定義しているところ
│      Music.js                      音楽
│      Picture.js                    画像
│      SoundEffect.js                効果音
│
└─Games                             このゲーム固有の機能
        Game.js                       ゲームの中身


このゲームの中身は <LiteTemplate>\Games\Game.js に記述します。基本的にこのファイル (及び <LiteTemplate>Games の配下) を
いじってゲームを構築します。

ゲームが開始されると <LiteTemplate>\Games\Game.js の GameMain 関数が呼び出されます。
GameMain はジェネレータ関数で yield 1; するたびに画面のリフレッシュ(次のフレーム)を待ちます。
GameMain は関数を終了 (return) してはなりません。

それ以外のファイル (<LiteTemplate>\Games 以外) は基本的に触りません。
必要に応じて修正して下さい。


----
ソースファイルのプレーンJSとの相違点 (JSJoin 固有の記法)

1. キーワード @@

	ファイル毎にユニークな文字列(識別子の一部)に置き換えられます。
	これにより...

	function FUNCNAME() { ... }
	var VARNAME;

	...と定義された関数・変数はアプリ内全域からアクセス可能(グローバルスコープ)となり...

	function @@_FUNCNAME() { ... }
	var @@_VARNAME;

	...と定義された関数・変数はファイル内のみからアクセス可能(ファイルスコープ)となります。


2. var ⇒ let

	キーワード var は let に置き換えます。
	例えば var ABC; は JSJoin によって let ABC; に置き換えられます。


3. 型名

	"<" + ((空白, "=") 以外) と ">" により囲まれた範囲は JSJoin によって除去されます。
	当該範囲には型名を記述します。
	例えば...

	var<double> DoubleFloatValue = 1.0;

	...という宣言は JSJoin によって...

	let DoubleFloatValue = 1.0;

	...に置き換わります。
	また...

	function <int> StringToIntFunc(<string> str) { ... }

	...という関数は...

	function StringToIntFunc(str) { ... }

	...というコードに置き換わります。


----
画像リソースの追加方法

1. 画像ファイルをリソースフォルダに追加

　<LiteTemplate>\res の配下に画像ファイルを配置する。
　ここでは <LiteTemplate>\res\PicData\NewPic.png を追加したとします。

　★res直下のフォルダ名は「英小文字で始まってはならない」ことに注意して下さい。


2. リソースを変数として定義

　<LiteTemplate>\Gattonero20200001\GameCommons_Resource\Picture.js に以下の行を追加する。

　var<Picture_t> P_NewPic = @@_Load(RESOURCE_PicData__NewPic_png);
　                 ~~~~~~                    ~~~~~~~~~~~~~~~~~~~
　                 任意の名前                追加した画像ファイルのパス

　追加した画像ファイルのパスはres直下からの相対パスの \ を __ に . を _ に置き換えた文字列です。
　今回の場合、相対パスは PicData\NewPic.png なので、置き換えすると PicData__NewPic_png となります。


3. 描画するには

　Draw(P_NewPic, 500, 500, 1.0, 0.0, 1.0); などとします。


----
音楽リソースの追加方法

1. 音楽ファイルをリソースフォルダに追加

　<LiteTemplate>\res の配下に音楽ファイルを配置する。
　ここでは <LiteTemplate>\res\MusicData\NewMusic.mp3 を追加したとします。

　★res直下のフォルダ名は「英小文字で始まってはならない」ことに注意しで下さい。


2. リソースを変数として定義

　<LiteTemplate>\Gattonero20200001\GameCommons_Resource\Music.js に以下の行を追加する。

　var<Sound_t> M_NewMusic = @@_Load(RESOURCE_MusicData__NewMusic_mp3);
　               ~~~~~~~~                    ~~~~~~~~~~~~~~~~~~~~~~~
　               任意の名前                  追加した音楽ファイルのパス

　追加した音楽ファイルのパスはres直下からの相対パスの \ を __ に . を _ に置き換えた文字列です。
　今回の場合、相対パスは MusicData\NewMusic.mp3 なので、置き換えすると MusicData__NewMusic_mp3 となります。


3. 音楽を再生するには

　Play(M_NewMusic); などとします。


----
効果音リソースの追加方法

1. 効果音(音声)ファイルをリソースフォルダに追加

　<LiteTemplate>\res の配下に効果音ファイルを配置する。
　ここでは <LiteTemplate>\res\SEData\NewSE.mp3 を追加したとします。

　★res直下のフォルダ名は「英小文字で始まってはならない」ことに注意しで下さい。


2. リソースを変数として定義

　<LiteTemplate>\Gattonero20200001\GameCommons_Resource\SoundEffect.js に以下の行を追加する。

　var<Sound_t> S_NewSE = @@_Load(RESOURCE_SEData__NewSE_mp3);
　               ~~~~~                    ~~~~~~~~~~~~~~~~~
　               任意の名前               追加した効果音ファイルのパス

　追加した効果音ファイルのパスはres直下からの相対パスの \ を __ に . を _ に置き換えた文字列です。
　今回の場合、相対パスは SEData\NewSE.mp3 なので、置き換えすると SEData__NewSE_mp3 となります。


3. 効果音を再生するには

　SE(S_NewSE); などとします。


----
広域関数・広域変数一覧

	<LiteTemplate>\Gattonero20200001\00_Consts.js

		Screen_W         内部スクリーンの幅
		Screen_H         内部スクリーンの高さ
		Canvas_W         外部スクリーンの幅
		Canvas_H         外部スクリーンの高さ


		★内部スクリーンは Draw などの描画先となるスクリーンです。
		　例えば Draw(p, Screen_W, Screen_H, 1.0, 0.0, 1.0); は画面右下の角を中心に p を描画します。
		　Draw(p, Screen_W / 2.0, Screen_H / 2.0, 1.0, 0.0, 1.0); は画面中央に p を描画します。

		★外部スクリーンのサイズはブラウザに表示するサイズです。


	<LiteTemplate>\Gattonero20200001\GameCommons\Draw.js

		GetPicture_W     画像の幅を得る。
		GetPicture_H     画像の高さを得る。
		Draw             画像を描画する。
		Draw2            画像を描画する。


	<LiteTemplate>\Gattonero20200001\GameCommons\Engine.js

		Canvas           描画先Canvasタグ
		CanvasBox        Canvbasタグを入れるDivタグ
		ProcFrame        ゲーム開始から何フレーム目かを表す整数
		Context          描画先コンテキスト


	<LiteTemplate>\Gattonero20200001\GameCommons\Mouse.js

		GetMouseDown     マウス押下状態取得
		ClearMouseDown   マウス押下状態クリア
		GetMouseX        マウスの位置(X-軸)を得る。
		GetMouseY        マウスの位置(Y-軸)を得る。


	<LiteTemplate>\Gattonero20200001\GameCommons\Music.js

		Play             音楽を再生する。
		Fadeout          再生中の音楽をフェードアウトする。
		Fadeout_F        再生中の音楽をフェードアウトする。


	<LiteTemplate>\Gattonero20200001\GameCommons\SoundEffect.js

		SE               効果音を再生する。

