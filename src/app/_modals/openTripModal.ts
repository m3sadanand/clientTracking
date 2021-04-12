import { LOCATION_INITIALIZED } from "@angular/common";

export class openTripModal {
    date:Date;
    bookingRefNo:string;
    customerName:string;
    customerMobile:string;
    driver:string;
    spBookingRefNo:string;

    constructor(Date,BookingRef,CustomerName,CustomerMobile,Vehicle,Driver,Device,SPBookingRefNo){
        this.date = Date;
        this.bookingRefNo = BookingRef;
        this.customerName = CustomerName;
        this.customerMobile = CustomerMobile;
        this.driver = Driver;
        this.spBookingRefNo = SPBookingRefNo;
    }
}


