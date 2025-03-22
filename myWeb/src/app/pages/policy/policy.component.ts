import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-policy',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './policy.component.html',
    styleUrls: ['./policy.component.css']
})
export class PolicyComponent {
    activeSection: string | null = null;


    @ViewChild('privacyPanel', { static: false }) privacyPanel!: ElementRef;
    @ViewChild('termsPanel', { static: false }) termsPanel!: ElementRef;
    @ViewChild('returnPanel', { static: false }) returnPanel!: ElementRef;
    @ViewChild('deliveryPanel', { static: false }) deliveryPanel!: ElementRef;


    toggleSection(sectionId: string): void {
        if (this.activeSection === sectionId) {
            this.activeSection = null;
        } else {
            this.activeSection = sectionId;
        }
    }


    showGroup(event: Event, groupId: string): void {
        event.preventDefault();
        this.activeSection = groupId;
        setTimeout(() => {
            const panel = this.getPanelElement(groupId);
            if (panel) {
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        }, 10);
    }


    getPanelElement(sectionId: string): HTMLElement | null {
        switch (sectionId) {
            case 'privacy': return this.privacyPanel?.nativeElement;
            case 'terms': return this.termsPanel?.nativeElement;
            case 'return': return this.returnPanel?.nativeElement;
            case 'delivery': return this.deliveryPanel?.nativeElement;
            default: return null;
        }
    }


    getPanelHeight(sectionId: string): string {
        return this.activeSection === sectionId ? '1000px' : '0px';
    }
}



