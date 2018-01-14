var UIController = (function() {

    function getList() {
        return document.getElementsByTagName('ul');
    }

    return { addbulletPointToTheList: function(text) {
            var list = getList();
            var newElement = createListElement(text);
            list[0].appendChild(newElement);
        }
    }

    function createListElement(text) {
        var element = document.createElement('li');
        element.appendChild(document.createTextNode(text));
        return element;
    }

})();

var controller = (function(uiCtrl) {

    var task = function(label) {
        this.label = label;
    }

    var listElements = [new task('Coffee'), new task('Tea'), new task('Milk')];

    listElements.forEach(element => {
        addElementToTheList(element);
    });

    function addElementToTheList(element) {
        uiCtrl.addbulletPointToTheList(element.label);
    }

})(UIController);
