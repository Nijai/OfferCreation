package com.offer.validator;

import javax.validation.Constraint;
import javax.validation.Payload;

import java.lang.annotation.*;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ValidityValidator.class)
@Documented
public @interface ValidityValidation {
    String message() default "Invalid Validity; Validity should be in multiples of a week";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
