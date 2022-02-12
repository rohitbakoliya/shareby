import { styles } from './htmlStyles';

export const htmlParser = (blocks, title) => {
  let parsed = '';
  blocks.forEach(block => {
    parsed += '<div class="block">';
    switch (block.type) {
      case 'header':
        parsed += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
        break;
      case 'paragraph':
        parsed += `<p>${block.data.text}</p>`;
        break;
      case 'delimiter':
        parsed += '<hr />';
        break;
      case 'simpleImage':
        parsed += `<img class="img-fluid" src="${block.data.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`;
        break;
      case 'list':
        parsed +=
          block.data.style === 'ordered'
            ? `<ol class="numbered-list">`
            : `<ul class="bulleted-list">`;
        block.data.items.forEach(li => {
          parsed += `<li>${li}</li>`;
        });
        parsed += block.data.style === 'ordered' ? '</ol>' : '</ul>';
        break;
      case 'code':
        parsed += `<pre class="code"><code style="white-space: pre-line;">${block.data.code}</code></pre>`;
        break;
      case 'table':
        parsed += '<table>';
        block.data.content.forEach(row => {
          parsed += '<tr>';
          row.forEach(col => {
            parsed += `<td>${col}</td>`;
          });
          parsed += '</tr>';
        });
        parsed += '</table>';
        break;
      case 'quote':
        parsed += `<blockquote>${block.data.text}</blockquote><br /><em>${block.data.caption}</em>`;
        break;
      case 'checklist':
        block.data.items.forEach(item => {
          parsed += `
                      <div style="display: flex;">
                      <input type="checkbox" ${
                        item.checked ? 'checked' : ''
                      } onclick="this.checked=!this.checked;">
                      <span class="to-do-children-${item.checked ? 'checked' : 'unchecked'}">${
            item.text
          }</span>
                      </div>
          `;
        });
        break;
      case 'embed':
        parsed += `<figure><div class="source"><a href="${block.data.source}">${block.data.source}</div></figure>`;
        break;
      default:
        console.log('Unknown block type', block.type);
        console.log(block);
        break;
    }

    parsed += '</div>';
  });

  let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <style>${styles}</style>
    </head>
    <body>
      <artical class="page sans">
      <div class="page=body">
      ${parsed}
      </div>
      </artical>
    </body>
    </html>
    `;

  return html;
};
