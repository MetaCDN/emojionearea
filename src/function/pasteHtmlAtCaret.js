define([
    'jquery',
    'function/textFromHtml',
],
function($, textFromHtml) {
    return function(html, self) {
        // check to see if we can insert emoji
        if (self && self.charLimit != -1){
            var newText = self.getText() + textFromHtml(html, self);
            if (newText.length > self.charLimit)
                return;
        }

        var sel, range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
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
                }
            }
        } else if (document.selection && document.selection.type != "Control") {
            document.selection.createRange().pasteHTML(html);
        }
    }
});