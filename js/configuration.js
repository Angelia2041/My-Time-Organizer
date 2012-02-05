
function removeData() {
	localStorage.clear();
	window.location.reload();
}

function importData() {
	// this
	end();
}

function exportData() {

	var data = {};
	data.version = __VERSION__;
	data.api = 1;
	data.dev = !__RELEASE__;
	data.date = new Date();
	data.content = localStorage;
	content = JSON.stringify(data);
	//uriContent = "data:application/octet-stream," + encodeURIComponent(content);
	//window.location.href = uriContent;
	//location.href = window.webkitURL.createObjectURL(blob);
	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
	window.requestFileSystem(window.TEMPORARY, 5*1024*1024 /*5MB*/, function(fs) {
		fs.root.getFile('MyTimeOrganizer-export.mto', {create: true}, function(fileEntry) {
			fileEntry.createWriter(function(fileWriter) {
				var bb = new WebKitBlobBuilder();
				bb.append(content);
				var blob = bb.getBlob('application/json'); 
				fileWriter.write(blob);
			}, function(e) {console.log(e); });
			location.href = fileEntry.toURL();
			end();
		}, function(e) { console.log(e); });
		
		
	}, function(e) { console.log(e); });
	
}

function setColor() {
	localStorage['color']=$(this).attr('data-color');
	loadUIColor();
}

function confEmptyAreYouSureScreen() {

	_gaq.push(['_trackPageview', '/config/importExport/clear']);

	var okno = document.createElement('div');
	okno.id = 'tutorial';
	okno = $('#tutorial');
	okno.hide();
	okno.addClass('helper');
	okno.empty();
	okno.css("z-index", 100000).css('width',400).css('padding-top',0);
		
	var wrap = document.createElement('div');
		
	$(wrap).html(chrome.i18n.getMessage("confClearAreYouSure"));
	$(wrap).find('p').css('text-align','center').css('padding-top',20);

	var next = document.createElement('div');
	$(next).addClass('next_button');
	next.innerHTML = chrome.i18n.getMessage("confDelete");
	next.onclick = removeData;
	$(next).css('width','100%').appendTo(wrap);

	$(wrap).appendTo(okno);

	next = document.createElement('div');
	$(next).addClass('next_button');
	next.innerHTML = chrome.i18n.getMessage("cancel");
	next.onclick = confImportExportScreen;
	$(next).css('width','100%').appendTo(okno);
	
	okno.appendTo("body");
	okno.fadeIn(500);
	
	$('#tutorialHighlight').css('display','block').css('left', $('#tutorialHighlight').offset().left).css('top', $('#tutorialHighlight').offset().top);
	//first();
}

function confColorThemeScreen() {

	_gaq.push(['_trackPageview', '/config/colorTheme']);

	var okno = document.createElement('div');
	okno.id = 'tutorial';
	okno = $('#tutorial');
	okno.hide();
	okno.addClass('helper');
	okno.empty();
	okno.css("z-index", 100000).css('width',400).css('padding-top',0);
		
	var wrap = document.createElement('div');
		
	$(wrap).html(chrome.i18n.getMessage("colorTheme"));
	$(wrap).find('p').css('text-align','center').css('padding-top',20);

	var next = document.createElement('div');
	$(next).addClass('selectColorVersion');
	$(next).css('background-color', '#457ad5');
	next.setAttribute('data-color', 'blue');
	next.onclick = setColor;
	next.ondblclick = end;
	$(next).appendTo($(wrap).find('p')[1]);

	next = document.createElement('div');
	$(next).addClass('selectColorVersion');
	$(next).css('background-color', '#fba8d3');
	next.setAttribute('data-color', 'pink');
	next.onclick = setColor;
	next.ondblclick = end;
	$(next).appendTo($(wrap).find('p')[1]);

	next = document.createElement('div');
	$(next).addClass('selectColorVersion');
	$(next).css('background-color', '#1a1a1a');
	next.setAttribute('data-color', 'black');
	next.onclick = setColor;
	next.ondblclick = end;
	$(next).appendTo($(wrap).find('p')[1]);
	
	next = document.createElement('div');
	$(next).addClass('selectColorVersion');
	$(next).css('background-color', '#a88314');
	next.setAttribute('data-color', 'brown');
	next.onclick = setColor;
	next.ondblclick = end;
	$(next).appendTo($(wrap).find('p')[1]);

	next = document.createElement('div');
	$(next).addClass('selectColorVersion');
	$(next).css('background-color', '#a0e62f');
	next.setAttribute('data-color', 'lime');
	next.onclick = setColor;
	next.ondblclick = end;
	$(next).appendTo($(wrap).find('p')[1]);	
	
	next = document.createElement('div');
	$(next).addClass('selectColorVersion');
	$(next).css('background-color', '#ff8b2a');
	next.setAttribute('data-color', 'orange');
	next.onclick = setColor;
	next.ondblclick = end;
	$(next).appendTo($(wrap).find('p')[1]);	

	$(wrap).appendTo(okno);

	next = document.createElement('div');
	$(next).addClass('next_button');
	next.innerHTML = chrome.i18n.getMessage("cancel");
	next.onclick = confScreen;
	$(next).css('width','100%').appendTo(okno);
	
	okno.appendTo("body");
	okno.fadeIn(500);
	
	$('#tutorialHighlight').css('display','block').css('left', $('#tutorialHighlight').offset().left).css('top', $('#tutorialHighlight').offset().top);
	//first();
}

