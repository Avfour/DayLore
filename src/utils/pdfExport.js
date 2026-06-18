/**
 * PDF Export for DayLore stories
 */

import { jsPDF } from 'jspdf';
import { getStories } from './storage';

/**
 * Format a date string to a human-readable format
 */
function formatDate(isoString) {
  const d = new Date(isoString);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return d.toLocaleDateString('id-ID', options);
}

/**
 * Export all stories as a PDF document
 */
export const exportStoriesPDF = () => {
  const stories = getStories();

  if (stories.length === 0) {
    alert('Belum ada cerita untuk di-export.');
    return;
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Title Page
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.text('DayLore', pageWidth / 2, pageHeight / 2 - 20, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text('Koleksi Cerita 5 Menit', pageWidth / 2, pageHeight / 2, { align: 'center' });

  doc.setFontSize(10);
  doc.setTextColor(128);
  doc.text(
    `${stories.length} cerita • Diexport ${formatDate(new Date().toISOString())}`,
    pageWidth / 2,
    pageHeight / 2 + 12,
    { align: 'center' }
  );

  // Stories
  const sortedStories = [...stories].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  sortedStories.forEach((story, index) => {
    doc.addPage();
    y = margin;

    // Story number
    doc.setTextColor(150);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Cerita #${index + 1}`, margin, y);
    y += 8;

    // Date
    doc.setTextColor(80);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(formatDate(story.createdAt), margin, y);
    y += 4;

    // Separator line
    doc.setDrawColor(220);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    // Content
    doc.setTextColor(40);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');

    const lines = doc.splitTextToSize(story.content, contentWidth);
    lines.forEach((line) => {
      if (y > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += 6;
    });
  });

  // Footer on each page
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 2; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(180);
    doc.text(
      `DayLore • Halaman ${i - 1} dari ${pageCount - 1}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  doc.save('DayLore_Stories.pdf');
};
