/**
 * Created by mahme4 on 12/16/2017.
 */

var oojs = (function (oojs) {

  // objected oriented component that is usable

  var ToolbarItem = function (itemElement) {
    // we cannot access itemElement argument in ToolbarItem prototype
    // so we are defining here. Also we we want el t be readonly
    Object.defineProperty(this, '__el', {
      value: itemElement
    });
  };
  // readonly, not enumerable, not configurable by default;
  Object.defineProperties(ToolbarItem.prototype, {
    toggleActiveState: {
      value: function () {
        this.activated = !this.activated;
      }
    },
    enable: {
      get: function () {
        return !this.__el.classList.contains('disabled');
      },
      set: function (value) {
        if (value) {
          this.__el.classList.remove('disabled');
        } else {
          this.__el.classList.add('disabled');
        }
      }
    },
    activated: {
      get: function () {
        return this.__el.classList.contains('active');
      },
      set: function (value) {
        if (value) {
          this.__el.classList.add('active');
        } else {
          this.__el.classList.remove('active');
        }
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

  Object.defineProperties(Toolbar.prototype, {
    add: {
      value: function () {
        var span = document.createElement('SPAN');
        span.className = 'toolbar-item';
        this.__el.appendChild(span);
        var item = new ToolbarItem(span);
        this.items.push(item);
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
      }
    },
    appendTo: {
      value: function (parentElement) {
        parentElement.appendChild(this.__el)
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
