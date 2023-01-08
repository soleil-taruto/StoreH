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

				return true;
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
					return true;
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
			double NORTH_LAT = 35.607500; // 自由が丘駅
			double SOUTH_LAT = 35.596889; // 田園調布駅
			double WEST_LON = 139.661000; // 九品仏駅
			double EAST_LON = 139.685639; // 大岡山駅

			// 表示範囲のマージン(meter)
			double MARGIN = 300.0;

			// 出力画像の幅(pixel)
			int IMAGE_WIDTH = 1600;

			OutputImage(NORTH_LAT, SOUTH_LAT, WEST_LON, EAST_LON, MARGIN, IMAGE_WIDTH);
		}

		private void OutputImage(double nLat, double sLat, double wLon, double eLon, double margin, int imageWidth)
		{
			double LAT_TO_METER = 111132.871463004;
			double LON_TO_METER = 90362.222363910;

			// マージン適用
			{
				nLat += margin / LAT_TO_METER;
				sLat -= margin / LAT_TO_METER;
				wLon -= margin / LON_TO_METER;
				eLon += margin / LON_TO_METER;
			}

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

				Action<string, Pen, bool> drawPolyFromFile = (polyFile, pen, loop) =>
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

						for (int polyIndex = 0; polyIndex < poly.Count + (loop ? 0 : -1); polyIndex++)
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
								g.DrawLine(pen, (float)p[1], (float)p[0], (float)q[1], (float)q[0]);
							}
						}
					}
				};

				drawPolyFromFile(
					@"C:\temp\Building.txt",
					new Pen(new SolidBrush(Color.FromArgb(128, 255, 128)), 1.0F),
					true
					);
				drawPolyFromFile(
					@"C:\temp\Road.txt",
					new Pen(new SolidBrush(Color.FromArgb(128, 128, 128)), 1.0F),
					false
					);
				drawPolyFromFile(
					@"C:\temp\Rail.txt",
					new Pen(new SolidBrush(Color.FromArgb(0, 0, 0)), 1.0F),
					false
					);
				drawPolyFromFile(
					@"C:\temp\Area.txt",
					new Pen(new SolidBrush(Color.FromArgb(64, 255, 0, 0)), 5.0F),
					true
					);
			}
			image.Save(SCommon.NextOutputPath() + ".png");
		}
	}
}
