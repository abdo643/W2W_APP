import { Component, OnInit, Input } from '@angular/core';
import { LEAVING_CONTENT, COMING_CONTENT } from '../../../data/list';

@Component({
	selector: 'app-disney-home',
	templateUrl: './disney-home.component.html',
	styleUrls: ['./disney-home.component.css'],
})
export class DisneyHomeComponent implements OnInit {
	data = COMING_CONTENT;
	expire = LEAVING_CONTENT;
	cardStyle = 'white';
	@Input() mobile: boolean;

	constructor() {}
	ngOnInit() {}
	openTab(evt, tabName, swipertab, servicetab) {
		var i, x, tablinks;
		x = document.getElementsByClassName(swipertab);
		for (i = 0; i < x.length; i++) {
			x[i].style.display = 'none';
		}
		tablinks = document.getElementsByClassName(servicetab);
		for (i = 0; i < x.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(' is-active', '');
		}
		document.getElementById(tabName).style.display = '';
		evt.currentTarget.className += ' is-active';
	}
}
