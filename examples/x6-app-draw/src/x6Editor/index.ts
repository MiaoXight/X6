import { Graph, FunctionExt, Shape } from '@antv/x6'

export default class X6Editor {
  private static instance: X6Editor
  private _graph: Graph
  private container: HTMLElement

  public get graph() {
    return this._graph
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new X6Editor()
    }
    return this.instance
  }

  constructor() {
    this.container = document.getElementById('container')!
    this._graph = new Graph({
      container: this.container,
      width: document.body.offsetWidth - 800,
      height: document.body.offsetHeight - 132,
      grid: {
        size: 10,
        visible: true,
        type: 'doubleMesh',
        args: [
          {
            color: '#e6e6e6',
            thickness: 1,
          },
          {
            color: '#d0d0d0',
            thickness: 1,
            factor: 4,
          },
        ],
      },
      connecting: {
        anchor: 'center',
        connectionPoint: 'anchor',
        dangling: false,
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#ea6b66',
                strokeWidth: 1,
                targetMarker: {
                  name: 'circle',
                  r: 1,
                },
              },
            },
            router: {
              name: 'manhattan',
            },
          })
        },
        validateConnection({
          sourceView,
          targetView,
          sourceMagnet,
          targetMagnet,
        }) {
          if (sourceView === targetView) {
            return false
          }
          if (!sourceMagnet) {
            return false
          }
          if (!targetMagnet) {
            return false
          }
          return true
        },
      },
      snapline: true,
      resizing: true,
      rotating: true,
      history: true,
      selecting: {
        enabled: true,
        multiple: true,
        rubberband: true,
        movable: true,
        showNodeSelectionBox: true,
      },
      clipboard: {
        enabled: true,
      },
      keyboard: {
        enabled: true,
      },
      scroller: {
        enabled: true,
        pageVisible: true,
      },
      minimap: {
        enabled: true,
        container: document.getElementById('minmapContainer')!,
        width: 350,
        height: 200,
        padding: 10,
      },
      mousewheel: {
        enabled: true,
        global: true,
        modifiers: ['ctrl', 'meta'],
      },
    })
    this.initEvent()
  }

  showPorts(ports: NodeListOf<SVGAElement>, show: boolean) {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden'
    }
  }

  initEvent() {
    const { graph } = this

    // show or hide ports
    this.graph.on(
      'node:mouseenter',
      FunctionExt.debounce(() => {
        const ports = this.container.querySelectorAll(
          '.x6-port-body',
        ) as NodeListOf<SVGAElement>
        this.showPorts(ports, true)
      }),
      500,
    )
    graph.on('node:mouseleave', () => {
      const ports = this.container.querySelectorAll(
        '.x6-port-body',
      ) as NodeListOf<SVGAElement>
      this.showPorts(ports, false)
    })

    // keyboard
    graph.bindKey('meta+c', () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.copy(cells)
      }
      return false
    })
    graph.bindKey('meta+v', () => {
      if (!graph.isClipboardEmpty()) {
        const cells = graph.paste({ offset: 32 })
        graph.cleanSelection()
        graph.select(cells)
      }
      return false
    })
    graph.bindKey('meta+x', () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.cut(cells)
      }
      return false
    })
    graph.bindKey('backspace', () => {
      const cells = graph.getSelectedCells()
      const focusElem = document.activeElement
      if (focusElem?.className === 'x6-edit-text') {
        return true
      }
      if (cells.length) {
        graph.removeCells(cells)
      }
      return false
    })
  }
}
