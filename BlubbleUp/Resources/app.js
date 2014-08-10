/*
 * A tabbed application, consisting of multiple stacks of windows associated with tabs in a tab group.
 * A starting point for tab-based application with multiple top-level windows.
 * Requires Titanium Mobile SDK 1.8.0+.
 *
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *
 */

//bootstrap and check dependencies
if (Ti.version < 1.8) {
  alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

// This is a single context application with mutliple windows in a stack
(function() {
  //determine platform and form factor and render approproate components
  var osname = Ti.Platform.osname,
    version = Ti.Platform.version,
    height = Ti.Platform.displayCaps.platformHeight,
    width = Ti.Platform.displayCaps.platformWidth;

  function checkTablet() {
    var platform = Ti.Platform.osname;

    switch (platform) {
      case 'ipad':
        return true;
      case 'android':
        var psc = Ti.Platform.Android.physicalSizeCategory;
        var tiAndroid = Ti.Platform.Android;
        return psc === tiAndroid.PHYSICAL_SIZE_CATEGORY_LARGE || psc === tiAndroid.PHYSICAL_SIZE_CATEGORY_XLARGE;
      default:
        return Math.min(
          Ti.Platform.displayCaps.platformHeight,
          Ti.Platform.displayCaps.platformWidth
        ) >= 400
    }
  }

  var isTablet = checkTablet();

  var Window;
  if (isTablet) {
    Window = require('ui/tablet/ApplicationWindow');
  } else {
    Window = require('ui/handheld/ApplicationWindow');
  }


  var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
  var mainWindow = new ApplicationTabGroup(Window);
  
  var Blubble = require('data/Blubble');
  var blubble = new Blubble(1, 'Shailesh', 'Shailesh', '', []); 
  var blubbleController = require('controller/BlubbleController').BlubbleController(blubble);
  var blubbleWindow = require('ui/BlubbleWindow').BlubbleWindow(blubbleController);
  var tab1 = Ti.UI.createTab({
  	title: blubbleWindow.title,
	icon: '/images/home-32.png',
	window: blubbleWindow
  });	
  blubbleWindow.containingTab = tab1;
  mainWindow.addTab(tab1);
  
  var blubblersWindow = require('ui/BlubblersWindow').BlubblersWindow('Blubblers');
  var tab2 = Ti.UI.createTab({
  	title: blubblersWindow.title,
	icon: '/images/groups-32.png',
	window: blubblersWindow
  });	
  blubblersWindow.containingTab = tab2;  
  mainWindow.addTab(tab2);

  var chatWindow = require('ui/ChatWindow').ChatWindow('Blubble Chat');
  var tab3 = Ti.UI.createTab({
  	title: chatWindow.title,
	icon: '/images/chat-32.png',
	window: chatWindow
  });	
  chatWindow.containingTab = tab3;
  mainWindow.addTab(tab3);
  
  var settingsWindow = require('ui/SettingsWindow').SettingsWindow('Settings');
  var tab4 = Ti.UI.createTab({
  	title: settingsWindow.title,
	icon: '/images/settings-32.png',
	window: settingsWindow
  });	
  settingsWindow.containingTab = tab4;
  mainWindow.addTab(tab4);
  mainWindow.open();
})();
