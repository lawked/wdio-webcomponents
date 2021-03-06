'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (selector, multiple) {
    var selectors = selector;
    if (document.body.createShadowRoot || document.body.attachShadow) {
        selectors = selectors.split(' ');
    }

    function findElement(selectors) {
        var currentElement = document;
        for (var i = 0; i < selectors.length; i++) {
            // If the element is a shadow host, go into the shadowRoot
            if (i > 0 && currentElement.shadowRoot) {
                currentElement = currentElement.shadowRoot;
            }

            var iterSelector = selectors[i].split('::').join(' ');
            debugger;

            if (i === selectors.length - 1 && multiple) {
                // Final selector part and multiple=true, try to find multiple elements
                currentElement = currentElement.querySelectorAll(iterSelector);
            } else {
                currentElement = currentElement.querySelector(iterSelector);
            }

            if (!currentElement) {
                break;
            }
        }

        return currentElement;
    }

    return findElement(selectors);
};