package com.offer.validator;

import java.util.regex.Pattern;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class OfferNameValidator implements ConstraintValidator<OfferNameValidation, String> {
	private static final String NAME_REGEX = "^[\\w\\s-\\$]*$"; 
	@Override
	    public void initialize(OfferNameValidation constraintAnnotation) {
	    }
	 
	 @Override
	    public boolean isValid(String value, ConstraintValidatorContext context) {
		 return value != null && Pattern.matches(NAME_REGEX, value);
	    }
}