function confImportExportScreen() {

	_gaq.push(['_trackPageview', '/config/importExport']);

	var okno = document.createElement('div');
	okno.id = 'tutorial';
	okno = $('#tutorial');
	okno.hide();
	okno.addClass('helper');
	okno.empty();
	okno.css("z-index", 100000).css('width',250).css('padding-top',0);
				
	var next = document.createElement('div');
	$(next).addClass('next_button');
	next.innerHTML = chrome.i18n.getMessage("confImport");
	//next.onclick = confImportExportScreen;
	$(next).css('width','100%').css('position','relative').appendTo(okno);
	
	$input = $('<input type="file" />').appendTo(next).css('opacity','0').css('cursor','pointer').css('position','absolute').css('width','100%').css('height','100%').css('top','0').css('left','0').change(importData);

	next = document.createElement('div');
	$(next).addClass('next_button');
	next.innerHTML = chrome.i18n.getMessage("confExport");
	next.onclick = exportData;
	$(next).css('width','100%').appendTo(okno);

	next = document.createElement('div');
	$(next).addClass('next_button');
	next.innerHTML = chrome.i18n.getMessage("confClearDB");
	next.onclick = confEmptyAreYouSureScreen;
	$(next).css('width','100%').appendTo(okno);

	next = document.createElement('div');
	$(next).addClass('next_button');
	next.innerHTML = chrome.i18n.getMessage("cancel");
	next.onclick = confScreen;
	$(next).css('width','100%').appendTo(okno);
	
	okno.appendTo("body");
	okno.fadeIn(500);
	
	$('#tutorialHighlight').css('display','block').css('left', $('#tutorialHighlight').offset().left).css('top', $('#tutorialHighlight').offset().top);
	//first();
}

function confScreen() {

	_gaq.push(['_trackPageview', '/config']);
	
	$('#helper').css("visibility", "hidden");

	$('#tutorial').remove();
	
	var okno = document.createElement('div');
	okno.id = 'tutorial';
	okno = $(okno);
	okno.hide();
	okno.addClass('helper');
	okno.empty();
	okno.css("z-index", 100000).css('width',250).css('padding-top',0);
		
	var next = document.createElement('div');
	$(next).addClass('next_button');
	next.innerHTML = chrome.i18n.getMessage("confColor");
	next.onclick = confColorThemeScreen;
	$(next).css('width','100%').appendTo(okno);

	next = document.createElement('div');
	$(next).addClass('next_button');
	next.innerHTML = chrome.i18n.getMessage("confImportExport");
	next.onclick = confImportExportScreen;
	$(next).css('width','100%').appendTo(okno);
	
	next = document.createElement('div');
	$(next).addClass('next_button');
	next.innerHTML = chrome.i18n.getMessage("cancel");
	next.onclick = end;
	$(next).css('width','100%').appendTo(okno);
	
	okno.appendTo("body");
	okno.fadeIn(500);
	
	$('#tutorialHighlight').css('display','block').css('left', $('#tutorialHighlight').offset().left).css('top', $('#tutorialHighlight').offset().top);
	//first();
}
