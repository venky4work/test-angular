import { DatePipe } from '@angular/common';
import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BranchService } from 'src/app/services/branch.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-add-company-form',
  templateUrl: './add-company-form.component.html',
  styleUrls: ['./add-company-form.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class AddCompanyFormComponent implements OnInit {
  fileToUpload: any;
  companyForm: FormGroup;
  isCompanyUnique: boolean;
  countryCodes: any = [
    {
      name: 'Bahrain',
      code: '+973',
    },
    {
      name: 'Egypt',
      code: '+20',
    },
    {
      name: 'India',
      code: '+91',
    },
    {
      name: 'Iran',
      code: '+98',
    },
    {
      name: 'Iraq',
      code: '+964',
    },
    {
      name: 'Israel',
      code: '+972',
    },
    {
      name: 'Jordan',
      code: '+962',
    },
    {
      name: 'Kuwait',
      code: '+965',
    },
    {
      name: 'Lebanon',
      code: '+961',
    },
    {
      name: 'Oman',
      code: '+968',
    },
    {
      name: 'Palestinian Territory',
      code: '+970',
    },
    {
      name: 'Qatar',
      code: '+974',
    },
    {
      name: 'Saudi Arabia',
      code: '+966',
    },
    {
      name: 'Syria',
      code: '+963',
    },
    {
      name: 'Turkey',
      code: '+90',
    },
    {
      name: 'United Arab Emirates',
      code: '+971',
    },
    {
      name: 'Yemen',
      code: '+967',
    },
  ];
  yearRange: string;
  today: Date = new Date();
  selectedProfilePicture: any;
  countryList: any;
  isIndia: boolean;
  countryIds: any = [];
  isCompanySubmitted: boolean;
  isEditCompany: any;
  selectedIndex: any;
  type: any;
  showRemoveBranchModal: boolean;
  createdCompanyId: any;
  companyProfileObj: any = {};
  disableSubmit: boolean;
  updateCompanyId: any;
  companyDetails: any;
  pipe = new DatePipe("en-US");
  isCountryLoaded: boolean;

  constructor(
    private branchService: BranchService,
    private companyService: CompanyService,
    private router: Router,
    public formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.updateCompanyId = Number(sessionStorage.getItem("comp_id"))
    this.yearRange = '1970:' + this.today.getFullYear();

    this.companyForm = this.formBuilder.group({
      company_name: new FormControl('', [Validators.required]),
      personName: new FormControl('', [Validators.required]),
      headQuartersAddress: new FormControl('', [Validators.required]),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl('', [Validators.required]),
      zipCode: new FormControl(''),
      pfNumber: new FormControl(''),
      esi: new FormControl(''),
      isActive: new FormControl('1'),
      phonePrefix: new FormControl(
        {
          name: 'Bahrain',
          code: '+973',
        },
        [Validators.required]
      ),
      phoneNo: new FormControl('', [Validators.required]),
      emailId: new FormControl('', [Validators.email]),
      cinNumber: new FormControl(''),
      createdOn: new FormControl(''),
      tanNumber: new FormControl(''),
      branches: this.formBuilder.array([]),
      //otherField: new FormControl(''),
    });
    this.branchService
      .getCountries()
      .toPromise()
      .then((res: any) => {
        // console.log(res);
        if (res) {
          this.countryList = res.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
          this.isCountryLoaded = true
        }
      });

    if (this.updateCompanyId > 0) {
      this.companyService.getCompanyById(this.updateCompanyId).toPromise().then((res: any) => {
        if (res) {
          this.companyDetails = res;
          this.populateCompanyDetails(this.companyDetails);
        }
      })
    }
  }

  onCountrySelect(event) {
    this.countryIds = [];
    event.value.map((country) => {
      this.countryIds.push(country.countryId);
    });
    if (this.countryIds.includes(16)) {
      this.isIndia = true;
      this.companyForm.get('pfNumber').setValidators([Validators.required]);
      this.companyForm.get('pfNumber').updateValueAndValidity();
      this.companyForm.get('esi').setValidators([Validators.required]);
      this.companyForm.get('esi').updateValueAndValidity();
      this.companyForm.get('tanNumber').setValidators([Validators.required]);
      this.companyForm.get('tanNumber').updateValueAndValidity();
    } else {
      this.isIndia = false;
      this.companyForm.get('pfNumber').clearAsyncValidators();
      this.companyForm.get('pfNumber').updateValueAndValidity();
      this.companyForm.get('esi').clearAsyncValidators();
      this.companyForm.get('esi').updateValueAndValidity();
      this.companyForm.get('tanNumber').clearAsyncValidators();
      this.companyForm.get('tanNumber').updateValueAndValidity();
    }
  }

  public onChange(file): void {
    this.selectedProfilePicture = {};
    this.fileToUpload = file.item(0);
    // Show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      console.log(event.target.result)
      this.selectedProfilePicture = event.target.result.split(',')[1];
      console.log(this.selectedProfilePicture);
    };

    reader.readAsDataURL(this.fileToUpload);
  }

  public initUpload() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    } else {
      console.log('ERROR: cannot find file input');
    }
  }

  saveCompany() {
    this.disableSubmit = true;
    console.log(this.companyForm.value);
    if (this.companyForm.invalid) {
      this.isCompanySubmitted = true;
    } else {
      this.isCompanySubmitted = false;
      if (!this.isEditCompany) {
        // add company
        let companyObject = this.prepareCompanyObject(this.companyForm.value);
        console.log('companyObj', companyObject);
        let branchesList = this.prepareBranchObject(
          this.companyForm.value['branches']
        );
        console.log(companyObject);
        this.companyService
          .addCompany(companyObject)
          .toPromise()
          .then(
            (res: any) => {
              if (res?.companyId) {
                this.companyProfileObj = {
                  companyLogo:
                    this.selectedProfilePicture != ''
                      ? this.selectedProfilePicture
                      : '',
                  companyId: res.companyId,
                };
                let branches = this.addCompanyIdToBranch(
                  branchesList,
                  res.companyId
                );
                // console.log(branches);
                this.branchService
                  .addBranch(branches)
                  .toPromise()
                  .then(
                    (res1: any) => {
                      if (res1.length) {
                        this.showSuccessToast('Company created successfully');
                        this.companyService
                          .updateCompanyLogo(this.companyProfileObj)
                          .toPromise()
                          .then(
                            (res2: any) => {
                              if (res2.results != '') {
                                console.log('company added, pic uploaded');
                              }
                            },
                            (error) => {
                              this.disableSubmit = false;
                              this.showErrorToast(
                                error?.error?.errors[0]?.errors[0]?.message
                              );
                            }
                          );
                      }
                      setTimeout(() => {
                        this.router.navigate(['/companies']);
                      }, 2000);
                    },
                    (error) => {
                      this.disableSubmit = false;
                      this.showErrorToast(
                        error?.error?.errors[0]?.errors[0]?.message
                      );
                    }
                  );
              }
            },
            (error) => {
              this.disableSubmit = false;
              this.showErrorToast(error?.error?.errors[0]?.errors[0]?.message);
            }
          );
      }
      else { // update company
        let companyObject = this.prepareCompanyObject(this.companyForm.value);
        console.log("companyObj", companyObject);
        let branchesList = this.prepareBranchObject(
          this.companyForm.value["branches"]
        );
        this.companyService.updateCompanyById(companyObject, this.updateCompanyId).subscribe(
          (data: any) => {
            if (data?.companyId) {
              let branches = this.addCompanyIdToBranch(
                branchesList,
                data.companyId
              );
              this.branchService
                .updateBranch(branches)
                .subscribe((branchData) => {
                  if (branchData) {
                    this.showSuccessToast('Company details are saved successfully')
                  }
                  setTimeout(() => {
                    this.router.navigate(["/companies"]);
                  }, 1000);
                });
            }
          },
          (error) => {
            this.showErrorToast(error?.error?.errors[0]?.errors[0]?.message)
          }
        );
      }
    }
  }

  addCompanyIdToBranch(branchesList: any[], companyId: any) {
    for (let i = 0; i < branchesList.length; i++) {
      branchesList[i]['companyId'] = companyId;
    }
    return branchesList;
  }

  prepareCompanyObject(formObject) {
    let company = {
      name: formObject.company_name,
      headQuartersAddress: formObject.headQuartersAddress,
      city: formObject.city,
      state: formObject.state,
      zipCode: formObject.zipCode,
      isActive: formObject.isActive == '1' ? true : false,
      phonePrefix: formObject.phonePrefix.code,
      phoneNo: formObject.phoneNo,
      emailId: formObject.emailId,
      responsiblePerson: formObject.personName,
      countries: formObject.country,
    };
    formObject?.pfnumber != ''
      ? (company['pfnumber'] = formObject?.pfNumber)
      : '';
    formObject?.cinnumber != ''
      ? (company['cinnumber'] = formObject?.cinNumber)
      : '';
    formObject?.esi != '' ? (company['esi'] = formObject?.esi) : '';
    formObject?.tannumber != ''
      ? (company['tannumber'] = formObject?.tanNumber)
      : '';
    formObject.isActive === '1' && formObject.createdOn != ''
      ? (company['activatedOn'] = formObject.createdOn)
      : (company['inactiveOn'] = formObject.createdOn);
    formObject.isActive === '1' && formObject.createdOn != ''
      ? (company['createdOn'] = formObject.createdOn)
      : '';
    return company;
  }

  prepareBranchObject(branches) {
    let branchesList = [];
    for (let i = 0; i < branches.length; i++) {
      let branchObject = {};
      branchObject = {
        name: branches[i].branchName,
        areaAndStreet: branches[i].branchAddress,
        city: branches[i].city,
        state: branches[i].state,
        zipCode: branches[i].zipCode,
        isActive: branches[i].status == '1' ? true : false,
        phonePrefix: branches[i].branchPrefix.code,
        phoneNo: branches[i].branchPhone,
        emailId: branches[i].branchEmail,
        responsiblePerson: branches[i].personName,
      };
      branches[i].status == '1' && branches[i].createDate != ''
        ? (branchObject['activatedOn'] = branches[i].createDate)
        : (branchObject['inactiveOn'] = branches[i].createDate);
      branches[i].createDate != ''
        ? (branchObject['createdOn'] = branches[i].createDate)
        : '';
      branchesList.push(branchObject);
    }
    return branchesList;
  }

  onActiveDateSelected(event) {
    console.log(event);
  }

  onChangeStatus(event) {
    console.log(event.target.value);
  }

  branch = (): FormGroup => {
    const formGroup: FormGroup = new FormGroup({
      id: new FormControl(''),
      branchName: new FormControl('', [Validators.required]),
      personName: new FormControl('', [Validators.required]),
      branchAddress: new FormControl('', [Validators.required]),
      city: new FormControl(''),
      state: new FormControl(''),
      zipCode: new FormControl(''),
      branchPhone: new FormControl('', [Validators.required]),
      branchPrefix: new FormControl(
        {
          name: 'Bahrain',
          code: '+973',
        },
        [Validators.required]
      ),
      branchEmail: new FormControl('', [Validators.email]),
      status: new FormControl('1'),
      createDate: new FormControl(''),
      countryId: new FormControl({}, Validators.required),
    });
    return formGroup;
  };

  getBranchForm() {
    return this.companyForm?.get('branches') as FormArray;
  }

  removeBranch(i, type) {
    console.log(i);
    this.selectedIndex = i;
    this.type = type;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this branch?',
      header: 'Delete Branch',
      accept: () => {
        this.deleteBranch(i, type);
      },
      reject: (type) => {
        this.selectedIndex = '';
        this.type = '';
      },
    });
  }

  deleteBranch(index, type) {
    switch (type) {
      case 'Branch':
        this.getBranchForm().removeAt(index);
        this.showRemoveBranchModal = false;
        break;
    }
  }

  addBranchToForm() {
    this.getBranchForm().push(this.branch());
  }

  populateCompanyDetails(companyDetails) {
    this.selectedProfilePicture = companyDetails?.companyLogo
    this.companyForm.patchValue({
      company_name:
        companyDetails.name &&
          companyDetails.name != null &&
          companyDetails.name != ''
          ? companyDetails.name
          : '',
      personName:
        companyDetails.responsiblePerson &&
          companyDetails.responsiblePerson != null &&
          companyDetails.responsiblePerson != ''
          ? companyDetails.responsiblePerson
          : '',
      headQuartersAddress:
        companyDetails.headQuartersAddress &&
          companyDetails.headQuartersAddress != null &&
          companyDetails.headQuartersAddress != ''
          ? companyDetails.headQuartersAddress
          : '',
      city:
        companyDetails.city != null && companyDetails.city != ''
          ? companyDetails.city
          : '',
      state:
        companyDetails.state != null && companyDetails.state != ''
          ? companyDetails.state
          : '',
      zipCode:
        companyDetails.zipCode != null && companyDetails.zipCode != ''
          ? companyDetails.zipCode
          : '',
      pfNumber:
        companyDetails.pfnumber != null && companyDetails.pfnumber != ''
          ? companyDetails.pfnumber
          : '',
      esi:
        companyDetails.esi != null && companyDetails.esi != ''
          ? companyDetails.esi
          : '',
      isActive: companyDetails.isActive === true ? '1' : '0',
      phonePrefix:
        companyDetails.phonePrefix != null && companyDetails.phonePrefix != ''
          ? companyDetails.phonePrefix
          : '',
      phoneNo:
        companyDetails.phoneNo != null && companyDetails.phoneNo != ''
          ? companyDetails.phoneNo
          : '',
      emailId:
        companyDetails.emailId != null && companyDetails.emailId != ''
          ? companyDetails.emailId
          : '',
      cinNumber:
        companyDetails.cinnumber != null && companyDetails.cinnumber != ''
          ? companyDetails.cinnumber
          : '',
      tanNumber:
        companyDetails.tannumber != null && companyDetails.tannumber != ''
          ? companyDetails.tannumber
          : '',
    });
    if (companyDetails.isActive) {
      if (companyDetails.activatedOn != null) {
        let dateValue = this.pipe.transform(
          companyDetails.activatedOn,
          'dd/MM/yy'
        );
        this.companyForm.patchValue({
          createdOn: new Date(dateValue),
        });
      }

    } else {
      if (companyDetails.inactiveOn != null) {
        let dateValue = this.pipe.transform(
          companyDetails.inactiveOn,
          'dd/MM/yy'
        );
        this.companyForm.patchValue({
          createdOn: new Date(dateValue),
        });
      }
    }

    if (companyDetails.countries.length > 0) {
      this.companyForm.patchValue({
        country: companyDetails.countries ? companyDetails.countries : [],
      });
    }
    if (companyDetails.branchModels && companyDetails.branchModels.length > 0) {
      this.populateBranchDetails(companyDetails.branchModels);
    }
  }

  private populateBranchDetails(branchModels) {
    for (let i = 0; i < branchModels.length; i++) {
      console.log(branchModels[i])
      let date = '';
      if (branchModels[i].isActive) {
        if (branchModels[i].activatedOn) {
          date = this.pipe.transform(branchModels[i].activatedOn, 'dd/MM/yyyy');
        }
      } else {
        if (branchModels[i].inactiveOn) {
          date = this.pipe.transform(branchModels[i].inactiveOn, 'dd/MM/yyyy');
        }
        console.log(date)
      }
      const formGroup: FormGroup = new FormGroup({
        // id: new FormControl(branchModels[i].branchId),
        branchName: new FormControl(branchModels[i].name),
        personName: new FormControl(branchModels[i].responsiblePerson),
        branchAddress: new FormControl(branchModels[i].areaAndStreet),
        city: new FormControl(branchModels[i].city),
        state: new FormControl(branchModels[i].state),
        zipCode: new FormControl(branchModels[i].zipCode),
        branchPhone: new FormControl(branchModels[i].phoneNo),
        branchPrefix: new FormControl({ code: branchModels[i].phonePrefix }),
        branchEmail: new FormControl(branchModels[i].emailId),
        status: new FormControl(branchModels[i]?.isActive ? 1 : 0),
        createDate: new FormControl(date),
        countryId: new FormControl({ name: 'India', countryId: 16 }),

      });
      console.log(formGroup)
      this.getBranchForm().push(formGroup);
    }
    this.companyForm.controls['branches'] = this.getBranchForm();
    return this.getBranchForm();
  }

  showErrorToast(message) {
    this.messageService.add({
      key: 'tl',
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  showSuccessToast(message) {
    this.messageService.add({
      key: 'tl',
      severity: 'success',
      summary: 'success',
      detail: message,
    });
  }

  onCancelClick() {
    if (this.updateCompanyId && this.updateCompanyId > 0) {
      this.router.navigate(['company-details'])
    }
    else {
      this.router.navigate(['/companies']);
    }

  }
}
