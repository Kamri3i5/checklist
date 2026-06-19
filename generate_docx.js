const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, AlignmentType, LevelFormat, BorderStyle, WidthType, ShadingType,
  VerticalAlign, PageNumber, PageBreak, HeadingLevel
} = require('docx');

// Read the markdown file
const md = fs.readFileSync('E:/checklist/checkpoints/checklistpoints_RU.md', 'utf8');
const lines = md.split('\n');

// Table styling constants
const FONT = "Times New Roman";
const FONT_SIZE = 18; // 9pt in half-points
const BORDER = { style: BorderStyle.SINGLE, size: 1, color: "000000" };
const BORDERS = { top: BORDER, bottom: BORDER, left: BORDER, right: BORDER };
const BLUE_SHADING = { fill: "00B0F0", type: ShadingType.CLEAR, color: "000000" };
const GRAY_SHADING = { fill: "D9D9D9", type: ShadingType.CLEAR, color: "000000" };
const NO_SHADING = { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" };

// Column widths (DXA) - matching original proportions
// Total width ~10762 for landscape A4
const COL_WIDTHS = [1027, 738, 7071, 880, 351, 342, 353];
const TOTAL_WIDTH = COL_WIDTHS.reduce((a, b) => a + b, 0);

function makeRun(text, bold = false, size = FONT_SIZE) {
  return new TextRun({
    text: text,
    font: FONT,
    size: size,
    bold: bold,
  });
}

function makeCell(text, opts = {}) {
  const {
    bold = false,
    gridSpan,
    shading = NO_SHADING,
    alignment = AlignmentType.LEFT,
    vAlign = VerticalAlign.CENTER,
    width,
    fontSize = FONT_SIZE
  } = opts;

  const cellProps = {
    borders: BORDERS,
    verticalAlign: vAlign,
    margins: { top: 40, bottom: 40, left: 70, right: 70 },
  };
  if (gridSpan) cellProps.columnSpan = gridSpan;
  if (shading) cellProps.shading = shading;
  if (width) cellProps.width = { size: width, type: WidthType.DXA };

  return new TableCell({
    ...cellProps,
    children: [
      new Paragraph({
        spacing: { after: 0, line: 240 },
        alignment: alignment,
        children: [makeRun(text, bold, fontSize)],
      }),
    ],
  });
}

// Parse the markdown into structured data
function parseMarkdown(lines) {
  const sections = [];
  let currentPart = 1;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    // Detect Part 2
    if (line.includes('ЧАСТЬ 2:') || line.includes('КРИТЕРИИ ПРОВЕРКИ ЭЛЕКТРОПРИВОДНЫХ ЛИФТОВ (EN 81-20)')) {
      sections.push({ type: 'part2_start' });
      i++;
      continue;
    }

    // Section headers like ### 1.1. Title
    const sectionMatch = line.match(/^###\s+(\d+\.\d+\.?)\s+(.*)/);
    if (sectionMatch) {
      // Check for reference in parentheses at the end
      const titleText = sectionMatch[2].replace(/\*+/g, '').trim();
      sections.push({
        type: 'section',
        number: sectionMatch[1],
        title: titleText,
      });
      i++;
      continue;
    }

    // Sub-items like **1.1.1** Text
    const itemMatch = line.match(/^\*\*(\d+\.\d+\.\d+)\*\*\s+(.*)/);
    if (itemMatch) {
      let text = itemMatch[2].replace(/\*+/g, '').trim();
      // Collect continuation lines
      while (i + 1 < lines.length) {
        const nextLine = lines[i + 1].trim();
        if (nextLine === '' || nextLine.startsWith('**') || nextLine.startsWith('###') || nextLine.startsWith('##') || nextLine.startsWith('---') || nextLine.startsWith('|') || nextLine.startsWith('*Перевод') || nextLine.startsWith('*Источник') || nextLine.startsWith('*Министерство') || nextLine.startsWith('*Комитет') || nextLine.startsWith('*Файл') || nextLine.startsWith('*Подробное') || nextLine.startsWith('**ПРИМЕЧАНИЕ') || nextLine.startsWith('**Разделы')) {
          break;
        }
        text += ' ' + nextLine.replace(/\*+/g, '').trim();
        i++;
      }
      sections.push({
        type: 'item',
        number: itemMatch[1],
        text: text,
      });
      i++;
      continue;
    }

    // Notes (ПРИМЕЧАНИЕ)
    const noteMatch = line.match(/^\*\*ПРИМЕЧАНИЕ\s*(\d*):?\*\*\s*(.*)/);
    if (noteMatch) {
      let text = (noteMatch[1] ? 'ПРИМЕЧАНИЕ ' + noteMatch[1] + ': ' : 'ПРИМЕЧАНИЕ: ') + noteMatch[2].replace(/\*+/g, '').trim();
      while (i + 1 < lines.length) {
        const nextLine = lines[i + 1].trim();
        if (nextLine === '' || nextLine.startsWith('**') || nextLine.startsWith('###') || nextLine.startsWith('##') || nextLine.startsWith('---')) break;
        text += ' ' + nextLine.replace(/\*+/g, '').trim();
        i++;
      }
      sections.push({ type: 'note', text: text });
      i++;
      continue;
    }

    i++;
  }

  return sections;
}

// Build the table rows
function buildTableRows(sections, partTitle, isPartTwo = false) {
  const rows = [];

  // Title row (spanning all 7 columns)
  rows.push(new TableRow({
    tableHeader: true,
    height: { value: 402, rule: 'atLeast' },
    children: [
      makeCell(partTitle, {
        bold: true,
        gridSpan: 7,
        alignment: AlignmentType.CENTER,
        width: TOTAL_WIDTH,
      }),
    ],
  }));

  // Column headers row
  const headerCol3Title = isPartTwo
    ? "КРИТЕРИИ ПРОВЕРКИ И ОПИСАНИЕ НЕСООТВЕТСТВИЙ ПО ДАННЫМ КРИТЕРИЯМ"
    : "ТРЕБОВАНИЯ К ПРОВЕРКЕ И ОПИСАНИЕ НЕСООТВЕТСТВИЙ ПО ДАННЫМ ТРЕБОВАНИЯМ";

  const headerCol4Title = isPartTwo ? "" : "№ статьи EN 81-80";

  rows.push(new TableRow({
    tableHeader: true,
    height: { value: 499, rule: 'atLeast' },
    children: [
      makeCell("ОСНОВНАЯ СТАТЬЯ №", { bold: true, width: COL_WIDTHS[0], alignment: AlignmentType.CENTER }),
      makeCell("подпункт №", { bold: true, width: COL_WIDTHS[1], alignment: AlignmentType.CENTER }),
      makeCell(headerCol3Title, { bold: true, width: COL_WIDTHS[2], alignment: AlignmentType.CENTER }),
      makeCell(headerCol4Title, { bold: true, width: COL_WIDTHS[3], alignment: AlignmentType.CENTER }),
      makeCell("Результат", { bold: true, gridSpan: 3, width: COL_WIDTHS[4] + COL_WIDTHS[5] + COL_WIDTHS[6], alignment: AlignmentType.CENTER }),
    ],
  }));

  return rows;
}

// Build section and item rows
function buildContentRows(sections) {
  const rows = [];

  for (const section of sections) {
    if (section.type === 'part2_start') {
      // Will be handled separately
      continue;
    }

    if (section.type === 'section') {
      // Section header row with blue background
      rows.push(new TableRow({
        height: { value: 315, rule: 'atLeast' },
        children: [
          makeCell(section.number, { bold: true, width: COL_WIDTHS[0], shading: BLUE_SHADING }),
          makeCell("", { bold: true, width: COL_WIDTHS[1], shading: BLUE_SHADING }),
          makeCell(section.title, { bold: true, width: COL_WIDTHS[2] }),
          makeCell("", { width: COL_WIDTHS[3] }),
          makeCell("", { width: COL_WIDTHS[4], shading: GRAY_SHADING }),
          makeCell("", { width: COL_WIDTHS[5], shading: GRAY_SHADING }),
          makeCell("", { width: COL_WIDTHS[6], shading: GRAY_SHADING }),
        ],
      }));
    }

    if (section.type === 'item') {
      // Extract article number - first column is main section (e.g. "1.1" from "1.1.1")
      const parts = section.number.split('.');
      const mainSection = parts[0] + '.' + parts[1] + '.';

      rows.push(new TableRow({
        height: { value: 300, rule: 'atLeast' },
        children: [
          makeCell("", { width: COL_WIDTHS[0] }),
          makeCell(section.number, { width: COL_WIDTHS[1] }),
          makeCell(section.text, { width: COL_WIDTHS[2] }),
          makeCell("", { width: COL_WIDTHS[3] }),
          makeCell("", { width: COL_WIDTHS[4], shading: GRAY_SHADING }),
          makeCell("", { width: COL_WIDTHS[5], shading: GRAY_SHADING }),
          makeCell("", { width: COL_WIDTHS[6], shading: GRAY_SHADING }),
        ],
      }));
    }

    if (section.type === 'note') {
      rows.push(new TableRow({
        height: { value: 300, rule: 'atLeast' },
        children: [
          makeCell("", { width: COL_WIDTHS[0] }),
          makeCell("", { width: COL_WIDTHS[1] }),
          makeCell(section.text, { bold: true, width: COL_WIDTHS[2] }),
          makeCell("", { width: COL_WIDTHS[3] }),
          makeCell("", { width: COL_WIDTHS[4], shading: GRAY_SHADING }),
          makeCell("", { width: COL_WIDTHS[5], shading: GRAY_SHADING }),
          makeCell("", { width: COL_WIDTHS[6], shading: GRAY_SHADING }),
        ],
      }));
    }
  }

  return rows;
}

// Main
const parsed = parseMarkdown(lines);

// Split into Part 1 and Part 2
let part2Index = parsed.findIndex(s => s.type === 'part2_start');
const part1Sections = part2Index >= 0 ? parsed.slice(0, part2Index) : parsed;
const part2Sections = part2Index >= 0 ? parsed.slice(part2Index + 1) : [];

// Build Part 1 table
const part1Title = "ТРЕБОВАНИЯ К ПРОВЕРКЕ ЭЛЕКТРОПРИВОДНЫХ ЛИФТОВ (EN 81-1 +A3 и EN 81-80)";
const part1HeaderRows = buildTableRows(part1Sections, part1Title, false);
const part1ContentRows = buildContentRows(part1Sections);
const part1AllRows = [...part1HeaderRows, ...part1ContentRows];

// Build Part 2 table
const part2Title = "КРИТЕРИИ ПРОВЕРКИ ЭЛЕКТРОПРИВОДНЫХ ЛИФТОВ (EN 81-20)";
const part2HeaderRows = buildTableRows(part2Sections, part2Title, true);
const part2ContentRows = buildContentRows(part2Sections);
const part2AllRows = [...part2HeaderRows, ...part2ContentRows];

// Header paragraphs
const headerParagraphs = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 0 },
    children: [makeRun("Республика Узбекистан", true, 20)],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 0 },
    children: [makeRun("Министерство строительства и жилищно-коммунального хозяйства", false, 18)],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 0 },
    children: [makeRun("Комитет по промышленной, радиационной и ядерной безопасности", false, 18)],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [makeRun("Приложение 1", false, 18)],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [
      makeRun("ЧЕК-ЛИСТЫ", true, 24),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [
      makeRun("Составлены на основе требований национальных стандартов, используемых при техническом осмотре лифтов", false, 18),
    ],
  }),
];

