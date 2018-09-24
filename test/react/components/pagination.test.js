/* eslint-disable no-undef, function-paren-newline */
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { configure, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import Pagination from '../../../src/react/components/pagination';

configure({ adapter: new Adapter() });


test('Paginator snapshot', () => {
  const props = {
    count: 101,
    pageLength: 10,
    page: 10,
  };
  const component = renderer.create(
    <MemoryRouter initialEntries={['/', '/page/10', '/next']} initialIndex={1}>
      <Route path="/page/:page">
        <Pagination {...props} />
      </Route>
    </MemoryRouter>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Paginator for root route 1st page', () => {
  const props = {
    count: 101,
    pageLength: 10,
    page: 1,
  };
  const component = mount(
    <MemoryRouter initialEntries={['/before', '/', '/next']} initialIndex={1}>
      <Route path="/">
        <Pagination {...props} />
      </Route>
    </MemoryRouter>,
  );
  expect(component.find('li.active').find('a').prop('href')).toEqual('/');
  expect(component.find('li').first().find('a').prop('href')).toEqual('/');
});


test('Paginator for root route 2nd page', () => {
  const props = {
    count: 101,
    pageLength: 10,
    page: 2,
  };
  const component = mount(
    <MemoryRouter initialEntries={['/', '/page/2', '/next']} initialIndex={1}>
      <Route path="/page/:page">
        <Pagination {...props} />
      </Route>
    </MemoryRouter>,
  );
  expect(component.find('li.active').find('a').prop('href')).toEqual('/page/2');
  expect(component.find('li').first().find('a').prop('href')).toEqual('/');
});


test('Paginator for some route 1st page', () => {
  const props = {
    count: 101,
    pageLength: 10,
    page: 1,
  };
  const component = mount(
    <MemoryRouter initialEntries={['/', '/some', '/next']} initialIndex={1} context={{}}>
      <Route path="/some">
        <Pagination {...props} />
      </Route>
    </MemoryRouter>,
  );
  expect(component.find('li.active').find('a').prop('href')).toEqual('/some');
  expect(component.find('li').first().find('a').prop('href')).toEqual('/some');
});


test('Paginator for /some route 2nd page', () => {
  const props = {
    count: 101,
    pageLength: 10,
    page: 2,
  };
  const component = mount(
    <MemoryRouter initialEntries={['/', '/some/page/2', '/next']} initialIndex={1}>
      <Route path="/some/page/:page">
        <Pagination {...props} />
      </Route>
    </MemoryRouter>,
  );
  expect(component.find('li.active').find('a').prop('href')).toEqual('/some/page/2');
  expect(component.find('li').first().find('a').prop('href')).toEqual('/some');
});
