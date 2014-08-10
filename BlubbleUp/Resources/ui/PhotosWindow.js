exports.PhotosWindow = function(photoPadController, album) {	
	var photosWindow = require("ui/common/controls").CustomTitleWindow(album.Name);
	
	photosWindow.Controller = photoPadController;
	photosWindow.Album = album;
	photosWindow.addEventListener('open',function(e){
		var photoBtns = [];
		for(var i=0; i<e.source.Album.Photos.length; i++){
			var photoBtn = require("ui/common/controls").ChildWindowButton(e.source.containingTab, function(e){	
				return require("ui/PhotoWindow").PhotoWindow(e.source.Controller, e.source.Album, e.source.Photo);										
				},
				{
					image:e.source.Album.Photos[i].Image
				}
				);
			photoBtn.ContainingView = e.source;
			photoBtn.Controller = e.source.Controller;
			photoBtn.Album = e.source.Album;
			photoBtn.Photo = e.source.Album.Photos[i];
			photoBtns.push(photoBtn);			
		};
		
		var grid = require("ui/common/GridLayout").GridLayout(4,4,5,photoBtns,80);
		grid.top = 0;		
		e.source.add(grid);		

		var addPhotoBtn = require("ui/common/controls").ChildPopUpButton(function(e){
			return require("ui/AddPhotosWindow").AddPhotosWindow(e.source.Controller, e.source.Album);						
		},
		{
			image:'images/plus-32.png'
		});
		addPhotoBtn.Controller = e.source.Controller;
		addPhotoBtn.Album = e.source.Album;
		e.source.rightNavButton = addPhotoBtn;
	});
	return photosWindow;
};
