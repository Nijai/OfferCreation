import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from '../Offer';
import { SubOffer } from '../SubOffer';

@Injectable({
  providedIn: 'root'
})
export class GetOrderService {

  private apiUrl = 'http://localhost:8090/api/offers/';
  private apiUrl2 = 'http://localhost:8090/api/suboffers/';
  offerSend:Offer;
  constructor(private http: HttpClient) { 
    this.offerSend = new Offer()
  }
  
  getOffers():Observable<any[]>{
    const url = `${this.apiUrl}getAllOffers/visible`;
    return this.http.get<any>(url);
  }
  addOffer(offer:any):Observable<any>{
    const url = 'http://localhost:8090/api/offers/createOffer';
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(url,offer);
  }

  selectOfferWithSubOffer(offer_id:number, suboffers:string):Observable<any>{
    const url = `${this.apiUrl}selectOffer/${offer_id}/${suboffers}`;
    return this.http.get<any>(url);
  }

  selectOfferID(offer_id:number):Observable<any>{
    const url = `${this.apiUrl}selectOffer/${offer_id}`;
    return this.http.get<any>(url);
  }

  getOfferById(offer_id:number):Observable<any>{
    const url = `${this.apiUrl}getOfferById/${offer_id}`;
    return this.http.get<any>(url);
  }

  getSubOfferById(subofferID:number):Observable<any[]>{
    const url = `${this.apiUrl2}getSubOfferById/${subofferID}`;
    return this.http.get<any[]>(url);
  }

  updateOffer(offer:Offer,offer_id:number):Observable<any[]>{
    const url = `${this.apiUrl}updateOffer/${offer_id}`;
    return this.http.put<any[]>(url, offer)
  }

  updateSubOffer(subOffer:SubOffer, subofferID:number):Observable<any[]>{
    const url = `${this.apiUrl2}updateSubOffer/${subofferID}`;
    return this.http.put<any[]>(url,subOffer);
  }

  deleteOffer(offer_id:number):Observable<any>{
    const url =`${this.apiUrl}deleteOffer/${offer_id}`;
    return this.http.delete<any>(url);
  }

  deleteSubOffer(subofferID:number):Observable<any>{
    const url =`${this.apiUrl2}deleteSubOffer/${subofferID}`;
    return this.http.delete<any>(url);
  }
}
