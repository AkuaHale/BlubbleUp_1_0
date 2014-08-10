exports.BlubbleWindow = function(blubbleController) {
	var blubbleWindow = require("ui/common/controls").CustomTitleWindow(blubbleController.Blubble.Name);
	blubbleWindow.addEventListener('open',function(e){
		var objArrays = []; // Array to place your Buttons/UI View
		
		// Create your Buttons / UI View
		var photoPadController = require('controller/PhotoPadController').PhotoPadController(blubbleController.Blubble);
		var photoPadBtn = require("ui/common/controls").ChildWindowButton(e.source.containingTab, function(e){
			return require("ui/PhotoPadWindow").PhotoPadWindow(e.source.Controller);			
			},
			{image:photoPadController.Image}
			);
		photoPadBtn.Controller = photoPadController;
		objArrays.push(photoPadBtn);
		
		var musicPadBtn = require("ui/common/controls").ChildWindowButton(e.source.containingTab, function(e){
			return require("ui/PhotoPadWindow").PhotoPadWindow('Music');			
			},
			{image:'images/music.png'}
			);
		objArrays.push(musicPadBtn);
		
		var moviesPadBtn = require("ui/common/controls").ChildWindowButton(e.source.containingTab, function(e){
			return require("ui/PhotoPadWindow").PhotoPadWindow('Videos');			
			},
			{image:'images/movies.png'}
			);
		objArrays.push(moviesPadBtn);
		
		var gamesPadBtn = require("ui/common/controls").ChildWindowButton(e.source.containingTab, function(e){
			return require("ui/PhotoPadWindow").PhotoPadWindow('Games');			
			},
			{image:'images/games.png'}
			);
		objArrays.push(gamesPadBtn);
		
		var devicesPadBtn = require("ui/common/controls").ChildWindowButton(e.source.containingTab, function(e){
			return require("ui/PhotoPadWindow").PhotoPadWindow('Devices');			
			},
			{image:'images/printer.png'}
			);
		objArrays.push(devicesPadBtn);
		
		var grid = require("ui/common/GridLayout").GridLayout(4,4,5,objArrays,80);
		grid.top = 0;
		e.source.add(grid);
		
	});	
	return blubbleWindow;
};
