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
	}
}
