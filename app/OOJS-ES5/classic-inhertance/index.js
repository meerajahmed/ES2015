/**
 * Created by mahme4 on 12/11/2017.
 */

(function () {

  'use strict';

  function Person(first, last) {
    this.name = {
      first: first,
      last: last
    };
  }

  Person.prototype.greeting = function () {
    console.log('Hi I\'m '+this.name.first);
  };

  function Teacher( first, last, subject) {
    // 1. call super class
    Person.call(this, first, last);
    this.subject = subject;
  }

  // 2. inherit methods of Parent class
  Teacher.prototype = Object.create(Person.prototype);

  // Teacher.prototype's constructor property currently points to Person
  // 3. set the right constructor on sub class
  Teacher.prototype.constructor = Teacher;

  // 4. override OR add new methods to sub class
  Teacher.prototype.greeting = function () {
    console.log('Hi I\'m '+this.name.first+ ' . I teach '+ this.subject);
  };

})();