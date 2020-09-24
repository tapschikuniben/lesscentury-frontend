import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable()
export class NotifierService {

    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    openSnackBar(displaymessage, color) {
        this._snackBar.open(displaymessage, '', {
            duration: 2500,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['mat-toolbar', color]
        });
    }

    constructor(private _snackBar: MatSnackBar,) { }

    Notification(messagetype: string, displaymessage: string) {

        if (messagetype == 'success') {
            const color = 'notification-success';
            this.openSnackBar(displaymessage, color);
        }
        else if (messagetype == 'warning') {
            const color = 'mat-warn'
            this.openSnackBar(displaymessage, color);
        }
        else {
            const color = '';
            this.openSnackBar(displaymessage, color);
        }
    }

}
