using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using System.IO;
using Charlotte.Commons;
using Charlotte.Utilities;

namespace Charlotte.Tests
{
	public class Test0001
	{
		public void Test01()
		{
			LoadXMLTest(@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-AdmArea-20221001-0001.xml");
			LoadXMLTest(@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-BldL-20221001-0001.xml");
			LoadXMLTest(@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-RailCL-20221001-0001.xml");
			LoadXMLTest(@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-RdEdg-20221001-0001.xml");
		}

		private List<XMLNode> LoadedXMLs = new List<XMLNode>();

		private void LoadXMLTest(string file)
		{
			Console.WriteLine("Load " + file);
			DateTime stTm = DateTime.Now;
			LoadedXMLs.Add(XMLNode.LoadFromFile(file));
			DateTime edTm = DateTime.Now;
			Console.WriteLine("OK " + (edTm - stTm).TotalSeconds.ToString("F3") + "s");
		}

		public void Test02()
		{
			PrintXMLPaths(@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-AdmArea-20221001-0001.xml");
			PrintXMLPaths(@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-BldL-20221001-0001.xml");
			PrintXMLPaths(@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-RailCL-20221001-0001.xml");
			PrintXMLPaths(@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-RdEdg-20221001-0001.xml");
		}

		private void PrintXMLPaths(string file)
		{
			HashSet<string> xmlPaths = new HashSet<string>();
			XMLNode root = XMLNode.LoadFromFile(file);
			root.Search((xmlPath, node) => xmlPaths.Add(xmlPath));

			Console.WriteLine(file);

			foreach (string xmlPath in xmlPaths.OrderBy(SCommon.Comp))
				Console.WriteLine(xmlPath
					+ "\t" + GetNodeCount(root, xmlPath, int.MaxValue, Math.Min)
					+ "\t" + GetNodeCount(root, xmlPath, int.MinValue, Math.Max));

			Console.WriteLine();
		}

		private int GetNodeCount(XMLNode root, string xmlPath, int count, Func<int, int, int> chooser)
		{
			int p = xmlPath.LastIndexOf('/');

			if (p == -1) // ? ルートTag
				return 1;

			string parentXmlPath = xmlPath.Substring(0, p);
			string name = xmlPath.Substring(p + 1);

			root.Search((xp, node) =>
			{
				if (xp == parentXmlPath)
					count = chooser(count, node.Children.Where(n => n.Name == name).Count());
			});

			return count;
		}

		public void Test03()
		{
			ExportPosList(
				@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-AdmArea-20221001-0001.xml",
				@"C:\temp\Area.txt",
				"Dataset/AdmArea/area/Surface/patches/PolygonPatch/exterior/Ring/curveMember/Curve/segments/LineStringSegment/posList"
				);
			ExportPosList(
				@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-BldL-20221001-0001.xml",
				@"C:\temp\Building.txt",
				"Dataset/BldL/loc/Curve/segments/LineStringSegment/posList"
				);
			ExportPosList(
				@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-RailCL-20221001-0001.xml",
				@"C:\temp\Rail.txt",
				"Dataset/RailCL/loc/Curve/segments/LineStringSegment/posList"
				);
			ExportPosList(
				@"C:\temp\FG-GML-533935-ALL-20221001\FG-GML-533935-RdEdg-20221001-0001.xml",
				@"C:\temp\Road.txt",
				"Dataset/RdEdg/loc/Curve/segments/LineStringSegment/posList"
				);
		}

		private void ExportPosList(string mapFile, string polyFile, string polyXmlPath)
		{
			XMLNode root = XMLNode.LoadFromFile(mapFile);

			using (StreamWriter writer = new StreamWriter(polyFile, false, Encoding.ASCII))
			{
				root.Search((xmlPath, node) =>
				{
					if (xmlPath == polyXmlPath)
					{
						writer.WriteLine(node.Value);
						writer.WriteLine(); // 空行 -- データの区切りとして
					}
				});
			}
		}

		public void Test04()
		{
			double ER = 6367444.5; // 地球の半径(meter)
			double LAT = 35.6; // 基準とする北緯(degree)

			double latToMeter = ER * Math.PI / 180.0;
			double lonToMeter = ER * Math.Cos(LAT * Math.PI / 180.0) * Math.PI / 180.0;

			Console.WriteLine("緯度の 1 度を " + latToMeter.ToString("F9") + " メートルとする。");
			Console.WriteLine("経度の 1 度を " + lonToMeter.ToString("F9") + " メートルとする。");
		}

		public void Test05()
		{
			// 表示範囲(緯度経度)
			double NORTH_LAT = 35.61; // 自由が丘駅のちょい上(北)
			double SOUTH_LAT = 35.595; // 田園調布駅のちょい下(南)
			double WEST_LON = 139.66; // 九品仏駅のちょい左(西)
			double EAST_LON = 139.687; // 大岡山駅のちょい右(東)

			// 出力画像の幅
			int IMAGE_WIDTH = 1600;

			OutputImage(NORTH_LAT, SOUTH_LAT, WEST_LON, EAST_LON, IMAGE_WIDTH);
		}

		private void OutputImage(double nLat, double sLat, double wLon, double eLon, int imageWidth)
		{
			double LAT_TO_METER = 111132.871463004;
			double LON_TO_METER = 90362.222363910;

			double xLon = eLon - wLon;
			double yLat = nLat - sLat;

			double xMeter = xLon * LON_TO_METER;
			double yMeter = yLat * LAT_TO_METER;

			double meterToPixel = imageWidth / xMeter;

			double latToPixel = LAT_TO_METER * meterToPixel;
			double lonToPixel = LON_TO_METER * meterToPixel;

			int w = imageWidth;
			int h = SCommon.ToInt(yMeter * meterToPixel);

			Bitmap image = new Bitmap(w, h);

			using (Graphics g = Graphics.FromImage(image))
			{
				g.FillRectangle(new SolidBrush(Color.White), 0, 0, w, h);

				Action<string, Color> drawPolyFromFile = (polyFile, color) =>
				{
					string[] polyLines = File.ReadAllLines(polyFile, Encoding.ASCII);
					int polyLineIndex = 0;

					while (polyLineIndex < polyLines.Length)
					{
						List<double[]> poly = new List<double[]>();

						while (polyLines[polyLineIndex] != "")
							poly.Add(polyLines[polyLineIndex++].Split(' ').Select(v => double.Parse(v)).ToArray());

						polyLineIndex++;

						foreach (double[] p in poly)
						{
							p[0] = (nLat - p[0]) * latToPixel; // Lat to pixel
							p[1] = (p[1] - wLon) * lonToPixel; // Lon to pixel
						}

						for (int polyIndex = 0; polyIndex < poly.Count; polyIndex++)
						{
							double[] p = poly[polyIndex];
							double[] q = poly[(polyIndex + 1) % poly.Count];

							if (
								(0.0 <= p[0] && p[0] < h) ||
								(0.0 <= p[1] && p[1] < w) ||
								(0.0 <= q[0] && q[0] < h) ||
								(0.0 <= q[1] && q[1] < w)
								)
							{
								g.DrawLine(new Pen(new SolidBrush(color)), (float)p[1], (float)p[0], (float)q[1], (float)q[0]);
							}
						}
					}
				};

				drawPolyFromFile(@"C:\temp\Building.txt", Color.FromArgb(128, 255, 128));
				drawPolyFromFile(@"C:\temp\Road.txt", Color.FromArgb(128, 128, 128));
				drawPolyFromFile(@"C:\temp\Rail.txt", Color.FromArgb(0, 0, 0));
				drawPolyFromFile(@"C:\temp\Area.txt", Color.FromArgb(255, 64, 0));
			}
			image.Save(SCommon.NextOutputPath() + ".png");
		}
	}
}
