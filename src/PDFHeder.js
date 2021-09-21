import { jsPDF } from "jspdf";
import imageUrl from './images/ImageUrl';

const PDFHeader = () =>{
    const doc = new jsPDF();
    doc.addImage(imageUrl,"PNG", 30, 15, 30, 30);
        doc.setFont("Calibri", "bold")
        doc.setFontSize(16);
        doc.text("Wolpa Accomodation Services", 70, 19);
        doc.setFontSize(14);
        doc.setFont("Calibri", "normal")
        doc.text("Manipal - 576104", 70, 26);
        doc.text("P: +91 9591798639 | ", 70, 34)
        doc.setTextColor("blue");
        doc.text("E: hello@wolpa.in",115,34)
        doc.setDrawColor(0, 0, 255);
        doc.line(115, 35, 152, 35);
        doc.setTextColor("black");
        doc.text("www.wolpa.in", 70, 42)
}
export default PDFHeader