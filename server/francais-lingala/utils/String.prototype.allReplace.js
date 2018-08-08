// https://davidwalsh.name/extend-prototypes
// Naming convention important for maintenance and clearness of intent

// This is a very, very simple shim not made for production use
// It's simply to illustrate the prototype extension
// More logic should be added for edge cases
if(!String.prototype.allReplace) {
    String.prototype.allReplace = function(obj) {
        var retStr = this;
        for (var x in obj) {
            retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
        }
        return retStr;
    };
}
