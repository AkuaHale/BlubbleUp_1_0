exports.PhotoPadController = function(blubble){
	var photoPadController = {Name:'Photos',
	Image:'images/photos.png'};
	photoPadController.Albums = [];
	photoPadController.ALBUM_UPDATED_EVENT = 'ALBUM_UPDATED_EVENT';
	photoPadController.ALBUM_ADDED_EVENT = 'ALBUM_ADDED_EVENT';
	photoPadController.ALBUM_DELETED_EVENT = 'ALBUM_DELETED_EVENT';

	var Photo = require('data/PhotoPad/Photo');
	var mockPhotos = [
		new Photo('http://www.lorempixel.com/600/600/'),
		new Photo('http://www.lorempixel.com/400/300/'),
		new Photo('http://www.lorempixel.com/410/300/'),
		new Photo('http://www.lorempixel.com/500/300/'),
		new Photo('http://www.lorempixel.com/300/300/'),
		new Photo('http://www.lorempixel.com/450/320/'),
		new Photo('http://www.lorempixel.com/500/400/')
	];

	var AppDataHelper = require('util/ApplicationDataHelper');
	var appDataHelper = new AppDataHelper(); 

/*	
	appDataHelper.createDirectory('Albums');
	appDataHelper.saveImageFromURL('Albums/Sayre','pic1.png', 'http://www.lorempixel.com/400/300/');
	appDataHelper.saveImageFromURL('Albums/Sayre','pic2.png', 'http://www.lorempixel.com/410/300/');
	appDataHelper.saveImageFromURL('Albums/Sayre','pic3.png', 'http://www.lorempixel.com/500/300/');
	appDataHelper.saveImageFromURL('Albums/Sayre','pic4.png', 'http://www.lorempixel.com/300/300/');
	appDataHelper.saveImageFromURL('Albums/Sayre','pic5.png', 'http://www.lorempixel.com/700/600/');
	
	appDataHelper.saveImageFromURL('Albums/NYC','pic1.png', 'http://www.lorempixel.com/700/600/');
	appDataHelper.saveImageFromURL('Albums/NYC','pic2.png', 'http://www.lorempixel.com/400/300/');
	appDataHelper.saveImageFromURL('Albums/NYC','pic3.png', 'http://www.lorempixel.com/410/300/');
	appDataHelper.saveImageFromURL('Albums/NYC','pic4.png', 'http://www.lorempixel.com/500/300/');
	appDataHelper.saveImageFromURL('Albums/NYC','pic5.png', 'http://www.lorempixel.com/300/300/');
	appDataHelper.saveImageFromURL('Albums/NYC','pic6.png', 'http://www.lorempixel.com/700/600/');

	appDataHelper.saveImageFromURL('Albums/Yellowstone','pic1.png', 'http://www.lorempixel.com/410/300/');
	appDataHelper.saveImageFromURL('Albums/Yellowstone','pic2.png', 'http://www.lorempixel.com/500/300/');
	appDataHelper.saveImageFromURL('Albums/Yellowstone','pic3.png', 'http://www.lorempixel.com/300/300/');
	appDataHelper.saveImageFromURL('Albums/Yellowstone','pic4.png', 'http://www.lorempixel.com/700/600/');
	appDataHelper.saveImageFromURL('Albums/Yellowstone','pic5.png', 'http://www.lorempixel.com/500/400/');
	
	appDataHelper.saveImageFromURL('Albums/Glacier_National','pic1.png', 'http://www.lorempixel.com/400/300/');
	appDataHelper.saveImageFromURL('Albums/Glacier_National','pic2.png', 'http://www.lorempixel.com/410/300/');
	appDataHelper.saveImageFromURL('Albums/Glacier_National','pic3.png', 'http://www.lorempixel.com/500/300/');
	appDataHelper.saveImageFromURL('Albums/Glacier_National','pic4.png', 'http://www.lorempixel.com/300/300/');
	appDataHelper.saveImageFromURL('Albums/Glacier_National','pic5.png', 'http://www.lorempixel.com/700/600/');

	appDataHelper.saveImageFromURL('Albums/Rocky_Mountain','pic1.png', 'http://www.lorempixel.com/700/600/');

	appDataHelper.saveImageFromURL('Albums/Lake_George','pic1.png', 'http://www.lorempixel.com/700/600/');

	appDataHelper.saveImageFromURL('Albums/Diwali','pic1.png', 'http://www.lorempixel.com/700/600/');

	appDataHelper.saveImageFromURL('Albums/Washington','pic1.png', 'http://www.lorempixel.com/700/600/');

	appDataHelper.saveImageFromURL('Albums/Vermont','pic1.png', 'http://www.lorempixel.com/700/600/');

	appDataHelper.saveImageFromURL('Albums/Niagara','pic1.png', 'http://www.lorempixel.com/700/600/');
*/	
	var Album = require('data/PhotoPad/Album');
	
	var albumsDir = appDataHelper.getFile('Albums');
	var dirs = albumsDir.getDirectoryListing();
	for(var i=0; i<dirs.length; i++){
		var dirName = 'Albums'+'/'+dirs[i];
		var dir = appDataHelper.getFile(dirName);
		var pics = dir.getDirectoryListing();
		var picArr = [];
		for(var j=0; j<pics.length; j++){
			var pic = appDataHelper.getFile(dirName+'/'+pics[j]);
			picArr.push(new Photo(pic));
		}
		var albumIcon = 'images/photos.png';
		if(picArr.length > 0){
			albumIcon = picArr[0].Image;
		}
		photoPadController.Albums.push(new Album({},dirs[i],albumIcon,picArr));
	}
	
	photoPadController.addAlbum = function(albumName){
		var albumPath = 'Albums'+'/'+albumName;
		if(!appDataHelper.fileExists(albumPath)){
			appDataHelper.createDirectory(albumPath);
			var newAlbum = new Album({},albumName,'images/photos.png',[]);	
			photoPadController.Albums.push(newAlbum);
			var evtData = {
				Album : newAlbum
			};
			Ti.App.fireEvent(photoPadController.ALBUM_ADDED_EVENT, evtData);				
		}
	};
	
	photoPadController.addPhotos = function(album, photos){	
		var albumPath = 'Albums'+'/'+album.Name;
		var albumOrigCount = album.Photos.length;
		if(photos != null){
			for(var i=0; i<photos.length; i++){
				appDataHelper.saveFile(albumPath,'photo_'+albumOrigCount+i+'.png',photos[i]);
			}
		}				
	};

	return photoPadController;
};
