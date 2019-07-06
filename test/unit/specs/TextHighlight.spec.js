import Vue from 'vue';
import { mount } from '@vue/test-utils';
import { compileToFunctions } from 'vue-template-compiler';
import TextHighlight from 'vue-text-highlighter/index';

describe('<text-higlight>', () => {
  let spy;

  beforeAll(() => {
    spy = jest.spyOn(console, 'warn');
  });

  beforeEach(() => {
    spy.mockReset();
  });

  test('should highlight correctly with plain string as children', () => {
    const text = 'test text as default slot';
    const queries = ['test', 'defau', 'ault'];

    const wrapper = mount(TextHighlight, {
      propsData: {
        queries,
      },
      slots: {
        default: text,
      },
    });

    const nodes = wrapper.vm.$el.querySelectorAll('.text__highlight');

    expect(nodes[0].textContent).toEqual('test');
    expect(nodes[1].textContent).toEqual('default');
  });

  test('should not throw render with no children', () => {
    const queries = ['test'];

    const wrapper = mount(TextHighlight, {
      propsData: {
        queries,
      },
    });

    const nodes = wrapper.vm.$el.querySelectorAll('.text__highlight');

    expect(nodes[0]).toBeUndefined();
  });

  test('should throw if children are not plain string', () => {
    const pComp = compileToFunctions('<p>test text as default slot</p>');
    const queries = ['test', 'default'];

    mount(TextHighlight, {
      propsData: {
        queries,
      },
      slots: {
        default: pComp,
      },
    });

    expect(spy).toHaveBeenCalled();
  });

  test('should merge highlightStyle', () => {
    const text = 'test text as default slot';
    const queries = ['test'];
    const highlightStyle = {
      color: 'white',
      'background-color': 'green',
    };

    const wrapper = mount(TextHighlight, {
      propsData: {
        queries,
        highlightStyle,
      },
      slots: {
        default: text,
      },
    });

    const nodes = wrapper.vm.$el.querySelectorAll('.text__highlight');

    expect(nodes[0].style.color).toEqual('white');
    expect(nodes[0].style.backgroundColor).toEqual('green');
  });

  test('should merge highlightClass', () => {
    const text = 'test text as default slot';
    const queries = ['test', 'slot'];
    const highlightClass = {
      black: true,
    };

    const wrapper = mount(TextHighlight, {
      propsData: {
        queries,
        highlightClass,
      },
      slots: {
        default: text,
      },
    });

    const nodes = wrapper.vm.$el.querySelectorAll('.text__highlight.black');

    expect(nodes.length).toEqual(2);
  });

  test('should match correctly using regex', () => {
    const text = 'test text as default slot';
    const queries = [/te.t/, 'ault'];

    const wrapper = mount(TextHighlight, {
      propsData: {
        queries,
      },
      slots: {
        default: text,
      },
    });

    const nodes = wrapper.vm.$el.querySelectorAll('.text__highlight');

    expect(nodes[0].textContent).toEqual('test');
    expect(nodes[1].textContent).toEqual('text');
    expect(nodes[2].textContent).toEqual('ault');
  });

  test('should render with given custom component', () => {
    const text = 'using custom component';
    const queries = 'om';
    const CustomComponent = compileToFunctions(`
      <mark class="foo">
        <slot></slot>
      </mark>
    `);

    const wrapper = mount(TextHighlight, {
      propsData: {
        queries,
        highlightComponent: CustomComponent,
      },
      slots: {
        default: text,
      },
    });

    const nodes = wrapper.vm.$el.querySelectorAll('.foo');

    expect(nodes[0].textContent).toEqual('om');
    expect(nodes[1].textContent).toEqual('om');
  });

  test('should forward non-listed props and listeners to custom component', () => {
    const text = 'forward custom component';
    const queries = ['ward', 'comp'];
    const CustomComponent = compileToFunctions(`
      <button :class="foo" @click="$emit('bar', [index, text])">
        <slot></slot>
      </button>
    `);
    CustomComponent.props = {
      index: Number,
      text: String,
      foo: String,
    };

    const fn = jest.fn();

    const wrapper = mount(TextHighlight, {
      propsData: {
        queries,
        highlightComponent: CustomComponent,
      },
      attrs: {
        foo: 'foofoo',
      },
      listeners: {
        bar: fn,
      },
      slots: {
        default: text,
      },
    });

    const button = wrapper.find('button');
    expect(button.classes().includes('foofoo')).toBe(true);
    expect(button.text()).toEqual('ward');

    button.trigger('click');
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith([0, 'ward']);
  });

  test('should rerender if slot changes', async (done) => {
    const text = 'nothing is highlighted';
    const queries = ['something'];

    const wrapper = mount(TextHighlight, {
      propsData: {
        queries,
      },
      slots: {
        default: text,
      },
    });

    let nodes = wrapper.vm.$el.querySelectorAll('.text__highlight');
    expect(nodes).toHaveLength(0);

    wrapper.vm.$slots.default = 'something is highlighted';
    wrapper.vm.$forceUpdate();
    Vue.nextTick(() => {
      nodes = wrapper.vm.$el.querySelectorAll('.text__highlight');
      expect(nodes).toHaveLength(1);

      done();
    });
    wrapper.vm.$forceUpdate();
    wrapper.vm.$forceUpdate();
  });
});
