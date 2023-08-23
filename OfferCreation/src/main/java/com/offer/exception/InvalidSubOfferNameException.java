package com.offer.exception;

public class InvalidSubOfferNameException extends RuntimeException{
	 /**
		 * 
		 */
		private static final long serialVersionUID = 1L;
		
		public InvalidSubOfferNameException(String msg) {
			super(msg);
		}
}
