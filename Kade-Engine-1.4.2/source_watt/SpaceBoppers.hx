package;

import flixel.FlxSprite;
import flixel.graphics.frames.FlxAtlasFrames;

class SpaceBoppers extends FlxSprite
{
	public function new(x:Float, y:Float)
	{
		super(x, y);

		//Initial Boppers: Vader, Bug, Beats, Blitz
		
        frames = Paths.getSparrowAtlas("watt/windowBoppers");
		animation.addByIndices('danceLeft', 'bopperWindows', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], "", 24, false);
		animation.addByIndices('danceRight', 'bopperWindows', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], "", 24, false);
		//THIS IS SO JANK. THIS IS SO JANK. THIS IS SO JANK. THIS IS SO FUCKING JANK
		//im gonna kill myself if this works
		//its ok it didnt work
		//...forgot to add the curbeat, i'm a fucking clown. it works now

		animation.play('danceLeft');
		antialiasing = true;
	}

	
	var danceDir:Bool = false;
	
	/*
	 LISTEN UP, FUTURE ME:
	 This is where you store Watt's BACKGROUND PEEPS. 
	 Make NEW SPRITESHEETS for each LEVEL OF PEEP, and ADD THEM HERE
	 When you need more people, use getBusy()
	 When you need EVEN MORE people, use getBusier()
	 
	 REMEMBER TO ADD THE CASE FOR THE DANCES TO WORK IN THE PLAYSTATE OR IT WON'T RECALL THE DANCE FUNCTION, IDIOT
	 
	 */
		public function getBusy():Void
	{
		animation.addByIndices('danceLeft', 'bopperBusy', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], "", 24, false);
		animation.addByIndices('danceRight', 'bopperBusy', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], "", 24, false);
		dance();
	}
	

	public function getBusier():Void
	{
	    animation.addByIndices('danceLeft', 'bopperBusy', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], "", 24, false);
		animation.addByIndices('danceRight', 'bopperBusy', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], "", 24, false);
		dance();
	}
	

	public function dance():Void
	{
		danceDir = !danceDir;

		if (danceDir)
			animation.play('danceRight', true);
		else
			animation.play('danceLeft', true);
	}
}
