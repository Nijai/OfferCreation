package com.offer.validator;

import javax.validation.Constraint;
import javax.validation.Payload;

import java.lang.annotation.*;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = DateFormatValidator.class)
@Documented
public @interface DateFormatValidation {
    String message() default "Invalid Date Format; Valid format is 'dd-MM-yyyy' or 'yyyy-MM-dd'";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}