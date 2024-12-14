import { DecoratorNode } from 'lexical';
import { JSX } from 'react';
export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;

  static getType(): string {
    return 'image';
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__key);
  }

  constructor(src: string, key?: string) {
    super(key);
    this.__src = src;
  }

  createDOM(): HTMLElement {
    const img = document.createElement('img');
    img.src = this.__src;
    img.alt = 'Lexical Image';
    img.className="size-80"
    return img;
  }

  updateDOM(): false {
    return false; // No actualizaciones dinámicas necesarias
  }

  static importJSON(serializedNode: any): ImageNode {
    return new ImageNode(serializedNode.src);
  }

  exportJSON(): any {
    return {
      src: this.__src,
      type: 'image',
      version: 1,
    };
  }

  decorate(): JSX.Element {
    return <img src={this.__src} alt="Lexical Image" className='size-80' />;
  }
}
