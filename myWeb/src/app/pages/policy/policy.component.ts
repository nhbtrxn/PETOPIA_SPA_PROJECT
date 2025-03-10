import { Component } from '@angular/core';

@Component({
  selector: 'app-policy',
  imports: [],
  templateUrl: './policy.component.html',
  styleUrl: './policy.component.css'
})
export class PolicyComponent {

}

// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-policy',
//   templateUrl: './policy.component.html',
//   styleUrls: ['./policy.component.css']
// })
// export class PolicyComponent implements OnInit {
//   isDarkMode: boolean = false;
//   activePanel: number | null = null;

//   ngOnInit() {
//     // Kiểm tra trạng thái dark mode từ localStorage
//     const savedDarkMode = localStorage.getItem("darkMode");
//     this.isDarkMode = savedDarkMode === "enabled";
//     this.applyDarkMode();
//   }

//   toggleDarkMode() {
//     this.isDarkMode = !this.isDarkMode;
//     localStorage.setItem("darkMode", this.isDarkMode ? "enabled" : "disabled");
//     this.applyDarkMode();
//   }

//   applyDarkMode() {
//     if (this.isDarkMode) {
//       document.body.classList.add("dark-mode");
//     } else {
//       document.body.classList.remove("dark-mode");
//     }
//   }

//   togglePanel(index: number) {
//     this.activePanel = this.activePanel === index ? null : index;
//   }
// }
