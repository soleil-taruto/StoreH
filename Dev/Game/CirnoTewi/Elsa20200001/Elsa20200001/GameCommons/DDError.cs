using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte.GameCommons
{
	public class DDError : Exception
	{
		private const string DEFAULT_MESSAGE = "エラーが発生しました。";

		public DDError(string message = DEFAULT_MESSAGE)
			: base(message)
		{ }
	}
}
