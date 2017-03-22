function FormValidator(jqueryFormObject) {
	this.$form = jqueryFormObject;
	this.formElements = [];
	this.invalidFormElements = [];
	
	this.init = function() {
		console.debug('Initializing FormValidator');
		var self = this;

		//Bind a custom function to the form submit event
		this.$form.on('submit', this.doValidation.bind(this))

		//Create an array with all our form elements
		this.$form.find('input').each(function() {
			self.formElements.push($(this))
		});
		this.$form.find('textarea').each(function() {
			self.formElements.push($(this))
		})
	}

	this.doValidation = function(e) {
		var self = this;
		this.reset(); //Reset our form (remove error states, etc) to start fresh and redo validation
		
		this.formElements.map(function($formElement) {
			//required form validation
			if($formElement.hasClass('required')) {
				if(!self.validateRequired($formElement.val())) {
					self.invalidateFormElement($formElement);
				}
			}

			//minimum length form validation
			if($formElement.hasClass('min-length')) {
				if(!self.validateMinimumLength($formElement.val(), $formElement.data('length'))) {
					self.invalidateFormElement($formElement);
				}
			}

			//email form validation
			if($formElement.hasClass('email')) {
				if(!self.validateEmail($formElement.val())) {
					self.invalidateFormElement($formElement);
				}
			}
		})

		//Check if our entire form is valid and submit if so, otherwise prevent the submit
		if(this.invalidFormElements.length > 0) {
			return false; //Return false on a submit event to prevent submit action
		} else {
			console.log('Submitting form')
			return true;
		}
	}

	this.reset = function() {
		this.invalidFormElements = [];

		//Remove error states
		this.formElements.map(function($formElement) {
			$formElement.closest('div.form-element').removeClass('error');
		})
	}

	this.invalidateFormElement = function($formElement) {
		//Add form element to our array of invalid elements
		if(this.invalidFormElements.indexOf($formElement) <= -1) {
			this.invalidFormElements.push($formElement)
		}

		//Add .error class to show red border
		$formElement.closest('div.form-element').addClass('error');
	}

	////

	this.validateRequired = function(value) {
		if(value !== null && value !== '') {
			return true;
		} else {
			return false;
		}
	}

	this.validateMinimumLength = function(value, length) {
		if(value !== null && value.length > length) {
			return true;
		} else {
			return false;
		}
	}

	this.validateEmail = function(value) {
		//Use regex to validate the structure of an email
		//http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
		var regexExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return regexExpression.test(value);
	}

	//Execute init() on new instance
	this.init()
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//Wait til our DOM is loaded
$(document).ready(function() {
	var formValidationInstance = new FormValidator($('form'));
});