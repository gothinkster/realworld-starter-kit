import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'conduit-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
