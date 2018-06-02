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

  test('should merge highlightStyles', () => {
    const text = 'test text as default slot';
    const queries = ['test'];
    const highlightStyles = {
      color: 'white',
      'background-color': 'green',
    };

    const wrapper = mount(TextHighlight, {
      propsData: {
        queries,
        highlightStyles,
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
});
