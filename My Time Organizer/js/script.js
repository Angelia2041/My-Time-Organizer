/* [?] My Time Organizer @ Google Apps Hackathon 12.11.2011 (11/12/2011)
 * [+] Authors: 
 * - Dominik Galewski (mug3tsu)
 * - Sebastian Krzyszkowiak (dos)
 * - Krzysztof Marciniak (hun7er)
 * [!] [alphabetical order]
 */

lang = new Array();
lang["en"] = new Array();
lang["pl"] = new Array();

var mylang ="pl";
		
/* English */
lang["en"]["days"] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
/* Polish */
lang["pl"]["days"] = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];

function notify(text) {
	// Create a simple text notification:
	var notification = webkitNotifications.createNotification(
	    'icons/icon48.png',  // icon url - can be relative
	    'Fuck yeah!',  // notification title
	    text  // notification body text
	);

	// Or create an HTML notification:
	//var notification = webkitNotifications.createHTMLNotification(
	//  'notification.html'  // html url - can be relative
	//);

	// Then show the notification.
	notification.show(); 
}

	
$(document).ready(function() {
	function right_slide() {
	//alert("Prawa szczałka!");
		if ($("[data-editedNow=true]")[0]) return false;
		if ($("#inner_table").css("transform") !== "translate(100%, 0px)") {
			$("#inner_table").css("transform", "translate(-100%, 0px)");
		}
		if ($("#inner_table").css("transform") === "translate(100%, 0px)")
			$("#inner_table").css("transform", "");
	}
		
	function left_slide() {
		//alert("Lewa szczałka!");
		if ($("[data-editedNow=true]")[0]) return false;
		if ($("#inner_table").css("transform") !== "translate(-100%, 0px)") {
			$("#inner_table").css("transform", "translate(100%, 0px)");
		}
		if ($("#inner_table").css("transform") === "translate(-100%, 0px)") {
			$("#inner_table").css("transform", "");
		}
	}
		
	function keydown(e) {
		if(event.which == 39) right_slide();
		else if (event.which == 37) left_slide();
	}

	function colorFromBgColor(color) {
		r=parseInt(color.substring(1,3),16);
		g=parseInt(color.substring(3,5),16);
		b=parseInt(color.substring(5,7),16);
		if (((r+b+g)/3)>85) return "#333333"; else return "#ffffff";
	}

	function resizeDays() {
		$(".day_content").css("height",$("nav").height()-81);
	}

	window.onresize = resizeDays;

	function fillNote(note) {
		note.setAttribute('class','note');

		$(note).css('backgroundColor', note.getAttribute('data-bgcolor')).css('color', colorFromBgColor(note.getAttribute('data-bgcolor')));

		var note_content = document.createElement('div');
		note_content.setAttribute('class','note_content');
		if (note.getAttribute('data-content')==='')
			note_content.innerHTML = 'Kliknij ikonę ołówka, aby edytować tę notatkę, lub ikonkę obok, aby zmienić kolor kartki. Krzyżyk usuwa notatkę.';
		else note_content.innerHTML = note.getAttribute('data-content');
		note_content.contentEditable = false;
		note.appendChild(note_content);

		var note_icons = document.createElement('div');
		note_icons.setAttribute('class','menu');

		var icon = document.createElement('img');
		icon.setAttribute('src', 'icons/write.png');
		icon.draggable = false;
		icon.onclick = function() {
			note_content = this.parentNode.parentNode.childNodes[0];
			if (note_content.isContentEditable) {
				note_content.parentNode.setAttribute('data-content', note_content.innerHTML);
				note_content.contentEditable = false;
				saveNotes();
			} else {
				note_content.innerHTML = note_content.parentNode.getAttribute('data-content');
				note_content.contentEditable = true;
				note_content.focus();
			}
			note_content.parentNode.setAttribute('data-editedNow', note_content.isContentEditable);
		}

		note_icons.appendChild(icon);

		var icon = document.createElement('img');
		icon.setAttribute('src', 'icons/color.png');
		icon.draggable = false;

		$(icon).ColorPicker({
			color: note.getAttribute('data-bgcolor'),
			onShow: function (colpkr) {
				if (this.getAttribute('id')!='COLORPICKERTROLOLOLO') {
					this.setAttribute('id', 'COLORPICKERTROLOLOLO');
					this.parentNode.parentNode.setAttribute('data-whileInColorPicker', true);
					$(colpkr).fadeIn(500);
				}
				return false;
			},
			onHide: function (colpkr) {
				document.getElementById('COLORPICKERTROLOLOLO').parentNode.parentNode.setAttribute('data-whileInColorPicker', false);
				document.getElementById('COLORPICKERTROLOLOLO').parentNode.parentNode.style.backgroundColor=document.getElementById('COLORPICKERTROLOLOLO').parentNode.parentNode.getAttribute('data-bgcolor');
				document.getElementById('COLORPICKERTROLOLOLO').parentNode.parentNode.style.color=colorFromBgColor(document.getElementById('COLORPICKERTROLOLOLO').parentNode.parentNode.getAttribute('data-bgcolor'));
				$(colpkr).fadeOut(500, function() { document.getElementById('COLORPICKERTROLOLOLO').setAttribute('id', ''); });
				saveNotes();
				return false;
			},
			onChange: function (hsb, hex, rgb) {
				document.getElementById('COLORPICKERTROLOLOLO').parentNode.parentNode.setAttribute('data-bgcolor', '#'+hex);
				//document.getElementById('COLORPICKERTROLOLOLO').parentNode.parentNode.style.backgroundColor = '#'+hex;
			}
		});

		icon.style.marginLeft = '6px';
		note_icons.appendChild(icon);

		var icon = document.createElement('img');
		icon.setAttribute('src', 'icons/close.png');
		icon.draggable = false;
		icon.style.float = 'right';
		icon.onclick = function() {
			function removeNote() { this.parentNode.removeChild(this); saveNotes(); }
			$(this.parentNode.parentNode).animate({opacity: 0, rotate: '-70deg', scale: 0, height: 0, marginBottom: '-4%'}, 500, removeNote);
		}
		note_icons.appendChild(icon);

		note.appendChild(note_icons);
		$(note).css("opacity", 0).scale(0).rotate('-70deg').animate({opacity: 1, rotate: 0, scale: 1}, 500);
	}
		
	document.addEventListener("keydown", keydown, false);
			
	var now = moment();
	var mdn = now.format("d")-1;
	//alert(day);
	var d = now.add("days", (-1)*mdn);
	for(i = 0; i < lang[mylang]["days"].length; i++) {
				/*
				<nav>
				<div class="header">
					<h3>7.11<br/>Poniedziałek</h3>
				</div>
                                <div class="day_content" id="day1">
				</div>
			</nav>
				*/
		var text = $("#inner_table").html();
		if (i == mdn) text += "<nav><div class='header' id='current_day'>";
		else text += "<nav><div class='header'>"
		text += "<h3>"+d.format("D")+"."+d.format("M")+"<br/>"+lang[mylang]["days"][i]+"</h3></div><div class='day_content' id='day"+(i+1)+"'></div></nav>";
		$("#inner_table").html(text);
		d.add("days", 1);
	}
	$("#panel_slider").click(function() {
		if ($("#add_panel").css("margin-left") === "0px") { 
			$("#add_panel").css("margin-left", "-300px");
			$("#add_panel img").animate({rotate:"0deg"}, 400); 
		}
		else { 
			$("#add_panel").css("margin-left", "0px");
			$("#add_panel img").animate({rotate:"180deg"}, 400); 
		}
		});

	document.getElementById("note_icon").ondragstart = function(e) {
		e.dataTransfer.setData("Url","note://");
	}
	document.getElementById("event_icon").ondragstart = function(e) {
		e.dataTransfer.setData("Url","event://");
	}
	document.getElementById("task_icon").ondragstart = function(e) {
		e.dataTransfer.setData("Url","task://");
	}
	var arr1 = new Array(), arr2 = new Array();
	for(i = 0; i < 7; i++) {
		arr1[i] = 'day'+(i+1);
		arr2[i] = document.getElementById(arr1[i]);
		arr2[i].ondrop = function(event) {
			$(this).css("background-color", "transparent").css("opacity", "1");
		        var type = event.dataTransfer.getData("Url");
			var text = event.dataTransfer.getData("Text");
			//alert(type);
			if (!text) text="";
			if ((type==="note://") || (text)) {
				var note = document.createElement('div');

				note.setAttribute('data-content', text);
				note.setAttribute('data-bgcolor', '#f0f000');
				note.setAttribute('data-date', arr1[i]); //FIXME!
			
				fillNote(note);
				this.appendChild(note);
				saveNotes();
				//notify('Notatka dodana!');
			} else if (type=="event://") {
				var note = document.createElement('div');

				note.setAttribute('data-content', text);
				note.setAttribute('data-bgcolor', '#e00000');
				note.setAttribute('data-date', arr1[i]); //FIXME!
			
				fillNote(note);
				this.appendChild(note);
				saveNotes();
			} else if (type=="task://") {
				var note = document.createElement('div');

				note.setAttribute('data-content', text);
				note.setAttribute('data-bgcolor', '#00e000');
				note.setAttribute('data-date', arr1[i]); //FIXME!
			
				fillNote(note);
				this.appendChild(note);
				saveNotes();
			}
		}
		arr2[i].ondragover = function () { $(this).css("background-color", "white").css("opacity", "0.8"); return false; }
		arr2[i].ondragleave = function () { $(this).css("background-color", "transparent").css("opacity", "1"); }
	}
			
	function saveNotes() {
		for ( i = 0; i < 7; i++ ) {
			var column = document.getElementById('day'+(i+1)).childNodes;
			var note_count = 0;
			var notes = new Array();
			for ( j = 0; j < column.length; j++ ) {
				if ( column[j].getAttribute('class') == "note" ) {
					notes[note_count] = column[j].getAttribute("data-date");
					notes[note_count+1] = column[j].getAttribute("data-content");
					notes[note_count+2] = column[j].getAttribute("data-bgcolor");
					note_count += 3;
				}
			}
			localStorage['day'+(i+1)]=JSON.stringify(notes);
			//alert(localStorage['day'+(i+1)]);
		}
	}
			
	function loadNotes() {
		for ( i = 0; i < 7; i++ ) {
			var column = Array();
			var note_count = 0;
			column = JSON.parse(localStorage['day'+(i+1)]);
			for ( j = 0; j < column.length; j+=3 ) {
				var note = document.createElement('div');
				note.setAttribute('data-date', column[j]);
				note.setAttribute('data-content', column[j+1]);
				note.setAttribute('data-bgcolor', column[j+2]);
				fillNote(note);
				document.getElementById('day'+(i+1)).appendChild(note);							
			}
		}
	}
			
	loadNotes();
	resizeDays();			
});
