package com.offer.validator;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class ValidityValidator implements ConstraintValidator<ValidityValidation, Integer> {

    private static final int WEEK_IN_DAYS = 7;

    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext context) {
        return value != null && value % WEEK_IN_DAYS == 0;
    }
}

