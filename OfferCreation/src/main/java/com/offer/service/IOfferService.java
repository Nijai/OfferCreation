package com.offer.service;

import java.util.List;

import com.offer.model.Offer;


public interface IOfferService {
	public Offer addOffer(Offer ofObj);
	public Offer updateOffer(Offer ofObj);
	public List<Offer> getAllOffers();
	public String deleteOffer(Long offer_id);
	public List<Offer> getVisibleOffers();
	public Offer getOfferWithSubOffersById(Long offerId);
	public String deleteOfferAndSubOffers(Long offerId);
}
