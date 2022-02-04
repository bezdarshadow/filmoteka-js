'use strict';

export class LoadSpinner {
    constructor( { selector, hidden = false } ){
        this.spinner = document.querySelector(selector);

        hidden && this.disable();
    }

    enable(){
        this.spinner.classList.remove('is-hidden');
    }
    
    disable(){
        this.spinner.classList.add('is-hidden');
    }

}