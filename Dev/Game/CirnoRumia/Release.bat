CALL C:\Factory\SetEnv.bat
CALL Clean.bat
cx **

C:\apps\ConfuserForElsa\ConfuserForElsa.exe Elsa20200001\Elsa20200001.sln C:\temp

C:\Factory\SubTools\makeDDResourceFile.exe ^
	dat ^
	out\Resource.dat ^
	C:\Factory\Program\MaskGZDataForElsa2\MaskGZData_2022103525.exe

COPY /B Elsa20200001\Elsa20200001\bin\Release\Elsa20200001.exe-confused out\Game.exe
COPY /B Elsa20200001\Elsa20200001\bin\Release\DxLib.dll out
COPY /B Elsa20200001\Elsa20200001\bin\Release\DxLibDotNet.dll out

C:\apps\RingCipher\RingCipher.exe /P 6739279112893916687656926480544717157319 /E ^
	Elsa20200001\Elsa20200001\bin\Release\Elsa20200001.exe-confused-rename-table.txt.gz ^
	out\rt_dat

xcp doc out

C:\apps\BuildDevGameBeforePack\BuildDevGameBeforePack.exe BUILD-DEV-GAME-UNSAFE-MOD out dat

C:\Factory\SubTools\zip.exe /PE- /RVE- /B /G out *P
