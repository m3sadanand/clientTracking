import { Component, OnInit } from '@angular/core';
import { OpentripsService } from '../../_services/open-trips.service';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { TripotpComponent } from '../components/tripotp/tripotp.component';
//import { ManualclosedialogComponent } from '../components/manualclosedialog/manualclosedialog.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { openTripModal } from '../../_modals/openTripModal';

@Component({
  selector: 'app-open-trips',
  templateUrl: './open-trips.component.html',
  styleUrls: ['./open-trips.component.css']
})
export class OpenTripsComponent implements OnInit {
  lat: any;
  lng: any;
  opentrips: openTripModal[] = [];
  closeResult: string;
  displayedColumns: string[] = ['SrNo', 'Date', 'Time', 'Location','TripId','BookingRef','CustomerName','CustomerMobile','Vehicle',
  'Driver','Device','OTP','VehicleLocation','TripSheet','Close','Alert','SPBookingRefNo'];
  dataSource: MatTableDataSource<openTripModal>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public ot: OpentripsService, public dialog: MatDialog, public modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.ot.getOpenTrips().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response.data.openTrip);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  // getTripEndOtp(tripId) {
  //   this.dialog.open(TripotpComponent, { width: "600px", data: { ttrip: tripId } })
  // }

  showLocation(tripId, content) {
    this.ot.getTripLocation(tripId).subscribe((response) => {
      if (response["statusCode"] == 200) {
        this.lat = response["data"].latitude;
        this.lng = response["data"].longitude;
      }
      this.openMap(content);
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // manualClose(tripId, bookingRefNo, driver, customerName, vehicle) {
  //   this.dialog.open(ManualclosedialogComponent, { width: "150vw", data: { dialogtripId: tripId, dialogBookingRefno: bookingRefNo, dialogDriver: driver, dialogCustomerName: customerName, dialogvehicle: vehicle } })

  // }

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
