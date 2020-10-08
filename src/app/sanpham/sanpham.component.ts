import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.css']
})
export class SanphamComponent implements OnInit,AfterViewInit{

  constructor(private renderer: Renderer2) { }
  ngOnInit(): void {
  }
  ngAfterViewInit() { 
    this.loadScripts();
  }
  public loadScripts() {
    this.renderExternalScript('assets/js/themsuaxoa.js').onload = () => {
    }
    this.renderExternalScript('assets/Admin/dist/js/adminlte.min.js').onload = () => {
    }
    this.renderExternalScript('assets/Admin/dist/js/pages/dashboard.js').onload = () => {
    }
    this.renderExternalScript('assets/Admin/dist/js/demo.js').onload = () => {
    }
  }
  public renderExternalScript(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script);
    return script;
  }
}