/*
	‰æ‘œ“Ç‚İ‚İ
*/

/@(ASTR)

/// Picture_t
{
	<Image> Handle
}

@(ASTR)/

function <Picture_t> LoadPicture(<string> url)
{
	Loading++;

	var image = new Image();

	image.onload = function()
	{
		Loading--;
	};

	image.onerror = function()
	{
		error();
	};

	image.src = url;

	var<Picture_t> picture =
	{
		Handle: image,
	};

	return picture;
}
