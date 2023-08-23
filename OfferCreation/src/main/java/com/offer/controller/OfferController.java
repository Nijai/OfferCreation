package com.offer.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.offer.exception.InvalidDateFormatException;
import com.offer.model.Offer;
import com.offer.model.SubOffer;
import com.offer.service.IOfferService;
import com.offer.service.ISubOfferService;
import com.offer.validator.OfferNameValidator;
import com.offer.validator.OfferTypeValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/offers")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = {"Content-Type", "application/json"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class OfferController {

	//Injecting OfferService dependency.
    @Autowired
    private IOfferService offerService;

    //Injecting SubOfferService dependency.
    @Autowired
    private ISubOfferService subOfferService;
    
    //Logger
    private static final Logger logger = LoggerFactory.getLogger(OfferController.class);
    
    //Adding Offer with Sub-offer using post mapping.
    @PostMapping("/createOffer")
    public ResponseEntity<?> addOffer(@RequestBody Offer offer) {
        try {
        	logger.info("called Post Mapping of addOffer with offer "+offer);
        	//Initialize validators.
        	OfferNameValidator validator = new OfferNameValidator();
        	OfferTypeValidator typeValidator = new OfferTypeValidator();
        	
        	//Check condition "One Offer should have at least one sub offer".
        	if (offer.getSubOffers() == null || offer.getSubOffers().isEmpty()) {
        		logger.error("At least one sub-offer is required");
    	        throw new IllegalArgumentException("At least one sub-Offer is required.");
    	    }
        	
        	//Check condition "Offer Name/Sub Offer Name should not be greater than 30 characters 
        	// and can only add – (Hyphen) $(Dollar Sign) as special characters "
            if(!validator.isValid(offer.getOfferName(),null)) {
            	logger.error("Offer Name should not exceed 30 characters and can only contain letters, numbers, spaces, hyphens, and dollar signs");
            	return new ResponseEntity<>("Offer Name should not exceed 30 characters and can only contain letters, numbers, spaces, hyphens, and dollar signs", HttpStatus.BAD_REQUEST);
            }
            
            //Check Condition "Offer Type  should be one of the defined values and should not accept any other values" 
            if(!typeValidator.isValid(offer.getOfferType(), null)) {
            	logger.error("Invalid Offer Type; Offer Type should be one of the below values ->	Unlimited,	Topup,	Validity,	OTT Offers");
            	return new ResponseEntity<>("Invalid Offer Type; Offer Type should be one of the below values ->	Unlimited,	Topup,	Validity,	OTT Offers",HttpStatus.BAD_REQUEST);
            }
            
            logger.info("Sending data to addOffer service "+offer);
            //Everything well Let's add.
            Offer addedOffer = this.offerService.addOffer(offer);
            return new ResponseEntity<>(addedOffer, HttpStatus.CREATED);
            
        } catch (IllegalArgumentException e) {
        	System.out.println("Error in adding: "+e.getMessage());
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    
    //Updating Offer with or without suboffer using Put mapping.
    @PutMapping("/updateOffer/{offerId}")
    public ResponseEntity<?> updateOffer(@PathVariable Long offerId, @RequestBody Offer offer) {
    	logger.info("called Put Mapping of update Offer with offer "+offer+" and offer Id "+offerId);
    	offer.setId(offerId); // Set the ID from the path variable
        try {
        	//Only Date to be updated.
            Offer updatedOffer = this.offerService.updateOffer(offer);
            return new ResponseEntity<>(updatedOffer, HttpStatus.OK);
            
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>("Cannot Update offer "+e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    
    //Get Offer with suboffers through OfferID provided.
    @GetMapping("/getOfferById/{offerId}")
    public ResponseEntity<?> getOfferById(@PathVariable Long offerId) {
    	logger.info("called get offer by Id by offerID "+offerId);
        try {
            Offer offer = this.offerService.getOfferWithSubOffersById(offerId);
            return new ResponseEntity<>(offer, HttpStatus.OK);
            
        } catch (Exception e) {
            return new ResponseEntity<>("No such Offer Present",HttpStatus.NOT_FOUND);
        }
    }

    //Get All Offers Present in Database.
    @GetMapping("/getAllOffers")
    public ResponseEntity<List<Offer>> getAllOffers() {
    	logger.info("called Get All Offers");
        List<Offer> offers = offerService.getAllOffers();
        return new ResponseEntity<>(offers, HttpStatus.OK);
    }

    //Delete offer with associated suboffers through OfferID provided.
    @DeleteMapping("/deleteOffer/{offerId}")
    public ResponseEntity<String> deleteOffer(@PathVariable Long offerId) {
    	logger.info("called Delete Mapping to delete offer with offerID "+offerId);
        try {
            String response = offerService.deleteOfferAndSubOffers(offerId);
            logger.info(response);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    //Get by condition "Only those Offers or Sub offers should be visible for which 
    // Activation date is achieved and the offers are not expired."
    @GetMapping("/getAllOffers/visible")
    public ResponseEntity<?> getVisibleOffers() {
    	logger.info("called Get visible offer ");
    	try {
    		List<Offer> visibleOffers = this.offerService.getVisibleOffers();
    		return new ResponseEntity<>(visibleOffers, HttpStatus.OK);
    	}catch (Exception e) {
    		return new ResponseEntity<>("No Such offers "+e.getMessage(),HttpStatus.NOT_FOUND);
    	}
    }

    
    //Get suboffers which are under offer OfferId, who are set as Optional (Parent Relation). 
    @GetMapping("/getOptional/{offer_id}")
    public ResponseEntity<?> getOptionalSubOffers(@PathVariable Long offer_id) {
    	logger.info("called Optional Suboffers with offerID"+offer_id);
        try {
            // Call the service to retrieve optional sub-offers by offer ID
            List<SubOffer> optionalSubOffers = subOfferService.getOptionalSubOffersByOfferId(offer_id);
            
            if (optionalSubOffers.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            
            return ResponseEntity.ok(optionalSubOffers);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    //Get Amount to be paid after selecting optional suboffers (send suboffers as comma saparated).
    @GetMapping("/selectOffer/{offer_id}/{suboffers}")
    public ResponseEntity<?> selectOfferWithSubOffer(@PathVariable Long offer_id,@PathVariable String suboffers){
    	logger.info("called Select offer with Suboffer with offer_Id "+offer_id+" suboffer: "+suboffers);
        return this.subOfferService.getAmountToBePaid(offer_id,suboffers);
        	
    }
    
    //Get Get Amount to be paid without selecting any optional suboffers
    @GetMapping("/selectOffer/{offer_id}")
    public ResponseEntity<?> selectOfferID(@PathVariable Long offer_id){
    	logger.info("called Amount to be paid "+offer_id);
        return this.subOfferService.getAmountToBePaid(offer_id,"0");
        	
    }
    
    
    
    @ExceptionHandler(InvalidDateFormatException.class)
    public ResponseEntity<String> handleInvalidDateFormatException(InvalidDateFormatException ex) {
        return new ResponseEntity<>("Invalid Date Format; Valid format is 'dd-MM-yyyy'", HttpStatus.BAD_REQUEST);
    }
}