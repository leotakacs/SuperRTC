// ==UserScript==
// @name         SuperRTC
// @version      3.0
// @author       Leo Takacs
// @include      *phone.firertc.com/phone*
// @include      *phone.firertc.com/settings*
// @grant        unsafeWindow
// ==/UserScript==
var pluginName = 'SuperRTC';
var pluginVers = '3.0';
var pluginDesc = 'Customized FireRTC plugin made for scam baiting.';
var hangUpSoundURL = 'http://www.pacdv.com/sounds/voices/okay-bye.wav';
var devMode = true;
var defaultIcon = 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAMMOAADDDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEZGRgBGRkYARkZGB0ZGRj9GRkaKRkZGskZGRqlGRkZrRkZGGEZGRgBGRkYAAAAAAAAAAAAAAAAAAAAAAEZGRgBGRkYARkZGJUZGRppGRkbsRkZG/0ZGRv9GRkb/RkZG+0ZGRr5GRkYxRkZGAAAAAAAAAAAAAAAAAEZGRgBGRkYARkZGQ0ZGRtJGRkb/RkZG/0ZGRv9GRkb/RkZG/0ZGRv9GRkb/RkZGzUZGRiQAAAAAAAAAAEZGRgBGRkYARkZGSUZGRuFGRkb/RkZG/0ZGRv9GRkb/RkZG/0ZGRv9GRkb/RkZG/0ZGRtxGRkYrAAAAAEZGRgBGRkYARkZGO0ZGRt1GRkb/RkZG/0ZGRuBGRkaBRkZGikZGRvBGRkb/RkZG/0ZGRuJGRkZSRkZGAEZGRgBGRkYARkZGIEZGRslGRkb/RkZG/0ZGRtBGRkY5RkZGAEZGRgRGRkZhRkZG0UZGRrdGRkY9RkZGAEZGRgBGRkYARkZGBkZGRplGRkb/RkZG/0ZGRtxGRkY5RkZGAEZGRgBGRkYARkZGAkZGRhNGRkYLRkZGAEZGRgAAAAAARkZGAEZGRkhGRkbyRkZG/0ZGRvRGRkZZRkZGAEZGRgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEZGRgdGRkaoRkZG/0ZGRv9GRkavRkZGCEZGRgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRkYsRkZG4kZGRv9GRkb/RkZGiUZGRgBGRkYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARkZGUUZGRvZGRkb/RkZG/0ZGRt5GRkZNRkZGAUZGRgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEZGRldGRkb4RkZG/0ZGRv9GRkb/RkZG6EZGRkNGRkYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRkY3RkZG6kZGRv9GRkb/RkZG/0ZGRv9GRkZtRkZGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARkZGCkZGRqxGRkb/RkZG/0ZGRv9GRkblRkZGMUZGRgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEZGRgBGRkYxRkZG0UZGRv9GRkb9RkZGfUZGRgFGRkYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRkYARkZGAEZGRjZGRkbIRkZGqkZGRhVGRkYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gMAAPwBAAD4AAAA8AAAAOAAAADAgQAAgccAAIP/AAAD/wAAB/8AAAH/AAAB/wAAAf8AAAH/AACB/wAAw/8AAA==';
var inCallIcon = 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAMMOAADDDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACCDwAAgg8AAIIPBwCCDz8Agg+KAIIPsgCCD6kAgg9rAIIPGACCDwAAgg8AAAAAAAAAAAAAAAAAAAAAAACCDwAAgg8AAIIPJQCCD5oAgg/sAIIP/wCCD/8Agg//AIIP+wCCD74Agg8xAIIPAAAAAAAAAAAAAAAAAACCDwAAgg8AAIIPQwCCD9IAgg//AIIP/wCCD/8Agg//AIIP/wCCD/8Agg//AIIPzQCCDyQAAAAAAAAAAACCDwAAgg8AAIIPSQCCD+EAgg//AIIP/wCCD/8Agg//AIIP/wCCD/8Agg//AIIP/wCCD9wAgg8rAAAAAACCDwAAgg8AAIIPOwCCD90Agg//AIIP/wCCD+AAgg+BAIIPigCCD/AAgg//AIIP/wCCD+IAgg9SAIIPAACCDwAAgg8AAIIPIACCD8kAgg//AIIP/wCCD9AAgg85AIIPAACCDwQAgg9hAIIP0QCCD7cAgg89AIIPAACCDwAAgg8AAIIPBgCCD5kAgg//AIIP/wCCD9wAgg85AIIPAACCDwAAgg8AAIIPAgCCDxMAgg8LAIIPAACCDwAAAAAAAIIPAACCD0gAgg/yAIIP/wCCD/QAgg9ZAIIPAACCDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACCDwcAgg+oAIIP/wCCD/8Agg+vAIIPCACCDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgg8sAIIP4gCCD/8Agg//AIIPiQCCDwAAgg8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIIPUQCCD/YAgg//AIIP/wCCD94Agg9NAIIPAQCCDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACCD1cAgg/4AIIP/wCCD/8Agg//AIIP6ACCD0MAgg8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgg83AIIP6gCCD/8Agg//AIIP/wCCD/8Agg9tAIIPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIIPCgCCD6wAgg//AIIP/wCCD/8Agg/lAIIPMQCCDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACCDwAAgg8xAIIP0QCCD/8Agg/9AIIPfQCCDwEAgg8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgg8AAIIPAACCDzYAgg/IAIIPqgCCDxUAgg8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gMAAPwBAAD4AAAA8AAAAOAAAADAgQAAgccAAIP/AAAD/wAAB/8AAAH/AAAB/wAAAf8AAAH/AACB/wAAw/8AAA==';
var greeting = "Welcome to " + pluginName + " " + pluginVers + "! (by Leo Takacs)";
var fm = false;
//
const defaultURLs = ['youtibe.com', 'gyoutube.com', 'twutter.com', 'ggmail.com', 'youutube.com'];
//
download = function(data, filename) {
	var file = new Blob([data], {
		type: "text/plain;charset=utf-8"
	});
	if (window.navigator.msSaveOrOpenBlob) // IE10+
		window.navigator.msSaveOrOpenBlob(file, filename);
	else { // Others
		var a = document.createElement("a"),
			url = URL.createObjectURL(file);
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		setTimeout(function() {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		}, 0);
	}
};
downloadLog = function() {
	if (document.getElementById("logbox").value.length > 0) {
		download(document.getElementById("logbox").value, spFilename("Log", "rtclog.txt"));
	} else {
		alert("The log box is empty; there is no need to download its contents.");
	}
};
var iframeHTML = `
<font face="verdana"><h1 id="easyrtc">` + pluginName + " " + pluginVers + `</h1>
<p>` + pluginDesc + `</p>
</br>
<h2 id="caller-id-text-box">Caller ID text box</h2>
<p>Will show the current caller ID if &quot;Auto randomize CID&quot; is enabled. A custom caller ID may be entered while a call is not in progress.</p>
</br>
<h2 id="update-cid">Update CID</h2>
<p>Apply the custom caller ID that was specified in the &quot;Caller ID&quot; text box. &quot;Auto randomize CID&quot; will be disabled.</p>
</br>
<h2 id="auto-call-back">Minimalize</h2>
<p>Minimalizes the FireRTC interface. (DTMF input not available while this option is enabled)</p>
</br>
<h2 id="auto-call-back">Auto redial</h2>
<p>Automatically redial the most recent number after the call has ended.  </p>
</br>
<h2 id="auto-randomize-cid">Auto randomize CID</h2>
<p>Automatically randomize the caller ID every time a number has been dialed. (works with Auto redial)</p>
</br>
<h2 id="auto-call-recorder">Auto call recorder</h2>
<p>Automatically record any call. Uses FireRTC&#39;s built in call recording feature. (button will be removed while this function is active!)</p>
</br>
<h2 id="play-hang-up-sound">Play hang up sound</h2>
<p>Play a sound when a call has been ended.</p>
</br>
<h2 id="play-hang-up-sound">Show log box</h2>
<p>Show the EasyRTC log box.</p>
</br>
<h2 id="enable-debug-messages">Enable debug messages</h2>
<p>Show the plugin&#39;s debug messages. (only useful for developers)</p>
</br>
</br>
<h1 id="play-hang-up-sound">Extras</h1>
<h2 id="enable-debug-messages">Popup Generator</h2>
<p>Attempts to find a scammer number. Make sure pop-ups are <b>not</b> blocked!</p>
</br>
<h2 id="enable-debug-messages">Integrated scammer.info page</h2>
<p>Shows an integrated scammer.info page, along with an easy access number text field and call button.</p>
</br>
</font>
`;
var checkboxes = `

<center>
<div class="btn-group">
<input placeholder="Phone # to call" id="qccallnumber" class="btn dialer-input form-control dropdown-toggle val item" style="width:200px;text-align:center" maxlength="15" size="15" type="text">
<button class="btn btn-primary" type="submit" style="width:50px;height:43px;border-top-right-radius:12px;outline:0" id="qccallbtn" onclick="qc()">📞</button>
</br>
</br>
<input placeholder="Using random CID" id="currentCallerID" class="btn form-control dropdown-toggle" style="width:200px;text-align:center" maxlength="15" size="15" type="text">
<buutton class="btn btn-success" style="width:50px;height:43px;border-bottom-right-radius:12px;border-top-right-radius:0px;outline:0;margin-bottom:10px" id="uCID" onclick="updateCID()">✅</button>
</div>


<div class="checkboxes">
<table>
   <tbody>
      <tr>
      </tr>
      <tr>
         <td><input id="enableCallBack" class="checkboxes" type="checkbox" disabled></td>
         <td> Auto redial</td>
      </tr>
      <tr>
         <td><input id="enableRandID" class="checkboxes" type="checkbox" disabled checked></td>
         <td> Auto randomize CID</td>
      </tr>
      <tr>
         <td><input id="recEnabled" class="checkboxes" type="checkbox" disabled></td>
         <td> Auto call recorder</td>
      </tr>
      <tr>
         <td><input id="hangUpAudio" class="checkboxes" type="checkbox" disabled></td>
         <td> Play hang up sound</td>
      </tr>
      <tr>
         <td><input id="showLog" class="checkboxes" type="checkbox" disabled></td>
         <td> Show log box</td>
      </tr>
      <tr>
         <td><input id="debugEnabled" class="checkboxes" type="checkbox" disabled></td>
         <td> Enable debug messages</td>
      </tr>
   </tbody>
</table>
</div>


<div class="btn-group" role="group">
<button type="button" style="margin-top:30px;outline:none;background-color: #F0F0F0;display:inline;" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Extra/Danger functions

 <span class="caret"></span>

 </button>
		<ul class="dropdown-menu" role="menu">
		<li><a href="#" id="localbtn" onclick="localNumber()">Local Number Finder</a></li>
		<li><a href="#" id="floodbtn" onclick="flooderMode()">Flooder Mode</a></li>
		</ul>
</div>
</div>

<div class="btn-group" role="group">
<button type="button" style="margin-top:30px;outline:none;background-color: #F0F0F0;display:inline;" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Logbox

 <span class="caret"></span>

 </button>
		<ul class="dropdown-menu" role="menu">
		<li><a href="#" id="clearbtn" onclick="clearbox()">❌ Clear</a></li>
		<li><a href="#" id="dllogbtn" onclick="downloadLog()">💾 Download log</a></li>
		</ul>
</div>
</div>

<div class="btn-group" role="group">
<div class="btn-group"> <button type="button" style="margin-top:30px;outline:none;background-color: #F0F0F0;display:inline;border-bottom-left-radius:3px;border-top-left-radius:3px" class="btn btn-default" onclick="numFinder()">🚨 Popup Generator</button>
<button type="button" style="margin-top:30px;outline:none;background-color: #F0F0F0;display:inline;border-top-right-radius:3px;border-bottom-right-radius:3px" class="btn btn-default dropdown-toggle" data-toggle="dropdown">

 <span class="caret"></span>

 </button>
		<ul class="dropdown-menu" role="menu">
		<li><a href="#" onclick="addFinderURL()">➕ Add URL</a></li>
		<li><a href="#" onclick="removeFinderURL()">🗑️ Remove URL</a></li>
		<li><a href="#" onclick="showFinderURLs()">📇 Show URLs</a></li>
		<li class="divider"></li>
		<li><a href="#" onclick="importURLs()">📝 Import URLs</a></li>
		<li><a href="#" onclick="exportURLs()">📝 Export URLs</a></li>
		<li class="divider"></li>
		<li><a href="#" onclick="resetFinderURLs()">🔄 Reset URL list to default</a></li>
		</ul>
</div>
</div>


<div class="btn-group" role="group">
<button type="button" style="margin-top:30px;outline:none;background-color: #F0F0F0;display:inline;" class="btn btn-default dropdown-toggle" data-toggle="dropdown">📜 More

 <span class="caret"></span>

 </button>
		<ul class="dropdown-menu" role="menu">
		<li><a href="#" id="helpbtn" onclick="helpArea()">❓ Show Help Section</a></li>
		<li><a href="#" id="scammerdotinfotoggle" onclick="sdi()">🌎 Show scammer.info page</a></li>\
		<li class="divider"></li>
		<li><a href="#" onclick="showAboutInfo()">❕ About</a></li>
		</ul>
</div>
</div>

</div>
<br></br><div class="btn-group">
<textarea class="btn" rows="10" cols="100" id="logbox" style="resize:none;outline:0;text-align:left;white-space: pre-wrap;white-space: pre-line;white-space:pre" ></textarea>
<div class="btn-group-vertical">
</div>
</div>
</br>







</div>
</dio
    <textarea id="importCont" style="display:none">
    </textarea>
</br>
</br>
</br>
<div class="frame-container">
<p id="qccalltext" style="display:none">Quick call:</p>
<div class="btn-group">
	<input id="qccallnumber1" class="btn val" style="width:200px;display:none" maxlength="15" size="15" type="text">
<button class="btn btn-primary" type="submit" style="height:35px;border-top-right-radius:12px;border-bottom-right-radius:12px;outline:0;display:none" id="qccallbtn1" onclick="qc1()">📞</button>
</div>


<input type='file' id="upload" accept='.RTCLIST.TXT' onchange='openFile(event)' style="display:none"><br>
</br>
<iframe id="scammerdotinfo" src="" width="100%" height="650px" style="display:none;outline:none;"></div></iframe><iframe id="secFrame" width="100%" height="600px" style="display:none;outline:none;" oldsrc="https://cdn.rawgit.com/leotakacs/EasyRTC/master/README.md">


`;
localNumber = function() {
	x = prompt("Enter area code:\n");
	if (x.length == 3) {
		var numb1 = getRndInteger(100, 999);
		var numb2 = getRndInteger(1000, 9999);
		numb1 = numb1.toString();
		numb2 = numb2.toString();
		lin = x + "-" + numb1 + "-" + numb2;
		document.getElementById("qccallnumber").value = lin;
		document.getElementById("qccallbtn").click();
	}
}
flooderMode = function() {
	if (fm) {
		fm = false;
		alert("Flooder off");
	} else {
		fm = true;
		alert("Flooder on");
	}
};
$(document.body).append(checkboxes);
qc = function() {
	if (document.getElementById("qccallnumber").value == '' && curNum <= 0 || document.getElementById("qccallnumber").value.charAt(0) == 1 && document.getElementById("qccallnumber").value.length < 11) {
		alert("Please enter a valid number.");
	} else {
		if (document.getElementById("callbtn") && !document.getElementById("hang") && !document.getElementById("hang1")) {
			document.getElementById("number").value = document.getElementById("qccallnumber").value;
		}
		for (var i = 0; i < document.getElementsByClassName("val").length; i++) {
			document.getElementsByClassName("val")[i].value = document.getElementById("qccallnumber").value;
		}
		/* if (document.getElementById("qccallnumber1").value == '') {
		     document.getElementById("qccallnumber1").value = document.getElementById("qccallnumber").value;
		 }*/
		callBack();
	}
};
qc1 = function() {
	if (document.getElementById("qccallnumber1").value == '' && curNum <= 0) {
		alert("Please enter a valid number.");
	} else {
		if (document.getElementById("callbtn") && !document.getElementById("hang") && !document.getElementById("hang1")) {
			document.getElementById("number").value = document.getElementById("qccallnumber1").value;
		}
		for (var i = 0; i < document.getElementsByClassName("val").length; i++) {
			document.getElementsByClassName("val")[i].value = document.getElementById("qccallnumber1").value;
		}
		callBack();
	}
};
spFilename = function(text, ext) {
	var d = new Date();
	//
	var mo = d.getMonth() + 1;
	var day = d.getDay() - 1;
	var year = d.getFullYear();
	//
	var n = d.getTime();
	var h = d.getHours();
	var m = d.getMinutes();
	var s = d.getSeconds();
	filename = "SuperRTC_" + text + "_" + mo + "-" + day + "-" + year + "-" + h + "-" + m + "-" + s + "." + ext;
	return filename;
};
importURLs = function() {
	document.getElementById("upload").click();
};
exportURLs = function() {
	var list = '';
	for (var i = 0; i < finderURLs.length; i++) {
		if (i == finderURLs.length - 1) {
			list = list + finderURLs[i];
		} else {
			list = list + finderURLs[i] + ",";
		}
	}
	addOutput("Exporting URL list as " + spFilename("URLs", "rtclist.txt") + "....");
	download(list, filename);
};
openFile = function(event) {
	var input = event.target;
	var reader = new FileReader();
	reader.onload = function() {
		var text = reader.result;
		var node = document.getElementById('importCont');
		node.value = text;
		console.log(reader.result.substring(0, 200));
	};
	reader.readAsText(input.files[0]);
	imFilename = document.getElementById('upload').value;
	imFilename = "C:\\fakepath\\SuperRTC_URLs_5-2-2018-10-57-50.rtclist.txt";
	imFilename = imFilename.replace('C:\\fakepath\\', '');
	document.getElementById('upload').value = '';
	setTimeout(function() {
		var array = document.getElementById("importCont").value.split(',');
		debugMsg(document.getElementById("importCont").value);
		addOutput("Importing URLs from " + imFilename + "....");
		for (i = 0; i < array.length; i++) {
			addFinderURL(array[i], false);
		}
		addOutput(i + " URL(s) have been imported to the URL list.");
	}, 700);
};
showFinderURLs = function() {
	addOutput("Popup Generator URLs: ");
	for (i = 0; i < localStorage.getItem("numOfUrls"); i++) {
		num = i + 1;
		debugMsg(finderURLs[i]);
		addOutput(num + ". " + finderURLs[i], false);
	}
};
resetFinderURLs = function() {
	debugMsg(defaultURLs.length);
	addOutput("Popup Generator URL list entries have been reset to default." + " (" + defaultURLs.length + ")");
	localStorage.clear();
	localStorage.setItem("numOfUrls", defaultURLs.length);
	writeCheckboxDataToLocalStorage();
	finderURLs = [];
	finderURLs = defaultURLs.slice();
	for (var i = 0; i < finderURLs.length; i++) {
		label = i + 1;
		if (localStorage.getItem("url_" + label) != finderURLs[i]) {
			localStorage.setItem("url_" + label, finderURLs[i]);
		}
	}
};
removeFinderURL = function() {
	if (finderURLs.length > 1) {
		var urllist = '';
		for (var i = 0; i < finderURLs.length; i++) {
			num = i + 1;
			urllist = urllist + num + ". " + finderURLs[i] + "\n";
		}
		rem = prompt("Enter number of URL to remove from list:\n\n" + urllist);
		if (rem > finderURLs.length && rem != undefined) {
			alert("URL number " + rem + " does not exist.");
		} else if (rem == '' && rem != undefined) {
			alert("Please enter a URL number." && rem != undefined);
		} else if (rem != undefined) {
			fnum = finderURLs.length - 1;
			addOutput("www." + finderURLs[rem - 1] + " has been removed from the Popup Generator URL list. (" + fnum + ")");
			localStorage.clear();
			rem--;
			finderURLs.splice(rem, 1);
			localStorage.setItem("numOfUrls", finderURLs.length);
			var list = '';
			for (var i = 0; i < finderURLs.length; i++) {
				list = list + finderURLs[i] + "\n";
			}
			writeCheckboxDataToLocalStorage();
			debugMsg(list);
		}
		for (var i = 0; i < finderURLs.length; i++) {
			label = i + 1;
			if (localStorage.getItem("url_" + label) != finderURLs[i]) {
				localStorage.setItem("url_" + label, finderURLs[i]);
			}
		}
	} else {
		alert("You must have at least one URL.");
	}
};
addFinderURL = function(url, showmsg) {
	if (url == undefined) {
		if (showmsg == undefined) {
			url = prompt("Enter a URL to add to the Popup Generator list (without the \'http://\' or \'www.\'):");
		}
	}
	if (url.length > 4) {
		finderURLs.push(url);
		localStorage.setItem("numOfUrls", finderURLs.length);
		if (showmsg == true) {
			addOutput("www." + url + " has been added to the Popup Generator URL list. (" + finderURLs.length + ")");
		}
	} else if (url == null || url == '') {
		if (showmsg == true) {
			alert("Please enter a URL.");
		}
	} else {
		if (showmsg == true) {
			alert("This is not a valid URL");
		}
	}
	for (var i = 0; i < finderURLs.length; i++) {
		label = i + 1;
		if (localStorage.getItem("url_" + label) != finderURLs[i]) {
			localStorage.setItem("url_" + label, finderURLs[i]);
		}
	}
};

