/*
	アクター共通
*/

var<Actor_t[]> @@_Actors = [];

function <void> AddActor(<Actor_t> actor)
{
	if (!actor)
	{
		error();
	}

	actor.Killed = false;

	@@_Actors.push(actor);
}

function <void> KillActor(<Actor_t> actor)
{
	if (!actor)
	{
		error();
	}

	actor.Killed = true;
}

function <Actor_t[]> GetAllActor()
{
	return @@_Actors;
}

function <void> ClearAllActor()
{
	@@_Actors = [];
}

function <void> ExecuteAllActor()
{
	for (var<int> index = 0; index < @@_Actors.length; index++)
	{
		var<Actor_t> actor = @@_Actors[index];

		if (!DrawActor(actor))
		{
			@@_Actors[index] = null;
		}
	}
	RemoveFalse(@@_Actors);
}

function <void> @(UNQN)_EACH()
{
	for (var<int> c = 0; c < 7; c++)
	{
		NextRun(@@_EachTask);
	}
}

function* <generatorForTask> @@_EachTaskMain()
{
	for (; ; )
	{
		for (var<int> index = 1; index < @@_Actors.length; index++)
		{
			if (@@_Actors[index - 1].X > @@_Actors[index].X)
			{
				SwapElement(@@_Actors, index - 1, index);
			}
			yield 1;
		}
		yield 1;
	}
}

var<generatorForTask> @@_EachTask = @@_EachTaskMain();
