/**
 * Created by mahme4 on 12/16/2017.
 */

var oojs = (function (oojs) {

  // objected oriented component that is usable

  var PropertyValueChangeEvent = function (type, value) {
    EventType.call(this, type);
    Object.defineProperty(this, 'value', {
      value: value,
      enumerable: true
    });
  };
  PropertyValueChangeEvent.prototype = Object.create(EventType.prototype);

  var ItemAddEvent = function (item) {
    EventType.call(this, 'itemAdded');
    Object.defineProperty(this, 'item', {
      value: item,
      enumerable: true
    });
  };
  ItemAddEvent.prototype = Object.create(EventType.prototype);

  var ItemRemovedEvent = function (index) {
    EventType.call(this, 'itemRemoved');
    Object.defineProperty(this, 'index', {
      value: index,
      enumerable: true
    });
  };
  ItemRemovedEvent = Object.create(EventType.prototype);

  var AppendEvent = function (parentEvent) {
    EventType.call(this, 'appended');
    Object.defineProperty(this, 'parentElement', {
      value: parentEvent,
      enumerable: true
    });
  };
  AppendEvent.prototype = Object.create(EventType.prototype);

  var ToolbarItem = function (itemElement) {
    EventTarget.call(this);
    // we cannot access itemElement argument in ToolbarItem prototype
    // so we are defining here. Also we we want el t be readonly
    Object.defineProperty(this, '__el', {
      value: itemElement
    });
  };
  // readonly, not enumerable, not configurable by default;
  ToolbarItem.prototype = Object.create(EventTarget.prototype, {
    toggleActiveState: {
      value: function () {
        this.activated = !this.activated;
      }
    },
    enabled: {
      get: function () {
        return !this.__el.classList.contains('disabled');
      },
      set: function (value) {
        var currentValue = this.enabled;
        if (currentValue === value) {
          return;
        }
        if (value) {
          this.__el.classList.remove('disabled');
        } else {
          this.__el.classList.add('disabled');
        }
        this.__fire(new PropertyValueChangeEvent('enabledChanged', value));
      }
    },
    activated: {
      get: function () {
        return this.__el.classList.contains('active');
      },
      set: function (value) {
        var currentValue = value;
        if (currentValue === value) {
          return;
        }
        if (value) {
          this.__el.classList.add('active');
        } else {
          this.__el.classList.remove('active');
        }
        this.__fire(new PropertyValueChangeEvent('activatedChanged', value));
      }
    }
  });

  var createToolbarItems = function (itemElements) {
    var items = [];
    // itemElement is a node list. It does not have forEach method
    [].forEach.call(itemElements, function (el, index, array) {
      var item = new ToolbarItem(el);
      items.push(item);
    });
    return items;
  };

  var Toolbar = function (toolbarElement) {
    EventTarget.call(this);
    var items = toolbarElement.querySelectorAll('.toolbar-item');
    Object.defineProperties(this, {
      __el: {
        value: toolbarElement
      },
      items: {
        value: createToolbarItems(items),
        enumerable: true
      }
    });
  };

  Toolbar.prototype = Object.create(EventTarget.prototype, {
    add: {
      value: function () {
        var span = document.createElement('SPAN');
        span.className = 'toolbar-item';
        this.__el.appendChild(span);
        var item = new ToolbarItem(span);
        this.items.push(item);
        this.__fire(new ItemAddEvent(item));
      }
    },
    remove: {
      value: function (index) {
        var len = this.items.length;
        if (index > len || index < 0) {
          throw new Error('Index is out of range');
        }
        var item = this.items[index];
        this.items.splice(index, 1);
        this.__el.removeChild(item.__el);
        item = null; // items object i ready to be collected
        this.__fire(new ItemRemovedEvent(index));
      }
    },
    appendTo: {
      value: function (parentElement) {
        parentElement.appendChild(this.__el);
        this.__fire(new AppendEvent(parentElement));
      }
    }
  });

  // factory function to create toolbar
  oojs.createToolbar = function (elementId) {
    var element = document.getElementById(elementId);
    if (!element) {
      element = document.createElement('DIV');
      element.id = elementId;
      element.className = 'toolbar';
    }
    return new Toolbar(element);
  };

  return oojs;

})(oojs || {});
