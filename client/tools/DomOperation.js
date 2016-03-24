'use strict';

function hasClass(obj, cls) {
    return obj.className?obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)')):false;
}

function addClass(obj, cls) {
    if (!hasClass(obj, cls)) obj.className =  obj.className+" " + cls;
}

function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}

module.exports.addClass = addClass;
module.exports.hasClass = hasClass;
module.exports.removeClass = removeClass;
