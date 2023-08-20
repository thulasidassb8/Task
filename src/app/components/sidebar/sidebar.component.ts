import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

 userName:any = '';
 Name:any = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    this.Name = localStorage.getItem('name');

    // Selecting the sidebar and buttons
    const sidebar:any = document.querySelector(".sidebar");
    const sidebarOpenBtn:any = document.querySelector("#sidebar-open");
    const sidebarCloseBtn:any = document.querySelector("#sidebar-close");
    const sidebarLockBtn:any = document.querySelector("#lock-icon");

    // Function to toggle the lock state of the sidebar
    const toggleLock = () => {
      sidebar.classList.toggle("locked");
      // If the sidebar is not locked
      if (!sidebar.classList.contains("locked")) {
        sidebar.classList.add("hoverable");
        sidebarLockBtn.classList.replace("bx-lock-alt", "bx-lock-open-alt");
      } else {
        sidebar.classList.remove("hoverable");
        sidebarLockBtn.classList.replace("bx-lock-open-alt", "bx-lock-alt");
      }
    };

    // Function to hide the sidebar when the mouse leaves
    const hideSidebar = () => {
      if (sidebar.classList.contains("hoverable")) {
        sidebar.classList.add("close");
      }
    };

    // Function to show the sidebar when the mouse enter
    const showSidebar = () => {
      if (sidebar.classList.contains("hoverable")) {
        sidebar.classList.remove("close");
      }
    };

    // Function to show and hide the sidebar
    const toggleSidebar = () => {
      sidebar.classList.toggle("close");
    };

    // If the window width is less than 800px, close the sidebar and remove hoverability and lock
    if (window.innerWidth < 800) {
      sidebar.classList.add("close");
      sidebar.classList.remove("locked");
      sidebar.classList.remove("hoverable");
    }

    // Adding event listeners to buttons and sidebar for the corresponding actions
    sidebarLockBtn.addEventListener("click", toggleLock);
    sidebar.addEventListener("mouseleave", hideSidebar);
    sidebar.addEventListener("mouseenter", showSidebar);
    sidebarOpenBtn.addEventListener("click", toggleSidebar);
    sidebarCloseBtn.addEventListener("click", toggleSidebar);
  }


  logout(){
    this.router.navigate(['/'])
  }
}
