"use strict";

//Create an IIFE to close the app off from the global scope
(function(){
// check fields and hide the submit button
document.addEventListener('DOMContentLoaded', function(){
    const display = new Display();
    display.checkFields();
    display.hideSubmit();
});
//add customer on submit
document.getElementById('customer-form').addEventListener('submit', function(event){
    event.preventDefault();

    const name = this.querySelector('.name');
    const course = this.querySelector('.course');
    const author = this.querySelector('.author');

    const customer = new Customer(name.value, course.value, author.value);
    const display = new Display();

    display.feedback(customer);
    display.clearFields();

});

//display
function Display(){
    this.name = document.getElementById('name');
    this.course = document.getElementById('course');
    this.author = document.getElementById('author');
    this.customers = document.querySelector('.customer-list');
}

//check fields
Display.prototype.checkFields = function(){
    // console.log(this.name);
    this.name.addEventListener('blur', this.validateField);
    this.course.addEventListener('blur', this.validateField);
    this.author.addEventListener('blur', this.validateField);

};
//validate each field
Display.prototype.validateField = function(){
    // console.log(this);
    if (this.value === ''){
        this.classList.remove('complete');
        this.classList.add('fail');
    } else {
        this.classList.add('complete');
        this.classList.remove('fail');
    }

    const complete = document.querySelectorAll('.complete');

    if(complete.length === 3){
        document.querySelector('.submitBtn').disabled = false;
    } else {
        document.querySelector('.submitBtn').disabled = true;
    }
};
//disable submit button
Display.prototype.hideSubmit = function(){
    const btn = document.querySelector('.submitBtn');
    btn.disabled = true;
};
//show loading and feedback
Display.prototype.feedback = function (customer) {
    const feedback = document.querySelector('.feedback');
    const loading = document.querySelector('.loading');

    feedback.classList.add('showItem', 'alert', 'alert-success');
    loading.classList.add('showItem');

    const self = this;
    self.hideSubmit();

    
