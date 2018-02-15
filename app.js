var UIController = (function() {

    function getList() {
        return document.getElementsByTagName('ul');
    }

    return { 
        addbulletPointToTheList: function(text) {
            var list = getList();
            var newElement = createListElement(text);
            list[0].appendChild(newElement);
            list[0].appendChild(document.createElement('hr'));
        },

        addLinkElementToTheList: function() {
            var list = getList();
            var linkElement = document.createElement('a');
            linkElement.appendChild(document.createTextNode('+ Add Task'));
            linkElement.href = '';
            linkElement.onclick = function() { return cancelHref() };
            list[0].appendChild(linkElement);
        }
    };

    function createListElement(text) {
        var element = document.createElement('li');
        element.appendChild(document.createTextNode(text));
        return element;
    }

})();

var localStorageHelper = {
    set: function(key, value) {
        if (!key || !value) {return;}

        if (typeof value === "object") {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    },
    get: function(key) {
        var value = localStorage.getItem(key);
    
        if (!value) {return;}
    
        // assume it is an object that has been stringified
        if (value[0] === "{" || value[0] === "[") {
            value = JSON.parse(value);
        }
    
        return value;
      }
}

var controller = (function(uiCtrl, lsHelper) {

    var task = function(label) {
        this.label = label;
    }
    
    // console.log('JSON parsing result: ' + JSON.parse('test'));

    // var tasks = [new task('Coffee'), new task('Tea'), new task('Milk')];

    var tasks = lsHelper.get('tasks', tasks);

    console.log(localStorage.length);

    tasks.forEach(element => {
        addElementToTheList(element);
    });

    function addElementToTheList(element) {
        uiCtrl.addbulletPointToTheList(element.label);
    }

    uiCtrl.addLinkElementToTheList();

    // var testa = document.querySelector('a');
    // console.log(testa);

    document.querySelector('a').addEventListener('click', function(){
        console.log('event w');
        // return false;
    });

})(UIController, localStorageHelper);

function cancelHref() {
    return false;
}
