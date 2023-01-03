/*
	�`��
*/

/*
	�摜�̕����擾����B

	picture: �摜

	ret: �摜�̕�(�s�N�Z����)
*/
function <int> GetPicture_W(<Picture_t> picture)
{
	return picture.Handle.naturalWidth;
}

/*
	�摜�̍������擾����B

	picture: �摜

	ret: �摜�̍���(�s�N�Z����)
*/
function <int> GetPicture_H(<Picture_t> picture)
{
	return picture.Handle.naturalHeight;
}

/*
	�`��

	picture: �`�悷��摜
	x: �摜�̒��S�Ƃ��� X-���W
	y: �摜�̒��S�Ƃ��� Y-���W
	a: �s�����x (0.0 ���� �` 1.0 �s����)
		�摜�����̂܂ܕ\������ɂ� 1.0 ���w�肷��B
	r: ��]
		�摜����]���Ȃ��ꍇ�� 0.0 ���w�肷��B
		�摜����]����ꍇ�͎��v���̃��W�A���p���w�肷��B
		��F
			Math.PI * -0.5 == �����v����90�x��]����B
			Math.PI * 0.5 == ���v����90�x��]����B
			Math.PI * 1.0 == ���v����180�x��]����B
	z: �g�嗦
		�摜���g�債�Ȃ��ꍇ�� 1.0 ���w�肷��B
		��F
			0.5 == �摜�� 0.5 �{�̃T�C�Y�ŕ\������B
			1.5 == �摜�� 1.5 �{�̃T�C�Y�ŕ\������B
			2.0 == �摜�� 2.0 �{�̃T�C�Y�ŕ\������B
*/
function <void> Draw(<Picture_t> picture, <double> x, <double> y, <double> a, <double> r, <double> z)
{
	Draw2(picture, x, y, a, r, z, z);
}

/*
	�`��

	zw: �������̊g�嗦
	zh: �c�����̊g�嗦

	����ȊO�̈����� Draw �Ɠ����B
*/
function <void> Draw2(<Picture_t> picture, <double> x, <double> y, <double> a, <double> r, <double> zw, <double> zh)
{
	// �摜�T�C�Y
	var<int> w = GetPicture_W(picture);
	var<int> h = GetPicture_H(picture);

	// �g�嗦���f
	w *= zw;
	h *= zh;

	// �`��捶����W
	var<double> l = x - w / 2;
	var<double> t = y - h / 2;

	// �`��ݒ���Z�b�g����B
	Context.translate(x, y);
	Context.rotate(r);
	Context.translate(-x, -y);
	Context.globalAlpha = a;

	// �`�悷��B
	Context.drawImage(picture.Handle, l, t, w, h);

	// �`��ݒ�����ɖ߂��B
	Context.translate(x, y);
	Context.rotate(-r);
	Context.translate(-x, -y);
	Context.globalAlpha = 1.0;
}
