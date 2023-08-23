package com.offer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.offer.model.ParentRelation;
import com.offer.model.SubOffer;

@Repository
public interface ISubOfferRepository extends JpaRepository<SubOffer, Long> {

	List<SubOffer> findByOffer_Id(Long offerId);
	
	@Query("SELECT o FROM Offer o LEFT JOIN FETCH o.subOffers WHERE o.id = :offerId")
    List<SubOffer> findOfferWithSubOffers(@Param("offerId") Long offerId);
	
	List<SubOffer> findByOfferIdAndParentRelation(Long offerId, ParentRelation parentRelation);
	SubOffer findBySubOfferName(String subOfferName);
}
