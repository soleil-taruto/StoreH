=======
HTTCmdP
=======


HTTCmd-Private (個人用-HTTCmd)


----
コマンド

HTTCmdP.exe [DOC-ROOT [PORT-NO [OPTIONS...]]]


----
OPTIONS

/K

	非シフト系キー入力でサーバーを停止できるようになります。

/T TSV-FILE

	ファイル拡張子と Content-Type の組み合わせを追加(デフォルト設定を上書き)します。

/H TSV-FILE

	リクエストヘッダの Host の値によってドキュメントルートを切り替えたい場合に使用します。

/N HTML-FILE

	リクエストされたパスが見つからなかった場合に表示される所謂オリジナル４０４ページを設定します。

/B CREDENTIALS

	BatchService-の実行者の信用証明用文字列を設定します。

/P PROGRAM-DATA-FOLDER-ROOT-DIR

	共有データのルートフォルダを指定します。
	デフォルトのルートフォルダは C:\temp\HTTCmdP_ProgramData です。
	存在しない場合、起動時にフォルダを作成します。

/D HTML-FILE

	ダウンロードページを設定します。
	文字コード：UTF-8
	置き換え：${download-url}　⇒　ダウンロードURL


----
BatchService

実行するバッチファイル

	C:\temp\HTTCmd-P_BatchService_Batch.bat

実行時のカレントディレクトリ

	C:\temp

