import {
	Component,
	OnInit,
	OnDestroy,
	HostListener,
	AfterViewInit,
	ElementRef,
	Renderer2,
	ViewChild,
} from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
	/*_ref:any;*/

	@ViewChild('nav_moving') private navbar: ElementRef;
	// @ViewChild('navigation') private start: ElementRef;
	start = this.hostElement.nativeElement;

	y_position: number;
	burgeropen: boolean = false;
	nav_moved: boolean = true; //change color on desktop else bg black
	options = {
		threshold: 0,
	};
	// observer = new IntersectionObserver(this.changeNavbar(),this.options);

	constructor(private hostElement: ElementRef, private rd: Renderer2) {}

	ngOnInit() {
		this.closeNavbarMenu();
		this.toggleDropDown();
	}

	ngAfterViewInit() {
		console.log(window.innerWidth);
		if (window.innerWidth >= 1028 || window.innerWidth < 1600)
			this.changeNavbar();
	}

	ngOnDestroy() {}

	toggleDropDown() {
		document
			.querySelector('.has-dropdown1 .navbar-link')
			.classList.toggle('is-active');
	}

	changeNavbar() {
		console.log(this.navbar);
		console.log(this.start);
		var observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				console.log('observing');
				if (
					entry.isIntersecting &&
					window.innerWidth >= 1028 &&
					window.innerWidth < 2200
				) {
					this.nav_moved = false;
					console.log('transparent');
				} else if (
					!entry.isIntersecting &&
					window.innerWidth >= 1028 &&
					window.innerWidth < 2200
				) {
					this.nav_moved = true;
					console.log('black');
				} else {
					observer.disconnect();
				}
			});
		}, this.options);
		observer.observe(this.start);
		console.log('observing');
	}

	openHome() {
		var x = document.getElementsByClassName('active-link');
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove('active-link');
		}
		document.getElementById('home').className += ' active-link';
	}

	openPage(event) {
		var x = document.getElementsByClassName('active-link');
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove('active-link');
		}
		event.target.className += ' active-link';
	}

	destroyBillboard() {
		/*this._ref.destroy();*/
	}

	closeNavbarMenu() {
		document.querySelector('.removeclick').addEventListener('click', () => {
			let has_dropdown = Array.from(
				document.getElementsByClassName('has-dropdown1')
			);
			has_dropdown.forEach((element) => {
				element.classList.remove('is-active');
			});

			document
				.querySelector('.navbar-burger')
				.classList.remove('is-active');
			document
				.querySelector('.navbar-menu')
				.classList.remove('is-active');
		});

		Array.from(document.getElementsByClassName('menu-close')).forEach(
			(e) => {
				e.addEventListener('click', () => {
					document
						.querySelector('.navbar-burger')
						.classList.remove('is-active');
					document
						.querySelector('.navbar-menu')
						.classList.remove('is-active');
					document
						.querySelector('.has-dropdown1')
						.classList.remove('is-active');
					document
						.querySelector('.has-dropdown1')
						.classList.remove('is-hoverable');
					setTimeout(() => {
						document
							.querySelector('.has-dropdown1')
							.classList.add('is-hoverable');
					}, 500);
				});
			}
		);
	}

	toggleBurger() {
		this.burgeropen = !this.burgeropen;
	}
}
