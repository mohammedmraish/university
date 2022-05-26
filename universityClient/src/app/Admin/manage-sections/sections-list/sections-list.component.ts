import { SectionsParams } from './../../_adminModels/sectionsParams';
import { SectionsService } from './../../_adminServices/sections.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Pagination } from 'src/app/_models/pagination';

@Component({
  selector: 'app-sections-list',
  templateUrl: './sections-list.component.html',
  styleUrls: ['./sections-list.component.css'],
})
export class SectionsListComponent implements OnInit {
  sections: any[];
  pagination: Pagination;
  params = new SectionsParams();
  constructor(private sectionsService: SectionsService) {
    this.params.pageSize = 7;
  }

  ngOnInit(): void {
    this.loadSections();
  }

  loadSections() {
    this.sectionsService.getSectionsList(this.params).subscribe((res) => {
      this.sections = res.result;
      this.pagination = res.pagination;
    });
  }
  pageChanged(event: any) {
    this.params.pageNumber = event.page;
    this.loadSections();
  }

  applyFilter(params: SectionsParams) {
    this.params = params;
    this.loadSections();
  }
}
