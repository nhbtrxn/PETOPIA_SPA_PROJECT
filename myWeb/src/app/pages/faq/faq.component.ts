import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  activeGroup: string | null = null;

  toggleAnswer(event: Event): void {
    const element = event.target as HTMLElement;
    const faqItem = element.closest('.faq-item');
    if (!faqItem) return;

    const answer = faqItem.querySelector('.faq-answer') as HTMLElement;
    if (!answer) return;

    faqItem.classList.toggle('active');
    answer.style.maxHeight = faqItem.classList.contains('active') ? `${answer.scrollHeight}px` : '0';
    answer.style.opacity = faqItem.classList.contains('active') ? '1' : '0';
  }

  showGroup(event: Event, groupId: string): void {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
    this.activeGroup = groupId;

    const allGroups = document.querySelectorAll('.faq-group');
    allGroups.forEach(group => {
      const element = group as HTMLElement;
      element.style.display = element.id === groupId ? 'block' : 'none';
    });
  }
}
