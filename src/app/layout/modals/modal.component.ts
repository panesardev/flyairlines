import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { ModalService } from './modal.service';

export class Modal {
  cdr = inject(ChangeDetectorRef);
  modal = inject(ModalService);

  cd = setTimeout(() => this.cdr.detectChanges());
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  template: `
    <div class="{{ modal.isOpen() ? 'modal-overlay-open' : 'modal-overlay-close' }} fixed inset-0 z-[100] bg-slate-950/60"></div>
    <div class="{{ modal.isOpen() ? 'modal-open' : 'modal-close' }} fixed z-[101] inset-0 px-3 md:px-10 py-8 select-none" #modalRef (click)="close($event)">
      <div class="bg-white rounded-lg p-6 md:p-8 mx-auto {{ width() }}">
        <h1 class="text-primary text-2xl text-center font-bold mb-8">{{ heading() }}</h1>
        <ng-content/>
      </div>
    </div>
  `,
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent extends Modal {
  heading = input.required<string>();
  width = input<string>('max-w-sm');

  modalRef = viewChild.required<ElementRef>('modalRef');

  close(event: MouseEvent) {
    if (event.target === this.modalRef().nativeElement) {
      this.modal.close();
    }
  }
}
