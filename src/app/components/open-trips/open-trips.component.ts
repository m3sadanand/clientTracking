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
  displayedColumns: string[] = ['SrNo', 'Date','CustomerName','CustomerMobile','Driver','VehicleLocation','Alert','SPBookingRefNo'];
  dataSource: MatTableDataSource<openTripModal>;
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

  getCorporateOpenTrips(){
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
      this.dataSource = new MatTableDataSource(trips);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
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
        if ((this.origin.lat == 0 && this.origin.lng == 0) ||
          (this.destination.lat == 0 && this.destination.lng == 0))
          swal({
            titleText: 'Error',
            html: 'Location not available',
            type: 'error',
            confirmButtonText: 'Close',
            animation: false,
            width: 540
          });
        else
          this.openMap(content);
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
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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
