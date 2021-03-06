import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  createPdf() {

    let someTableBodyItemsInjectedInline = [
      ['Inline value goes here', 'Another one here', 'Wow'],
      ['Second inline value goes here', 'Another one here', 'Wow']
    ];

    let someTableBodyItemsInjectedAfterwards = [
      ['Afterwards value goes here', 'Another one here', 'Wowza'],
      ['Second afterwards value goes here', 'Another one here', 'Wowza']
    ];

    let docDefinition = {
      content: [
        'paragraph 1',
        'paragraph 2',
        {
          columns: [
            'first column is a simple text',
            {
              stack: [
                // second column consists of paragraphs
                'paragraph A',
                'paragraph B',
                'these paragraphs will be rendered one below another inside the column'
              ],
              fontSize: 15
            }
          ]
        },
        {
          style: 'tableExample',
          table: {
            body: [
              ...[['Column 1', 'Column 2', 'Column 3'],
              ['One value goes here', 'Another one here', 'OK?']],
              //THIS IS INLINE INJECTION USING THE SPREAD SYNTAX
              ...someTableBodyItemsInjectedInline
            ]
          }
        }
      ]
    };

    //THIS IS AFTER-THE-EVENT INJECTION USING THE SPREAD SYNTAX
    (docDefinition.content as any[])[3].table.body = [...(docDefinition.content as any[])[3].table.body, ...someTableBodyItemsInjectedAfterwards];

    pdfMake.createPdf(docDefinition).download('optionalName.pdf');
  }

}
