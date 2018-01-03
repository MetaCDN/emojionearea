define([
    'function/lengthFromHtml',
],
function(textFromHtml) {
    EmojioneArea.prototype.getLength = function() {
        return lengthFromHtml(this.editor.html());
    }
});