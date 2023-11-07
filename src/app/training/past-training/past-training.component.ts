import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns: string[] = ['date', 'name', 'calories', 'duration', 'state'];

  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.trainingService.fetchCompletedOrCancelledExercises();
    this.trainingService.finishedExercisesChanged.subscribe(() => {
      this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(event: Event) {
    this.dataSource.filter = (<HTMLInputElement>event.target).value.trim().toLowerCase();
  }
}
