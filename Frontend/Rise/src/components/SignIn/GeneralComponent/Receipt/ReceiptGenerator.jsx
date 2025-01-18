import jsPDF from 'jspdf';
import 'jspdf-autotable';

class ReceiptGenerator {
  constructor() {
    this.doc = new jsPDF({
      unit: 'mm',
      format: 'a4',
    });
    this.doc.setFont('Helvetica', 'normal'); // jsPDF'nin varsayılan fontu
  }

  generateReceipt(data) {
    const { customerNo, processRef, iban, processDate, documentNo, currency, amount, explanation, customerName } = data;

    // Dekont Başlığı
    this.doc.setFontSize(16);
    this.doc.text('e-Dekont', 105, 20, { align: 'center' });

    // Muhasebe İşlem Dekontu
    this.doc.setFontSize(12);
    this.doc.text('MUHASEBE İŞLEM DEKONTU', 105, 30, { align: 'center' });

    // Genel Bilgiler Tablosu
    const generalInfo = [
      ['MÜŞTERİ NO:', customerNo],
      ['İŞLEM REF:', processRef],
      ['IBAN NO:', iban],
      ['İŞLEM TARİHİ:', processDate],
      ['BELGE NUMARASI:', documentNo],
      ['DÖVİZ CİNSİ:', currency],
      ['İŞLEM TUTARI:', amount],
    ];

    this.doc.autoTable({
      head: [['Bilgi', 'Detay']],
      body: generalInfo,
      startY: 40,
      theme: 'grid',
      styles: {
        font: 'helvetica',
        fontSize: 10,
      },
    });

    // Açıklama ve Müşteri Bilgisi
    this.doc.text(`AÇIKLAMA: ${explanation}`, 14, this.doc.lastAutoTable.finalY + 10);
    this.doc.text(`MÜŞTERİ ADI: ${customerName}`, 14, this.doc.lastAutoTable.finalY + 20);

    // Dipnot
    this.doc.setFontSize(10);
    this.doc.text(
      'e-Dekont izni kapsamında elektronik ortamda üretilmiştir.',
      105,
      this.doc.lastAutoTable.finalY + 40,
      { align: 'center' }
    );
    this.doc.text(
      'Yapı ve Kredi Bankası A.Ş. - Levent, İstanbul',
      105,
      this.doc.lastAutoTable.finalY + 50,
      { align: 'center' }
    );

    return this.doc;
  }

  downloadPDF(fileName) {
    this.doc.save(`${fileName}.pdf`);
  }
}

export default ReceiptGenerator;
