define([],
function() {
    return function(html) {
        // captures the emoji text and title
        var regex = /(<img.*?class="emojione".*?title="(.*?)".*?>)/g;
        // remove i tags
        var regex2 = /(<i.*?\/i>)/g;

        var matches = [];
        var result = html;
        while (matches = regex.exec(html)) {
            result = result.replace(matches[1], matches[2])
        }
        result = result.replace(regex2, "")
        return result.toString().length;
    }
});