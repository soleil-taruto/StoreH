/*
	描画
*/

/*
	画像の幅を取得する。

	picture: 画像

	ret: 画像の幅(ピクセル数)
*/
function <int> GetPicture_W(<Picture_t> picture)
{
	return picture.Handle.naturalWidth;
}

/*
	画像の高さを取得する。

	picture: 画像

	ret: 画像の高さ(ピクセル数)
*/
function <int> GetPicture_H(<Picture_t> picture)
{
	return picture.Handle.naturalHeight;
}

/*
	描画

	picture: 描画する画像
	x: 画像の中心とする X-座標
	y: 画像の中心とする Y-座標
	a: 不透明度 (0.0 透明 ～ 1.0 不透明)
		画像をそのまま表示するには 1.0 を指定する。
	r: 回転
		画像を回転しない場合は 0.0 を指定する。
		画像を回転する場合は時計回りのラジアン角を指定する。
		例：
			Math.PI * -0.5 == 反時計回りに90度回転する。
			Math.PI * 0.5 == 時計回りに90度回転する。
			Math.PI * 1.0 == 時計回りに180度回転する。
	z: 拡大率
		画像を拡大しない場合は 1.0 を指定する。
		例：
			0.5 == 画像を 0.5 倍のサイズで表示する。
			1.5 == 画像を 1.5 倍のサイズで表示する。
			2.0 == 画像を 2.0 倍のサイズで表示する。
*/
function <void> Draw(<Picture_t> picture, <double> x, <double> y, <double> a, <double> r, <double> z)
{
	Draw2(picture, x, y, a, r, z, z);
}

/*
	描画

	zw: 横方向の拡大率
	zh: 縦方向の拡大率

	それ以外の引数は Draw と同じ。
*/
function <void> Draw2(<Picture_t> picture, <double> x, <double> y, <double> a, <double> r, <double> zw, <double> zh)
{
	// 画像サイズ
	var<int> w = GetPicture_W(picture);
	var<int> h = GetPicture_H(picture);

	// 拡大率反映
	w *= zw;
	h *= zh;

	// 描画先左上座標
	var<double> l = x - w / 2;
	var<double> t = y - h / 2;

	// 描画設定をセットする。
	Context.translate(x, y);
	Context.rotate(r);
	Context.translate(-x, -y);
	Context.globalAlpha = a;

	// 描画する。
	Context.drawImage(picture.Handle, l, t, w, h);

	// 描画設定を元に戻す。
	Context.translate(x, y);
	Context.rotate(-r);
	Context.translate(-x, -y);
	Context.globalAlpha = 1.0;
}
