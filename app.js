// var titleChange = function() {
//     document.querySelector('.title').innerHTML = '<h1><b><i>bladd</i></b></h1>';
// }
(function () {

    var task = function(label) {
        this.label = label;
    }

    // var firstElement = {
    //     label: 'Coffee',
    // }

    // var secondElement = {
    //     label: 'Tea',
    // }

    // var thirdElement = {
    //     label: 'Milk',
    // }

    var listElements = [new task('Coffee'), new task('Tea'), new task('Milk')];

    listElements.forEach(element => {
        addElementToTheList(element);
    });

    function addElementToTheList(element) {
        addbulletPointToTheList(element.label);
    }

    function getList() {
        return document.getElementsByTagName('ul');
    }

    function createListElement(text) {
        var element = document.createElement('li');
        element.appendChild(document.createTextNode(text));
        return element;
    }

    function addbulletPointToTheList(text) {
        var list = getList();
        var newElement = createListElement(text);
        list[0].appendChild(newElement);
        // console.log(list);
    }

    addbulletPointToTheList('New element');
})();

// addbulletPointToTheList('New element');
// titleChange();