import { Component, OnInit } from '@angular/core';
import { OpentripsService } from '../../_services/open-trips.service';
import { AlertService } from '../../_services/alert.service';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { openTripModal } from '../../_modals/openTripModal';
import swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-open-trips',
  templateUrl: './open-trips.component.html',
  styleUrls: ['./open-trips.component.css']
})
export class OpenTripsComponent implements OnInit {
  lat: any;
  lng: any;
  origin: any;
  destination: any;
  opentrips: openTripModal[] = [];
  closeResult: string;
  displayedColumns: string[] = ['SrNo', 'Date','CustomerName','CustomerMobile','Driver','driverMobile','vehicle','VehicleLocation','Alert','SPBookingRefNo'];
  openTripsDs: MatTableDataSource<openTripModal>;
  scheduledTripDS: MatTableDataSource<openTripModal>;
  closedTripsDS: MatTableDataSource<openTripModal>;
  public renderOptions = {
    suppressMarkers: true,
  }
  public markerOptions = {
    origin: {
      label: 'start',
      draggable: false,
    },
    destination: {
      icon: './assets/img/map_car.png',
      label: 'current',
      opacity: 0.8,
    },
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  alertData: any = [];
  mobileNumber: Number;
  tripId: string;
  subscription: Subscription;
  mapView: boolean = false;
  locatedGuest: string;
  locatedGuestMobile: string;
  locatedDriver: string;
  locatedDriverMobile: string;
  locatedCarRegNo: string;

  constructor(
    public opentripService: OpentripsService, 
    public dialog: MatDialog, 
    public modalService: NgbModal,
    public alertService: AlertService,
    ) {
  }

  ngOnInit(): void {
    this.getCorporateTrips();
  }

  getCorporateTrips() {
    this.getCorporateOpenTrips();
    this.subscription = interval(environment.refreshTimer).subscribe(val => this.getCorporateOpenTrips());
  }

  getCorporateOpenTrips() {
    if (localStorage.getItem("userLoggedIn") == "true") {
      this.opentripService.getCorporateOpenTrips().subscribe((response) => {
        var trips = [];
        response["data"].forEach(element => {
          if (element.corporateName == "Accenture Solutions Private Limited - CC" ||
            element.corporateName == "Accenture Solutions Private Limited - Goa" ||
            element.corporateName == "Accenture Solutions Private Limited - IDB" ||
            element.corporateName == "Accenture Solutions Private Limited"
          )
            trips.push(element);
        });
        trips.sort((a, b) => a.tripId - b.tripId);
        this.openTripsDs = new MatTableDataSource(trips);
        this.openTripsDs.paginator = this.paginator;
        this.openTripsDs.sort = this.sort;
      })

      this.opentripService.getCorporateScheduledTrips().subscribe((response) => {
        var trips = [];
        response["data"].forEach(element => {
          if (element.corporateName == "Accenture Solutions Private Limited - CC" ||
            element.corporateName == "Accenture Solutions Private Limited - Goa" ||
            element.corporateName == "Accenture Solutions Private Limited - IDB" ||
            element.corporateName == "Accenture Solutions Private Limited"
          )
            trips.push(element);
        });
        trips.sort((a, b) => a.tripId - b.tripId);
        this.scheduledTripDS = new MatTableDataSource(trips);
        this.scheduledTripDS.paginator = this.paginator;
        this.scheduledTripDS.sort = this.sort;
      })

      this.opentripService.getCorporateClosedTrips().subscribe((response) => {
        var trips = [];
        response["data"].forEach(element => {
          if (element.corporateName == "Accenture Solutions Private Limited - CC" ||
            element.corporateName == "Accenture Solutions Private Limited - Goa" ||
            element.corporateName == "Accenture Solutions Private Limited - IDB" ||
            element.corporateName == "Accenture Solutions Private Limited"
          )
            trips.push(element);
        });
        trips.sort((a, b) => a.tripId - b.tripId);
        this.closedTripsDS = new MatTableDataSource(trips);
        this.closedTripsDS.paginator = this.paginator;
        this.closedTripsDS.sort = this.sort;
      })
    }
  }

  getAlert(tripId,content){
    this.tripId = tripId;
    this.alertService.getAlert(tripId).subscribe((response)=>{
      if(response["message"] == "Alert Details successfully"){
      this.alertData = response.data;
      this.openAlertModal(content);
      }
    });
  }

  sendAlert(){
    let alertObj = {
      "tripId": this.tripId,
      "mobile": this.mobileNumber,
      "guestName": this.alertData.guestName,
      "guestMobile": this.alertData.guestMobile,
      "driverName": this.alertData.driverName,
      "driverMobile": this.alertData.driverMobile,
      "carRegNo": this.alertData.carRegNo
    };
    this.alertService.sendAlert(alertObj).subscribe((response)=>{
      if(response["data"] == true){
        this.modalService.dismissAll();
        swal({
          titleText: 'Success',
          html: "Emergency SMS sent Successfully.",
          type: 'success',
          confirmButtonText: 'Ok',
          animation: false,
          width: 540
        });
      }
      else{
        swal({
          titleText: 'Error',
          html: 'Emergency SMS not delivered.',
          type: 'error',
          confirmButtonText: 'Close',
          animation: false,
          width: 540
        });
      }
    })
  }

  validMobile() {
    if (this.mobileNumber) {
      if (this.mobileNumber.toString().length == 10)
        return true;
      else
        return false;
    }
  }

  showLocation(tripId, content) {
    this.getLocation(tripId,content,'firstCall');
    this.subscription = interval(35000).subscribe(val => this.getLocation(tripId,content,'timerCall'));
  }

  getLocation(tripId, content, calltype) {
    this.opentripService.getTripLocation(tripId).subscribe((response) => {
      if (response["statusCode"] == 200) {
        this.origin = {
          lat: response["data"].latitude,
          lng: response["data"].longitude
        };
        this.destination = {
          lat: response["data"].checkInLat,
          lng: response["data"].checkInLng
        };
        if (this.destination.lat == 0 || this.destination.lng == 0){
          this.lat = response["data"].latitude;
          this.lng = response["data"].longitude;
          this.mapView = false;
        }
        else
          this.mapView = true;
        if (calltype == 'firstCall') {
          this.locatedGuest = response["data"].guestName;
          this.locatedGuestMobile = response["data"].guestMobile;
          this.locatedDriver = response["data"].driverName;
          this.locatedDriverMobile = response["data"].driverMobile;
          this.locatedCarRegNo = response["data"].vehicleRegNo;
          this.openMap(content);
        }
      }
      else
        swal({
          titleText: 'Error',
          html: 'Location not available',
          type: 'error',
          confirmButtonText: 'Close',
          animation: false,
          width: 540
        });
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.openTripsDs.filter = filterValue.trim().toLowerCase();
    this.scheduledTripDS.filter = filterValue.trim().toLowerCase();
    this.closedTripsDS.filter = filterValue.trim().toLowerCase();

    if (this.openTripsDs.paginator) {
      this.openTripsDs.paginator.firstPage();
    }
    if (this.scheduledTripDS.paginator) {
      this.scheduledTripDS.paginator.firstPage();
    }
    if (this.closedTripsDS.paginator) {
      this.closedTripsDS.paginator.firstPage();
    }
  }

  openMap(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openAlertModal(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

}
