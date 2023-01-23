using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;
using System.Windows.Forms;
using Charlotte.Commons;
using Charlotte.Tests;

namespace Charlotte
{
	class Program
	{
		static void Main(string[] args)
		{
			ProcMain.CUIMain(new Program().Main2);
		}

		private void Main2(ArgsReader ar)
		{
			if (ProcMain.DEBUG)
			{
				Main3();
			}
			else
			{
				Main4(ar);
			}
			SCommon.OpenOutputDirIfCreated();
		}

		private void Main3()
		{
			// -- choose one --

			//Main4(new ArgsReader(new string[] { @"C:\Dev" }));
			Main4(new ArgsReader(new string[] { @"C:\Dev", "/D", @"C:\temp" }));
			//new Test0001().Test01();
			//new Test0002().Test01();
			//new Test0003().Test01();

			// --

			SCommon.Pause();
		}

		private void Main4(ArgsReader ar)
		{
			try
			{
				Main5(ar);
			}
			catch (Exception ex)
			{
				ProcMain.WriteLog(ex);

				MessageBox.Show("" + ex, Path.GetFileNameWithoutExtension(ProcMain.SelfFile) + " / エラー", MessageBoxButtons.OK, MessageBoxIcon.Error);

				//Console.WriteLine("Press ENTER key. (エラーによりプログラムを終了します)");
				//Console.ReadLine();
			}
		}

		private string OutputDir;
		private string[] DistributeDirs;

		private void Main5(ArgsReader ar)
		{
			string rDir = SCommon.MakeFullPath(ar.NextArg());

			if (!Directory.Exists(rDir))
				throw new Exception("no rDir");

			if (ar.ArgIs("/D"))
			{
				this.DistributeDirs = ar.TrailArgs().Select(v => SCommon.MakeFullPath(v)).ToArray();

				if (this.DistributeDirs.Length < 1)
					throw new Exception("no DistributeDirs");

				foreach (string dir in this.DistributeDirs)
					if (!Directory.Exists(dir))
						throw new Exception("no DistributeDir: " + dir);
			}
			ar.End();

			if (this.DistributeDirs != null)
			{
				using (WorkingDir wd = new WorkingDir())
				{
					this.OutputDir = wd.MakePath();
					SCommon.CreateDir(this.OutputDir);

					Console.WriteLine("< " + rDir);
					Console.WriteLine("> " + this.OutputDir);

					SearchOut(rDir);
					this.Distribute();
				}
			}
			else
			{
				this.OutputDir = SCommon.GetOutputDir();

				Console.WriteLine("< " + rDir);
				Console.WriteLine("> " + this.OutputDir);

				SearchOut(rDir);
			}
			Console.WriteLine("done!");
		}

		private void SearchOut(string rDir)
		{
			string outDir = Path.Combine(rDir, "out");

			if (Directory.Exists(outDir))
			{
				CollectOut(rDir, outDir);
			}
			else // out ディレクトリが見つからない -> 更に配下を探しに行く。
			{
				foreach (string dir in Directory.GetDirectories(rDir))
				{
					SearchOut(dir);
				}
			}
		}

		private void CollectOut(string parentDir, string outDir)
		{
			if (IsEmptyDir(outDir))
			{
				return;
			}

			string archiveFile = GetOnlyOneArchiveFile(outDir);

			if (archiveFile == null)
			{
				SCommon.CopyDir(
					outDir,
					Path.Combine(this.OutputDir, Path.GetFileName(parentDir))
					);
			}
			else
			{
				File.Copy(
					archiveFile,
					Path.Combine(this.OutputDir, Path.GetFileName(archiveFile))
					);
			}
		}

		private bool IsEmptyDir(string targDir)
		{
			string[] dirs = Directory.GetDirectories(targDir);
			string[] files = Directory.GetFiles(targDir);

			if (
				dirs.Length == 0 &&
				files.Length == 0
				)
				return true;

			return false;
		}

		private string GetOnlyOneArchiveFile(string targDir)
		{
			string[] dirs = Directory.GetDirectories(targDir);
			string[] files = Directory.GetFiles(targDir);

			if (
				dirs.Length == 0 &&
				files.Length == 1 &&
				files[0].ToLower().EndsWith(".zip")
				)
				return files[0];

			return null;
		}

