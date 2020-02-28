import { Component, OnInit, ElementRef, ViewChildren, ViewChild, TemplateRef, ViewContainerRef, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styles: []
})
export class TestComponent implements OnInit {

  @ViewChild('trItem', { read: TemplateRef, static: false }) trItem: TemplateRef<any>;
  @ViewChild('trContainer', { read: TemplateRef, static: false }) trContainer: TemplateRef<any>;
  @ViewChild('trVc', { read: ViewContainerRef, static: false }) trVc: ViewContainerRef;

  treeConf = [
    {
      type: 'Container',
      name: 'fruties',
      padding: '0',
      visiable: true,
      items: [
        {
          type: 'Item',
          name: ' apple',
          padding: '10',
          visiable: true
        },
        {
          type: 'Item',
          name: ' banana',
          padding: '10',
          visiable: true
        },
        {
          type: 'Container',
          name: 'tropical fruits',
          padding: '10',
          visiable: true,
          items: [{
            type: 'Item',
            name: 'jackfruit',
            padding: '15',
            visiable: true
          }]
        }
      ]
    },

    {
      type: 'Container',
      name: 'Other Froutes',
      padding: '0',
      visiable: true,
      items: [
        {
          type: 'Item',
          name: 'jackfruit',
          padding: '10',
          visiable: true
        }
      ]
    }
  ];

  constructor(private elRef: ElementRef, private changeDetRef: ChangeDetectorRef) {

    console.log(this);

  }
  ngOnInit() {

  }
  ngAfterViewInit() {
    this.loopTree1(this.treeConf);
    this.changeDetRef.detectChanges();
  }

  loopTree(treeConf) {
    for (const value of treeConf) {
      if (value.items) {
        console.log(value.name);
        this.attachContainer(value);
        this.loopTree(value.items)
      } else {
        this.attachItem(value);
        console.log(value.name);
      }
    }
  }

  loopTree1(treeConf) {
    // debugger;
    for (let index = 0; index < treeConf.length; index++) {
      if (treeConf[index].items) {
        this.attachContainer(treeConf[index]);
        this.loopTree1(treeConf[index].items)
      } else {
        this.attachItem(treeConf[index]);
      }
    }
  }

  attachContainer(ipdata) {
    let viewRef = this.trVc.createEmbeddedView(this.trContainer, { data: ipdata });
    console.log(viewRef.context.data);

    // this.changeDetRef.detectChanges();
  }

  attachItem(ipdata) {
    let viewRef = this.trVc.createEmbeddedView(this.trItem, { data: ipdata });
    console.log(viewRef.context.data);
    // this.changeDetRef.detectChanges();
  }

  changed(parmData) {
    console.log(parmData);

    console.log(this.treeConf[0]);
  }

  hideAllChildren(data) {

    console.log('hide all children');
    for (let index = 0; index < data.items.length; index++) {

      if (data.items[index].visiable) {
        data.items[index].visiable = false;
      } else {
        data.items[index].visiable = true;
      }
    }
  }

}
