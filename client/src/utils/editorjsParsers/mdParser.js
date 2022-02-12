const normalizeToMd = str => {
  const BOLD_REGEX = /(<b\b[^>]*>)([^<>]*)\s*<\/b>/gm;
  const ITALIC_REGEX = /(<i\b[^>]*>)([^<>]*)\s*<\/i>/gm;
  const MARK_REGEX = /(<mark\b[^>]*>)([^<>]*)\s*<\/mark>/gm;
  const INLINECODE_REGEX = /(<code\b[^>]*>)([^<>]*)\s*<\/code>/gm;
  const LINK_REGEX = /<a[^>]\s*href="(.*)".*>([^<>]*)<\/a>/gm;
  str = str
    .replace(BOLD_REGEX, ' **$2** ')
    .replace(ITALIC_REGEX, ' *$2* ')
    .replace(MARK_REGEX, ' `$2` ')
    .replace(INLINECODE_REGEX, ' `$2` ')
    .replace(LINK_REGEX, '[$1]($2)')
    .replace(/\s\*{2}/gm, '**')
    .replace(/\s\*{1}/gm, '*')
    .replace(/\s`{1}/gm, '`');
  return str;
};

export const mdParser = blocks => {
  let parsed = '';

  blocks.forEach(block => {
    switch (block.type) {
      case 'header':
        let pre = '';
        let levels = block.data.level;
        while (levels--) pre += '#';
        parsed += `${pre} ${block.data.text}\n\n`;
        break;
      case 'paragraph':
        parsed += `${normalizeToMd(block.data.text)}\n\n`;
        break;
      case 'delimiter':
        parsed += '***\n\n';
        break;
      case 'simpleImage':
        parsed += `![${block.data.caption ? block.data.caption : 'alt'}](${block.data.url})${
          block.data.caption ? '\n*' + block.data.caption + '*' : ''
        }\n\n`;
        break;
      case 'list':
        const ordered = block.data.style === 'ordered';
        block.data.items.forEach((li, ind) => {
          parsed += ordered ? `${ind + 1} ${li}\n` : `* ${li}\n`;
        });
        break;
      case 'code':
        parsed += `\`\`\`\n${block.data.code}\n\`\`\`\n\n`;
        break;
      case 'table':
        parsed += '<table>\n';
        block.data.content.forEach(row => {
          parsed += '\t<tr>\n';
          row.forEach(col => {
            parsed += `\t\t<td>${col}</td>\n`;
          });
          parsed += '\t</tr>\n';
        });
        parsed += '</table>\n\n';
        break;
      case 'quote':
        parsed += `> ${block.data.text}\n\n*${block.data.caption || 'alt'}*\n\n`;
        break;
      case 'checklist':
        block.data.items.forEach(item => {
          parsed += `- [${item.checked ? 'x' : ' '}] ${item.text}\n`;
        });
        break;
      case 'embed':
        parsed += `[${block.data.source}](${block.data.source})\n`;
        break;
      default:
        console.log('Unknown block type', block.type);
        console.log(block);
        break;
    }
  });
  return parsed;
};
