import { Component } from '@angular/core';
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
    panelHeight: string = '200px'; // Thay đổi chiều cao tối đa nếu cần

    toggleSection(sectionId: string): void {
        this.activeSection = this.activeSection === sectionId ? null : sectionId;
    }

    showGroup(event: Event, groupId: string): void {
        event.preventDefault(); // Ngăn chặn hành động mặc định
        this.activeSection = groupId; // Cập nhật activeSection
    }
}