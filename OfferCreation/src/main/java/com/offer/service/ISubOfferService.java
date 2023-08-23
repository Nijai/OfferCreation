package com.offer.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.offer.exception.ParentRelationModificationException;
import com.offer.model.SubOffer;


public interface ISubOfferService {
    SubOffer addSubOffer(SubOffer subOffer);
    SubOffer updateSubOffer(SubOffer subOffer) throws ParentRelationModificationException;
    SubOffer getSubOfferById(Long subOfferId);
    List<SubOffer> getAllSubOffers();
    String deleteSubOffer(Long subOfferId);
	List<SubOffer> getSubOffersByOfferId(Long offer_id);
	List<SubOffer> getOptionalSubOffersByOfferId(Long offer_id);
	ResponseEntity<?> getAmountToBePaid(Long offer_id, String sub_ids);
	List<SubOffer> getSubOffersWithParentRelation(Long offerId); 
}
