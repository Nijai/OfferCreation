package com.offer.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.offer.validator.ValidityValidation;

import jakarta.persistence.*;

@Entity
@Table(name = "Table_subOffer")
public class SubOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subOfferId")
    private Long subOfferId;

    @Column(name = "Sub_OfferName", length = 30)
    private String subOfferName;

    @Column(name = "Price")
    private Double price;

    @Column(name = "Validity")
    @ValidityValidation(message = "Invalid Validity; Validity should be in multiples of a week")
    private Integer validity;
    
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Offer_Id")
    @JsonIgnore
    private Offer offer;


    @Column(name = "Parent_Relation")
    @Enumerated(EnumType.STRING)
    private ParentRelation parentRelation;

	

	public Long getSubOfferId() {
		return this.subOfferId;
	}

	public void setSubOfferId(Long subOfferId) {
		this.subOfferId = subOfferId;
	}

	public String getSubOfferName() {
		return this.subOfferName;
	}

	public void setSubOfferName(String subOfferName) {
		this.subOfferName = subOfferName;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Integer getValidity() {
		return validity;
	}

	public void setValidity(Integer validity) {
		this.validity = validity;
	}

	public Offer getOffer() {
		return offer;
	}

	public void setOffer(Offer offer) {
		this.offer = offer;
	}

	public ParentRelation getParentRelation() {
		return parentRelation;
	}

	public void setParentRelation(ParentRelation parentRelation) {
		this.parentRelation = parentRelation;
	}

	public SubOffer(String subOfferName, Double price, Integer validity, Offer offer, ParentRelation parentRelation) {
		super();
		this.subOfferName = subOfferName;
		this.price = price;
		this.validity = validity;
		this.offer = offer;
		this.parentRelation = parentRelation;
	}

	public SubOffer(Long id, String subOfferName, Double price, Integer validity, Offer offer,
			ParentRelation parentRelation) {
		super();
		this.subOfferId = id;
		this.subOfferName = subOfferName;
		this.price = price;
		this.validity = validity;
		this.offer = offer;
		this.parentRelation = parentRelation;
	}
	
	

	public SubOffer(String subOfferName, Double price, Integer validity, ParentRelation parentRelation) {
		super();
		this.subOfferName = subOfferName;
		this.price = price;
		this.validity = validity;
		this.parentRelation = parentRelation;
	}

	@Override
	public String toString() {
		return "SubOffer [id=" + subOfferId + ", subOfferName=" + subOfferName + ", price=" + price + ", validity=" + validity
				+ ", offer=" + offer + ", parentRelation=" + parentRelation + "]";
	}

	public SubOffer() {
		super();
	}
	 

}