		/// <summary>
		/// 配布
		/// </summary>
		private void Distribute()
		{
			Console.WriteLine("Distribute-ST");

			string[] rPaths = Directory.GetDirectories(this.OutputDir)
				.Concat(Directory.GetFiles(this.OutputDir, "*.zip"))
				.ToArray();

			string[] wPaths = SCommon.Concat(this.DistributeDirs.Select(v => Directory.GetDirectories(v)
				.Concat(Directory.GetFiles(v, "*.zip"))))
				.ToArray();

			{
				List<string> only1 = new List<string>();
				List<string> both1 = new List<string>();
				List<string> both2 = new List<string>();
				List<string> only2 = new List<string>();

				SCommon.Merge(rPaths, wPaths, CompDistribute, only1, both1, both2, only2);

				foreach (string str in both1)
					Console.WriteLine("*< " + str);

				foreach (string str in both2)
					Console.WriteLine("*> " + str);

				foreach (string str in only1)
					Console.WriteLine("/< " + str);

				foreach (string str in only2)
					Console.WriteLine("/> " + str);

				if (only1.Count != 0) // ? 未配信のプロジェクトがある。
				{
					ProcUndistributedProjects(only1);
				}

				if (only2.Count != 0) // ? 廃止されたプロジェクトがある。
				{
					ProcRemovedProjects(only2);
				}

				rPaths = both1.ToArray();
				wPaths = both2.ToArray();
			}

			if (SCommon.HasSame_Comp(rPaths, CompDistribute))
				throw new Exception("配布元のプロジェクトの重複");

			if (SCommon.HasSame_Comp(wPaths, CompDistribute))
				throw new Exception("配布先のプロジェクトの重複");

			int count = rPaths.Length;
			//int count = wPaths.Length; // どっちでも良い。

			for (int index = 0; index < count; index++)
			{
				string rPath = rPaths[index];
				string wPath = wPaths[index];
				string destPath = Path.Combine(SCommon.ToParentPath(wPath), Path.GetFileName(rPath));

				Console.WriteLine("< " + rPath);
				Console.WriteLine("W " + wPath);
				Console.WriteLine("> " + destPath);

				SCommon.DeletePath(wPath);
				SCommon.CopyPath(rPath, destPath);

				Console.WriteLine("done");
			}

			Console.WriteLine("Distribute-ED");
		}

		private int CompDistribute(string a, string b)
		{
			a = CompDistributeFilter(a);
			b = CompDistributeFilter(b);

			return SCommon.CompIgnoreCase(a, b);
		}

		private string CompDistributeFilter(string path)
		{
			string name = Path.GetFileName(path);

			// Resolve version number
			{
				string fmt = name;

				foreach (char chr in SCommon.DECIMAL)
					fmt = fmt.Replace(chr, '9');

				if (SCommon.EndsWithIgnoreCase(fmt, "_v9999-999-99999.zip"))
				{
					name = name.Substring(0, name.Length - 20) + "_v9999-999-99999.zip";
				}
			}

			return name;
		}

		private void ProcUndistributedProjects(List<string> rPaths)
		{
			string outDir = Path.Combine(SCommon.GetOutputDir(), "未配信のプロジェクト");
			SCommon.CreateDir(outDir);

			Console.WriteLine("未配信のプロジェクトが見つかりました。");

			foreach (string rPath in rPaths)
			{
				string wPath = Path.Combine(outDir, Path.GetFileName(rPath));

				Console.WriteLine("< " + rPath);
				Console.WriteLine("> " + wPath);

				SCommon.CopyPath(rPath, wPath);
			}
			Console.WriteLine("未配信のプロジェクト_End");
		}

		private void ProcRemovedProjects(List<string> rPaths)
		{
			string outDir = Path.Combine(SCommon.GetOutputDir(), "廃止されたプロジェクト");
			SCommon.CreateDir(outDir);

			Console.WriteLine("廃止されたプロジェクトが見つかりました。");

			foreach (string rPath in rPaths)
			{
				string wPath = Path.Combine(outDir, Path.GetFileName(rPath));

				Console.WriteLine("< " + rPath);
				Console.WriteLine("> " + wPath);

				SCommon.CopyPath(rPath, wPath);
				SCommon.DeletePath(rPath);
			}
			Console.WriteLine("廃止されたプロジェクト_End");
		}
	}
}
