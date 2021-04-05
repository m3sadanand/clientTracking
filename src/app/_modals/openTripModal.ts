import { LOCATION_INITIALIZED } from "@angular/common";

export class openTripModal {
    date:Date;
    time:string;
    location:string;
    tripId:number;
    bookingRefNo:string;
    customerName:string;
    customerMobile:string;
    vehicle:string;
    driver:string;
    device:string;
    spBookingRefNo:string;

    constructor(Date,Time,Location,TripId,BookingRef,CustomerName,CustomerMobile,Vehicle,Driver,Device,SPBookingRefNo){
        this.date = Date;
        this.time = Time;
        this.location = Location;
        this.tripId = TripId;
        this.bookingRefNo = BookingRef;
        this.customerName = CustomerName;
        this.customerMobile = CustomerMobile;
        this.vehicle = Vehicle;
        this.driver = Driver;
        this.device = Device;
        this.spBookingRefNo = SPBookingRefNo;
    }
}