function sleep(delay) {
	var start = new Date().getTime();
	while (new Date().getTime() < start + delay);
}
writeCheckboxDataToLocalStorage = function() {
	// saving checkbox preferences to localStorage
	for (i = 1; i < document.getElementsByClassName("checkboxes").length; i++) {
		localStorage.setItem("cb_" + i, document.getElementsByClassName("checkboxes")[i].checked);
		console.log("cb " + i + " " + document.getElementsByClassName("checkboxes")[i].checked);
	}
};
readCheckboxDataFromLocalStorage = function() {
	//reading checkbox preferences from localStorage
	for (i = 1; i < document.getElementsByClassName("checkboxes").length; i++) {
		if (document.getElementsByClassName("checkboxes")[i].getAttribute("id") != "enableRandID") {
			document.getElementsByClassName("checkboxes")[i].disabled = false;
		}
		id = "cb_" + i;
		if (localStorage.getItem(id) != null) {
			console.log(JSON.parse(localStorage.getItem(id)));
			document.getElementsByClassName("checkboxes")[i].checked = JSON.parse(localStorage.getItem(id));
		}
	}
};

function setup() {
	document.getElementById('buttonid').addEventListener('click', openDialog);

	function openDialog() {
		document.getElementById('fileid').click();
	}
	document.getElementById('fileid').addEventListener('change', submitForm);

	function submitForm() {
		document.getElementById('formid').submit();
	}
}
window.onload = function() {
	for (i = 0; i < document.getElementsByClassName('container').length; i++) {
		document.getElementsByClassName('container')[i].style.display = 'none';
	}
	readCheckboxDataFromLocalStorage();
	if (doOnce) {
		//reading custom Popup Generator URLs from localStorage
		if (!localStorage.getItem("url_1")) {
			debugMsg("numbers reset");
			finderURLs = [];
			finderURLs = defaultURLs.slice();
			localStorage.setItem("numOfUrls", finderURLs.length);
			for (i = 0; i < finderURLs.length; i++) {
				label = i + 1;
				if (localStorage.getItem("url_" + label) != finderURLs[i]) {
					localStorage.setItem("url_" + label, finderURLs[i]);
				}
			}
		} else {
			var cont = true;
			var val = 1;
			while (cont) {
				if (localStorage.getItem("url_" + val)) {
					id = "url_" + val;
					val++;
				} else {
					cont = false;
					val--;
				}
			}
			localStorage.setItem("numOfUrls", val);
		}
		finderURLs = [];
		for (i = 1; i <= localStorage.getItem("numOfUrls"); i++) {
			spot = "url_" + i;
			console.log(spot);
			finderURLs.push(localStorage.getItem(spot));
		}
		var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
		link.type = 'image/x-icon';
		link.rel = 'shortcut icon';
		link.href = defaultIcon;
		document.getElementsByTagName('head')[0].appendChild(link);
		doOnce = false;
	}
};
/*qc1 = function() {
    if (document.getElementById("qccallnumber1").value != curNum && document.getElementById("qccallnumber1").value != '') {
        document.getElementById("qccallnumber").value = document.getElementById("qccallnumber1").value;
        qc();
    } else if (document.getElementById("qccallnumber1").value == '' && curNum != 0) {
        document.getElementById("qccallnumber1").value = curNum;
        document.getElementById("number").value = document.getElementById("qccallnumber1").value;
        callBack();
    } else {
        callBack();
    }
};*/
function addOutput(text, addtime) {
	var d = new Date();
	var n = d.toLocaleTimeString();
	if (addtime == undefined || addtime) {
		document.getElementById("logbox").value = document.getElementById("logbox").value + "[" + n + "] " + text + "\n";
	} else {
		document.getElementById("logbox").value = document.getElementById("logbox").value + text + "\n";
	}
	document.getElementById('logbox').scrollTop = document.getElementById("logbox").scrollHeight;
}
clearbox = function() {
	document.getElementById("logbox").value = '';
};
helpArea = function() {
	if (document.getElementById("secFrame").style.display == '') {
		document.getElementById("secFrame").style.display = 'none';
		document.getElementById("helpbtn").innerHTML = "❓ Show Help Section";
	} else {
		document.getElementById("secFrame").style.display = '';
		document.getElementById("helpbtn").innerHTML = "❓ Hide Help Section";
		document.getElementById("secFrame").contentWindow.document.open();
		document.getElementById("secFrame").contentWindow.document.write(iframeHTML);
		document.getElementById("secFrame").contentWindow.document.close();
		window.scrollTo(0, 99999);
	}
};
sdi = function() {
	if (document.getElementById("scammerdotinfo").style.display == '') {
		document.getElementById("scammerdotinfo").setAttribute("src", "");
		document.getElementById("scammerdotinfo").style.display = 'none';
		document.getElementById("scammerdotinfotoggle").innerHTML = "🌎 Show scammer.info page";
		document.getElementById("qccallbtn1").style.display = 'none';
		document.getElementById("qccallnumber1").style.display = 'none';
	} else {
		document.getElementById("scammerdotinfo").setAttribute("src", "https://www.scammer.info");
		document.getElementById("scammerdotinfo").style.display = '';
		document.getElementById("scammerdotinfotoggle").innerHTML = "🌎 Hide scammer.info page";
		document.getElementById("qccallbtn1").style.display = '';
		document.getElementById("qccallnumber1").style.display = '';
	}
};
updateCID = function() {
	document.getElementById("enableRandID").disabled = false;
	if (document.getElementById("currentCallerID").value.length >= 10 && document.getElementById("currentCallerID").value.charAt(0) != 1) {
		customNumber = true;
		wipeNumberSpot = true;
		document.getElementById("enableRandID").checked = false;
		document.getElementById("currentCallerID").value = document.getElementById("currentCallerID").value.replace(/\(/g, "");
		document.getElementById("currentCallerID").value = document.getElementById("currentCallerID").value.replace(/\)/g, "");
		document.getElementById("currentCallerID").value = document.getElementById("currentCallerID").value.replace(/ /g, "");
		document.getElementById("currentCallerID").value = document.getElementById("currentCallerID").value.replace(/-/g, "");
		document.getElementById("currentCallerID").value = [document.getElementById("currentCallerID").value.slice(0, 3), "-", document.getElementById("currentCallerID").value.slice(3)].join('');
		document.getElementById("currentCallerID").value = [document.getElementById("currentCallerID").value.slice(0, 7), "-", document.getElementById("currentCallerID").value.slice(7)].join('');
		document.getElementById("currentCallerID").value = [document.getElementById("currentCallerID").value.slice(0, 0), "(", document.getElementById("currentCallerID").value.slice(0)].join('');
		document.getElementById("currentCallerID").value = [document.getElementById("currentCallerID").value.slice(0, 4), ")", document.getElementById("currentCallerID").value.slice(4)].join('');
		document.getElementById('frame').contentWindow.address_ua_config_display_name.value = document.getElementById("currentCallerID").value;
		document.getElementById('frame').contentWindow.address_ua_config_display_name.form.submit();
		document.getElementById("label").innerHTML = "custom";
		addOutput("Custom caller ID has been set to " + document.getElementById("currentCallerID").value);
	} else if (document.getElementById("currentCallerID").value.length < 10 && document.getElementById("currentCallerID").value.length > 0) {
		alert("The caller ID \"" + document.getElementById("currentCallerID").value + "\" is invalid. Please specifiy a valid caller ID.");
	} else if (document.getElementById("currentCallerID").value.charAt(0) == 1) {
		alert("A caller ID cannot begin with 1.");
	} else if (document.getElementById("currentCallerID").value.length == 0) {
		alert("Please specify a caller ID.");
	}
};
showAboutInfo = function() {
	info = pluginName + " (version " + pluginVers + "): " + pluginDesc + "\n - By Leo Takacs © 2018";
	alert(info);
};
numFinder = function() {
	maxUrl = finderURLs.length - 1;
	debugMsg(finderURLs[curUrl]);
	if (!shownFinderWarning) {
		alert("Remember to press CTRL+W (or ALT+F4) to force close the popup after you've copied down the number! Don't leave it open, as many of them are made to slow down and/or crash your PC.\n\nYou may use the logbox to write down any phone numbers that you are able to find.");
		shownFinderWarning = true;
	}
	window.open("http://www." + finderURLs[curUrl], "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=50,left=25,width=1200,height=800");
	addOutput("Searching for scammer number(s) at " + "www." + finderURLs[curUrl] + ".");
	if (curUrl == maxUrl) {
		curUrl = 0;
	} else {
		curUrl++;
	}
};
debugMsg = function(msg) {
	if (document.getElementById("debugEnabled").checked) {
		alert(msg);
	}
};
customNumber = false;
updateNumber = true;
prevCall = 0;
curNum = 0;
allowCB = 0;
randID = 1;
allowClick = true;
curNum = 0;
oldSel = 0;
startedRec = 0;
unlockCID = true;
playSound = false;
playSound1 = false;
firstClick = true;
curUrl = 0;
shownFinderWarning = false;
alreadyRan = false;
goAgain = false;
wipeNumberSpot = true;
var doOnce = true;
clickRec = true;
var audio = new Audio(hangUpSoundURL);
var areaCodes = [
	218,
	917,
	302,
	406,
	501,
	334,
	205,
	251,
	210,
	430,
	512,
	802,
	561,
	954,
	907,
	860,
	316,
	240,
	413,
	978,
	872,
	779,
	773,
	712,
	260,
	620,
	304,
	681
];
function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
numOfAreaCodes = areaCodes.length - 1;
randButton = function() {
	var sel = getRndInteger(0, numOfAreaCodes);
	var numb1 = getRndInteger(100, 999);
	var numb2 = getRndInteger(1000, 9999);
	while (sel == oldSel) {
		sel = getRndInteger(0, numOfAreaCodes);
	}
	var numb0 = areaCodes[sel];
	numb1 = numb1.toString();
	numb2 = numb2.toString();
	fin = numb0 + "-" + numb1 + "-" + numb2;
	fin = fin.replace(/\(/g, "");
	fin = fin.replace(/\)/g, "");
	fin = fin.replace(/ /g, "");
	fin = fin.replace(/-/g, "");
	fin = [fin.slice(0, 3), "-", fin.slice(3)].join('');
	fin = [fin.slice(0, 7), "-", fin.slice(7)].join('');
	fin = [fin.slice(0, 0), "(", fin.slice(0)].join('');
	fin = [fin.slice(0, 4), ")", fin.slice(4)].join('');
	address_ua_config_display_name.value = fin;
	address_ua_config_display_name.form.submit();
	oldSel = sel;
};
callBack = function() {
	if (!document.getElementById("hang") && !document.getElementById("hang1")) {
		if (curNum == 0) {
			curNum = document.getElementById("qccallnumber").value;
		} else if (document.getElementById("qccallnumber").value != curNum && document.getElementById("qccallnumber").value != '') {
			curNum = document.getElementById("qccallnumber").value;
		} else if (document.getElementById("qccallnumber").value == '') {
			document.getElementById("qccallnumber").value = curNum;
		}
		if (curNum.charAt(0) == 1) {
			curNum = curNum.substr(1);
		}
		curNum = curNum.replace(/\(/g, "");
		curNum = curNum.replace(/\)/g, "");
		curNum = curNum.replace(/ /g, "");
		curNum = curNum.replace(/-/g, "");
		curNum = [curNum.slice(0, 3), "-", curNum.slice(3)].join('');
		curNum = [curNum.slice(0, 7), "-", curNum.slice(7)].join('');
		curNum = [curNum.slice(0, 0), "(", curNum.slice(0)].join('');
		curNum = [curNum.slice(0, 4), ")", curNum.slice(4)].join('');
		document.getElementById("number").value = curNum;
		document.getElementById("qccallnumber").value = curNum;
		document.getElementById("qccallnumber1").value = curNum;
	} else if (document.getElementById("hang")) {
		unlockCID = false;
		document.getElementById("hang").click();
		if (!customNumber) {
			document.getElementById("currentCallerID").value = "";
		}
	} else if (document.getElementById("hang1")) {
		unlockCID = false;
		document.getElementById("hang1").click();
		if (!customNumber) {
			document.getElementById("currentCallerID").value = "";
		}
	}
	if (document.getElementById("callbtn") && document.getElementById("enableRandID").checked || customNumber) {
		document.getElementById("callbtn").click();
	} else if (document.getElementById("callbtn") && !document.getElementById("enableRandID").checked && !customNumber) {
		alert("Please specifiy a caller ID, or enable \"Auto randomize CID\"!");
	}
	if (document.getElementById("enableRandID").checked && document.getElementById("qccallnumber").value != '') {
		customNumber = false;
		if (!document.getElementById("enableCallBack").checked) {
			document.getElementById('frame').contentWindow.randButton();
		}
		callerID = document.getElementById('frame').contentWindow.fin;
	} else if (document.getElementById("qccallnumber").value != '') {
		callerID = document.getElementById('frame').contentWindow.fin;
	}
	debugMsg(callerID);
};
setCallControlsDisabled = function() {
	document.getElementById("currentCallerID").disabled = true;
	document.getElementById("qccallnumber").disabled = true;
	document.getElementById("qccallnumber1").disabled = true;
	document.getElementById("uCID").disabled = true;
}
setCallControlsEnabled = function() {
	document.getElementById("currentCallerID").disabled = false;
	document.getElementById("qccallnumber").disabled = false;
	document.getElementById("qccallnumber1").disabled = false;
	document.getElementById("uCID").disabled = false;
}
var constRun;
constRun = function() {
	if (document.title != pluginName + " " + pluginVers) {
		document.title = pluginName + " " + pluginVers;
	}
	document.getElementById('qccallnumber').onkeydown = function(e) {
		if (e.keyCode == 13) {
			document.getElementById("qccallbtn").click();
		}
	};
	document.getElementById('qccallnumber1').onkeydown = function(e) {
		if (e.keyCode == 13) {
			document.getElementById("qccallbtn1").click();
		}
	};
	document.getElementById("ldiv").style.display = 'none';
	if (customNumber && document.getElementById("enableRandID").checked && document.getElementById("currentCallerID").value != '' && wipeNumberSpot) {
		document.getElementById("currentCallerID").value = '';
		document.getElementById("enableRandID").disabled = true;
		wipeNumberSpot = false;
		customNumber = false;
	}
	if (document.getElementById("logbox") && !alreadyRan) {
		addOutput(greeting);
		alreadyRan = true;
	}
	if (document.getElementById("hang") || document.getElementById("hang1")) {
		if (document.getElementById("primary-local-video").getAttribute("height") != "50px") {
			document.getElementById("currentCallerID").disabled = true;
			document.getElementById("qccallnumber").disabled = true;
			document.getElementById("qccallnumber1").disabled = true;
			document.getElementById("uCID").classList.add("disabled");
			document.getElementById("primary-local-video").setAttribute("height", "50px");
			document.getElementById("primary-remote-video").setAttribute("height", "50px");
		}
		goAgain = false;
		unlockCID = false;
	}
	if (document.getElementById("showLog").checked) {
		document.getElementById("logbox").style.display = '';
	} else {
		document.getElementById("logbox").style.display = 'none';
	}
	if (!document.getElementById("callbtn") && document.getElementById("hang")) {
		if (playSound == false) {
			document.getElementById("qccallbtn").innerHTML = "❌";
			document.getElementById("qccallbtn").classList.add("btn-danger");
			document.getElementById("qccallbtn").classList.remove("disabled");
			document.getElementById("qccallbtn").classList.remove("btn-primary");
			document.getElementById("qccallbtn1").innerHTML = "❌";
			document.getElementById("qccallbtn1").classList.add("btn-danger");
			document.getElementById("qccallbtn1").classList.remove("disabled");
			document.getElementById("qccallbtn1").classList.remove("btn-primary");
			playSound = true;
			document.getElementById("currentCallerID").value = document.getElementById('frame').contentWindow.address_ua_config_display_name.value;
			if (!document.getElementById("enableCallBack").checked) {
				addOutput("Calling " + curNum + " from " + document.getElementById('frame').contentWindow.address_ua_config_display_name.value + ".....");
                setCallControlsDisabled()
				for (i = 0; i < document.getElementsByClassName('container').length; i++) {
					document.getElementsByClassName('container')[i].style.display = '';
				}
			} else if (document.getElementById("enableCallBack").checked && curNum != 0) {
				for (i = 0; i < document.getElementsByClassName('container').length; i++) {
					document.getElementsByClassName('container')[i].style.display = '';
				}
				addOutput("Redialing " + curNum + " from " + document.getElementById('frame').contentWindow.address_ua_config_display_name.value + ".....");
				setCallControlsDisabled();
			}
			var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
			link.type = 'image/x-icon';
			link.rel = 'shortcut icon';
			link.href = inCallIcon;
			document.getElementsByTagName('head')[0].appendChild(link);
		}
	}
	if (document.getElementById("hang1")) {
		if (playSound1 == false) {
			document.getElementById("qccallbtn").innerHTML = "❌";
			document.getElementById("qccallbtn").classList.add("btn-danger");
			document.getElementById("qccallbtn").classList.remove("disabled");
			document.getElementById("qccallbtn").classList.remove("btn-primary");
			document.getElementById("qccallbtn1").innerHTML = "❌";
			document.getElementById("qccallbtn1").classList.add("btn-danger");
			document.getElementById("qccallbtn1").classList.remove("disabled");
			document.getElementById("qccallbtn1").classList.remove("btn-primary");
			addOutput("Call with " + curNum + " has been answered or sent to voicemail");
			if (fm) {
				l = setInterval(function() {
					document.getElementsByClassName("btn-soundboard")[0].click();
					for (i = 0; i < 1; i++) {
						document.getElementsByClassName("soundboard-button btn col-sm-3 col-xs-6")[7].click();
					}
					clearInterval(l);
				}, 10000);
				x = setInterval(function() {
					document.getElementById("qccallbtn").click();
					clearInterval(x);
				}, 10000);
			}
			if (document.getElementById("recEnabled").checked && document.querySelector('[title="Record Call"]')) {
				document.querySelector('[title="Record Call"]').click();
			}
			playSound1 = true;
		}
	}
	if (document.getElementById("callbtn") && !document.getElementById("hang") && !document.getElementById("hang1")) {
		if (!goAgain) {
			goAgain = true;
		}
		document.getElementById("currentCallerID").disabled = false;
		document.getElementById("qccallnumber").disabled = false;
		document.getElementById("qccallnumber1").disabled = false;
		if (curNum == 0) {
			if (document.getElementById("qccallbtn").innerHTML != "📞") {
				document.getElementById("qccallbtn").innerHTML = "📞";
				document.getElementById("qccallbtn").classList.add("btn-primary");
				document.getElementById("qccallbtn").classList.remove("disabled");
				document.getElementById("qccallbtn").classList.remove("btn-danger");
				document.getElementById("qccallbtn1").innerHTML = "📞";
				document.getElementById("qccallbtn1").classList.add("btn-primary");
				document.getElementById("qccallbtn1").classList.remove("disabled");
				document.getElementById("qccallbtn1").classList.remove("btn-danger");
			}
		}
		document.getElementById("uCID").classList.remove("disabled");
		updateNumber = true;
		if (document.getElementById("enableRandID").checked) {
			if (document.getElementById("currentCallerID").value != '' && !unlockCID) {
				unlockCID = true;
			}
		}
		if (playSound) {
			if (document.getElementById("hangUpAudio").checked) {
				audio.play();
			}
			if (document.getElementById("enableRandID").checked) {
				document.getElementById("currentCallerID").value = '';
			}
			addOutput("Call with " + curNum + " ended");
			setCallControlsEnabled();
			for (i = 0; i < document.getElementsByClassName('container').length; i++) {
				document.getElementsByClassName('container')[i].style.display = 'none';
			}
			var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
			link.type = 'image/x-icon';
			link.rel = 'shortcut icon';
			link.href = defaultIcon;
			document.getElementsByTagName('head')[0].appendChild(link);
			if (curNum != 0 && !document.getElementById("enableCallBack").checked) {
				document.getElementById("qccallbtn").innerHTML = "📞 / 🔄";
				document.getElementById("qccallbtn").style.width = "75px";
				document.getElementById("qccallbtn").classList.add("btn-primary");
				document.getElementById("qccallbtn").classList.remove("btn-warning");
				document.getElementById("qccallbtn").classList.remove("btn-danger");
				document.getElementById("qccallbtn").classList.remove("disabled");
				document.getElementById("qccallbtn1").innerHTML = "📞 / 🔄";
				document.getElementById("qccallbtn1").style.width = "75px";
				document.getElementById("uCID").style.width = "75px";
				document.getElementById("qccallbtn1").classList.add("btn-primary");
				document.getElementById("qccallbtn1").classList.remove("btn-warning");
				document.getElementById("qccallbtn1").classList.remove("btn-danger");
				document.getElementById("qccallbtn1").classList.remove("disabled");
				document.getElementById("qccallnumber").value = '';
				document.getElementById("qccallnumber1").value = '';
			} else if (curNum != 0 && document.getElementById("enableCallBack").checked) {
				document.getElementById("qccallbtn").innerHTML = "🔄";
				document.getElementById("qccallbtn").style.width = "50px"
				document.getElementById("qccallbtn").classList.add("btn-warning");
				document.getElementById("qccallbtn").classList.add("disabled");
				document.getElementById("qccallbtn").classList.remove("btn-danger");
				document.getElementById("qccallbtn").classList.remove("btn-primary");
				document.getElementById("qccallbtn1").innerHTML = "🔄";
				document.getElementById("qccallbtn1").style.width = "50px";
				document.getElementById("uCID").style.width = "50px";
				document.getElementById("qccallbtn1").classList.add("btn-warning");
				document.getElementById("qccallbtn1").classList.add("disabled");
				document.getElementById("qccallbtn1").classList.remove("btn-danger");
				document.getElementById("qccallbtn1").classList.remove("btn-primary");
			}
			playSound = false;
		}
		if (playSound1) {
			playSound1 = false;
		}
	}
	if (document.getElementById("MyDiv") && document.getElementById("MyDiv").style.display != 'none') {
		document.getElementById("MyDiv").style.display = 'none';
	}
	if (document.getElementById("hang") && document.getElementById("hang").style.display != 'none') {
		document.getElementById("hang").style.display = 'none';
	}
	if (document.getElementById("hang1") && document.getElementById("hang1").style.display != 'none') {
		document.getElementById("hang1").style.display = 'none';
	}
	if (document.getElementById("flash") && document.getElementById("flash").style.display != 'none') {
		document.getElementById("flash").style.display = 'none';
	}
	if (document.getElementById("callbtn") && document.getElementById("callbtn").style.display != 'none') {
		document.getElementById("callbtn").style.display = 'none';
	}
	if (document.getElementById("disbtn") && document.getElementById("disbtn").style.display != 'none') {
		document.getElementById("disbtn").style.display = 'none';
	}
	elements = document.getElementsByClassName("alert");
	for (i = 0; i < elements.length; i++) {
		elements[i].parentNode.removeChild(elements[i]);
	}
	elements = document.getElementsByClassName("flash");
	for (i = 0; i < elements.length; i++) {
		elements[i].parentNode.removeChild(elements[i]);
	}
	elements = document.getElementsByClassName("nav-links row");
	for (i = 0; i < elements.length; i++) {
		elements[i].parentNode.removeChild(elements[i]);
	}
	elements = document.getElementsByClassName("map-canvas");
	for (i = 0; i < elements.length; i++) {
		elements[i].parentNode.removeChild(elements[i]);
	}
	elements = document.getElementsByClassName("more-info-links");
	for (i = 0; i < elements.length; i++) {
		elements[i].parentNode.removeChild(elements[i]);
	}
	if (document.getElementById("flash") && document.getElementById("flash").style.display != 'none') {
		document.getElementById("flash").style.display = 'none';
	}
	document.getElementById("MyDiv").innerHTML = "";
	document.getElementById("MyDiv").className = "flash-container";
	if (document.getElementById("enableCallBack").checked) {
		if (document.getElementById("callbtn") && !document.getElementById("hang") && !document.getElementById("hang1")) {
			if (curNum != 0) {
				if (document.getElementById("enableRandID").checked && updateNumber && !document.getElementById("hang") && !document.getElementById("hang1")) {
					document.getElementById('frame').contentWindow.randButton();
					updateNumber = false;
				}
				document.getElementById("number").value = curNum;
				document.getElementById("qccallnumber").value = curNum;
				document.getElementById("qccallnumber1").value = curNum;
				document.getElementById("callbtn").click();
			}
		}
	}
};
document.body.onkeydown = function(e) {
	if (e.keyCode == 18) {
		qc();
	}
};
(function() {
	var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
	var errorMsg = pluginName + ' ' + pluginVers + " only supports Google Chrome.";
	var error = `<center></br></br></br></br></br></br><h1>` + errorMsg;
	if (!isChrome) {
		document.body.innerHTML = '';
		document.title = "Unsupported Browser";
		$(document.body).append(error);
	}
	if (window.location == "http://www.settings.com/") {} else if (window.location == 'https://phone.firertc.com/settings') {
		document.body.innerHTML = document.body.innerHTML.replace(/<button type=\"submit\" class=\"btn btn-default\">Save<\/button>/g, "<button type=\"submit\" class=\"btn btn-default\">Save<\/button> <button type=\"button\" class=\"btn btn-default\" onclick=randButton()>Random Caller ID<\/button>");
		document.body.innerHTML = document.body.innerHTML.replace(/Settings updated. To take effect, your phone needs to be reset./g, "");
	} else if (window.location == 'https://phone.firertc.com/phone' || window.location == 'https://phone.firertc.com/phone#') {
		for (i = 1; i < document.getElementsByClassName("checkboxes").length; i++) {
			document.getElementsByClassName("checkboxes")[i].setAttribute("onclick", "writeCheckboxDataToLocalStorage()");
		}
		if (!devMode) {
			if (confirm("Remember to donate to FireRTC!\n\nClick 'OK' to be taken to the donation page.")) {
				window.open('https://secure.squarespace.com/commerce/donate?donatePageId=59baf033f6576e372166efe9');
			}
		}
		$(document.body).append('<iframe id="frame" style="width:0;height:0;border:0" src="https://phone.firertc.com/settings">');
		/*
		var button = document.createElement("Button");                 //old button - no longer used
		button.classList.add("btn-group");
		button.innerHTML = "Call";
		button.setAttribute("style", "font-size:18px;position:absolute;top:0px;left:41%;height:100px;width:280px;margin-top:15px;line-height:50%;border-radius:12px;outline:0;margin-bottom:1000px;display:none");
		button.classList.add("btn-primary");
		button.setAttribute("onclick", "callBack()");
		button.setAttribute("id", "m");
		document.body.appendChild(button);
		*/
		var canCall = document.getElementById("callbtn");
		var elements = document.getElementsByClassName("logo-container");
		while (elements.length > 0) {
			elements[0].parentNode.removeChild(elements[0]);
		}
		document.body.innerHTML = document.body.innerHTML.replace(/type=\"text\"/g, "class=\"dialer-input form-control dropdown-toggle\" id=\"number\"");
		document.body.innerHTML = document.body.innerHTML.replace(/data-action=\"call\"/g, "data-action=\"call\" onclick=\"prevCall = 1\" id=\"callbtn\"");
		document.body.innerHTML = document.body.innerHTML.replace(/data-action=\"logout\"/g, "data-action=\"logout\" id=\"disbtn\"");
		document.body.innerHTML = document.body.innerHTML.replace(/data-action=\"cancel\"/g, "id=\"hang\" data-action=\"cancel\"");
		document.body.innerHTML = document.body.innerHTML.replace(/data-action=\"hangup\"/g, "id=\"hang1\" data-action=\"hangup\"");
		document.body.innerHTML = document.body.innerHTML.replace(/<div class=\"status\">/g, "<div class=\"status\" id=\"MyDiv\">");
		document.body.innerHTML = document.body.innerHTML.replace(/<div class=\"links\">/g, "<div class=\"links\" id=\"ldiv\">");
		//document.getElementById("ldiv").innerHTML = "<button onclick=\"info()\" style=\"font-size:14px;border-radius:6px;outline:0;padding:10px;background-color: #ffffff ;\" class=\"btn-link\">FireRTC Tools plugin by Leo Takacs // SB<\/button>";
		document.getElementById("ldiv").innerHTML = "";
		setInterval(constRun, 5);
	}
})();