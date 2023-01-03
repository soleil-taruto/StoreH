/*
	�Q�[���E���C��
*/

function* <generatorForTask> GameMain()
{
	// ���y���Đ�����B
	Play(M_MidnightStreet);

	// �������[�v
	for (; ; )
	{
		// �J�[�h�ʒu(X���W)
		var<double> cardX = Screen_W + 300;

		// �J�[�h�ʒu(Y���W)
		var<double> cardY = Screen_H / 2;

		// �J�[�h����ʂ̒��S�ɗ���܂Ń��[�v // 0.5 �͋��e�덷
		while (Screen_W / 2 + 0.5 < cardX)
		{
			// �J�[�h����ʂ̒��S�ɋ߂Â���B
			cardX = (cardX - Screen_W / 2) * 0.9 + Screen_W / 2;

			// �w�i���O���[�œh��Ԃ��B
			Context.fillStyle = "#a0a0a0";
			Context.fillRect(0, 0, Screen_W, Screen_H);

			// �J�[�h��`��
			Draw(P_TrumpFrame, cardX, cardY, 1.0, 0.0, 1.0);
			Draw(P_TrumpBack,  cardX, cardY, 1.0, 0.0, 1.0);

			// ���̃t���[����҂�
			yield 1;
		}

		// �J�[�h�ʒu����
		cardX = Screen_W / 2;

		for (; ; )
		{
			// �J�[�h���N���b�N�������B
			if (
				GetMouseDown() == -1 && // �}�E�X�{�^���̉�����ȂăN���b�N�Ɣ��肷��B
				cardX - GetPicture_W(P_TrumpFrame) / 2 < GetMouseX() && GetMouseX() < cardX + GetPicture_W(P_TrumpFrame) / 2 &&
				cardY - GetPicture_H(P_TrumpFrame) / 2 < GetMouseY() && GetMouseY() < cardY + GetPicture_H(P_TrumpFrame) / 2
				)
			{
				break;
			}

			// �w�i���O���[�œh��Ԃ��B
			Context.fillStyle = "#a0a0a0";
			Context.fillRect(0, 0, Screen_W, Screen_H);

			// �J�[�h��`��
			Draw(P_TrumpFrame, cardX, cardY, 1.0, 0.0, 1.0);
			Draw(P_TrumpBack,  cardX, cardY, 1.0, 0.0, 1.0);

			// ���b�Z�[�W��\��
			Context.fillStyle = "#000000";
			Context.font = "42px 'sans-serif'";
			Context.fillText("�J�[�h���N���b�N����ƃJ�[�h����]���܂��I�I", 150, 1200);

			// ���̃t���[����҂�
			yield 1;
		}

		// ���ʉ���炷�B
		SE(S_Coin04);

		// ��]�E�O��
		for (var<double> rad = 0.0; rad < Math.PI / 2; rad += 0.05)
		{
			// �w�i���O���[�œh��Ԃ��B
			Context.fillStyle = "#a0a0a0";
			Context.fillRect(0, 0, Screen_W, Screen_H);

			// �J�[�h��`��
			Draw2(P_TrumpFrame, cardX, cardY, 1.0, 0.0, Math.cos(rad), 1.0);
			Draw2(P_TrumpBack,  cardX, cardY, 1.0, 0.0, Math.cos(rad), 1.0);

			// ���̃t���[����҂�
			yield 1;
		}

		// ��]�E�㔼
		for (var<double> rad = Math.PI / 2 - 0.1; 0.0 < rad; rad -= 0.05)
		{
			// �w�i���O���[�œh��Ԃ��B
			Context.fillStyle = "#a0a0a0";
			Context.fillRect(0, 0, Screen_W, Screen_H);

			// �J�[�h��`��
			Draw2(P_TrumpFrame, cardX, cardY, 1.0, 0.0, Math.cos(rad), 1.0);
			Draw2(P_TrumpJoker, cardX, cardY, 1.0, 0.0, Math.cos(rad), 1.0);

			// ���̃t���[����҂�
			yield 1;
		}

		// �J�[�h���x
		var<double> cardXAdd = -0.5;

		// �J�[�h���ޏꂷ��܂Ń��[�v
		while (-300.0 < cardX)
		{
			// �J�[�h����
			cardXAdd *= 1.1;

			// �J�[�h�ړ�
			cardX += cardXAdd;

			// �w�i���O���[�œh��Ԃ��B
			Context.fillStyle = "#a0a0a0";
			Context.fillRect(0, 0, Screen_W, Screen_H);

			// �J�[�h��`��
			Draw(P_TrumpFrame, cardX, cardY, 1.0, 0.0, 1.0);
			Draw(P_TrumpJoker, cardX, cardY, 1.0, 0.0, 1.0);

			// ���̃t���[����҂�
			yield 1;
		}
	}
}
