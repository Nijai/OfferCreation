package com.offer.exception;

public class InvalidDateFormatException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public InvalidDateFormatException(String fieldName) {
        super(fieldName + " is not in a valid format. Valid format is 'yyyy-MM-dd'");
    }
}
