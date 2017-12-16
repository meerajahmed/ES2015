/**
 * Created by mahme4 on 12/16/2017.
 */

var oojs = (function (oojs) {

  var createToolbarItems = function (itemElements) {
    var items = [];
    // itemElement is a node list. It does not have forEach method
    [].forEach.call(itemElements, function (el, index, array) {
      var item = {
        el: el,
        disable: function () {
          this.el.classList.add('disabled');
        },
        enable: function () {
          this.el.classList.remove('disabled');
        },
        isDisabled: function () {
          return this.el.classList.contains('disabled')
        },
        activate: function () {
          if( this.isDisabled() ){
            return;
          }
          this.el.classList.add('active');
        },
        deactivate: function () {
          if( this.isDisabled() ){
            return;
          }
          this.el.classList.remove('active')
        },
        isActive: function () {
          return this.el.classList.contains('active');
        },
        toggleActiveState: function () {
          if( this.isActive() ){
            this.deactivate();
          } else {
            this.activate();
          }
        }
      };
      items.push(item);
    });
    return items;
  };

  oojs.createToolbar = function (elementId) {
    var element = document.getElementById(elementId);
    var itemElements = document.querySelectorAll('.toolbar-item');
    return {
      items: createToolbarItems(itemElements)
    }
  };

  return oojs;

})(oojs || {});
