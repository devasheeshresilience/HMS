import { Component, inject, OnInit } from '@angular/core';
import { ToastService } from '../../../../../shared/services/toast-service';
import { PrescriptionService } from '../services/prescription-service';
declare var bootstrap: any;

@Component({
  selector: 'app-prescription',
  standalone: false,
  templateUrl: './add-prescription.html',
  styleUrls: ['./add-prescription.scss'],
})
export class AddPrescription implements OnInit {

  private doctorService = inject(PrescriptionService);
  private toast = inject(ToastService);

  activeField: string = '';
  optionsList: any[] = [];
  

  // Form data
  prescription = {
    symptoms: '',
    diagnosis: '',
    advice: '',
    followUp: '',
    medicines: [] as any[],
    labTests: [] as string[],
  };

  frequencyOptions = [
  { label: 'Once a Day', value: 1 },
  { label: 'Twice a Day', value: 2 },
  { label: 'Thrice a Day', value: 3 },
  { label: 'Four Times a Day', value: 4 }
];

timingOptions = [
  { label: 'Morning', value: 'Morning' },
  { label: 'Afternoon', value: 'Afternoon' },
  { label: 'Evening', value: 'Evening' },
  { label: 'Night', value: 'Night' }
];

instructionOptions = [
  { label: 'Before Meal', value: 'Before Meal' },
  { label: 'After Meal', value: 'After Meal' },
  { label: 'With Water', value: 'With Water' },
  { label: 'As Needed', value: 'As Needed' }
];


  medicineTypes = ['Tablet', 'Capsule', 'Syrup', 'Injection'];
  medicineNames: string[] = []; 
  selectedMedicineType = '';
  selectedMedicineName = '';
  medicineQty: number = 1;  
  selectedLabTest = '';

  allMedicineNames: any = {
  Tablet: ['Paracetamol', 'Azithromycin', 'Levocetirizine'],
  Capsule: ['Amoxicillin', 'Omeprazole'],
  Syrup: ['Cough Syrup', 'Vitamin C Syrup'],
  Injection: ['Insulin', 'Diclofenac']
};

labTests = [
  'Blood Test',
  'Urine Test',
  'Liver Function Test',
  'Kidney Function Test'
];

  // Option lists
  symptomOptions = [
    { label: 'Fever', selected: false },
    { label: 'Cough', selected: false },
    { label: 'Body Pain', selected: false },
  ];

  diagnosisOptions = [
    { label: 'Cold & Flu', selected: false },
    { label: 'Infection', selected: false },
    { label: 'Weakness', selected: false },
  ];

  adviceOptions = [
    { label: 'Drink warm water', selected: false },
    { label: 'Take rest', selected: false },
    { label: 'Avoid cold food', selected: false },
  ];

  followUpOptions = [
    { label: 'Visit after 3 days', selected: false },
    { label: 'Return if symptoms worsen', selected: false },
  ];

  // Pagination variables
  dataList: any[] = [];
  searchText: string = "";

  pageNumber = 1;
  pageSize = 5;               // UI page size
  apiPageSize = 100;          // API mandatory page size

  totalCount = 0;
  totalPages = 0;

  // --------------------------
  // 🔥 ON INIT
  // --------------------------
  ngOnInit(): void {
    this.loadAppointments();
  }

  // --------------------------
  // 🔥 OPEN MAIN MODAL
  // --------------------------
  openPrescriptionModal(item: any) {
    let modal = new bootstrap.Modal(document.getElementById('prescriptionModal'));
    modal.show();
  }

  // --------------------------
  // 🔥 OPEN CHECKLIST
  // --------------------------
  openList(type: string) {
    this.activeField = type;

    if (type === 'Symptoms') this.optionsList = this.symptomOptions;
    if (type === 'Diagnosis') this.optionsList = this.diagnosisOptions;
    if (type === 'Advice') this.optionsList = this.adviceOptions;
    if (type === 'FollowUp') this.optionsList = this.followUpOptions;

    let modal = new bootstrap.Modal(document.getElementById('checklistModal'));
    modal.show();
  }

  // --------------------------
  // 🔥 UPDATE TEXTAREA
  // --------------------------
  updateText() {
    const selectedValues = this.optionsList
      .filter(x => x.selected)
      .map(x => x.label)
      .join(', ');

    if (this.activeField === 'Symptoms')
      this.prescription.symptoms = selectedValues;

    if (this.activeField === 'Diagnosis')
      this.prescription.diagnosis = selectedValues;

    if (this.activeField === 'Advice')
      this.prescription.advice = selectedValues;

    if (this.activeField === 'FollowUp')
      this.prescription.followUp = selectedValues;
  }

  // --------------------------
  // 🔥 SAVE BUTTON
  // --------------------------
  savePrescription() {
    console.log("FINAL PRESCRIPTION:", this.prescription);
    this.toast.success("Prescription saved!");
  }

  formatDate(date: string) {
    return new Date(date).toLocaleString();
  }

  // --------------------------
  // 🔥 LOAD APPOINTMENTS (API CALL)
  // --------------------------
  loadAppointments() {
    this.doctorService
      .getPatientAsPerDoctor(this.pageNumber, this.apiPageSize, this.searchText)
      .subscribe({
        next: (response: any) => {
          console.log("API Response:", response);

          this.totalCount = response.totalCount;
          this.totalPages = response.totalPages;

          // API returns ALL → Slice for UI pagination
          const start = (this.pageNumber - 1) * this.pageSize;
          this.dataList = response.dataList.slice(start, start + this.pageSize);
        },
        error: () => this.toast.error("Failed to load appointments")
      });
  }

  // --------------------------
  // 🔥 PAGINATION
  // --------------------------
  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.pageNumber = page;
    this.loadAppointments();
  }

  nextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.loadAppointments();
    }
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadAppointments();
    }
  }

  onMedicineTypeChange() {
  this.medicineNames = this.allMedicineNames[this.selectedMedicineType] || [];
  this.selectedMedicineName = '';
}

addMedicine() {
  if (!this.selectedMedicineType || !this.selectedMedicineName) {
    this.toast.error("Select medicine type and name");
    return;
  }

  this.prescription.medicines.push({
    type: this.selectedMedicineType,
    name: this.selectedMedicineName,
    qty: this.medicineQty,
    frequency: null,
    timings: [],
    instruction: ''
  });

  // Reset fields
  this.selectedMedicineName = '';
  this.medicineQty = 1;
}


removeMedicine(index: number) {
  this.prescription.medicines.splice(index, 1);
}

addLabTest() {
  if (!this.selectedLabTest) {
    this.toast.error("Select a lab test");
    return;
  }

  this.prescription.labTests.push(this.selectedLabTest);
  this.selectedLabTest = '';
}

removeLabTest(index: number) {
  this.prescription.labTests.splice(index, 1);
}

selectFrequency(m: any, freq: number) {
  m.frequency = freq;
  m.timings = [];
}

toggleTiming(m: any, timing: string) {
  const limit = m.frequency;

  if (!limit) {
    this.toast.error("Select frequency first");
    return;
  }

  if (m.timings.includes(timing)) {
    m.timings = m.timings.filter((t: string) => t !== timing);
    return;
  }

  if (m.timings.length >= limit) {
    this.toast.error(`Only ${limit} timings allowed`);
    return;
  }

  m.timings.push(timing);
}

selectInstruction(m: any, instr: string) {
  m.instruction = instr;
}



}
