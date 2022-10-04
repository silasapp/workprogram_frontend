import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GenericService } from 'src/app/services';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-concession',
    templateUrl: 'parameter.component.html',
    styleUrls: ['../admin.component.scss']
})
export class ParameterConfigComponent implements OnInit {
    ngOnInit() {
    }

}