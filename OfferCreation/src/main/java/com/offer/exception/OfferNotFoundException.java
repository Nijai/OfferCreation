package com.offer.exception;

public class OfferNotFoundException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public OfferNotFoundException(String message) {
        super(message);
    }
}
