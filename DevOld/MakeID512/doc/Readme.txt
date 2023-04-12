=========
MakeID512
=========

----
コマンド

MakeID512.exe


----
ビット数換算

全て 2^512 とおり以上のランダムな識別子を生成する。

	フォーマット   ビット数換算   Keisan
	------------------------------------------------------
	B-62-88        523.*          22 * 4 = A ; 62 P @A L 2
	B-36-100-U/L   516.*          25 * 4 = A ; 36 P @A L 2
	B-26-110-U/L   517.*          22 * 5 = A ; 26 P @A L 2
	B-16-128-L/U   512            32 * 4 = A ; 16 P @A L 2
	B-10-155       514.*          31 * 5 = A ; 10 P @A L 2


----
出力フォーマット

B-62-88 ⇒

	{b6288-YYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYY}
	       ~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~
	               22文字                 22文字                 22文字                 22文字

		Y ... Base-62 文字 (0-9, A-Z, a-z)


B-36-100-U ⇒

	{B36C-YYYYYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYYYYY}
	      ~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~~~~
	               25文字                    25文字                    25文字                    25文字

		Y ... Base-36 文字 (0-9, A-Z)


B-36-100-L ⇒

	{b36c-YYYYYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYYYYY}
	      ~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~~~~
	               25文字                    25文字                    25文字                    25文字

		Y ... Base-36 文字 (0-9, a-z)


B-26-110-U ⇒

	{AZCX-YYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYY}
	      ~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~
	              22文字                 22文字                 22文字                 22文字                 22文字

		Y ... アルファベット大文字 (A-Z)


B-26-110-L ⇒

	{azcx-YYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYY}
	      ~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~
	              22文字                 22文字                 22文字                 22文字                 22文字

		Y ... アルファベット小文字 (a-z)


B-16-128-L ⇒

	{bf80-YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY}
	      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	                   32文字                           32文字                           32文字                           32文字

		Y ... 16進数 (0-9, a-f)


B-16-128-U ⇒

	{BF80-YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY}
	      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	                   32文字                           32文字                           32文字                           32文字

		Y ... 16進数 (0-9, A-F)


B-10-155 ⇒

	{10155-YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY-YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY}
	       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	                   31文字                          31文字                          31文字                          31文字                          31文字

		Y ... 10進数 (0-9)


----
出力例

B-62-88 ⇒

	{b6288-jQF9fLirqvlCWWnWHVoN0v-OrqKW0g6WBOIP8U1f5HVFw-pyHQWCGQTa265yzQwI9N49-zmuWTfRCdkdaOGu4Rm47n2}

B-36-100-U ⇒

	{B36C-W6O4AN7KGEK80I0U8IDD0GD1X-QULICULPXBQ4JINV11420MBFE-HV2KFKCRKXMQWA4LNIFH0OD3A-ME8S0W7LM2GT9C4BQCS4MLVJF}

B-36-100-L ⇒

	{b36c-f73pqtgatcsizdf730p3jd9y0-lblxghvl2zuubd4lr46p0spea-b5a9a8e95hjaqzz72dd5wv38u-x9hcgxswtzfy0036n938ophd5}

B-26-110-U ⇒

	{AZCX-TZRAODUREPWPPIDYKNQPEX-MHQXUILZCIIECAZKWYZRBV-ZNKSCIPNGUDWANJJVJJDAP-QPAONCLNWFOJNDYDCOHTPQ-GWETXDFKTZCAXAAVFPTEGR}

B-26-110-L ⇒

	{azcx-jdxdlckbsmduxgtkaryrtx-eqnoprxiexrxqdvlbfjife-kzwbgbajdcfbehxakvdljd-iirdxjretpmafczabzxgid-mprhuplpmtavtutowlwsoa}

B-16-128-L ⇒

	{bf80-afc9701bfe0e42db5a5780d1efc19177-3e57ef2a82de7cfa7a66fb65037ac01c-af525d9b388b45a753e67270cd883a73-e099784c6986ffe270395f7448ff962d}

B-16-128-U ⇒

	{BF80-CFDE65B814A12C5305068FE70E0F959B-58FEA71A3D41CD32B3966212D433DA22-52454D4F790FEC0EA5AEA6E81A78BC5F-E2E4135C7BD7A7E53249EEEFEAE72D5D}

B-10-155 ⇒

	{10155-0656735390754587400743044119114-2207215376856382029092787232857-9699007017529702863176492930080-1546970268209379595899642740666-4636763639049212246900859030141}


----
補足

生成した識別子はクリップボードにコピーする。
クリアボタンを押すとクリップボードもクリアする。

