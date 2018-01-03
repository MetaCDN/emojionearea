define([
    'jquery',
    'function/textFromHtml',
],
function($, textFromHtml) {
    return function(html, self) {
        var sel, range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                // check to see if we can insert emoji
                if (self && self.charLimit != -1){
                    var newLength = self.getLength() + textFromHtml(html, self).length;
                    if (newLength - range.toString().length > self.charLimit)
                        return;
                }
                range.deleteContents();
                var el = document.createElement("div");
                el.innerHTML = html;
                var frag = document.createDocumentFragment(), node, lastNode;
                while ( (node = el.firstChild) ) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                    // invoke keypress
                    $(range.startContainer).keypress()
                    $(range.startContainer).keyup()
                }
            }
        } else if (document.selection && document.selection.type != "Control") {
            // check to see if we can insert emoji
            if (self && self.charLimit != -1){
                var newLength = getLength().length + textFromHtml(html, self).length;
                if (newText > self.charLimit)
                    return;
            }
            document.selection.createRange().pasteHTML(html);
        }
    }
});