============
LiteTemplate
============


JS�Q�[���̌y�ʃe���v���[�g


----
�����\�z�菇

1. �v���W�F�N�g�̓W�J

	�{�v���W�F�N�g LiteTemplate ��C�ӂ̏ꏊ�ɓW�J����B

	���ȍ~�A�W�J��p�X�� <LiteTemplate> �ƕ\�L���܂��B


2. JSJoin ���C���X�g�[������B

	�ȉ��̃����N���� JSJoin.zip ���_�E�����[�h����B
	http://ornithopter.ccsp.mydns.jp/HPStore/Program/JSJoin.zip

	JSJoin.zip ��C�ӂ̏ꏊ�ɓW�J����B

	<LiteTemplate>\Debug.bat �� <LiteTemplate>\Release.bat �� JSJoin.exe �ւ̃p�X���������W�J�����ꏊ�֐U�蒼���B


----
���r���h�菇

�f�o�b�O�p�Ƀr���h����ꍇ�F

	<LiteTemplate>\Debug.bat �����s����B

	�r���h�ɐ�������� <LiteTemplate>\out\index.html ���쐬����܂��B


�����[�X�p�Ƀr���h����ꍇ�F

	<LiteTemplate>\Release.bat �����s����B

	�r���h�ɐ�������� <LiteTemplate>\out\index.html ���쐬����܂��B


- - -

�f�o�b�O�E�����[�X�̈Ⴂ�F

                                   �f�o�b�O�p�@           �����[�X�p
--------------------------------------------------------------------
��ǉ�                             ���Ȃ�                 ����
���\�[�X���o�͐�Ɋ܂߂�           �܂߂Ȃ�               �܂߂�
�L��ϐ� DEBUG �̒l                �^                     �U
�L��ϐ� RELEASE �̒l              �U                     �^
�g�p���� index.html �e���v���[�g   _index_Debug.html.js   _index_Release.html.js


----
���t�H���_�E�t�@�C���\��

<LiteTemplate>
��
��  Clean.bat           �o�͐�t�H���_���N���A����o�b�`
��  Debug.bat           �f�o�b�O�p�Ƀr���h����o�b�`
��  Release.bat         �����[�X�p�Ƀr���h����o�b�`
��
����Gattonero20200001   �\�[�X�t�H���_
��  ��
��  ���� ...
��
����out                 �o�͐�t�H���_
��
����res                 ���\�[�X�t�H���_
    ��
    ���� ...


----
���\�[�X�t�H���_�E�t�@�C���\��

<LiteTemplate>\Gattonero20200001
��
��  00_Consts.js                      ��ʃT�C�Y�Ɋւ���萔
��  Entrance.js                       �Q�[���̓�������
��  Loading.js                        ���[�h�����
��  Program.js                        �G���g���[�|�C���g
��  Readme.txt                        ���̃t�@�C��
��  tags                              �G�ۗp�^�O�t�@�C��
��  _index_Debug.html.js              �f�o�b�O�p index.html �̃e���v���[�g
��  _index_Release.html.js            �����[�X�p index.html �̃e���v���[�g
��
����GameCommons                       �Q�[���p���ʋ@�\
��      Draw.js                       �`��
��      Engine.js                     �R�A�ȕ���
��      Mouse.js                      �}�E�X�E�^�b�`����
��      Music.js                      ���y
��      Resource.js                   ���\�[�X�p
��      Resource_LoadPicture.js       ���\�[�X�E�摜
��      Resource_LoadSound.js         ���\�[�X�E���y
��      Resource_LoadSoundEffect.js   ���\�[�X�E���ʉ�
��      SoundEffect.js                ���ʉ�
��
����GameCommons_Resource              ���\�[�X��ϐ��Ƃ��Ē�`���Ă���Ƃ���
��      Music.js                      ���y
��      Picture.js                    �摜
��      SoundEffect.js                ���ʉ�
��
����Games                             ���̃Q�[���ŗL�̋@�\
        Game.js                       �Q�[���̒��g


���̃Q�[���̒��g�� <LiteTemplate>\Games\Game.js �ɋL�q���܂��B��{�I�ɂ��̃t�@�C�� (�y�� <LiteTemplate>Games �̔z��) ��
�������ăQ�[�����\�z���܂��B

�Q�[�����J�n������ <LiteTemplate>\Games\Game.js �� GameMain �֐����Ăяo����܂��B
GameMain �̓W�F�l���[�^�֐��� yield 1; ���邽�тɉ�ʂ̃��t���b�V��(���̃t���[��)��҂��܂��B
GameMain �͊֐����I�� (return) ���Ă͂Ȃ�܂���B

����ȊO�̃t�@�C�� (<LiteTemplate>\Games �ȊO) �͊�{�I�ɐG��܂���B
�K�v�ɉ����ďC�����ĉ������B


----
�\�[�X�t�@�C���̃v���[��JS�Ƃ̑���_ (JSJoin �ŗL�̋L�@)

1. �L�[���[�h @@

	�t�@�C�����Ƀ��j�[�N�ȕ�����(���ʎq�̈ꕔ)�ɒu���������܂��B
	����ɂ��...

	function FUNCNAME() { ... }
	var VARNAME;

	...�ƒ�`���ꂽ�֐��E�ϐ��̓A�v�����S�悩��A�N�Z�X�\(�O���[�o���X�R�[�v)�ƂȂ�...

	function @@_FUNCNAME() { ... }
	var @@_VARNAME;

	...�ƒ�`���ꂽ�֐��E�ϐ��̓t�@�C�����݂̂���A�N�Z�X�\(�t�@�C���X�R�[�v)�ƂȂ�܂��B


2. var �� let

	�L�[���[�h var �� let �ɒu�������܂��B
	�Ⴆ�� var ABC; �� JSJoin �ɂ���� let ABC; �ɒu���������܂��B


3. �^��

	"<" + ((��, "=") �ȊO) �� ">" �ɂ��͂܂ꂽ�͈͂� JSJoin �ɂ���ď�������܂��B
	���Y�͈͂ɂ͌^�����L�q���܂��B
	�Ⴆ��...

	var<double> DoubleFloatValue = 1.0;

	...�Ƃ����錾�� JSJoin �ɂ����...

	let DoubleFloatValue = 1.0;

	...�ɒu�������܂��B
	�܂�...

	function <int> StringToIntFunc(<string> str) { ... }

	...�Ƃ����֐���...

	function StringToIntFunc(str) { ... }

	...�Ƃ����R�[�h�ɒu�������܂��B


----
�摜���\�[�X�̒ǉ����@

1. �摜�t�@�C�������\�[�X�t�H���_�ɒǉ�

�@<LiteTemplate>\res �̔z���ɉ摜�t�@�C����z�u����B
�@�����ł� <LiteTemplate>\res\PicData\NewPic.png ��ǉ������Ƃ��܂��B

�@��res�����̃t�H���_���́u�p�������Ŏn�܂��Ă͂Ȃ�Ȃ��v���Ƃɒ��ӂ��ĉ������B


2. ���\�[�X��ϐ��Ƃ��Ē�`

�@<LiteTemplate>\Gattonero20200001\GameCommons_Resource\Picture.js �Ɉȉ��̍s��ǉ�����B

�@var<Picture_t> P_NewPic = @@_Load(RESOURCE_PicData__NewPic_png);
�@                 ~~~~~~                    ~~~~~~~~~~~~~~~~~~~
�@                 �C�ӂ̖��O                �ǉ������摜�t�@�C���̃p�X

�@�ǉ������摜�t�@�C���̃p�X��res��������̑��΃p�X�� \ �� __ �� . �� _ �ɒu��������������ł��B
�@����̏ꍇ�A���΃p�X�� PicData\NewPic.png �Ȃ̂ŁA�u����������� PicData__NewPic_png �ƂȂ�܂��B


3. �`�悷��ɂ�

�@Draw(P_NewPic, 500, 500, 1.0, 0.0, 1.0); �ȂǂƂ��܂��B


----
���y���\�[�X�̒ǉ����@

1. ���y�t�@�C�������\�[�X�t�H���_�ɒǉ�

�@<LiteTemplate>\res �̔z���ɉ��y�t�@�C����z�u����B
�@�����ł� <LiteTemplate>\res\MusicData\NewMusic.mp3 ��ǉ������Ƃ��܂��B

�@��res�����̃t�H���_���́u�p�������Ŏn�܂��Ă͂Ȃ�Ȃ��v���Ƃɒ��ӂ��ŉ������B


2. ���\�[�X��ϐ��Ƃ��Ē�`

�@<LiteTemplate>\Gattonero20200001\GameCommons_Resource\Music.js �Ɉȉ��̍s��ǉ�����B

�@var<Sound_t> M_NewMusic = @@_Load(RESOURCE_MusicData__NewMusic_mp3);
�@               ~~~~~~~~                    ~~~~~~~~~~~~~~~~~~~~~~~
�@               �C�ӂ̖��O                  �ǉ��������y�t�@�C���̃p�X

�@�ǉ��������y�t�@�C���̃p�X��res��������̑��΃p�X�� \ �� __ �� . �� _ �ɒu��������������ł��B
�@����̏ꍇ�A���΃p�X�� MusicData\NewMusic.mp3 �Ȃ̂ŁA�u����������� MusicData__NewMusic_mp3 �ƂȂ�܂��B


3. ���y���Đ�����ɂ�

�@Play(M_NewMusic); �ȂǂƂ��܂��B


----
���ʉ����\�[�X�̒ǉ����@

1. ���ʉ�(����)�t�@�C�������\�[�X�t�H���_�ɒǉ�

�@<LiteTemplate>\res �̔z���Ɍ��ʉ��t�@�C����z�u����B
�@�����ł� <LiteTemplate>\res\SEData\NewSE.mp3 ��ǉ������Ƃ��܂��B

�@��res�����̃t�H���_���́u�p�������Ŏn�܂��Ă͂Ȃ�Ȃ��v���Ƃɒ��ӂ��ŉ������B


2. ���\�[�X��ϐ��Ƃ��Ē�`

�@<LiteTemplate>\Gattonero20200001\GameCommons_Resource\SoundEffect.js �Ɉȉ��̍s��ǉ�����B

�@var<Sound_t> S_NewSE = @@_Load(RESOURCE_SEData__NewSE_mp3);
�@               ~~~~~                    ~~~~~~~~~~~~~~~~~
�@               �C�ӂ̖��O               �ǉ��������ʉ��t�@�C���̃p�X

�@�ǉ��������ʉ��t�@�C���̃p�X��res��������̑��΃p�X�� \ �� __ �� . �� _ �ɒu��������������ł��B
�@����̏ꍇ�A���΃p�X�� SEData\NewSE.mp3 �Ȃ̂ŁA�u����������� SEData__NewSE_mp3 �ƂȂ�܂��B


3. ���ʉ����Đ�����ɂ�

�@SE(S_NewSE); �ȂǂƂ��܂��B


----
�L��֐��E�L��ϐ��ꗗ

	<LiteTemplate>\Gattonero20200001\00_Consts.js

		Screen_W         �����X�N���[���̕�
		Screen_H         �����X�N���[���̍���
		Canvas_W         �O���X�N���[���̕�
		Canvas_H         �O���X�N���[���̍���


		�������X�N���[���� Draw �Ȃǂ̕`���ƂȂ�X�N���[���ł��B
		�@�Ⴆ�� Draw(p, Screen_W, Screen_H, 1.0, 0.0, 1.0); �͉�ʉE���̊p�𒆐S�� p ��`�悵�܂��B
		�@Draw(p, Screen_W / 2.0, Screen_H / 2.0, 1.0, 0.0, 1.0); �͉�ʒ����� p ��`�悵�܂��B

		���O���X�N���[���̃T�C�Y�̓u���E�U�ɕ\������T�C�Y�ł��B


	<LiteTemplate>\Gattonero20200001\GameCommons\Draw.js

		GetPicture_W     �摜�̕��𓾂�B
		GetPicture_H     �摜�̍����𓾂�B
		Draw             �摜��`�悷��B
		Draw2            �摜��`�悷��B


	<LiteTemplate>\Gattonero20200001\GameCommons\Engine.js

		Canvas           �`���Canvas�^�O
		CanvasBox        Canvbas�^�O������Div�^�O
		ProcFrame        �Q�[���J�n���牽�t���[���ڂ���\������
		Context          �`���R���e�L�X�g


	<LiteTemplate>\Gattonero20200001\GameCommons\Mouse.js

		GetMouseDown     �}�E�X������Ԏ擾
		ClearMouseDown   �}�E�X������ԃN���A
		GetMouseX        �}�E�X�̈ʒu(X-��)�𓾂�B
		GetMouseY        �}�E�X�̈ʒu(Y-��)�𓾂�B


	<LiteTemplate>\Gattonero20200001\GameCommons\Music.js

		Play             ���y���Đ�����B
		Fadeout          �Đ����̉��y���t�F�[�h�A�E�g����B
		Fadeout_F        �Đ����̉��y���t�F�[�h�A�E�g����B


	<LiteTemplate>\Gattonero20200001\GameCommons\SoundEffect.js

		SE               ���ʉ����Đ�����B

