package com.offer.exception;

public class OfferNameAlreadyExistsException extends RuntimeException{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public OfferNameAlreadyExistsException(String msg) {
		super(msg);
	}
}
