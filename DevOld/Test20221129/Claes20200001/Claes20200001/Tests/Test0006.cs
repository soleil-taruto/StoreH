using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	public class Test0006
	{
		public void Test01()
		{
			Test01_a(Path.GetDirectoryName(@"C:\ABC\DEF")); // -> @"C:\ABC"
			Test01_a(Path.GetDirectoryName(@"C:\ABC")); // -> @"C:\"
			Test01_a(Path.GetDirectoryName(@"C:\")); // -> "(null)"

			string str = Path.GetDirectoryName(@"C:\");

			Test01_a(str); // -> "(null)"

			// ----

			Directory.SetCurrentDirectory(@"C:\temp");

			Test01_a(Path.GetDirectoryName(@".")); // -> ""
			Test01_a(Path.GetDirectoryName(@"C:")); // -> "(null)"
			Test01_a(Path.GetDirectoryName(@"C:.")); // -> "C:"
			Test01_a(Path.GetDirectoryName(@"C:\.")); // -> @"C:\"

			SCommon.CreateDir(@"C:\temp\1\2\3");
			Directory.SetCurrentDirectory(@"C:\temp\1\2\3");

			Test01_a(Path.GetDirectoryName(@".")); // -> ""
			Test01_a(Path.GetDirectoryName(@"C:")); // -> "(null)"
			Test01_a(Path.GetDirectoryName(@"C:.")); // -> "C:"
			Test01_a(Path.GetDirectoryName(@"C:\.")); // -> @"C:\"

			// ----

			Test01_a(Path.GetDirectoryName(@"\\Computer\ABC\DEF")); // -> @"\\Computer\ABC"
			Test01_a(Path.GetDirectoryName(@"\\Computer\ABC\")); // -> @"\\Computer\ABC"
			Test01_a(Path.GetDirectoryName(@"\\Computer\ABC")); // -> "(null)"
			Test01_a(Path.GetDirectoryName(@"\\Computer\")); // -> "(null)"

			Test01_a(Path.GetDirectoryName(@"ABC\DEF")); // -> "ABC"
			Test01_a(Path.GetDirectoryName(@"ABC\")); // -> "ABC"
			Test01_a(Path.GetDirectoryName(@"ABC")); // -> ""
			Test01_a(Path.GetDirectoryName(@"\")); // -> "(null)"
			//Test01_a(Path.GetDirectoryName("")); // -> 例外
			Test01_a(Path.GetDirectoryName(null)); // -> "(null)"

			// ----

			Console.WriteLine(SCommon.ToParentPath(@"C:\ABC\DEF")); // -> @"C:\ABC"
			Console.WriteLine(SCommon.ToParentPath(@"C:\ABC")); // -> @"C:\"

			SCommon.ToThrowPrint(() => SCommon.ToParentPath(@"C:\"));
			SCommon.ToThrowPrint(() => SCommon.ToParentPath("ABC"));
		}

		private void Test01_a(string path)
		{
			Console.WriteLine(Unnull(path));
		}

		private string Unnull(string str)
		{
			return str == null ? "(null)" : str;
		}

		public void Test02()
		{
			Test02_a("ABCDE.txt"); // -> "ABCDE" & ".txt"
			Test02_a("ABCDE"); // -> "ABCDE" & ""
			Test02_a(".ABCDE"); // -> "" & ".ABCDE"
			Test02_a("."); // -> "" & ""
			Test02_a(""); // -> "" & ""
			Test02_a(null); // -> null & null

			Test02_a("C:\\xxx\\ABCDE.txt"); // -> "ABCDE" & ".txt"
			Test02_a("C:\\xxx\\ABCDE"); // -> "ABCDE" & ""
			Test02_a("C:\\xxx\\.ABCDE"); // -> "" & ".ABCDE"
			Test02_a("C:\\xxx\\."); // -> "" & ""
			Test02_a("C:\\xxx\\"); // -> "" & ""

			Test02_a("...."); // -> "..." & ""
			Test02_a("..."); // -> ".." & ""
			Test02_a(".."); // -> "." & ""

			Test02_a("C:\\xxx\\...."); // -> "..." & ""
			Test02_a("C:\\xxx\\..."); // -> ".." & ""
			Test02_a("C:\\xxx\\.."); // -> "." & ""

			Test02_a("ABCDE.txt.xxx.zzz"); // -> "ABCDE.txt.xxx" & ".zzz"
			Test02_a("ABCDE.txt.xxx."); // -> "ABCDE.txt.xxx" & ""
			Test02_a("ABCDE.txt.xxx"); // -> "ABCDE.txt" & ".xxx"
			Test02_a("ABCDE.txt."); // -> "ABCDE.txt" & ""

			Test02_a("ABCDE.txt...."); // -> "ABCDE.txt..." & ""
			Test02_a("ABCDE.txt..."); // -> "ABCDE.txt.." & ""
			Test02_a("ABCDE.txt.."); // -> "ABCDE.txt." & ""
		}

		private void Test02_a(string path)
		{
			Console.WriteLine(Unnull(Path.GetFileNameWithoutExtension(path)));
			Console.WriteLine(Unnull(Path.GetExtension(path)));
		}

		public void Test03()
		{
			//Console.WriteLine(EraseExt("C:\\")); // 例外
			Console.WriteLine(EraseExt("C:\\xxx\\.abcde")); // -> "C:\\xxx"
			Console.WriteLine(EraseExt("ABCDE.txt")); // -> ABCDE
			Console.WriteLine(EraseExt("ABCDE")); // -> ABCDE
			Console.WriteLine(EraseExt(".abcde")); // -> ""
			//Console.WriteLine(EraseExt("")); // 例外
			//Console.WriteLine(EraseExt(null)); // 例外

			// ---

			Console.WriteLine(SCommon.ChangeExt("C:\\xxx\\.abcde", " - コピー.abcde")); // -> "C:\\xxx\\ - コピー.abcde"
			Console.WriteLine(SCommon.ChangeExt("C:\\xxx\\.abcde", ".zzz")); // -> "C:\\xxx\\.zzz"
			Console.WriteLine(SCommon.ChangeExt("C:\\xxx\\.abcde", "zzz")); // -> "C:\\xxx\\zzz"
			Console.WriteLine(SCommon.ChangeExt("C:\\xxx\\.abcde", "")); // -> "C:\\xxx"

			Console.WriteLine(SCommon.ChangeExt("C:\\xxx\\.zzz", ".aaa")); // -> "C:\\xxx\\.aaa"
			Console.WriteLine(SCommon.ChangeExt(".\\.zzz", ".aaa")); // -> ".\\.aaa"
			Console.WriteLine(SCommon.ChangeExt(".zzz", ".aaa")); // -> ".aaa"

			Console.WriteLine(SCommon.ChangeExt("C:\\xxx\\ABCDE.zzz", ".aaa")); // -> "C:\\xxx\\ABCDE.aaa"
			Console.WriteLine(SCommon.ChangeExt(".\\ABCDE.zzz", ".aaa")); // -> ".\\ABCDE.aaa"
			Console.WriteLine(SCommon.ChangeExt("ABCDE.zzz", ".aaa")); // -> "ABCDE.aaa"
		}

		private string EraseExt(string path)
		{
			return Path.Combine(Path.GetDirectoryName(path), Path.GetFileNameWithoutExtension(path));
		}
	}
}
