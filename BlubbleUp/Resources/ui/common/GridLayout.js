exports.GridLayout = function(row, col, padding, obj, space){
 
    var elementPadding = (padding ==0) ? 0 : padding + (padding/2);    //to balance the width of each element
    var elementViewWidth = (parseFloat(Math.floor(100 / col))/100) * Ti.Platform.displayCaps.platformWidth - elementPadding; //the element width
 
    // Grid container
    var vview = Ti.UI.createView({
        height: space + '%',
        width: '100%', layout: "vertical",
        backgroundColor: 'transparent'
    });
    
    //vview.counter=0;  //counter
    //vview.elements=obj;
    vview.elements = [];
    vview.rows = [];

    vview.addElements = function(objs){
    	var counter = 0;
    	var items = vview.elements;
    	var rows = vview.rows; 
    	
    	for(var i=0; i<objs.length; i++){
    		//vview.elements.push(objs[i]);
    		items.push(objs[i]);	
    	}	
    	vview.elements = items;  
    	   
    	   
	    for(var x = 0; x < row ; x++){
	        // Horizontal container
	        var horzView;
	        if(x >= rows.length)
	        {
		        horzView = Ti.UI.createView({
		            height: Math.floor(100 / row) + '%',
		            width: '100%', layout: "horizontal",
		            backgroundColor: 'transparent' // Use a Color to create a border
		        });
	        	rows.push(horzView);
	        }
	        else{
	        	horzView = vview.rows[x];
	        }
	        for(var y = 0; y < col; y++){
	            // Element container (Column)
	            var elementView = Ti.UI.createView({
	                // Can Choose a Background Color
	                backgroundColor: 'transparent', height: '100%', width: elementViewWidth, top: padding, left: padding
	            });
	            horzView.add(elementView);
	            if(counter<items.length){
	            elementView.add(items[counter]);
	            // Set alignment of the object inside the element
	            require("ui/common/alignment").setAlign(items[counter]);            	
	            }
	            counter++;
	        }
	        vview.add(horzView);
	    }    	
	    vview.rows = rows;
    };
    
    vview.addElements(obj);
    
    return vview;
};