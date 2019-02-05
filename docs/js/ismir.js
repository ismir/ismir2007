function externalLinks() { 
  if (!document.getElementsByTagName) return; 
  var anchors = document.getElementsByTagName("a"); 
    for (var i=0; i<anchors.length; i++) { 
      var anchor = anchors[i]; 
      
      if (anchor.getAttribute("href") && anchor.getAttribute("rel") == "external") 
        anchor.target = "_blank"; 
      } 
} 

function fixemail() {
  var nodes = document.getElementsByTagName("span");
  var node;
  var text;
  var code;
  var parm;
  var anode;
  var classname;
  for(var i = 0; i < nodes.length; i++){
    node = nodes[i];
    classname = node.getAttribute("classname");
    if(!classname) {
      classname = node.getAttribute("class");
    }
    if(classname == "eml") {
      parm = node.firstChild.data;
      
      text = parm.split("(AT)");
      text = text.join("\u0040");
      text = text.split("[DOT]");
      text = text.join("\u002e");
      anode = document.createElement("a");
      anode.setAttribute("href","javascript:window.location=sendeml("+"'"+parm+"'"+",1);");
      // It seems IE does not handle this correctly, therefore we need the href assignment above
      anode.setAttribute("onclick","javascript:window.location=sendeml("+"'"+parm+"'"+",1); return false;");
      anode.setAttribute("onmouseover","window.status=sendeml("+"'"+parm+"'"+",0); return true;");
      anode.setAttribute("onmouseout","window.status=''");
      anode.appendChild(document.createTextNode(text));
      node.replaceChild(anode,node.firstChild);
    }
  }
}

function sendeml (adr,opt) {
  adr = adr.split("(AT)");
  adr = adr.join("\u0040");
  adr = adr.split("[DOT]");
  adr = adr.join("\u002e");
  if(opt == 1) {
    return "mailto:"+adr;
  } else {
    return adr;
  }
}


window.onload = function() {
	fixemail();
	externalLinks();
}
