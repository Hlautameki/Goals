var UIController = (function() {

    function getList() {
        return document.getElementsByTagName('ul');
    }

    var inputElement;
    var addCancelListElement;
    var submitAddTaskElement;

    return { 
        addbulletPointToTheList: function(text) {
            addbulletPointToTheListInternal(text);
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
                inputElement.onkeypress = function(e) {
                    if (e.keyCode === 13) {
                        if (inputElement.value !== undefined && inputElement.value !== '') {
                            addTask();
                        } else {
                            cancelAddTask();
                        }
                    }
                };
                

                var listElement = createListElement(inputElement);
                listElement.style.listStyleType = 'none';
                addToTheList(listElement);
                inputElement.focus();
                inputElement.select();
                
                var cancelButton = document.createElement('a');
                cancelButton.appendChild(document.createTextNode('Cancel'));
                cancelButton.href = '';
                cancelButton.onclick = function() {
                    cancelAddTask();
                    return cancelHref();
                };
                cancelButton.style.marginLeft = '1em';
                
                var addTaskButton = document.createElement('a');
                addTaskButton.appendChild(document.createTextNode('Add task'));
                addTaskButton.href = '';
                addTaskButton.onclick = function() {
                    addTask();
                    return cancelHref();
                };

                addCancelListElement = createListElement(addTaskButton);
                addCancelListElement.style.listStyleType = 'none';
                addToTheList(addCancelListElement);

                addCancelListElement.appendChild(cancelButton);
            } else {
                inputElement.style.display = 'block';
                inputElement.value = null;
                inputElement.focus();
                inputElement.select();
                addCancelListElement.style.display = 'block';
            }
        },

        hideAddTaskLink: function() {
            var addTaskLink = document.getElementsByTagName('a')[0];
            addTaskLink.style.display = 'none';
        }
    };

    function addTask() {
        insertBefore(inputElement.value)
        cancelAddTask();
    }

    function cancelAddTask() {
        var addTaskLink = document.getElementsByTagName('a')[0];
        addTaskLink.style.display = 'block';
        addCancelListElement.style.display = 'none';
        inputElement.style.display = 'none';
    }

    function addToTheList(element) {
        var list = getList();
        list[0].appendChild(element);
    }

    function addToTheListBefore(element) {
        var list = getList()[0];
        list.insertBefore(element, list.childNodes[(list.childElementCount - 2)]);
    }

    function createListElement(child) {
        var element = document.createElement('li');
        element.appendChild(child);
        return element;
    }

    function insertBefore(text) {
        var list = getList();
        var newElement = createListElement(document.createTextNode(text));
        addToTheListBefore(newElement);
        addToTheListBefore(document.createElement('hr'));
    }

    function addbulletPointToTheListInternal(text) {
        var list = getList();
        var newElement = createListElement(document.createTextNode(text));
        addToTheList(newElement);
        list[0].appendChild(document.createElement('hr'));
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
