package com.offer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.offer.exception.ParentRelationModificationException;
import com.offer.model.Offer;
import com.offer.model.SubOffer;
import com.offer.service.IOfferService;
import com.offer.service.ISubOfferService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/suboffers")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = {"Content-Type", "application/json"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class SubOfferController {

	//Injecting subOfferService dependency.
    @Autowired
    private ISubOfferService subOfferService;
    
    private static final Logger logger = LoggerFactory.getLogger(SubOfferController.class);
    
    //Injecting OfferService dependency.
    @Autowired
    private IOfferService offerService;

    
    //Create subOffer using post mapping.
    @PostMapping("/createSubOffer")
    public ResponseEntity<SubOffer> addSubOffer(@RequestBody SubOffer subOffer) {
    	logger.info("Called addsubOffer with suboffer "+subOffer);
    	
        SubOffer addedSubOffer = this.subOfferService.addSubOffer(subOffer);
        return new ResponseEntity<>(addedSubOffer, HttpStatus.CREATED);
    }

    
    //Update suboffer using subofferId.
    @PutMapping("/updateSubOffer/{subOfferId}")
    public ResponseEntity<?> updateSubOffer(@PathVariable Long subOfferId, @RequestBody SubOffer subOffer) {
    	logger.info("Update Suboffer with suboffer: "+subOffer+" and suboffer Id "+subOfferId);
    	subOffer.setSubOfferId(subOfferId); // Set the ID from the path variable
        try {
            SubOffer updatedSubOffer = this.subOfferService.updateSubOffer(subOffer);
            return new ResponseEntity<>(updatedSubOffer, HttpStatus.OK);
        } catch (ParentRelationModificationException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    
    //Get suboffer using subofferId.
    @GetMapping("/getSubOfferById/{subOfferId}")
    public ResponseEntity<SubOffer> getSubOfferById(@PathVariable Long subOfferId) {
    	logger.info("Get Suboofer By Id "+subOfferId);
        try {
            SubOffer subOffer = this.subOfferService.getSubOfferById(subOfferId);
            return new ResponseEntity<>(subOffer, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //Get All Suboffers present in database.
    @GetMapping("/getAllSubOffers")
    public ResponseEntity<List<SubOffer>> getAllSubOffers() {
    	logger.info("Get All SubOffers");
        List<SubOffer> subOffers = subOfferService.getAllSubOffers();
        return new ResponseEntity<>(subOffers, HttpStatus.OK);
    }

    //Delete Suboffer using suboffer ID.
    @DeleteMapping("/deleteSubOffer/{subOfferId}")
    public ResponseEntity<String> deleteSubOffer(@PathVariable Long subOfferId) {
    	logger.info("Delete Suboffer by Id: "+subOfferId);
        String response = subOfferService.deleteSubOffer(subOfferId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    //Add suboffer under offer using offerId of offer.
    @PostMapping("/addSubOfferToOffer/{offerId}")
    public ResponseEntity<?> addSubOfferToOffer(@PathVariable Long offerId, @RequestBody SubOffer subOffer) {
    	logger.info("Add SubOffer to Offer using offerID "+offerId+" subOffer "+subOffer);
        try {
        	System.out.println(subOffer);
        	
        	Offer existingOffer = this.offerService.getOfferWithSubOffersById(offerId);
        	
        	// Set the offer for the new suboffer
            subOffer.setOffer(existingOffer);
            
         // Save the new suboffer
            SubOffer addedSubOffer = this.subOfferService.addSubOffer(subOffer);
            
         // Update the list of suboffers in the existing offer
            existingOffer.addSubOffer(addedSubOffer);
            
         // Update the existing offer in the database
            offerService.updateOffer(existingOffer);
            
            return new ResponseEntity<>(addedSubOffer, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @ExceptionHandler(ParentRelationModificationException.class)
    public ResponseEntity<String> handleParentRelationModificationException(ParentRelationModificationException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
