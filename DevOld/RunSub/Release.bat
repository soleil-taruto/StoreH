CALL C:\Factory\SetEnv.bat
CALL Clean.bat
cx **

acp Petra20200001\Program.exe out\*P.exe
xcp doc out

C:\Factory\SubTools\zip.exe /PE- /O out *P
