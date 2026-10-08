//1

class Circle {
    constructor(radius) {
      this._radius = radius; 
    }
  
    get radius() {
      return this._radius;
    }
  
    set radius(value) {
      if (value > 0) {
        this._radius = value;
      } else {
        console.log("Радіус має бути більшим за 0");
      }
    }
  
    get diameter() {
      return this._radius * 2;
    }
  
    calculateArea() {
      return Math.PI * Math.pow(this._radius, 2);
    }
  
    calculateCircumference() {
      return 2 * Math.PI * this._radius;
    }
  }
  
  let myCircle = new Circle(5);
  console.log("Початковий радіус:", myCircle.radius);
  console.log("Діаметр:", myCircle.diameter);
  console.log("Площа:", myCircle.calculateArea().toFixed(2));
  console.log("Довжина кола:", myCircle.calculateCircumference().toFixed(2));
  
  myCircle.radius = 10; 
  console.log("Новий радіус:", myCircle.radius);
  console.log("Новий діаметр:", myCircle.diameter);

//2
class HtmlElement {
    constructor(tagName, isSelfClosing = false, textContent = "") {
      this.tagName = tagName;
      this.isSelfClosing = isSelfClosing;
      this.textContent = textContent;
      this.attributes = []; 
      this.styles = [];     
      this.children = [];   
    }

    setAttribute(name, value) {
      this.attributes.push({ name, value });
    }

    setStyle(name, value) {
      this.styles.push({ name, value });
    }

    appendChild(element) {
      this.children.push(element);
    }
  
    prependChild(element) {
      this.children.unshift(element);
    }
  
    getHtml() {
      let attrString = "";
      for (let i = 0; i < this.attributes.length; i++) {
        attrString += ` ${this.attributes[i].name}="${this.attributes[i].value}"`;
      }
  
      let styleString = "";
      if (this.styles.length > 0) {
        styleString = ' style="';
        for (let i = 0; i < this.styles.length; i++) {
          styleString += `${this.styles[i].name}: ${this.styles[i].value}; `;
        }
        styleString = styleString.trim() + '"';
      }
  
      let html = `<${this.tagName}${attrString}${styleString}>`;
  
      if (this.isSelfClosing) {
        return html;
      }
  
      html += this.textContent;
  
      for (let i = 0; i < this.children.length; i++) {
        html += this.children[i].getHtml();
      }
  
      html += `</${this.tagName}>`;
  
      return html;
    }
  }
  
  let wrapper = new HtmlElement("div");
  wrapper.setAttribute("id", "wrapper");
  wrapper.setStyle("display", "flex");
  
  function createCard() {
    let card = new HtmlElement("div");
    card.setStyle("width", "300px");
    card.setStyle("margin", "10px");
  
    let h3 = new HtmlElement("h3", false, "What is Lorem Ipsum?");
    
    let img = new HtmlElement("img", true);
    img.setStyle("width", "100%");
    img.setAttribute("src", "lipsum.jpg");
    img.setAttribute("alt", "Lorem Ipsum");

    let text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ";
    let p = new HtmlElement("p", false, text);
    p.setStyle("text-align", "justify");
  
    let a = new HtmlElement("a", false, "More...");
    a.setAttribute("href", "https://www.lipsum.com/");
    a.setAttribute("target", "_blank");
  
    p.appendChild(a);
    
    card.appendChild(h3);
    card.appendChild(img);
    card.appendChild(p);
  
    return card;
  }

  wrapper.appendChild(createCard());
  wrapper.appendChild(createCard());

  document.write(wrapper.getHtml());


//3
  class CssClass {
    constructor(className) {
      this.className = className;
      this.styles = []; 
    }
  
    setStyle(property, value) {
      let existingStyle = this.styles.find(s => s.property === property);
      if (existingStyle) {
        existingStyle.value = value;
      } else {
        this.styles.push({ property, value });
      }
    }
  
    removeStyle(property) {
      this.styles = this.styles.filter(s => s.property !== property);
    }
  
    getCss() {
      let cssString = `.${this.className} {\n`;
      for (let i = 0; i < this.styles.length; i++) {
        cssString += `    ${this.styles[i].property}: ${this.styles[i].value};\n`;
      }
      cssString += `}\n`;
      return cssString;
    }
  }
  
//4
  class HtmlBlock {
    constructor(rootElement) {
      this.stylesCollection = []; 
      this.rootElement = rootElement; 
    }
  
    addCssClass(cssClassObj) {
      this.stylesCollection.push(cssClassObj);
    }
  
    getCode() {
      let code = `<style>\n`;
      for (let i = 0; i < this.stylesCollection.length; i++) {
        code += this.stylesCollection[i].getCss();
      }
      code += `</style>\n`;
      code += this.rootElement.getHtml();
      
      return code;
    }
  }
  
  let wrapClass = new CssClass("wrap");
  wrapClass.setStyle("display", "flex");
  
  let blockClass = new CssClass("block");
  blockClass.setStyle("width", "300px");
  blockClass.setStyle("margin", "10px");
  
  let imgClass = new CssClass("img");
  imgClass.setStyle("width", "100%");
  
  let textClass = new CssClass("text");
  textClass.setStyle("text-align", "justify");

  let wrapper = new HtmlElement("div");
  wrapper.setAttribute("id", "wrapper");
  wrapper.setAttribute("class", "wrap");
  
  function createContentBlock() {
    let block = new HtmlElement("div");
    block.setAttribute("class", "block"); 
  
    let h3 = new HtmlElement("h3", false, "What is Lorem Ipsum?"); 
    
    let img = new HtmlElement("img", true);
    img.setAttribute("class", "img"); 
    img.setAttribute("src", "lipsum.jpg"); 
    img.setAttribute("alt", "Lorem Ipsum"); 
  
    let textStr = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "; //[cite: 2]
    let p = new HtmlElement("p", false, textStr);
    p.setAttribute("class", "text"); 
  
    let a = new HtmlElement("a", false, "More..."); 
    a.setAttribute("href", "https://www.lipsum.com/"); 
    a.setAttribute("target", "_blank"); 
  
    p.appendChild(a); 
    
    block.appendChild(h3); 
    block.appendChild(img); 
    block.appendChild(p); 
  
    return block;
  }
  
  wrapper.appendChild(createContentBlock());
  wrapper.appendChild(createContentBlock());

  let documentBlock = new HtmlBlock(wrapper);
  documentBlock.addCssClass(wrapClass);
  documentBlock.addCssClass(blockClass);
  documentBlock.addCssClass(imgClass);
  documentBlock.addCssClass(textClass);
  
  document.write(documentBlock.getCode());