// Create Part 1 table
const table1 = new Table({
  width: { size: TOTAL_WIDTH, type: WidthType.DXA },
  columnWidths: COL_WIDTHS,
  rows: part1AllRows,
});

// Build children array
const children = [
  ...headerParagraphs,
  table1,
];

// Add Part 2 if exists
if (part2AllRows.length > 0) {
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Table({
    width: { size: TOTAL_WIDTH, type: WidthType.DXA },
    columnWidths: COL_WIDTHS,
    rows: part2AllRows,
  }));
}

// Footer paragraph
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 200 },
  children: [makeRun("Перевод с узбекского языка", false, 16)],
}));

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: FONT, size: FONT_SIZE },
      },
    },
  },
  sections: [{
    properties: {
      page: {
        size: {
          width: 15840,  // landscape letter
          height: 12240,
          orientation: 'landscape',
        },
        margin: { top: 720, right: 720, bottom: 720, left: 720 },
      },
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [makeRun("Чек-лист периодического технического контроля лифтов", false, 16)],
          }),
        ],
      }),
    },
    children: children,
  }],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('E:/checklist/checkpoints/checklistpoints_RU.docx', buffer);
  console.log('DOCX created successfully!');
  console.log('Part 1 rows:', part1AllRows.length);
  console.log('Part 2 rows:', part2AllRows.length);
  console.log('Total parsed sections:', parsed.length);
});
