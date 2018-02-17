var UIController = (function() {

    function getList() {
        return document.getElementsByTagName('ul');
    }

    var inputElement;
    var cancelListElement;

    return { 
        addbulletPointToTheList: function(text) {
            var list = getList();
            var newElement = createListElement(document.createTextNode(text));
            addToTheList(newElement);
            list[0].appendChild(document.createElement('hr'));
        },

        addLinkElementToTheList: function() {
            var linkElement = document.createElement('a');
            linkElement.appendChild(document.createTextNode('+ Add Task'));
            linkElement.href = '';
            linkElement.onclick = function() { return cancelHref() };
            var listElement = createListElement(linkElement);
            listElement.style.listStyleType = 'none';
            addToTheList(listElement);
        },

        addInputElement: function() {
            if (inputElement === undefined) {
                inputElement = document.createElement('input');
                inputElement.setAttribute("type", "text");
                inputElement.focus();
                inputElement.select();
                var listElement = createListElement(inputElement);
                listElement.style.listStyleType = 'none';
                addToTheList(listElement);

                var cancelButton = document.createElement('a');
                cancelButton.appendChild(document.createTextNode('Cancel'));
                cancelButton.href = '';
                cancelButton.onclick = function() {
                    var addTaskLink = document.getElementsByTagName('a')[0];
                    addTaskLink.style.display = 'block';
                    cancelListElement.style.display = 'none';
                    inputElement.style.display = 'none';
                    return cancelHref();
                };
                cancelListElement = createListElement(cancelButton);
                cancelListElement.style.listStyleType = 'none';
                addToTheList(cancelListElement);
            } else {
                inputElement.style.display = 'block';
                cancelListElement.style.display = 'block';
            }
        },

        hideAddTaskLink: function() {
            var addTaskLink = document.getElementsByTagName('a')[0];
            addTaskLink.style.display = 'none';
        }
    };

    function addToTheList(element) {
        var list = getList();
        list[0].appendChild(element);
    }

    function createListElement(child) {
        var element = document.createElement('li');
        element.appendChild(child);
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
        // console.log('event w');
        uiCtrl.addInputElement();
        uiCtrl.hideAddTaskLink();
        // return false;
    });

})(UIController, localStorageHelper);

function cancelHref() {
    return false;
}
